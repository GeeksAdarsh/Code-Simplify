"use client";

import { useMemo, useState } from "react";
import { findPortsByQuery } from "@/lib/port-data";

export function PortLookupTool() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findPortsByQuery(query), [query]);

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Search by port number or service name</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 443, ssh, database..."
          spellCheck={false}
          className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-4 max-h-[32rem] overflow-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="sticky top-0 border-b border-border bg-surface text-left text-xs text-muted">
              <th className="px-3 py-2 font-medium">Port</th>
              <th className="px-3 py-2 font-medium">Protocol</th>
              <th className="px-3 py-2 font-medium">Service</th>
              <th className="px-3 py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((p) => (
              <tr key={`${p.port}-${p.service}`} className="border-b border-border last:border-b-0">
                <td className="px-3 py-2 font-mono">{p.port}</td>
                <td className="px-3 py-2 text-muted">{p.protocol}</td>
                <td className="px-3 py-2 font-medium">{p.service}</td>
                <td className="px-3 py-2 text-muted">{p.description}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-sm text-muted">
                  No matching ports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted">
        This is a static reference table of well-known and commonly used ports \u2014 it does not scan or probe any
        live host.
      </p>
    </div>
  );
}
