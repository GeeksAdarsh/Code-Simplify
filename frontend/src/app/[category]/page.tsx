import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getLiveCategories, siteConfig, toolHref } from "@/config/tools";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolCard } from "@/components/tool-card";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return getLiveCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: `${category.title} Tools`,
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  const liveTools = category?.tools.filter((t) => t.status === "live") ?? [];
  if (!category || liveTools.length === 0) notFound();

  const categoryUrl = `${siteConfig.url}/${category.slug}`;

  return (
    <div className="container-page py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.title} Tools`,
          description: category.description,
          url: categoryUrl,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: liveTools.map((tool, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: tool.title,
              url: `${siteConfig.url}${toolHref(category.slug, tool.slug)}`,
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
            { "@type": "ListItem", position: 2, name: category.title, item: categoryUrl },
          ],
        }}
      />
      <Breadcrumbs items={[{ label: category.title }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        <h1 className="text-3xl font-semibold tracking-tight">{category.title} Tools</h1>
      </div>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liveTools.map((tool) => (
          <ToolCard
            key={tool.slug}
            href={toolHref(category.slug, tool.slug)}
            categorySlug={category.slug}
            slug={tool.slug}
            title={tool.title}
            description={tool.description}
          />
        ))}
      </div>
    </div>
  );
}
