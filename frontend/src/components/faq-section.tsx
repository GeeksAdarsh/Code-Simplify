export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  items,
  toolName,
  heading,
}: {
  items: FaqItem[];
  toolName?: string;
  heading?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const resolvedHeading = heading ?? (toolName ? `Frequently asked questions about the ${toolName}` : null);

  return (
    <section aria-labelledby={resolvedHeading ? "faq-heading" : undefined}>
      {resolvedHeading && (
        <h2 id="faq-heading" className="text-xl font-semibold">
          {resolvedHeading}
        </h2>
      )}
      <div className="mt-4 divide-y divide-border border-t border-border">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {item.question}
              <span className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
