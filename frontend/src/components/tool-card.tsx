import Link from "next/link";
import type { ReactNode } from "react";
import { FavoriteButton } from "@/components/favorite-button";

interface ToolCardProps {
  href: string;
  categorySlug: string;
  slug: string;
  title: string;
  description: string;
  /** Shown above the title on favorites cards */
  categoryLabel?: string;
  /** Optional trailing icon/content inside the card header row */
  trailing?: ReactNode;
  favoritePosition?: "left" | "right";
}

/**
 * Tool listing card with a favorite button kept outside the main link so hover,
 * focus, and click behavior stay predictable (no nested interactive elements).
 */
export function ToolCard({
  href,
  categorySlug,
  slug,
  title,
  description,
  categoryLabel,
  trailing,
  favoritePosition = "right",
}: ToolCardProps) {
  const favoriteOnLeft = favoritePosition === "left";
  const contentPad = favoriteOnLeft ? "pl-8" : "pr-8";

  return (
    <article className="card group relative p-5 transition-colors hover:border-foreground">
      <FavoriteButton
        categorySlug={categorySlug}
        slug={slug}
        className={`absolute top-5 z-20 ${favoriteOnLeft ? "left-5" : "right-5"}`}
      />
      <Link
        href={href}
        className="block rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        {(categoryLabel || trailing) && (
          <div className={`mb-2 flex items-center justify-between gap-2 ${contentPad}`}>
            {categoryLabel ? (
              <span className="text-xs font-medium uppercase tracking-wide text-muted">{categoryLabel}</span>
            ) : (
              <span />
            )}
            {trailing}
          </div>
        )}
        <h3 className={`font-medium ${contentPad}`}>{title}</h3>
        <p className={`mt-1 line-clamp-2 text-sm text-muted ${contentPad}`}>{description}</p>
      </Link>
    </article>
  );
}
