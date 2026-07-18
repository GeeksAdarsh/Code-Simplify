"use client";

import { useState } from "react";
import { decodeImageDataUrl, readFileAsDataUrl, type DecodedResult } from "@/lib/qr-barcode-utils";

export function DecodeUpload({ accept = "image/*" }: { accept?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DecodedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleFile(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPreview(dataUrl);
      const decoded = await decodeImageDataUrl(dataUrl);
      setResult(decoded);
    } catch {
      setError("Could not detect a code in this image. Try a clearer, higher-contrast photo.");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const isUrl = result ? /^https?:\/\//i.test(result.text.trim()) : false;

  return (
    <div>
      <label className="block cursor-pointer rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted hover:border-foreground">
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        Click to choose an image, or drag one here
      </label>

      {preview && (
        <div className="mt-4 grid gap-4 sm:grid-cols-[200px_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element -- local data-URL preview of the uploaded file */}
          <img src={preview} alt="Uploaded" className="w-full rounded-lg border border-border" style={{ maxHeight: 200, objectFit: "contain" }} />
          <div className="card p-4">
            {loading ? (
              <p className="text-sm text-muted">Decoding...</p>
            ) : error ? (
              <p className="text-sm text-muted">{error}</p>
            ) : result ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="badge">{result.format}</span>
                  <button onClick={copy} className="text-xs font-medium">
                    {copied ? "Copied!" : "Copy text"}
                  </button>
                </div>
                <p className="mt-3 break-all font-mono text-sm">{result.text}</p>
                {isUrl && (
                  <a href={result.text} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs underline">
                    Open link {"\u2192"}
                  </a>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
