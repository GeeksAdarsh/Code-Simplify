import Link from "next/link";
import { categories, getLiveCategories, siteConfig, toolHref } from "@/config/tools";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "All tools", href: "/categories" },
  { label: "Favorites", href: "/favorites" },
];

const featuredCategorySlugs = ["json", "xml", "csv", "sql"];

const communityLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "X / Twitter", href: "https://x.com/AdarshKuma84627", external: true },
  { label: "Buy me a coffee", href: "/support" },
];

export function SiteFooter() {
  const featured = getLiveCategories().slice(0, 6);
  const featuredCategories = featuredCategorySlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is (typeof categories)[number] => Boolean(c));

  return (
    <footer className="border-t border-border">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-6">
        {featured.map((category) => (
          <div key={category.slug}>
            <h3 className="mb-3 text-sm font-semibold">
              <Link href={`/${category.slug}`} className="hover:underline">
                {category.icon} {category.title}
              </Link>
            </h3>
            <ul className="space-y-2">
              {category.tools.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={toolHref(category.slug, tool.slug)}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page grid grid-cols-2 gap-8 border-t border-border py-12 sm:grid-cols-4">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Company</h3>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Resources</h3>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Categories</h3>
          <ul className="space-y-2">
            {featuredCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link) =>
              link.external ? (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All tools run free, forever.
        </p>
        <Link href="/categories" className="hover:text-foreground">
          Browse all {getLiveCategories().reduce((n, c) => n + c.tools.length, 0)}+ tools
        </Link>
      </div>
    </footer>
  );
}
