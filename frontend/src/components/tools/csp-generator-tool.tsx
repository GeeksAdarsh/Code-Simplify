"use client";

import { useMemo, useState } from "react";
import { buildCsp, type CspDirective } from "@/lib/csp-utils";

const LABELS: Partial<Record<CspDirective, string>> = {
  "default-src": "default-src (fallback for all resource types)",
  "script-src": "script-src (JavaScript)",
  "style-src": "style-src (CSS)",
  "img-src": "img-src (images)",
  "font-src": "font-src",
  "connect-src": "connect-src (fetch/XHR/WebSocket)",
  "media-src": "media-src (audio/video)",
  "object-src": "object-src (plugins/embeds)",
  "frame-src": "frame-src (iframes)",
  "frame-ancestors": "frame-ancestors (who can embed this page)",
  "worker-src": "worker-src",
  "manifest-src": "manifest-src",
  "form-action": "form-action",
  "base-uri": "base-uri",
};

const COMMON_DIRECTIVES: CspDirective[] = [
  "default-src",
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "connect-src",
  "frame-src",
  "frame-ancestors",
  "object-src",
  "form-action",
  "base-uri",
];

const KEYWORD_CHIPS = ["'self'", "'none'", "'unsafe-inline'", "'unsafe-eval'", "data:", "https:"];

export function CspGeneratorTool() {
  const [values, setValues] = useState<Partial<Record<CspDirective, string>>>({
    "default-src": "'self'",
    "script-src": "'self'",
    "style-src": "'self'",
    "img-src": "'self' data:",
  });
  const [upgradeInsecure, setUpgradeInsecure] = useState(true);
  const [copied, setCopied] = useState(false);

  const header = useMemo(
    () => buildCsp({ ...values, "upgrade-insecure-requests": upgradeInsecure ? "1" : "" }),
    [values, upgradeInsecure]
  );

  function setDirective(directive: CspDirective, value: string) {
    setValues((prev) => ({ ...prev, [directive]: value }));
  }

  function appendKeyword(directive: CspDirective, keyword: string) {
    setValues((prev) => {
      const current = prev[directive] ?? "";
      return { ...prev, [directive]: current ? `${current} ${keyword}` : keyword };
    });
  }

  function copy() {
    navigator.clipboard.writeText(header);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid gap-4">
        {COMMON_DIRECTIVES.map((directive) => (
          <div key={directive}>
            <label className="mb-1 block text-xs text-muted">{LABELS[directive] ?? directive}</label>
            <div className="flex gap-2">
              <input
                value={values[directive] ?? ""}
                onChange={(e) => setDirective(directive, e.target.value)}
                placeholder="'self' https://cdn.example.com"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
              />
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {KEYWORD_CHIPS.map((kw) => (
                <button
                  key={kw}
                  onClick={() => appendKeyword(directive, kw)}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted hover:text-foreground"
                >
                  + {kw}
                </button>
              ))}
            </div>
          </div>
        ))}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={upgradeInsecure} onChange={(e) => setUpgradeInsecure(e.target.checked)} className="accent-foreground" />
          Add upgrade-insecure-requests
        </label>
      </div>

      <div className="mt-6 card p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Content-Security-Policy</span>
          <button onClick={copy} className="font-medium text-foreground">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="break-all p-3 font-mono text-sm">{header || "\u2014"}</p>
      </div>
    </div>
  );
}
