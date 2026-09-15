"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { encodeHtmlEntities } from "@/lib/html-utils";

const SAMPLE_TEXT = `<p>Café & "The CodeSimplify" — 100% free ♥</p>`;

export function HtmlEncoderTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: encodeHtmlEntities(input) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="Plain text"
      outputLabel="HTML-encoded output"
      inputPlaceholder="Type or paste text here to encode special characters..."
      outputPlaceholder="HTML-entity-encoded output will appear here."
      downloadFilename="encoded.html"
      downloadMimeType="text/plain"
    />
  );
}
