import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/tools";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="badge">404</span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or may have moved. It might have been a typo, or an
        outdated link.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary h-11 px-6">
          Go to homepage
        </Link>
        <Link href="/categories" className="btn btn-secondary h-11 px-6">
          Browse all tools
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for something specific? Try the search bar above, or{" "}
        <Link href="/contact" className="font-medium text-foreground underline">
          let {siteConfig.name} know
        </Link>{" "}
        what you were trying to find.
      </p>
    </div>
  );
}
