import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, toolHref } from "@/config/tools";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
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
  if (!category) notFound();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: category.title }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        <h1 className="text-3xl font-semibold tracking-tight">{category.title} Tools</h1>
      </div>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.tools.map((tool) => (
          <Link
            key={tool.slug}
            href={toolHref(category.slug, tool.slug)}
            className="card p-5 transition-colors hover:border-foreground"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className={`badge ${tool.status === "live" ? "border-foreground text-foreground" : ""}`}>
                {tool.status === "live" ? "Live" : "Coming soon"}
              </span>
            </div>
            <h2 className="font-medium">{tool.title}</h2>
            <p className="mt-1 text-sm text-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
