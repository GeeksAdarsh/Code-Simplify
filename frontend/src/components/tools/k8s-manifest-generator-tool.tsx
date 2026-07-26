"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import {
  generateConfigMapYaml,
  generateDeploymentYaml,
  generateSecretYaml,
  generateServiceYaml,
  type K8sKind,
} from "@/lib/k8s-utils";

const KINDS: { value: K8sKind; label: string }[] = [
  { value: "Deployment", label: "Deployment" },
  { value: "Service", label: "Service" },
  { value: "ConfigMap", label: "ConfigMap" },
  { value: "Secret", label: "Secret" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 block text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground";

export function K8sManifestGeneratorTool() {
  const [kind, setKind] = useState<K8sKind>("Deployment");

  const [name, setName] = useState("my-app");
  const [namespace, setNamespace] = useState("");

  const [image, setImage] = useState("nginx:1.27");
  const [replicas, setReplicas] = useState(2);
  const [containerPort, setContainerPort] = useState(80);
  const [envVars, setEnvVars] = useState("NODE_ENV=production");

  const [selectorApp, setSelectorApp] = useState("my-app");
  const [port, setPort] = useState(80);
  const [targetPort, setTargetPort] = useState(80);
  const [serviceType, setServiceType] = useState<"ClusterIP" | "NodePort" | "LoadBalancer">("ClusterIP");

  const [entries, setEntries] = useState("KEY=value");

  const [copied, setCopied] = useState(false);

  const yaml = useMemo(() => {
    try {
      switch (kind) {
        case "Deployment":
          return generateDeploymentYaml({ name, namespace, image, replicas, containerPort, envVars });
        case "Service":
          return generateServiceYaml({ name, namespace, selectorApp, port, targetPort, type: serviceType });
        case "ConfigMap":
          return generateConfigMapYaml({ name, namespace, entries });
        case "Secret":
          return generateSecretYaml({ name, namespace, entries });
      }
    } catch {
      return "";
    }
  }, [kind, name, namespace, image, replicas, containerPort, envVars, selectorApp, port, targetPort, serviceType, entries]);

  const copy = () => {
    navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-0 rounded-xl border border-border sm:grid-cols-2">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:border-b-0 sm:border-r">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Resource kind</span>
          <select value={kind} onChange={(e) => setKind(e.target.value as K8sKind)} className={inputClass}>
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Namespace (optional)">
            <input value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="default" className={inputClass} />
          </Field>
        </div>

        {kind === "Deployment" && (
          <>
            <Field label="Container image">
              <input value={image} onChange={(e) => setImage(e.target.value)} className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Replicas">
                <input type="number" min={1} value={replicas} onChange={(e) => setReplicas(Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="Container port">
                <input type="number" min={1} value={containerPort} onChange={(e) => setContainerPort(Number(e.target.value))} className={inputClass} />
              </Field>
            </div>
            <Field label="Environment variables (KEY=value per line)">
              <CodeEditor value={envVars} onChange={setEnvVars} language="plaintext" height="6rem" />
            </Field>
          </>
        )}

        {kind === "Service" && (
          <>
            <Field label="Pod selector label (app=)">
              <input value={selectorApp} onChange={(e) => setSelectorApp(e.target.value)} className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Service port">
                <input type="number" min={1} value={port} onChange={(e) => setPort(Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="Target port">
                <input type="number" min={1} value={targetPort} onChange={(e) => setTargetPort(Number(e.target.value))} className={inputClass} />
              </Field>
            </div>
            <Field label="Service type">
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value as typeof serviceType)} className={inputClass}>
                <option value="ClusterIP">ClusterIP</option>
                <option value="NodePort">NodePort</option>
                <option value="LoadBalancer">LoadBalancer</option>
              </select>
            </Field>
          </>
        )}

        {(kind === "ConfigMap" || kind === "Secret") && (
          <Field label="Data entries (KEY=value per line)">
            <CodeEditor value={entries} onChange={setEntries} language="plaintext" height="9rem" />
          </Field>
        )}
        {kind === "Secret" && (
          <p className="text-xs text-muted">Values are base64-encoded automatically, matching the Secret manifest format. Base64 is encoding, not encryption &mdash; don&apos;t commit real secrets to version control.</p>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Generated manifest</span>
          <button onClick={copy} className="font-medium text-foreground">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <CodeEditor value={yaml} readOnly language="yaml" height="24rem" />
      </div>
    </div>
  );
}
