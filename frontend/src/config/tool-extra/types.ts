import type { FaqItem } from "@/components/faq-section";

export interface ToolExtraContent {
  /** Short paragraphs shown under "About the tool": what it is, when to use it, a concrete example. */
  about: string[];
  /** Appended after the tool's existing FAQ entries. */
  faq: FaqItem[];
}
