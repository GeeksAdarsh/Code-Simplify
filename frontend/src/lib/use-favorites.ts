"use client";

import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "cs-favorite-tools";
const FAVORITES_EVENT = "cs-favorites-changed";

export interface FavoriteRef {
  categorySlug: string;
  slug: string;
}

function isFavoriteRef(value: unknown): value is FavoriteRef {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    typeof (value as FavoriteRef).categorySlug === "string" &&
    typeof (value as FavoriteRef).slug === "string"
  );
}

function readFavorites(): FavoriteRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isFavoriteRef);
  } catch {
    return [];
  }
}

function writeFavorites(favorites: FavoriteRef[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

/** Favorite tools are stored client-side only (localStorage), so `mounted`
 * lets callers avoid rendering favorite state until after hydration. */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRef[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setMounted(true);
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFavorite = useCallback(
    (categorySlug: string, slug: string) =>
      favorites.some((f) => f.categorySlug === categorySlug && f.slug === slug),
    [favorites]
  );

  const toggleFavorite = useCallback((categorySlug: string, slug: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.categorySlug === categorySlug && f.slug === slug);
      const next = exists
        ? prev.filter((f) => !(f.categorySlug === categorySlug && f.slug === slug))
        : [...prev, { categorySlug, slug }];
      writeFavorites(next);
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite, mounted };
}
