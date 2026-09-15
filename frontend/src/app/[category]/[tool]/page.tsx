import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLiveCategories, getTool, siteConfig, toolHref } from "@/config/tools";
import { ToolWidget } from "@/config/tool-widgets";
import { getToolContent } from "@/config/tool-content";
import { ToolPageLayout } from "@/components/tool-page-layout";

export function generateStaticParams() {
  return getLiveCategories().flatMap((category) =>
    category.tools.map((tool) => ({ category: category.slug, tool: tool.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, tool: toolSlug } = await params;
  const found = getTool(categorySlug, toolSlug);
  if (!found?.category || found.tool.status !== "live") return {};
  const { tool, category } = found;
  const canonical = toolHref(category.slug, tool.slug);
  const title = `${tool.title} — Free Online ${category.title} Tool`;

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical },
    keywords: tool.keywords,
    openGraph: {
      title,
      description: tool.description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: `${siteConfig.name} logo` }],
    },
    twitter: {
      card: "summary",
      title,
      description: tool.description,
      images: ["/logo.png"],
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category: categorySlug, tool: toolSlug } = await params;
  const found = getTool(categorySlug, toolSlug);
  if (!found?.category || found.tool.status !== "live") notFound();
  const { tool, category } = found;

  const content = getToolContent(category.slug, tool.slug);

  return (
    <ToolPageLayout
      category={category}
      tool={tool}
      howToUse={content?.howToUse}
      features={content?.features}
      faq={content?.faq}
    >
      <ToolWidget categorySlug={category.slug} toolSlug={tool.slug} />
    </ToolPageLayout>
  );
}
