"use client";

import { useMemo, useState } from "react";
import { validateK8sManifests } from "@/lib/k8s-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
`;

export function K8sYamlValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? validateK8sManifests(input) : null), [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Kubernetes manifest (YAML, supports multiple --- documents)</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your Kubernetes YAML manifest(s) here..."
          spellCheck={false}
          className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4 space-y-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Paste a manifest above to validate it.</div>}
        {result &&
          result.docs.map((doc) => (
            <div key={doc.index}>
              <p className="mb-2 text-sm font-medium">
                Document {doc.index + 1}
                {doc.kind && <span className="text-muted"> &mdash; {doc.kind}{doc.name ? ` "${doc.name}"` : ""}</span>}
              </p>
              <LintResults issues={doc.issues} validLabel="Valid" />
            </div>
          ))}
      </div>
    </div>
  );
}
