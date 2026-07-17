"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { htmlToMarkdown } from "@/lib/markdown-utils";

const SAMPLE_HTML = `<h1>DevToolbox</h1>
<p>A <strong>fast</strong>, <em>free</em>, and privacy-friendly toolbox for developers.</p>
<h2>Features</h2>
<ul>
  <li>Client-side processing</li>
  <li>Hundreds of tools</li>
  <li>Clean, modern design</li>
</ul>
<blockquote><p>Built for developers, by developers.</p></blockquote>
<p><a href="https://example.com">Visit DevToolbox</a></p>`;

export function HtmlToMarkdownTool() {
  const convert = useCallback((input: string): ConvertResult => {
    try {
      return { output: htmlToMarkdown(input) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Conversion failed" };
    }
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_HTML}
      convert={convert}
      inputLabel="HTML input"
      outputLabel="Markdown output"
      inputPlaceholder="Paste your HTML here to convert it to Markdown..."
      outputPlaceholder="Generated Markdown will appear here."
      downloadFilename="output.md"
      downloadMimeType="text/markdown"
    />
  );
}
