import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { guides } from "@/config/guides";
import { getCategory, siteConfig } from "@/config/tools";

export const metadata: Metadata = {
  title: "Guides — Practical Explanations for Developers",
  description: `Step-by-step guides from ${siteConfig.name}: fix JSON errors, understand JWT, Base64, hashing, EMI and SIP maths, CSS layouts, and more.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Guides</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Short, practical explanations of the formats, algorithms, and formulas behind our tools, with
        examples you can try straight away.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const topic = getCategory(guide.tools[0]?.categorySlug ?? "")?.title;
          return (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="card group flex h-full flex-col p-5 transition-colors hover:border-foreground"
              >
                {topic && (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">{topic}</span>
                )}
                <h2 className="mt-2 font-medium leading-snug">{guide.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{guide.description}</p>
                <span className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                  {`${guide.readMinutes} min read`}
                  <span className="font-medium text-foreground group-hover:underline">Read guide &rarr;</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
