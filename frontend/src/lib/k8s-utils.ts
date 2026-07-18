import { dump, loadAll } from "js-yaml";
import type { LintIssue } from "@/lib/docker-utils";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const QUANTITY_RE = /^\d+(\.\d+)?(m|Ki|Mi|Gi|Ti|Pi|Ei|k|M|G|T|P|E)?$/;

function validateContainers(containers: unknown, path: string, issues: LintIssue[]): void {
  if (!Array.isArray(containers) || containers.length === 0) {
    issues.push({ severity: "error", message: `${path}: "containers" must be a non-empty list.` });
    return;
  }
  containers.forEach((container, i) => {
    const label = `${path}.containers[${i}]`;
    if (!isPlainObject(container)) {
      issues.push({ severity: "error", message: `${label} must be a mapping.` });
      return;
    }
    if (!container.name) issues.push({ severity: "error", message: `${label}: missing required "name".` });
    if (!container.image) issues.push({ severity: "error", message: `${label}: missing required "image".` });
    if (typeof container.image === "string" && /:latest$/.test(container.image)) {
      issues.push({ severity: "warning", message: `${label}: image uses the "latest" tag \u2014 pin an explicit version.` });
    }
    const resources = container.resources;
    if (isPlainObject(resources)) {
      for (const kind of ["requests", "limits"]) {
        const bucket = resources[kind];
        if (isPlainObject(bucket)) {
          for (const [resourceName, value] of Object.entries(bucket)) {
            if (typeof value !== "string" && typeof value !== "number") continue;
            if (!QUANTITY_RE.test(String(value))) {
              issues.push({
                severity: "warning",
                message: `${label}.resources.${kind}.${resourceName}: "${value}" doesn't look like a valid Kubernetes quantity (e.g. "500m", "128Mi").`,
              });
            }
          }
        }
      }
    } else {
      issues.push({ severity: "info", message: `${label}: no "resources" requests/limits set \u2014 consider adding them to avoid noisy-neighbor issues.` });
    }
  });
}

function validatePodSpecTemplate(spec: unknown, kind: string, issues: LintIssue[]): void {
  if (!isPlainObject(spec)) {
    issues.push({ severity: "error", message: `spec.template.spec is required for a ${kind} and must be a mapping.` });
    return;
  }
  validateContainers(spec.containers, "spec.template.spec", issues);
}

function validateWorkload(doc: Record<string, unknown>, kind: string, issues: LintIssue[]): void {
  const spec = doc.spec;
  if (!isPlainObject(spec)) {
    issues.push({ severity: "error", message: "Missing required top-level \"spec\"." });
    return;
  }
  if (kind === "CronJob") {
    if (!spec.schedule || typeof spec.schedule !== "string") {
      issues.push({ severity: "error", message: 'CronJob spec: missing required "schedule" (a cron expression).' });
    }
    const jobTemplate = isPlainObject(spec.jobTemplate) ? spec.jobTemplate.spec : undefined;
    const template = isPlainObject(jobTemplate) ? jobTemplate.template : undefined;
    validatePodSpecTemplate(isPlainObject(template) ? template.spec : undefined, kind, issues);
    return;
  }

  if (kind === "Job") {
    const template = spec.template;
    validatePodSpecTemplate(isPlainObject(template) ? template.spec : undefined, kind, issues);
    return;
  }

  if (!isPlainObject(spec.selector) || !isPlainObject(spec.selector.matchLabels)) {
    issues.push({ severity: "error", message: `${kind} spec: missing "selector.matchLabels".` });
  }
  const template = spec.template;
  if (!isPlainObject(template)) {
    issues.push({ severity: "error", message: `${kind} spec: missing "template".` });
    return;
  }
  const templateLabels = isPlainObject(template.metadata) ? template.metadata.labels : undefined;
  if (isPlainObject(spec.selector) && isPlainObject(spec.selector.matchLabels) && isPlainObject(templateLabels)) {
    for (const [key, value] of Object.entries(spec.selector.matchLabels)) {
      if (templateLabels[key] !== value) {
        issues.push({
          severity: "error",
          message: `${kind} spec.selector.matchLabels.${key}="${value}" does not match spec.template.metadata.labels.${key}="${templateLabels[key] ?? "(missing)"}".`,
        });
      }
    }
  }
  validatePodSpecTemplate(template.spec, kind, issues);
}

function validateService(doc: Record<string, unknown>, issues: LintIssue[]): void {
  const spec = doc.spec;
  if (!isPlainObject(spec)) {
    issues.push({ severity: "error", message: 'Service: missing required "spec".' });
    return;
  }
  if (spec.type !== "ExternalName" && !isPlainObject(spec.selector)) {
    issues.push({ severity: "warning", message: 'Service spec: missing "selector" \u2014 the Service won\'t route to any pods unless one is set (or Endpoints are managed manually).' });
  }
  if (!Array.isArray(spec.ports) || spec.ports.length === 0) {
    issues.push({ severity: "error", message: 'Service spec: missing a non-empty "ports" list.' });
  } else {
    spec.ports.forEach((port: unknown, i: number) => {
      if (!isPlainObject(port) || typeof port.port !== "number") {
        issues.push({ severity: "error", message: `Service spec.ports[${i}]: missing numeric "port".` });
      }
    });
  }
}

function validateIngress(doc: Record<string, unknown>, issues: LintIssue[]): void {
  const spec = doc.spec;
  if (!isPlainObject(spec) || (!spec.rules && !spec.defaultBackend)) {
    issues.push({ severity: "error", message: 'Ingress spec: must define at least "rules" or a "defaultBackend".' });
  }
}

function validatePvc(doc: Record<string, unknown>, issues: LintIssue[]): void {
  const spec = doc.spec;
  if (!isPlainObject(spec)) {
    issues.push({ severity: "error", message: 'PersistentVolumeClaim: missing required "spec".' });
    return;
  }
  if (!Array.isArray(spec.accessModes) || spec.accessModes.length === 0) {
    issues.push({ severity: "error", message: 'PersistentVolumeClaim spec: missing "accessModes".' });
  }
  const storage = isPlainObject(spec.resources) && isPlainObject(spec.resources.requests) ? spec.resources.requests.storage : undefined;
  if (!storage) {
    issues.push({ severity: "error", message: 'PersistentVolumeClaim spec: missing "resources.requests.storage".' });
  }
}

function validateConfigOrSecret(doc: Record<string, unknown>, kind: string, issues: LintIssue[]): void {
  if (!doc.data && !doc.stringData && !doc.binaryData) {
    issues.push({ severity: "warning", message: `${kind} has no "data" \u2014 it will be created empty.` });
  }
}

export interface K8sDocResult {
  index: number;
  kind?: string;
  name?: string;
  issues: LintIssue[];
}

export function validateK8sManifests(yamlText: string): { valid: boolean; docs: K8sDocResult[] } {
  let docs: unknown[];
  try {
    docs = loadAll(yamlText).filter((d) => d !== null && d !== undefined);
  } catch (e) {
    return {
      valid: false,
      docs: [{ index: 0, issues: [{ severity: "error", message: e instanceof Error ? e.message : "Invalid YAML syntax." }] }],
    };
  }

  if (docs.length === 0) {
    return { valid: false, docs: [{ index: 0, issues: [{ severity: "error", message: "No YAML documents found." }] }] };
  }

  const results: K8sDocResult[] = docs.map((doc, index) => {
    const issues: LintIssue[] = [];
    if (!isPlainObject(doc)) {
      return { index, issues: [{ severity: "error", message: "Document must be a YAML mapping (object)." }] };
    }

    if (!doc.apiVersion || typeof doc.apiVersion !== "string") {
      issues.push({ severity: "error", message: 'Missing required "apiVersion".' });
    }
    const kind = typeof doc.kind === "string" ? doc.kind : undefined;
    if (!kind) {
      issues.push({ severity: "error", message: 'Missing required "kind".' });
    }

    const metadata = doc.metadata;
    let name: string | undefined;
    if (!isPlainObject(metadata)) {
      issues.push({ severity: "error", message: 'Missing required "metadata".' });
    } else {
      if (!metadata.name && !metadata.generateName) {
        issues.push({ severity: "error", message: 'metadata: missing required "name" (or "generateName").' });
      }
      name = typeof metadata.name === "string" ? metadata.name : undefined;
    }

    if (kind && ["Deployment", "StatefulSet", "DaemonSet", "ReplicaSet", "Job", "CronJob"].includes(kind)) {
      validateWorkload(doc, kind, issues);
    } else if (kind === "Service") {
      validateService(doc, issues);
    } else if (kind === "Ingress") {
      validateIngress(doc, issues);
    } else if (kind === "PersistentVolumeClaim") {
      validatePvc(doc, issues);
    } else if (kind === "ConfigMap" || kind === "Secret") {
      validateConfigOrSecret(doc, kind, issues);
    }

    return { index, kind, name, issues };
  });

  const valid = results.every((r) => r.issues.every((i) => i.severity !== "error"));
  return { valid, docs: results };
}

export type K8sKind = "Deployment" | "Service" | "ConfigMap" | "Secret";

export interface DeploymentOptions {
  name: string;
  namespace: string;
  image: string;
  replicas: number;
  containerPort: number;
  envVars: string;
}

export interface ServiceOptions {
  name: string;
  namespace: string;
  selectorApp: string;
  port: number;
  targetPort: number;
  type: "ClusterIP" | "NodePort" | "LoadBalancer";
}

export interface ConfigMapOptions {
  name: string;
  namespace: string;
  entries: string;
}

export interface SecretOptions {
  name: string;
  namespace: string;
  entries: string;
}

function parseKeyValueLines(text: string): [string, string][] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf("=");
      return idx === -1 ? [line, ""] : [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    });
}

export function generateDeploymentYaml(opts: DeploymentOptions): string {
  const env = parseKeyValueLines(opts.envVars).map(([name, value]) => ({ name, value }));
  const doc = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: opts.name, namespace: opts.namespace || undefined, labels: { app: opts.name } },
    spec: {
      replicas: opts.replicas,
      selector: { matchLabels: { app: opts.name } },
      template: {
        metadata: { labels: { app: opts.name } },
        spec: {
          containers: [
            {
              name: opts.name,
              image: opts.image,
              ports: [{ containerPort: opts.containerPort }],
              ...(env.length > 0 ? { env } : {}),
            },
          ],
        },
      },
    },
  };
  return dump(doc, { noRefs: true });
}

export function generateServiceYaml(opts: ServiceOptions): string {
  const doc = {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: opts.name, namespace: opts.namespace || undefined },
    spec: {
      type: opts.type,
      selector: { app: opts.selectorApp },
      ports: [{ port: opts.port, targetPort: opts.targetPort }],
    },
  };
  return dump(doc, { noRefs: true });
}

export function generateConfigMapYaml(opts: ConfigMapOptions): string {
  const data = Object.fromEntries(parseKeyValueLines(opts.entries));
  const doc = {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: { name: opts.name, namespace: opts.namespace || undefined },
    data,
  };
  return dump(doc, { noRefs: true });
}

export function generateSecretYaml(opts: SecretOptions): string {
  const entries = parseKeyValueLines(opts.entries);
  const data = Object.fromEntries(
    entries.map(([key, value]) => [key, typeof btoa === "function" ? btoa(value) : Buffer.from(value).toString("base64")])
  );
  const doc = {
    apiVersion: "v1",
    kind: "Secret",
    type: "Opaque",
    metadata: { name: opts.name, namespace: opts.namespace || undefined },
    data,
  };
  return dump(doc, { noRefs: true });
}
