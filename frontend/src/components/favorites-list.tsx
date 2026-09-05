"use client";

import Link from "next/link";
import { getAllTools, toolHref } from "@/config/tools";
import { useFavorites } from "@/lib/use-favorites";
import { ToolCard } from "@/components/tool-card";

export function FavoritesList() {
  const { favorites, mounted } = useFavorites();
  const allTools = getAllTools();
  const favoriteTools = favorites
    .map((f) => allTools.find((t) => t.categorySlug === f.categorySlug && t.slug === f.slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined && t.status === "live");

  if (!mounted) return null;

  if (favoriteTools.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-3xl text-muted">&#9734;</span>
        <p className="max-w-sm text-sm text-muted">
          You haven&apos;t favorited any tools yet. Click the star icon on any tool page to save it here for
          next time.
        </p>
        <Link href="/categories" className="btn btn-primary mt-2">
          Browse all tools
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteTools.map((t) => (
        <ToolCard
          key={`${t.categorySlug}-${t.slug}`}
          href={toolHref(t.categorySlug, t.slug)}
          categorySlug={t.categorySlug}
          slug={t.slug}
          title={t.title}
          description={t.description}
          categoryLabel={t.categoryTitle}
        />
      ))}
    </div>
  );
}
