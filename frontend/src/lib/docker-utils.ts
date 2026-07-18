import { load } from "js-yaml";

export interface LintIssue {
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
}

const TOP_LEVEL_KEYS = new Set(["version", "name", "services", "networks", "volumes", "configs", "secrets", "include"]);

const SERVICE_KEYS = new Set([
  "image",
  "build",
  "command",
  "entrypoint",
  "container_name",
  "ports",
  "expose",
  "environment",
  "env_file",
  "volumes",
  "volumes_from",
  "depends_on",
  "networks",
  "restart",
  "labels",
  "healthcheck",
  "deploy",
  "profiles",
  "links",
  "network_mode",
  "user",
  "working_dir",
  "hostname",
  "domainname",
  "dns",
  "cap_add",
  "cap_drop",
  "devices",
  "extra_hosts",
  "logging",
  "security_opt",
  "stop_signal",
  "stop_grace_period",
  "sysctls",
  "tmpfs",
  "ulimits",
  "init",
  "privileged",
  "read_only",
  "shm_size",
  "stdin_open",
  "tty",
  "pid",
  "ipc",
  "platform",
  "isolation",
  "scale",
  "secrets",
  "configs",
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isExtensionKey(key: string): boolean {
  return key.startsWith("x-");
}

function validatePorts(ports: unknown, serviceName: string, issues: LintIssue[]): void {
  if (!Array.isArray(ports)) {
    issues.push({ severity: "error", message: `Service "${serviceName}": "ports" must be a list.` });
    return;
  }
  const portPattern = /^(\d+(\.\d+\.\d+\.\d+:)?:)?\d+(-\d+)?(:\d+(-\d+)?)?(\/(tcp|udp))?$/;
  for (const port of ports) {
    if (typeof port === "number") continue;
    if (typeof port === "string" && portPattern.test(port)) continue;
    if (isPlainObject(port) && "target" in port) continue;
    issues.push({
      severity: "warning",
      message: `Service "${serviceName}": port entry "${JSON.stringify(port)}" doesn't look like a valid port mapping (e.g. "8080:80" or "80").`,
    });
  }
}

function validateEnvironment(env: unknown, serviceName: string, issues: LintIssue[]): void {
  if (Array.isArray(env)) {
    for (const entry of env) {
      if (typeof entry !== "string" || !entry.includes("=")) {
        issues.push({
          severity: "warning",
          message: `Service "${serviceName}": environment entry "${String(entry)}" should be in "KEY=VALUE" format.`,
        });
      }
    }
  } else if (!isPlainObject(env)) {
    issues.push({
      severity: "error",
      message: `Service "${serviceName}": "environment" must be a list of "KEY=VALUE" strings or a mapping.`,
    });
  }
}

function validateService(name: string, service: unknown, issues: LintIssue[]): void {
  if (!isPlainObject(service)) {
    issues.push({ severity: "error", message: `Service "${name}" must be a mapping of configuration options.` });
    return;
  }

  if (!service.image && !service.build) {
    issues.push({ severity: "warning", message: `Service "${name}": specify either "image" or "build".` });
  }
  if (typeof service.image === "string" && /:latest$/.test(service.image)) {
    issues.push({
      severity: "warning",
      message: `Service "${name}": image uses the "latest" tag \u2014 pin an explicit version for reproducible builds.`,
    });
  }
  if (service.ports !== undefined) validatePorts(service.ports, name, issues);
  if (service.environment !== undefined) validateEnvironment(service.environment, name, issues);
  if (service.volumes !== undefined && !Array.isArray(service.volumes)) {
    issues.push({ severity: "error", message: `Service "${name}": "volumes" must be a list.` });
  }
  if (
    service.depends_on !== undefined &&
    !Array.isArray(service.depends_on) &&
    !isPlainObject(service.depends_on) &&
    typeof service.depends_on !== "string"
  ) {
    issues.push({ severity: "error", message: `Service "${name}": "depends_on" must be a list, mapping, or string.` });
  }

  for (const key of Object.keys(service)) {
    if (!SERVICE_KEYS.has(key) && !isExtensionKey(key)) {
      issues.push({ severity: "info", message: `Service "${name}": "${key}" is not a commonly recognized Compose key (may be a typo, or valid in a newer spec version).` });
    }
  }
}

export interface ComposeValidationResult {
  valid: boolean;
  issues: LintIssue[];
  serviceCount: number;
}

export function validateDockerCompose(yamlText: string): ComposeValidationResult {
  let doc: unknown;
  try {
    doc = load(yamlText);
  } catch (e) {
    return {
      valid: false,
      issues: [{ severity: "error", message: e instanceof Error ? e.message : "Invalid YAML syntax." }],
      serviceCount: 0,
    };
  }

  const issues: LintIssue[] = [];

  if (!isPlainObject(doc)) {
    return { valid: false, issues: [{ severity: "error", message: "The document must be a YAML mapping (object) at the top level." }], serviceCount: 0 };
  }

  for (const key of Object.keys(doc)) {
    if (!TOP_LEVEL_KEYS.has(key) && !isExtensionKey(key)) {
      issues.push({ severity: "info", message: `Top-level key "${key}" is not a standard Compose key (may be valid in a newer spec version).` });
    }
  }

  if (!doc.services) {
    issues.push({ severity: "error", message: 'Missing required top-level "services" key.' });
    return { valid: issues.every((i) => i.severity !== "error"), issues, serviceCount: 0 };
  }
  if (!isPlainObject(doc.services) || Object.keys(doc.services).length === 0) {
    issues.push({ severity: "error", message: '"services" must be a non-empty mapping of service definitions.' });
    return { valid: false, issues, serviceCount: 0 };
  }

  for (const [name, service] of Object.entries(doc.services)) {
    validateService(name, service, issues);
  }

  if (doc.version !== undefined) {
    issues.push({
      severity: "info",
      message: 'The top-level "version" key is obsolete in the Compose Specification and is ignored by modern Compose \u2014 it can be safely removed.',
    });
  }

  return {
    valid: !issues.some((i) => i.severity === "error"),
    issues,
    serviceCount: Object.keys(doc.services).length,
  };
}

const SECRET_ENV_PATTERN = /(PASSWORD|SECRET|TOKEN|API_KEY|PRIVATE_KEY)/i;

export function lintDockerfile(text: string): LintIssue[] {
  const lines = text.split(/\r?\n/);
  const issues: LintIssue[] = [];
  let seenFrom = false;
  let seenUser = false;

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    const lineNo = idx + 1;
    if (!line || line.startsWith("#")) return;

    const match = /^(\w+)\s+(.*)$/.exec(line) ?? /^(\w+)$/.exec(line);
    if (!match) return;
    const instruction = match[1].toUpperCase();
    const args = match[2] ?? "";

    if (instruction === "MAINTAINER") {
      issues.push({ severity: "warning", line: lineNo, message: 'MAINTAINER is deprecated \u2014 use a LABEL instead, e.g. LABEL maintainer="you@example.com".' });
    }

    if (instruction === "FROM") {
      seenFrom = true;
      const image = args.split(/\s+AS\s+/i)[0].trim();
      if (!image.includes(":") && !image.includes("@sha256:")) {
        issues.push({ severity: "warning", line: lineNo, message: `FROM "${image}" has no tag \u2014 it will default to :latest. Pin an explicit version for reproducible builds.` });
      } else if (/:latest$/.test(image)) {
        issues.push({ severity: "warning", line: lineNo, message: `FROM "${image}" uses the "latest" tag \u2014 pin an explicit version for reproducible builds.` });
      }
    } else if (!seenFrom && instruction !== "ARG") {
      issues.push({ severity: "error", line: lineNo, message: `${instruction} appears before any FROM instruction.` });
    }

    if (instruction === "ADD" && !/https?:\/\//i.test(args) && !/\.(tar|tar\.gz|tgz|tar\.bz2|zip)(\s|$)/i.test(args)) {
      issues.push({ severity: "info", line: lineNo, message: "ADD is being used for a plain local file/directory \u2014 prefer COPY unless you need ADD's URL-fetching or archive-extraction behavior." });
    }

    if (instruction === "USER") seenUser = true;

    if (instruction === "RUN" && /apt-get install/i.test(args) && !/apt-get update/i.test(args)) {
      issues.push({ severity: "warning", line: lineNo, message: "apt-get install without a preceding apt-get update in the same RUN \u2014 combine them to avoid using a stale/cached package index." });
    }
    if (instruction === "RUN" && /apt-get install/i.test(args) && !/rm -rf \/var\/lib\/apt\/lists/i.test(args)) {
      issues.push({ severity: "info", line: lineNo, message: "Consider cleaning up with \"rm -rf /var/lib/apt/lists/*\" in the same RUN to keep the image smaller." });
    }

    if ((instruction === "CMD" || instruction === "ENTRYPOINT") && !/^\s*\[/.test(args)) {
      issues.push({ severity: "info", line: lineNo, message: `${instruction} uses shell form \u2014 exec form (e.g. ${instruction} ["executable", "arg"]) avoids an extra shell process and handles signals correctly.` });
    }

    if (instruction === "WORKDIR" && !args.startsWith("/") && !args.startsWith("$")) {
      issues.push({ severity: "warning", line: lineNo, message: `WORKDIR "${args}" should be an absolute path.` });
    }

    if (instruction === "EXPOSE" && !/^\d+(\/(tcp|udp))?(\s+\d+(\/(tcp|udp))?)*$/.test(args.trim())) {
      issues.push({ severity: "warning", line: lineNo, message: `EXPOSE "${args}" doesn't look like a valid port (e.g. "8080" or "8080/tcp").` });
    }

    if ((instruction === "ENV" || instruction === "ARG") && SECRET_ENV_PATTERN.test(args)) {
      issues.push({ severity: "warning", line: lineNo, message: `${instruction} "${args}" looks like it may hold a secret \u2014 secrets baked into ${instruction === "ARG" ? "build args" : "image layers"} can be extracted from the image. Use BuildKit secrets or runtime environment variables instead.` });
    }

  });

  if (!seenFrom) {
    issues.unshift({ severity: "error", message: "No FROM instruction found \u2014 every Dockerfile must start with a base image." });
  }
  if (seenFrom && !seenUser) {
    issues.push({ severity: "info", message: "No USER instruction found \u2014 the container will run as root by default. Consider adding a non-root USER for better security." });
  }

  return issues;
}
