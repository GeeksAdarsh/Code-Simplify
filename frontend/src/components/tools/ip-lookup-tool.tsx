"use client";

import { useState } from "react";
import { fetchIpLookup, type IpLookupResult } from "@/lib/network-api";

export function IpLookupTool() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<IpLookupResult | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function runLookup() {
    const trimmed = ip.trim();
    if (!trimmed) return;
    setPending(true);
    setError(undefined);
    try {
      const res = await fetchIpLookup(trimmed);
      setResult(res);
    } catch (e) {
      setResult(undefined);
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[220px] flex-1">
          <label className="mb-1 block text-xs font-medium text-muted">IP address</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runLookup()}
            placeholder="8.8.8.8"
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
        <button onClick={runLookup} disabled={!ip.trim() || pending} className="btn btn-primary h-9 px-4 text-sm">
          {pending ? "Looking up..." : "Lookup"}
        </button>
      </div>

      {error && <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">{error}</div>}

      {result && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard label="IP" value={result.query ?? ip} />
          <InfoCard label="Country" value={joinNonEmpty([result.country, result.countryCode && `(${result.countryCode})`])} />
          <InfoCard label="Region" value={result.regionName ?? "\u2014"} />
          <InfoCard label="City" value={result.city ?? "\u2014"} />
          <InfoCard label="ZIP / postal code" value={result.zip || "\u2014"} />
          <InfoCard label="Timezone" value={result.timezone ?? "\u2014"} />
          <InfoCard label="Coordinates" value={result.lat !== undefined && result.lon !== undefined ? `${result.lat}, ${result.lon}` : "\u2014"} />
          <InfoCard label="ISP" value={result.isp ?? "\u2014"} />
          <InfoCard label="Organization" value={result.org ?? "\u2014"} />
          <InfoCard label="AS / Network" value={result.as ?? "\u2014"} />
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Geolocation lookups are performed server-side by the CodeSimplify backend and require the backend server to be
        running. Results are approximate (city/ISP-level) and provided for informational purposes only.
      </p>
    </div>
  );
}

function joinNonEmpty(parts: (string | undefined | false)[]): string {
  const filtered = parts.filter(Boolean) as string[];
  return filtered.length ? filtered.join(" ") : "\u2014";
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 break-all font-mono text-sm">{value}</p>
    </div>
  );
}
