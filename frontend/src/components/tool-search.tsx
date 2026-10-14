"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getAllTools, getTool, toolHref } from "@/config/tools";
import { readRecentTools, subscribeRecentTools, type RecentToolRef } from "@/lib/recent-tools";

type SearchItem = {
  categorySlug: string;
  slug: string;
  title: string;
  categoryTitle: string;
};

export function ToolSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentRefs, setRecentRefs] = useState<RecentToolRef[]>([]);
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

  const recentTools = useMemo(() => {
    return recentRefs
      .map((ref) => {
        const found = getTool(ref.categorySlug, ref.slug);
        if (!found?.category || found.tool.status !== "live") return undefined;
        return {
          categorySlug: ref.categorySlug,
          slug: ref.slug,
          title: found.tool.title,
          categoryTitle: found.category.title,
        } satisfies SearchItem;
      })
      .filter((t): t is SearchItem => Boolean(t));
  }, [recentRefs]);

  const trimmedQuery = query.trim();
  const showingRecent = trimmedQuery.length === 0;
  const items: SearchItem[] = showingRecent ? recentTools : results;
  const showPanel = open && (trimmedQuery.length > 0 || recentTools.length > 0);

  useEffect(() => {
    setRecentRefs(readRecentTools());
    return subscribeRecentTools(() => setRecentRefs(readRecentTools()));
  }, []);

  useEffect(() => {
    const item = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, items]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      const isShortcut = (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k";
      if (isShortcut) {
        const input = inputRef.current;
        if (!input || input.getClientRects().length === 0) return;
        e.preventDefault();
        input.focus();
        input.select();
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function openResult(index: number) {
    const tool = items[index];
    if (!tool) return;
    setOpen(false);
    setQuery("");
    router.push(toolHref(tool.categorySlug, tool.slug));
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showPanel || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      openResult(activeIndex);
    }
  }

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
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onInputKeyDown}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-activedescendant={showPanel && items[activeIndex] ? `${listId}-option-${activeIndex}` : undefined}
          placeholder={`Search ${allTools.length}+ tools...`}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          autoComplete="off"
        />
        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted md:inline">
          Ctrl K
        </kbd>
      </div>
      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 pt-1">
          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={showingRecent ? "Recent tools" : "Search results"}
            className="max-h-96 overflow-auto rounded-lg border border-border bg-background shadow-lg"
          >
            {showingRecent && (
              <p className="border-b border-border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                Recent
              </p>
            )}
            {items.length > 0 ? (
              items.map((t, index) => (
                <Link
                  key={`${t.categorySlug}-${t.slug}`}
                  id={`${listId}-option-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  href={toolHref(t.categorySlug, t.slug)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-surface ${
                    index === activeIndex ? "bg-surface" : ""
                  }`}
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
            <p className="border-t border-border px-3 py-1.5 text-[11px] text-muted">↑↓ move · Enter open · Esc close</p>
          </div>
        </div>
      )}
    </div>
  );
}
