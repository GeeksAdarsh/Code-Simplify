import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig, toolHref, getAllTools, getLiveCategories, getFeaturedTools } from "@/config/tools";
import { FavoriteButton } from "@/components/favorite-button";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const CATEGORY_PREVIEW_COUNT = 8;

export default function Home() {
  const allTools = getAllTools();
  const totalTools = allTools.filter((t) => t.status === "live").length;
  const liveCategories = getLiveCategories();
  const featuredTools = getFeaturedTools();

  return (
    <div>
      <section className="border-b border-border">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
          <span className="badge">{totalTools}+ tools &middot; 100% free &middot; runs in your browser</span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Every developer tool.
            <br />
            One toolbox.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            {siteConfig.name} is a fast, free collection of online tools for JSON, XML, YAML, SQL, security,
            text, and more &mdash; built for developers who value speed and privacy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/json/formatter" className="btn btn-primary h-11 px-6">
              Try JSON Formatter
            </Link>
            <Link href="/categories" className="btn btn-secondary h-11 px-6">
              Browse all tools
            </Link>
          </div>
        </div>
      </section>

      {featuredTools.length > 0 && (
        <section className="container-page py-12">
          <h2 className="mb-6 text-xl font-semibold">Popular tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((t) => (
              <Link
                key={`${t.categorySlug}-${t.slug}`}
                href={toolHref(t.categorySlug, t.slug)}
                className="card group p-5 transition-colors hover:border-foreground"
              >
                <div className="mb-2 flex items-center justify-between">
                  <FavoriteButton categorySlug={t.categorySlug} slug={t.slug} />
                  <span className="text-muted transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
                <h3 className="font-medium">{t.title}</h3>
                <p className="mt-1 text-sm text-muted">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Browse by category</h2>
          <Link href="/categories" className="text-sm text-muted hover:text-foreground">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveCategories.map((category) => {
            const preview = category.tools.slice(0, CATEGORY_PREVIEW_COUNT);
            const remaining = category.tools.length - preview.length;
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="card p-5 transition-colors hover:border-foreground"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-medium">{category.title}</h3>
                  <span className="ml-auto text-xs text-muted">{category.tools.length} tools</span>
                </div>
                <p className="text-sm text-muted">{category.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {preview.map((tool) => (
                    <li
                      key={tool.slug}
                      className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                    >
                      {tool.title}
                    </li>
                  ))}
                  {remaining > 0 && (
                    <li className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                      +{remaining} more
                    </li>
                  )}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
