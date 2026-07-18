"use client";

import { useMemo, useState } from "react";
import { findHttpStatus } from "@/lib/http-status-data";

export function HttpStatusLookupTool() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findHttpStatus(query), [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code (e.g. 404) or name (e.g. not found)..."
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />

      <div className="mt-4 divide-y divide-border rounded-lg border border-border">
        {results.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">No matching status codes.</p>}
        {results.map((s) => (
          <div key={s.code} className="flex items-start gap-4 px-4 py-3">
            <span className="w-14 shrink-0 font-mono text-lg font-semibold">{s.code}</span>
            <div>
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-0.5 text-xs text-muted">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
