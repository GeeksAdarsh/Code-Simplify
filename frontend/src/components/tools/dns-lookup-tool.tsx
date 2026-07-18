"use client";

import { useState } from "react";
import { fetchDnsRecords, type DnsRecord } from "@/lib/network-api";
import { DataTable } from "@/components/tools/shared/data-table";

const RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA", "CAA"];

export function DnsLookupTool() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [records, setRecords] = useState<DnsRecord[] | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function runLookup() {
    const trimmed = domain.trim();
    if (!trimmed) return;
    setPending(true);
    setError(undefined);
    try {
      const result = await fetchDnsRecords(trimmed, type);
      setRecords(result.records);
    } catch (e) {
      setRecords(undefined);
      setError(e instanceof Error ? e.message : "Lookup failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[220px] flex-1">
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
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Record type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {RECORD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button onClick={runLookup} disabled={!domain.trim() || pending} className="btn btn-primary h-9 px-4 text-sm">
          {pending ? "Looking up..." : "Lookup"}
        </button>
      </div>

      {error && <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">{error}</div>}

      {records && (
        <div className="mt-4 rounded-xl border border-border">
          {records.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted">
              No {type} records found for this domain.
            </p>
          ) : (
            <DataTable
              headers={["Type", "Name", "TTL", "Value"]}
              rows={records.map((r) => [r.type, r.name, `${r.ttl}s`, r.value])}
            />
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        DNS resolution is performed server-side by the CodeSimplify backend (browsers can&apos;t make raw DNS queries)
        and requires the backend server to be running.
      </p>
    </div>
  );
}
