"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllTools, toolHref } from "@/config/tools";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const allTools = useMemo(() => getAllTools().filter((t) => t.status === "live"), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allTools
      .filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.categoryTitle.toLowerCase().includes(q) ||
          t.keywords?.some((k) => k.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, allTools]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted shrink-0"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search 200+ tools..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-lg border border-border bg-background shadow-lg">
          {results.map((t) => (
            <Link
              key={`${t.categorySlug}-${t.slug}`}
              href={toolHref(t.categorySlug, t.slug)}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 text-sm last:border-b-0 hover:bg-surface"
            >
              <span>
                <span className="font-medium">{t.title}</span>
                <span className="ml-2 text-xs text-muted">{t.categoryTitle}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
