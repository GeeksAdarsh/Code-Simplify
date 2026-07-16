import type { FaqItem } from "@/components/faq-section";

export interface ToolContent {
  howToUse: string[];
  features: string[];
  faq: FaqItem[];
}

export const toolContent: Record<string, ToolContent> = {
  "json/formatter": {
    howToUse: [
      "Paste or type your raw, minified, or messy JSON into the input box on the left.",
      "The formatter automatically validates and beautifies it in real time \u2014 no button required.",
      "Choose 2 spaces, 4 spaces, or tabs for indentation, and optionally sort object keys alphabetically.",
      "Copy the formatted result or download it as a .json file.",
    ],
    features: [
      "Runs 100% in your browser \u2014 your JSON never leaves your device.",
      "Instant validation with precise line and column error reporting.",
      "Customizable indentation: 2 spaces, 4 spaces, or tabs.",
      "One-click minify to compress JSON for production use.",
      "Optional alphabetical key sorting for consistent diffs.",
      "Free, unlimited, and works on any device \u2014 no sign-up required.",
    ],
    faq: [
      {
        question: "Is this JSON formatter free to use?",
        answer:
          "Yes. The JSON Formatter on DevToolbox is completely free with no usage limits, sign-up, or watermarks.",
      },
      {
        question: "Is my JSON data uploaded to a server?",
        answer:
          "No. All formatting and validation happens locally in your browser using JavaScript. Your data is never sent over the network, making it safe to use with sensitive or private JSON.",
      },
      {
        question: "Can I format very large JSON files?",
        answer:
          "Yes, the formatter can handle large JSON documents. Since parsing happens in your browser, performance depends on your device, but typical API responses and config files format instantly.",
      },
      {
        question: "What's the difference between formatting and minifying?",
        answer:
          "Formatting (beautifying) adds indentation and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to produce the smallest possible file size, ideal for production APIs.",
      },
      {
        question: "How do I fix a JSON syntax error?",
        answer:
          "If your JSON is invalid, the tool shows the exact line and column of the first error. Common issues include trailing commas, unquoted keys, single quotes instead of double quotes, and missing brackets.",
      },
    ],
  },
};

export function getToolContent(categorySlug: string, toolSlug: string): ToolContent | undefined {
  return toolContent[`${categorySlug}/${toolSlug}`];
}
