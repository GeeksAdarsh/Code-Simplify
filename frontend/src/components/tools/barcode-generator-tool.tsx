"use client";

import { useEffect, useState } from "react";
import { BARCODE_FORMATS, generateBarcodeDataUrl, type BarcodeFormatId } from "@/lib/qr-barcode-utils";
import { QrPreview } from "@/components/tools/shared/qr-preview";

export function BarcodeGeneratorTool() {
  const [value, setValue] = useState("123456789012");
  const [format, setFormat] = useState<BarcodeFormatId>("CODE128");
  const [displayValue, setDisplayValue] = useState(true);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value.trim()) {
      setDataUrl(null);
      setError(null);
      return;
    }
    let cancelled = false;
    generateBarcodeDataUrl(value, format, { displayValue })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setDataUrl(null);
          setError(err instanceof Error ? err.message : "Invalid value for this barcode format.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [value, format, displayValue]);

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Value to encode</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Barcode format</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as BarcodeFormatId)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {BARCODE_FORMATS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} />
          Show text below barcode
        </label>

        <p className="text-xs text-muted">
          EAN-13, EAN-8, UPC-A, and ITF-14 require an exact number of digits (12-14 depending on format) and a valid checksum
          digit is calculated automatically for most formats.
        </p>
      </div>

      <QrPreview dataUrl={dataUrl} filename="barcode.png" error={error} />
    </div>
  );
}
