import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig, toolHref, getLiveCategories } from "@/config/tools";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse every free online developer tool on ${siteConfig.name}, organized by category: JSON, XML, YAML, SQL, security, text, and more.`,
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const categories = getLiveCategories();

  return (
    <div className="container-page py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Tools",
          description: metadata.description,
          url: `${siteConfig.url}/categories`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: categories.map((category, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${category.title} Tools`,
              url: `${siteConfig.url}/${category.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "All Tools", item: `${siteConfig.url}/categories` },
          ],
        }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">All tools</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Every tool on {siteConfig.name}, organized by category. New tools ship regularly &mdash; bookmark this
        page.
      </p>

      <div className="mt-10 space-y-12">
        {categories.map((category) => (
          <section key={category.slug} id={category.slug}>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-lg font-semibold">
                <Link href={`/${category.slug}`} className="hover:underline">
                  {category.title}
                </Link>
              </h2>
              <span className="text-xs text-muted">{category.tools.length} tools</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={toolHref(category.slug, tool.slug)}
                  className="badge gap-1.5 rounded-lg px-3 py-1.5 text-xs font-normal normal-case tracking-normal transition-colors hover:border-foreground hover:bg-surface"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
