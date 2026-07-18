"use client";

import { useEffect, useState } from "react";
import { buildVCardString, generateQrDataUrl, type VCardFields } from "@/lib/qr-barcode-utils";
import { QrPreview } from "@/components/tools/shared/qr-preview";

const FIELD_DEFS: { key: keyof VCardFields; label: string; placeholder: string }[] = [
  { key: "firstName", label: "First name", placeholder: "Jane" },
  { key: "lastName", label: "Last name", placeholder: "Doe" },
  { key: "organization", label: "Organization", placeholder: "CodeSimplify Inc." },
  { key: "title", label: "Job title", placeholder: "Software Engineer" },
  { key: "phone", label: "Phone", placeholder: "+1 555 123 4567" },
  { key: "email", label: "Email", placeholder: "jane@example.com" },
  { key: "website", label: "Website", placeholder: "https://example.com" },
  { key: "address", label: "Address", placeholder: "123 Main St, City, Country" },
];

export function VCardQrTool() {
  const [fields, setFields] = useState<VCardFields>({
    firstName: "Jane",
    lastName: "Doe",
    organization: "CodeSimplify Inc.",
    title: "Software Engineer",
    phone: "+1 555 123 4567",
    email: "jane@example.com",
    website: "",
    address: "",
  });
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const vCard = buildVCardString(fields);

  useEffect(() => {
    if (!fields.firstName.trim() && !fields.lastName.trim()) {
      setDataUrl(null);
      return;
    }
    let cancelled = false;
    generateQrDataUrl(vCard).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [vCard, fields.firstName, fields.lastName]);

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_320px]">
      <div className="grid gap-3 sm:grid-cols-2">
        {FIELD_DEFS.map((def) => (
          <label key={def.key} className="block text-xs">
            <span className="mb-1 block text-muted">{def.label}</span>
            <input
              value={fields[def.key] ?? ""}
              onChange={(e) => setFields((prev) => ({ ...prev, [def.key]: e.target.value }))}
              placeholder={def.placeholder}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
            />
          </label>
        ))}
      </div>

      <QrPreview dataUrl={dataUrl} filename="vcard-qr-code.png" />
    </div>
  );
}
