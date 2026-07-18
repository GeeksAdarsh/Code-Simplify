"use client";

import { useMemo, useState } from "react";
import { lintNginxConfig } from "@/lib/nginx-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = `server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }

    location /static/ {
        root /var/www/example;
    }
}
`;

export function NginxConfigTesterTool() {
  const [input, setInput] = useState("");

  const issues = useMemo(() => (input.trim() ? lintNginxConfig(input) : null), [input]);

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
          <span>nginx.conf</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your nginx configuration here..."
          spellCheck={false}
          className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4">
        {!issues && <div className="card px-4 py-3 text-sm text-muted">Paste an nginx config above to check it.</div>}
        {issues && <LintResults issues={issues} validLabel="Syntax looks valid" />}
        {issues && (
          <p className="mt-3 text-xs text-muted">
            This checks brace/semicolon syntax and common pitfalls in your browser. It doesn&apos;t replace running{" "}
            <code className="font-mono">nginx -t</code> against your actual nginx binary before deploying.
          </p>
        )}
      </div>
    </div>
  );
}
