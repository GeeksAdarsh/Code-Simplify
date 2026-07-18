"use client";

import { DecodeUpload } from "@/components/tools/shared/decode-upload";

export function QrScannerTool() {
  return (
    <div>
      <DecodeUpload accept="image/*" />
      <p className="mt-4 text-xs text-muted">
        Everything happens locally in your browser using the ZXing decoding engine {"\u2014"} your image is never uploaded to a
        server. Works with QR codes and most common 1D/2D barcode formats.
      </p>
    </div>
  );
}
