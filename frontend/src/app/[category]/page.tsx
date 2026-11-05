import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getLiveCategories, siteConfig, toolHref, type Category } from "@/config/tools";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolCard } from "@/components/tool-card";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return getLiveCategories().map((c) => ({ category: c.slug }));
}

/** Google shows about 60 characters; the layout appends " | CodeSimplify". */
const MAX_TITLE = 48;

const CATEGORY_TITLES: Record<string, string> = {
  security: "Security Tools — Base64, Hash, JWT, Password",
  ids: "UUID & ID Generators — UUID v4, v7, GUID, Nano ID",
  javascript: "JavaScript Tools — Formatter, Minifier, Playground",
  typescript: "TypeScript Tools — Formatter, Playground, to JS",
  networking: "Network Tools — DNS, WHOIS, IP Lookup, Subnet",
  colors: "Color Tools — Picker, HEX to RGB, Palettes",
  "date-time": "Date & Time Tools — Timestamp, Age, Cron",
  text: "Text Tools — Word Counter, Case Converter, Diff",
  numbers: "Number Tools — Percentage, Unit & Base Converters",
  webdev: "Web Dev Tools — HTTP Status, MIME, CSP, CORS",
  "random-generators": "Random Generators — Names, Addresses, Cards",
  fun: "Fun Random Generators — Movies, Food, Animals",
  "decision-tools": "Decision Tools — Spin Wheel, Coin Flip, Dice",
  "currency-calculators": "Gold & Silver Price Calculators Online",
  "business-calculators": "Business Calculators — GST Invoice, Margin, VAT",
  "personal-finance-calculators": "Personal Finance Calculators — Budget, Debt",
};

function categoryPageTitle(category: Category): string {
  if (CATEGORY_TITLES[category.slug]) return CATEGORY_TITLES[category.slug];
  const base = /(Tools|Calculators|Generators)$/.test(category.title) ? category.title : `${category.title} Tools`;
  const prefix = `${base} Online — `;
  const names: string[] = [];
  for (const tool of category.tools.filter((t) => t.status === "live")) {
    const short = tool.title
      .replace(new RegExp(`^${category.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i"), "")
      .replace(/\s+Calculator$/, "");
    if ((prefix + [...names, short].join(", ")).length > MAX_TITLE) break;
    names.push(short);
  }
  return names.length > 0 ? prefix + names.join(", ") : `Free Online ${base}`;
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
    title: categoryPageTitle(category),
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
