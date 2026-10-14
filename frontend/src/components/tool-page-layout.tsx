import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { FavoriteButton } from "@/components/favorite-button";
import { RecentToolTracker } from "@/components/recent-tool-tracker";
import { ShareLinkButton, ToolShare, ToolShareRoot } from "@/components/tool-share";
import { JsonLd } from "@/components/json-ld";
import type { Category, Tool } from "@/config/tools";
import { siteConfig, toolHref } from "@/config/tools";
import { getGuidesForTool } from "@/config/guide-utils";
import { getCrossCategoryTools, getSameCategoryTools, type RelatedTool } from "@/lib/related-tools";

interface ToolPageLayoutProps {
  category: Category;
  tool: Tool;
  /** The interactive tool widget, or undefined for a "coming soon" placeholder */
  children?: ReactNode;
  about?: string[];
  howToUse?: string[];
  features?: string[];
  faq?: FaqItem[];
}

function RelatedToolList({ heading, tools }: { heading: string; tools: RelatedTool[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-muted">{heading}</h2>
      <ul className="mt-4 space-y-2">
        {tools.map((t) => (
          <li key={`${t.categorySlug}/${t.slug}`}>
            <Link href={toolHref(t.categorySlug, t.slug)} className="text-sm hover:underline">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ToolPageLayout({
  category,
  tool,
  children,
  about,
  howToUse,
  features,
  faq,
}: ToolPageLayoutProps) {
  const relatedTools = getSameCategoryTools(category.slug, tool.slug);
  const crossTools = getCrossCategoryTools(category.slug, tool.title);
  const toolGuides = getGuidesForTool(category.slug, tool.slug);
  const toolUrl = `${siteConfig.url}${toolHref(category.slug, tool.slug)}`;

  return (
    <ToolShare>
    <div className="container-tool py-8">
      <RecentToolTracker categorySlug={category.slug} slug={tool.slug} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.title,
          description: tool.description,
          url: toolUrl,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any (runs in browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            {
              "@type": "ListItem",
              position: 2,
              name: category.title,
              item: `${siteConfig.url}/${category.slug}`,
            },
            { "@type": "ListItem", position: 3, name: tool.title, item: toolUrl },
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { label: category.title, href: `/${category.slug}` },
          { label: tool.title },
        ]}
      />

      <div className="mt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{tool.title}</h1>
            <FavoriteButton categorySlug={category.slug} slug={tool.slug} size="lg" className="mt-1" />
          </div>
          <ShareLinkButton />
        </div>
        <p className="mt-2 max-w-2xl text-muted">{tool.description}</p>
      </div>

      <ToolShareRoot>
        {children ?? (
          <div className="card flex flex-col items-center gap-3 py-16 text-center">
            <span className="badge">Coming soon</span>
            <p className="max-w-sm text-sm text-muted">
              The {tool.title} tool is on our roadmap and will launch soon. In the meantime, try the{" "}
              <Link href="/json/formatter" className="font-medium text-foreground underline">
                JSON Formatter
              </Link>
              .
            </p>
          </div>
        )}
      </ToolShareRoot>

      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {about && about.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">About the {tool.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {about.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {howToUse && howToUse.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">How to use the {tool.title}</h2>
              <ol className="mt-4 space-y-3">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {features && features.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">Why use this {tool.title.toLowerCase()}?</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-muted">
                    <span className="text-foreground">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {faq && faq.length > 0 && <FaqSection items={faq} toolName={tool.title} />}
        </div>

        <aside className="space-y-10">
          {relatedTools.length > 0 && (
            <div>
              <RelatedToolList heading={`More ${category.title} tools`} tools={relatedTools} />
              <Link
                href={`/${category.slug}`}
                className="mt-4 inline-block text-sm font-medium text-foreground hover:underline"
              >
                {`View all ${category.title} tools`} &rarr;
              </Link>
            </div>
          )}

          {crossTools.length > 0 && <RelatedToolList heading="Related tools" tools={crossTools} />}

          {toolGuides.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted">Guides</h2>
              <ul className="mt-4 space-y-2">
                {toolGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="text-sm hover:underline">
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
    </ToolShare>
  );
}
