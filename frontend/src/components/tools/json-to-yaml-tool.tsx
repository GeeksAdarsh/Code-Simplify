"use client";

import { useCallback } from "react";
import { dump } from "js-yaml";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{
  "name": "CodeSimplify",
  "version": 1.0,
  "active": true,
  "tags": ["json", "developer", "tools"],
  "author": {
    "name": "Dev Team",
    "url": "https://example.com"
  }
}`;

export function JsonToYamlTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseJson(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    try {
      return { output: dump(result.data, { indent: 2, lineWidth: -1 }) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Failed to convert to YAML" };
    }
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_JSON}
      convert={convert}
      inputLabel="JSON input"
      outputLabel="YAML output"
      inputPlaceholder="Paste your JSON here to convert it to YAML..."
      outputPlaceholder="Converted YAML will appear here."
      downloadFilename="converted.yaml"
      downloadMimeType="application/x-yaml"
    />
  );
}
