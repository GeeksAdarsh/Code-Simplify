import type { Metadata } from "next";
import { siteConfig } from "@/config/tools";

const CONTACT_EMAIL = "adarshsinghzaq12@gmail.com";

export const metadata: Metadata = {
  title: "Contact Us — Feedback, Bugs and Tool Requests",
  description: `Get in touch with the ${siteConfig.name} team — report a bug, request a tool, or ask a question.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          Have a bug to report, a tool to request, feedback on {siteConfig.name}, or a business inquiry? Reach
          out any time &mdash; every message is read.
        </p>
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 inline-block text-lg font-medium text-foreground underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <p>We typically respond within a few days. For tool requests, please include what you'd like it to do and, if possible, a link to a similar tool elsewhere.</p>
      </div>
    </div>
  );
}
