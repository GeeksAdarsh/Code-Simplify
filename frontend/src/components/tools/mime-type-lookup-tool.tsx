"use client";

import { useMemo, useState } from "react";
import { findMimeByQuery } from "@/lib/mime-data";

export function MimeTypeLookupTool() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findMimeByQuery(query), [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by file extension (.png) or MIME type (image/png)..."
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />

      <div className="mt-4 divide-y divide-border rounded-lg border border-border">
        {results.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">No matching MIME types.</p>}
        {results.map((m) => (
          <div key={m.extension} className="flex items-center justify-between gap-4 px-4 py-2.5">
            <span className="w-20 shrink-0 font-mono text-sm font-medium">{m.extension}</span>
            <span className="flex-1 font-mono text-sm text-muted">{m.mimeType}</span>
            <span className="hidden text-xs text-muted sm:block">{m.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
