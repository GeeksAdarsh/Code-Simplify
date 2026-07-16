import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import type { Category, Tool } from "@/config/tools";
import { toolHref } from "@/config/tools";

interface ToolPageLayoutProps {
  category: Category;
  tool: Tool;
  /** The interactive tool widget, or undefined for a "coming soon" placeholder */
  children?: ReactNode;
  howToUse?: string[];
  features?: string[];
  faq?: FaqItem[];
}

export function ToolPageLayout({
  category,
  tool,
  children,
  howToUse,
  features,
  faq,
}: ToolPageLayoutProps) {
  const relatedTools = category.tools.filter((t) => t.slug !== tool.slug).slice(0, 6);

  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: category.title, href: `/${category.slug}` },
          { label: tool.title },
        ]}
      />

      <div className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{tool.title}</h1>
        <p className="mt-2 max-w-2xl text-muted">{tool.description}</p>
      </div>

      <div className="mt-8">
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
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
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

        <aside>
          <h2 className="text-sm font-semibold text-muted">More {category.title} tools</h2>
          <ul className="mt-4 space-y-2">
            {relatedTools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={toolHref(category.slug, t.slug)}
                  className="flex items-center justify-between gap-2 text-sm hover:underline"
                >
                  {t.title}
                  {t.status === "soon" && <span className="badge shrink-0">Soon</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/${category.slug}`}
            className="mt-4 inline-block text-sm font-medium text-foreground hover:underline"
          >
            View all {category.title} tools &rarr;
          </Link>
        </aside>
      </div>
    </div>
  );
}
