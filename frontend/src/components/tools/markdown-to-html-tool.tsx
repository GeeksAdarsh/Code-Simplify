"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { markdownToHtml } from "@/lib/markdown-utils";

const SAMPLE_MD = `# DevToolbox

A **fast**, _free_, and privacy-friendly toolbox for developers.

## Features

- Client-side processing
- Hundreds of tools
- Clean, modern design

\`\`\`js
console.log("Hello, DevToolbox!");
\`\`\`

> Built for developers, by developers.

[Visit DevToolbox](https://example.com)
`;

export function MarkdownToHtmlTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      const output = await markdownToHtml(input);
      return { output };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Conversion failed" };
    }
  }, []);

  return (
    <AsyncConvertTool
      sampleInput={SAMPLE_MD}
      convert={convert}
      inputLabel="Markdown input"
      outputLabel="HTML output"
      inputPlaceholder="Paste your Markdown here to convert it to HTML..."
      outputPlaceholder="Generated HTML will appear here."
      downloadFilename="output.html"
      downloadMimeType="text/html"
      debounceMs={150}
    />
  );
}
