/**
 * Renders a JSON-LD <script> tag for structured data (schema.org). Search
 * engines parse this to power rich results (FAQ accordions, breadcrumbs,
 * sitelinks) without changing anything visible on the page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
