"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { decodeHtmlEntities } from "@/lib/html-utils";

const SAMPLE_ENTITIES = `&lt;p&gt;Caf&#233; &amp; &quot;The DevToolbox&quot; &mdash; 100% free &hearts;&lt;/p&gt;`;

export function HtmlDecoderTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: decodeHtmlEntities(input) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_ENTITIES}
      convert={convert}
      inputLabel="HTML-encoded text"
      outputLabel="Decoded output"
      inputPlaceholder="Paste HTML entities here to decode them..."
      outputPlaceholder="Decoded plain text will appear here."
      downloadFilename="decoded.txt"
      downloadMimeType="text/plain"
    />
  );
}
