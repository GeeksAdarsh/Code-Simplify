"use client";

import { useCallback, useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { encodeUrl } from "@/lib/base64-utils";

const SAMPLE_TEXT = "https://codesimplify.example.com/search?q=json formatter & validator";

export function UrlEncodeTool() {
  const [fullUrl, setFullUrl] = useState(false);

  const convert = useCallback(
    (input: string): ConvertResult => {
      const result = encodeUrl(input, !fullUrl);
      return { output: result.output, error: result.error };
    },
    [fullUrl]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="Plain text"
      outputLabel="URL-encoded output"
      inputPlaceholder="Type or paste text or a URL here to percent-encode it..."
      outputPlaceholder="URL-encoded output will appear here."
      downloadFilename="encoded.txt"
      downloadMimeType="text/plain"
      toolbarExtra={
        <label className="flex items-center gap-1.5 text-xs text-muted">
          <input type="checkbox" checked={fullUrl} onChange={(e) => setFullUrl(e.target.checked)} className="accent-foreground" />
          Encode as full URL (keep :/?#)
        </label>
      }
    />
  );
}
