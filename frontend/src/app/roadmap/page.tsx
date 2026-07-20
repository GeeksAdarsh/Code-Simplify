import type { Metadata } from "next";
import { siteConfig, getAllTools } from "@/config/tools";

export const metadata: Metadata = {
  title: "Roadmap",
  description: `What's shipped and what's coming next for ${siteConfig.name}.`,
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  const allTools = getAllTools();
  const live = allTools.filter((t) => t.status === "live").length;
  const upcoming = allTools.filter((t) => t.status === "soon");

  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Roadmap</h1>
      <p className="mt-2 text-muted">
        {siteConfig.name} ships new tools regularly. Here's what's live today and what's coming next.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold">Shipped</h2>
          <p className="mt-2 text-sm text-muted">{live}+ tools are live and free to use across every category.</p>
        </section>

        {upcoming.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold">Coming soon</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {upcoming.slice(0, 20).map((tool) => (
                <li key={tool.slug} className="flex items-center gap-2 text-sm text-muted">
                  <span className="badge">Soon</span>
                  {tool.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold">Have a suggestion?</h2>
          <p className="mt-2 text-sm text-muted">
            We prioritize the roadmap based on what people actually ask for. Email{" "}
            <a href="mailto:adarshsinghzaq12@gmail.com" className="font-medium text-foreground underline">
              adarshsinghzaq12@gmail.com
            </a>{" "}
            with a tool idea.
          </p>
        </section>
      </div>
    </div>
  );
}
