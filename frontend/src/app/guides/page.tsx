import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { guides } from "@/config/guides";
import { siteConfig } from "@/config/tools";

export const metadata: Metadata = {
  title: "Guides — Practical Explanations for Developers",
  description: `Step-by-step guides from ${siteConfig.name}: fix JSON errors, understand JWT, Base64, hashing, EMI and SIP maths, CSS layouts, and more.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="container-page max-w-4xl py-8">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Guides</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Short, practical explanations of the formats, algorithms, and formulas behind our tools, with
        examples you can try straight away.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="card block h-full transition-colors hover:border-foreground/30">
              <h2 className="font-semibold">{guide.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{guide.description}</p>
              <p className="mt-3 text-xs text-muted">{guide.readMinutes} min read</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
