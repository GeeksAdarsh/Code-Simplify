import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/tools";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FAQ — Privacy, Pricing and How the Tools Work",
  description: `Frequently asked questions about ${siteConfig.name} — pricing, privacy, data handling, and more.`,
  alternates: { canonical: "/faq" },
};

const faq = [
  {
    question: `Is ${siteConfig.name} really free?`,
    answer:
      "Yes. Every tool is completely free to use, with no sign-up, no usage limits, and no watermarks. There are no paid tiers.",
  },
  {
    question: "Do you store or upload the data I paste into a tool?",
    answer:
      "No. All processing happens locally in your browser using JavaScript. Your data is never sent to our servers, which makes the tools safe to use with private or sensitive content.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account or sign-up is required for any tool on the site.",
  },
  {
    question: "Can I use these tools for commercial projects?",
    answer:
      "Yes, all tools are free for both personal and commercial use. See our Terms & Conditions for full details.",
  },
  {
    question: "How do I request a new tool?",
    answer:
      "Email us at adarshsinghzaq12@gmail.com with what you'd like the tool to do. New tools ship regularly.",
  },
  {
    question: "I found a bug — how do I report it?",
    answer: "Please email adarshsinghzaq12@gmail.com with a description of the issue and, if possible, the input that caused it.",
  },
  {
    question: "Do you use cookies or analytics?",
    answer:
      "We use privacy-respecting analytics (Google Analytics, Microsoft Clarity) to understand aggregate usage, and may show ads to help fund free access to the tools. See our Privacy Policy for full details.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h1>
      <p className="mt-2 text-muted">
        Can't find what you're looking for?{" "}
        <Link href="/contact" className="font-medium text-foreground underline">
          Contact us
        </Link>
        .
      </p>
      <div className="mt-8">
        <FaqSection items={faq} />
      </div>
    </div>
  );
}
