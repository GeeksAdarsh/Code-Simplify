"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { buildCorsHeaders, corsWarnings } from "@/lib/cors-utils";

export function CorsHeaderGeneratorTool() {
  const [origins, setOrigins] = useState("https://myapp.example.com");
  const [methods, setMethods] = useState("GET, POST, PUT, DELETE, OPTIONS");
  const [headers, setHeaders] = useState("Content-Type, Authorization");
  const [exposedHeaders, setExposedHeaders] = useState("");
  const [credentials, setCredentials] = useState(false);
  const [maxAge, setMaxAge] = useState("86400");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => buildCorsHeaders({ origins, methods, headers, credentials, maxAge, exposedHeaders }),
    [origins, methods, headers, credentials, maxAge, exposedHeaders]
  );
  const warnings = useMemo(
    () => corsWarnings({ origins, methods, headers, credentials, maxAge, exposedHeaders }),
    [origins, methods, headers, credentials, maxAge, exposedHeaders]
  );

  const headerText = result.map((h) => `${h.name}: ${h.value}`).join("\n");

  function copy() {
    navigator.clipboard.writeText(headerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Allowed origin(s) &mdash; one per line, or * for any</span>
          <CodeEditor value={origins} onChange={setOrigins} language="plaintext" height="4.5rem" className="rounded border border-border" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Allowed methods</span>
          <input value={methods} onChange={(e) => setMethods(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Allowed headers</span>
          <input value={headers} onChange={(e) => setHeaders(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Exposed headers (optional)</span>
          <input value={exposedHeaders} onChange={(e) => setExposedHeaders(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Max age (seconds)</span>
          <input value={maxAge} onChange={(e) => setMaxAge(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground" />
        </label>
        <label className="flex items-center gap-2 self-end pb-1.5 text-sm">
          <input type="checkbox" checked={credentials} onChange={(e) => setCredentials(e.target.checked)} className="accent-foreground" />
          Allow credentials (cookies/auth headers)
        </label>
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((w) => (
            <div key={w} className="card border-foreground/30 px-4 py-2.5 text-sm text-muted">
              {w}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 card p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Response headers</span>
          <button onClick={copy} className="font-medium text-foreground">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <CodeEditor value={headerText} readOnly language="plaintext" height="10rem" />
      </div>
    </div>
  );
}
