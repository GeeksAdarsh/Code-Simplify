import Link from "next/link";
import { categories, siteConfig, toolHref } from "@/config/tools";

export function SiteFooter() {
  const featured = categories.slice(0, 6);

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
      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All tools run free, forever.
        </p>
        <Link href="/categories" className="hover:text-foreground">
          Browse all {categories.reduce((n, c) => n + c.tools.length, 0)}+ tools
        </Link>
      </div>
    </footer>
  );
}
