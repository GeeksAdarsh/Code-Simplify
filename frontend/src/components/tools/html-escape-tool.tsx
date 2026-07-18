"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { escapeHtml } from "@/lib/html-utils";

const SAMPLE_TEXT = `<div class="card" data-id="42">Tom & Jerry's "Adventures"</div>`;

export function HtmlEscapeTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: escapeHtml(input) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_TEXT}
      convert={convert}
      inputLabel="Raw text"
      outputLabel="Escaped output"
      inputPlaceholder="Type or paste text here to escape HTML special characters..."
      outputPlaceholder="Escaped output (&amp; &lt; &gt; &quot; &#39;) will appear here."
      downloadFilename="escaped.txt"
      downloadMimeType="text/plain"
    />
  );
}
