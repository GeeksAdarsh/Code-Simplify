import type { FaqItem } from "@/components/faq-section";

export interface GuideToolRef {
  categorySlug: string;
  slug: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs. */
  list?: string[];
  /** Optional code sample shown after the paragraphs and list. */
  code?: { language: string; content: string };
}

export interface Guide {
  /** URL slug, e.g. "fix-json-parse-errors" → /guides/fix-json-parse-errors */
  slug: string;
  /** Visible H1. */
  title: string;
  /** Browser-tab and Google title, under ~65 characters. */
  seoTitle: string;
  /** Meta description and listing summary, 140–160 characters. */
  description: string;
  /** ISO date, e.g. "2026-10-14". */
  updated: string;
  readMinutes: number;
  /** Tools this guide links to; the first one is the main call to action. */
  tools: GuideToolRef[];
  sections: GuideSection[];
  faq?: FaqItem[];
}
