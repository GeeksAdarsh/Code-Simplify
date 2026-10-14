import type { Metadata } from "next";
import { siteConfig, getAllTools } from "@/config/tools";

const KOFI_URL = "https://ko-fi.com/codesimplify";

export const metadata: Metadata = {
  title: "Support Us",
  description: `Support ${siteConfig.name} — help keep every developer tool free, ad-light, and running.`,
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  const totalTools = getAllTools().filter((t) => t.status === "live").length;

  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Support {siteConfig.name}</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          {siteConfig.name}{" "}is free, has no sign-up, and runs every tool locally in your browser &mdash; no
          ads-for-data tradeoffs, no premium tier holding features back. Keeping it that way costs real money:
          server hosting, a domain, and the time spent building and maintaining {totalTools}+ tools.
        </p>
        <p>
          If {siteConfig.name} has saved you time, the best way to support it is a small one-time or recurring
          contribution on Ko-fi. Every bit helps keep the site fast, free, and growing.
        </p>
      </div>

      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary mt-8 h-11 px-6"
      >
        &#9749; Buy me a coffee on Ko-fi
      </a>

      <div className="mt-10 space-y-2 text-sm text-muted">
        <p className="font-medium text-foreground">Other ways to help, for free:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Share {siteConfig.name} with a teammate who could use it.</li>
          <li>
            Send tool requests or bug reports to{" "}
            <a href="mailto:adarshsinghzaq12@gmail.com" className="font-medium text-foreground underline">
              adarshsinghzaq12@gmail.com
            </a>
            .
          </li>
          <li>Upvote or mention it if you see it on Product Hunt, Reddit, or X.</li>
        </ul>
      </div>
    </div>
  );
}
