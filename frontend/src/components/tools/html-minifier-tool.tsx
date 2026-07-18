"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { minifyHtml } from "@/lib/html-utils";

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>CodeSimplify</title>
  </head>
  <body>
    <!-- main content -->
    <div class="card">
      <h1>Hello, world!</h1>
      <p>This is a sample HTML document.</p>
    </div>
  </body>
</html>`;

export function HtmlMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: minifyHtml(input) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_HTML}
      convert={convert}
      inputLabel="HTML input"
      outputLabel="Minified output"
      inputPlaceholder="Paste your HTML here to minify it..."
      outputPlaceholder="Minified HTML will appear here."
      downloadFilename="minified.html"
      downloadMimeType="text/html"
    />
  );
}
