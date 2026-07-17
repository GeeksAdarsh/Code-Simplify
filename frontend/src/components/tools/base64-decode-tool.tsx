"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { decodeBase64 } from "@/lib/base64-utils";

const SAMPLE_TEXT =
  "RGV2VG9vbGJveCBtYWtlcyBpdCBlYXN5IHRvIGRlY29kZSBCYXNlNjQgYmFjayB0byByZWFkYWJsZSB0ZXh0Lg==";

export function Base64DecodeTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = decodeBase64(input);
    return { output: result.output, error: result.error };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="Base64 input"
      outputLabel="Decoded text"
      inputPlaceholder="Paste Base64-encoded text here to decode it..."
      outputPlaceholder="Decoded output will appear here."
      downloadFilename="decoded.txt"
      downloadMimeType="text/plain"
    />
  );
}
