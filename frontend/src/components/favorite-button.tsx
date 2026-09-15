"use client";

import { useFavorites } from "@/lib/use-favorites";

interface FavoriteButtonProps {
  categorySlug: string;
  slug: string;
  className?: string;
  size?: "sm" | "lg";
}

export function FavoriteButton({ categorySlug, slug, className, size = "sm" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  const active = mounted && isFavorite(categorySlug, slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(categorySlug, slug);
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      title={active ? "Remove from favorites" : "Add to favorites"}
      className={`leading-none transition-colors ${size === "lg" ? "text-2xl" : "text-lg"} ${
        active ? "text-foreground" : "text-muted hover:text-foreground"
      } ${className ?? ""}`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
