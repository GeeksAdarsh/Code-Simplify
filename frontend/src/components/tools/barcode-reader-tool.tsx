"use client";

import { DecodeUpload } from "@/components/tools/shared/decode-upload";

export function BarcodeReaderTool() {
  return (
    <div>
      <DecodeUpload accept="image/*" />
      <p className="mt-4 text-xs text-muted">
        Supports Code 128, Code 39, Code 93, Codabar, EAN-8/13, UPC-A/E, ITF, and more. Decoding happens entirely on-device
        {" "}{"\u2014"} nothing is sent to a server.
      </p>
    </div>
  );
}
