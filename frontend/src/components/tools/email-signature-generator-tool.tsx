"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_SIGNATURE_FIELDS,
  generateSignatureHtml,
  generateSignatureText,
  type SignatureFields,
} from "@/lib/email-utils";

type FieldKey = keyof SignatureFields;

const TEXT_FIELDS: { key: FieldKey; label: string; placeholder: string }[] = [
  { key: "name", label: "Full name", placeholder: "Jordan Lee" },
  { key: "jobTitle", label: "Job title", placeholder: "Senior Software Engineer" },
  { key: "company", label: "Company", placeholder: "CodeSimplify Inc." },
  { key: "email", label: "Email", placeholder: "jordan.lee@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
  { key: "website", label: "Website", placeholder: "example.com" },
  { key: "address", label: "Address (optional)", placeholder: "123 Main St, San Francisco, CA" },
];

const SOCIAL_FIELDS: { key: FieldKey; label: string; placeholder: string }[] = [
  { key: "linkedin", label: "LinkedIn URL", placeholder: "linkedin.com/in/jordanlee" },
  { key: "twitter", label: "Twitter/X URL", placeholder: "x.com/jordanlee" },
  { key: "github", label: "GitHub URL", placeholder: "github.com/jordanlee" },
];

export function EmailSignatureGeneratorTool() {
  const [fields, setFields] = useState<SignatureFields>(DEFAULT_SIGNATURE_FIELDS);
  const [copied, setCopied] = useState<"html" | "text" | null>(null);

  const html = useMemo(() => generateSignatureHtml(fields), [fields]);
  const text = useMemo(() => generateSignatureText(fields), [fields]);

  function update(key: FieldKey, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function copy(kind: "html" | "text") {
    navigator.clipboard.writeText(kind === "html" ? html : text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Your details</h3>
        <div className="flex flex-col gap-3">
          {TEXT_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs text-muted">{f.label}</label>
              <input
                value={fields[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
            </div>
          ))}

          <h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">Social links (optional)</h3>
          {SOCIAL_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs text-muted">{f.label}</label>
              <input
                value={fields[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
            </div>
          ))}

          <h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">Appearance</h3>
          <div>
            <label className="mb-1 block text-xs text-muted">Logo/photo URL (optional)</label>
            <input
              value={fields.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
            />
            <p className="mt-1 text-xs text-muted">
              Must be a publicly hosted image URL \u2014 uploaded files can&apos;t be embedded directly in most email
              clients.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Accent color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fields.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-border bg-background"
              />
              <input
                value={fields.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-1.5 text-xs text-muted">Live preview</p>
          <div className="overflow-auto rounded-xl border border-border bg-white p-6">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>HTML signature</span>
            <button onClick={() => copy("html")} className="font-medium text-foreground">
              {copied === "html" ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap p-3 font-mono text-xs">{html}</pre>
        </div>

        <div className="flex flex-col rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Plain text fallback</span>
            <button onClick={() => copy("text")} className="font-medium text-foreground">
              {copied === "text" ? "Copied!" : "Copy text"}
            </button>
          </div>
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap p-3 font-mono text-xs">{text}</pre>
        </div>

        <p className="text-xs text-muted">
          Paste the HTML signature into your email client&apos;s signature settings (most clients let you paste rich
          text directly, or use &quot;Insert &gt; HTML&quot; if available). Generated entirely in your browser.
        </p>
      </div>
    </div>
  );
}
