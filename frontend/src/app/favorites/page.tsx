import type { Metadata } from "next";
import { FavoritesList } from "@/components/favorites-list";

export const metadata: Metadata = {
  title: "Your Favorite Tools",
  description: "Tools you have starred, saved locally in your browser for quick access next time.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your Favorite Tools</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Star any tool and it will show up here instantly. Favorites are saved locally in your browser, so
        they&apos;ll be waiting for you next time you visit &mdash; no account needed.
      </p>
      <FavoritesList />
    </div>
  );
}
