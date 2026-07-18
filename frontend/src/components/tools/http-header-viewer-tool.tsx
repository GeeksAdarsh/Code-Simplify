"use client";

import { useState } from "react";
import { fetchHttpHeaders, type HttpHeaderResult } from "@/lib/network-api";
import { DataTable } from "@/components/tools/shared/data-table";

export function HttpHeaderViewerTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<HttpHeaderResult | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function runFetch() {
    const trimmed = url.trim();
    if (!trimmed) return;
    setPending(true);
    setError(undefined);
    try {
      const res = await fetchHttpHeaders(trimmed);
      setResult(res);
    } catch (e) {
      setResult(undefined);
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[260px] flex-1">
          <label className="mb-1 block text-xs font-medium text-muted">URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runFetch()}
            placeholder="https://example.com"
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
        <button onClick={runFetch} disabled={!url.trim() || pending} className="btn btn-primary h-9 px-4 text-sm">
          {pending ? "Fetching..." : "Fetch headers"}
        </button>
      </div>

      {error && <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">{error}</div>}

      {result && (
        <div className="mt-4">
          <div className="card flex flex-wrap items-center gap-4 p-4">
            <span className="text-2xl font-bold">{result.statusCode}</span>
            <span className="text-sm text-muted">{result.statusText}</span>
            {result.redirectLocation && (
              <span className="text-sm">
                Redirects to: <span className="font-mono text-muted">{result.redirectLocation}</span>
              </span>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-border">
            <DataTable headers={["Header", "Value"]} rows={result.headers.map((h) => [h.name, h.value])} />
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Headers are fetched server-side by the CodeSimplify backend (browsers can&apos;t read cross-origin response
        headers due to CORS) and requires the backend server to be running. Redirects are shown but never followed
        automatically.
      </p>
    </div>
  );
}
