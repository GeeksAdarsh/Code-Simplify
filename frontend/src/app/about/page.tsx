import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, categories, getAllTools } from "@/config/tools";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}, a free collection of online developer tools that run entirely in your browser.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const totalTools = getAllTools().filter((t) => t.status === "live").length;

  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About {siteConfig.name}</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          {siteConfig.name} is a free collection of {totalTools}+ online developer tools &mdash; formatters,
          validators, converters, and generators for JSON, XML, YAML, CSV, SQL, security, and text. It was built
          to be the single place developers go for quick, everyday utilities instead of hunting across dozens of
          different sites.
        </p>
        <p>
          Every tool runs entirely client-side, in your browser. Nothing you paste or upload is sent to a
          server or stored anywhere &mdash; the JavaScript on the page does the work locally on your device.
          That makes {siteConfig.name} safe to use even with sensitive data like API responses, config files,
          or internal schemas.
        </p>
        <p>
          There's no sign-up, no paywall, and no artificial limits on file size or usage. The goal is simple:
          fast, reliable tools that just work, for free, forever.
        </p>
        <p>
          {siteConfig.name} is under active development, with new tools shipping regularly across{" "}
          {categories.length} categories. Have a tool you'd like to see added?{" "}
          <Link href="/contact" className="font-medium text-foreground underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
