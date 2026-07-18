"use client";

import { useState } from "react";
import { fetchWhois } from "@/lib/network-api";

export function WhoisLookupTool() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<{ whoisServer: string; rawText: string } | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);

  async function runLookup() {
    const trimmed = domain.trim();
    if (!trimmed) return;
    setPending(true);
    setError(undefined);
    try {
      const res = await fetchWhois(trimmed);
      setResult(res);
    } catch (e) {
      setResult(undefined);
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setPending(false);
    }
  }

  function handleCopy() {
    if (!result?.rawText) return;
    navigator.clipboard.writeText(result.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[240px] flex-1">
          <label className="mb-1 block text-xs font-medium text-muted">Domain name</label>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runLookup()}
            placeholder="example.com"
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
        <button onClick={runLookup} disabled={!domain.trim() || pending} className="btn btn-primary h-9 px-4 text-sm">
          {pending ? "Looking up..." : "Lookup"}
        </button>
      </div>

      {error && <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">{error}</div>}

      {result && (
        <div className="mt-4 flex flex-col rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Queried {result.whoisServer}</span>
            <button onClick={handleCopy} className="font-medium text-foreground">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap p-3 font-mono text-xs">{result.rawText}</pre>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        WHOIS is queried server-side over a raw socket by the CodeSimplify backend (browsers can&apos;t open raw TCP
        sockets) and requires the backend server to be running. Some registries return limited data for privacy
        reasons.
      </p>
    </div>
  );
}
