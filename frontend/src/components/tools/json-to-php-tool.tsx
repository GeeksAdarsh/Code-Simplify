"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { jsonToPhpArray } from "@/lib/json-convert";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{
  "name": "CodeSimplify",
  "active": true,
  "tags": ["json", "php"],
  "author": { "name": "Dev Team" }
}`;

export function JsonToPhpTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseJson(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    return { output: `<?php\n\n$data = ${jsonToPhpArray(result.data)};\n` };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_JSON}
      convert={convert}
      inputLabel="JSON input"
      outputLabel="PHP output"
      inputPlaceholder="Paste your JSON here to convert it to a PHP array..."
      outputPlaceholder="Converted PHP array will appear here."
      downloadFilename="data.php"
      downloadMimeType="text/plain"
    />
  );
}
