"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { minifyCss } from "@/lib/css-utils";

const SAMPLE_CSS = `.card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
}

.card h1 {
  font-size: 20px;
  margin: 0 0 8px;
  color: #111;
}

@media (max-width: 640px) {
  .card {
    padding: 12px;
  }
}`;

export function CssMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: minifyCss(input) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_CSS}
        convert={convert}
        inputLabel="CSS input"
        outputLabel="Minified output"
        inputPlaceholder="Paste your CSS here to strip comments and whitespace..."
        outputPlaceholder="Minified CSS will appear here."
        downloadFilename="minified.css"
        downloadMimeType="text/css"
      />
      <p className="mt-2 text-xs text-muted">
        Tip: minifying strips comments and extra whitespace to shrink your CSS for production, while keeping string
        literals like content values untouched.
      </p>
    </div>
  );
}
