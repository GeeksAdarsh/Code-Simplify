"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { byteSize, parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{
  "name": "DevToolbox",
  "version": 1.0,
  "active": true,
  "tags": ["json", "developer", "tools"],
  "author": {
    "name": "Dev Team",
    "url": "https://example.com"
  },
  "stars": null
}`;

export function JsonMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseJson(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    return { output: JSON.stringify(result.data) };
  }, []);

  const inputBytes = byteSize(SAMPLE_JSON);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_JSON}
        convert={convert}
        inputLabel="JSON input"
        outputLabel="Minified output"
        inputPlaceholder="Paste your JSON here to minify it..."
        outputPlaceholder="Minified JSON will appear here."
        downloadFilename="minified.json"
        downloadMimeType="application/json"
      />
      <p className="mt-2 text-xs text-muted">
        Tip: minifying removes all whitespace and line breaks, shrinking payload size for production APIs and
        configs. (Sample input above is {inputBytes} bytes formatted.)
      </p>
    </div>
  );
}
