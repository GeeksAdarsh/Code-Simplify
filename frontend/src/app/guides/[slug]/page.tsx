import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { guides } from "@/config/guides";
import { getGuide } from "@/config/guide-utils";
import { getTool, siteConfig, toolHref } from "@/config/tools";
import { ORGANIZATION_ID, SITE_LOGO, WEBSITE_ID } from "@/lib/schema";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const canonical = `/guides/${guide.slug}`;
  return {
    title: guide.seoTitle.length > 50 ? { absolute: guide.seoTitle } : guide.seoTitle,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: guide.seoTitle,
      description: guide.description,
      url: canonical,
      siteName: siteConfig.name,
      type: "article",
      modifiedTime: guide.updated,
    },
    twitter: { card: "summary", title: guide.seoTitle, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const tools = guide.tools
    .map((ref) => {
      const found = getTool(ref.categorySlug, ref.slug);
      return found?.category && found.tool.status === "live"
        ? { href: toolHref(ref.categorySlug, ref.slug), title: found.tool.title, description: found.tool.description }
        : undefined;
    })
    .filter((t): t is NonNullable<typeof t> => t !== undefined);
  const [mainTool] = tools;
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 4);
  const url = `${siteConfig.url}/guides/${guide.slug}`;

  return (
    <div className="container-page py-10">
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: guide.title,
          description: guide.description,
          datePublished: guide.updated,
          dateModified: guide.updated,
          url,
          mainEntityOfPage: url,
          inLanguage: "en",
          image: SITE_LOGO,
          author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: siteConfig.name, url: siteConfig.url },
          publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: siteConfig.name, logo: SITE_LOGO },
          isPartOf: { "@id": WEBSITE_ID },
          ...(mainTool ? { mentions: tools.map((t) => ({ "@type": "WebApplication", name: t.title, url: `${siteConfig.url}${t.href}` })) } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
            { "@type": "ListItem", position: 3, name: guide.title, item: url },
          ],
        }}
      />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]} />

      <article className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{guide.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {`Updated ${new Date(guide.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · ${guide.readMinutes} min read`}
        </p>
        <p className="mt-4 text-muted">{guide.description}</p>

        {mainTool && (
          <Link href={mainTool.href} className="card mt-6 flex items-center justify-between gap-4 p-5 transition-colors hover:border-foreground">
            <span>
              <span className="block font-semibold">{`Try the ${mainTool.title}`}</span>
              <span className="mt-1 block line-clamp-2 text-sm text-muted">{mainTool.description}</span>
            </span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <div className="mt-10 space-y-10">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
                  <code>{section.code.content}</code>
                </pre>
              )}
            </section>
          ))}
        </div>

        {guide.faq && guide.faq.length > 0 && (
          <div className="mt-12">
            <FaqSection items={guide.faq} heading="Frequently asked questions" />
          </div>
        )}
      </article>

      {tools.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-semibold">Tools used in this guide</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="card block h-full p-5 transition-colors hover:border-foreground">
                  <span className="block font-medium">{tool.title}</span>
                  <span className="mt-1 block line-clamp-2 text-sm text-muted">{tool.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">More guides</h2>
          <ul className="mt-4 space-y-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-sm hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/guides" className="mt-4 inline-block text-sm font-medium hover:underline">
            All guides &rarr;
          </Link>
        </section>
      )}
    </div>
    </div>
  );
}
