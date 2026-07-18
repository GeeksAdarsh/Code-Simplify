"use client";

import { useEffect, useState } from "react";
import { generateQrDataUrl, type QrOptions } from "@/lib/qr-barcode-utils";
import { QrPreview } from "@/components/tools/shared/qr-preview";

export function QrGeneratorTool() {
  const [text, setText] = useState("https://codesimplify.com");
  const [level, setLevel] = useState<QrOptions["errorCorrectionLevel"]>("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl(null);
      setError(null);
      return;
    }
    let cancelled = false;
    generateQrDataUrl(text, { errorCorrectionLevel: level })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not generate a QR code for this input.");
      });
    return () => {
      cancelled = true;
    };
  }, [text, level]);

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_320px]">
      <div>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Text, URL, or any content</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a URL, text, or any content to encode..."
            spellCheck={false}
            className="h-32 w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-foreground"
          />
        </label>

        <label className="mt-4 block text-xs">
          <span className="mb-1 block text-muted">Error correction level</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as QrOptions["errorCorrectionLevel"])}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            <option value="L">Low (7% recovery)</option>
            <option value="M">Medium (15% recovery)</option>
            <option value="Q">Quartile (25% recovery)</option>
            <option value="H">High (30% recovery)</option>
          </select>
        </label>
        <p className="mt-3 text-xs text-muted">
          Higher error correction lets the QR code still scan even if it&apos;s partially damaged or obscured, at the cost of a
          denser pattern.
        </p>
      </div>

      <QrPreview dataUrl={dataUrl} filename="qr-code.png" error={error} />
    </div>
  );
}
