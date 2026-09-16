import Image from "next/image";
import Link from "next/link";
import { ToolSearch } from "@/components/tool-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/tools";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight">
          <Image
            src="/site-mark.png"
            alt={`${siteConfig.name} logo`}
            width={28}
            height={28}
            className="h-7 w-7 rounded"
            priority
            unoptimized
          />
          {siteConfig.name}
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <ToolSearch />
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/categories" className="hidden text-muted transition-colors hover:text-foreground sm:inline">
            All Tools
          </Link>
          <Link href="/favorites" className="hidden text-muted transition-colors hover:text-foreground sm:inline">
            &#9733; Favorites
          </Link>
          <Link href="/json/formatter" className="btn btn-primary">
            JSON Formatter
          </Link>
          <ThemeToggle />
        </nav>
      </div>
      <div className="border-t border-border px-4 py-2 md:hidden">
        <ToolSearch />
      </div>
    </header>
  );
}
