"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { encodeBase64 } from "@/lib/base64-utils";

const SAMPLE_TEXT = `CodeSimplify makes it easy to encode text to Base64 \u2014 works with emoji too: \u{1F680}`;

export function Base64EncodeTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = encodeBase64(input);
    return { output: result.output, error: result.error };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="Plain text"
      outputLabel="Base64 output"
      inputPlaceholder="Type or paste text here to encode it to Base64..."
      outputPlaceholder="Base64-encoded output will appear here."
      downloadFilename="encoded.txt"
      downloadMimeType="text/plain"
    />
  );
}
