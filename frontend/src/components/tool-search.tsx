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
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const trimmedQuery = query.trim();
  const showPanel = open && trimmedQuery.length > 0;

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
          type="search"
          placeholder={`Search ${allTools.length}+ tools...`}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          autoComplete="off"
        />
      </div>
      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 pt-1">
          <div
            id="tool-search-results"
            className="max-h-96 overflow-auto rounded-lg border border-border bg-background shadow-lg"
          >
            {results.length > 0 ? (
              results.map((t) => (
                <Link
                  key={`${t.categorySlug}-${t.slug}`}
                  href={toolHref(t.categorySlug, t.slug)}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-surface"
                >
                  <span>
                    <span className="font-medium">{t.title}</span>
                    <span className="ml-2 text-xs text-muted">{t.categoryTitle}</span>
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-3 py-2.5 text-sm text-muted">No tools found for &ldquo;{trimmedQuery}&rdquo;</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
