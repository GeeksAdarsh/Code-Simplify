"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { decodeUrl } from "@/lib/base64-utils";

const SAMPLE_TEXT = "https%3A%2F%2Fcodesimplify.example.com%2Fsearch%3Fq%3Djson%20formatter%20%26%20validator";

export function UrlDecodeTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = decodeUrl(input, true);
    return { output: result.output, error: result.error };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="URL-encoded input"
      outputLabel="Decoded text"
      inputPlaceholder="Paste percent-encoded text here to decode it..."
      outputPlaceholder="Decoded output will appear here."
      downloadFilename="decoded.txt"
      downloadMimeType="text/plain"
    />
  );
}
