"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { parseYaml } from "@/lib/yaml-utils";

const SAMPLE_YAML = `name: DevToolbox
version: 1.0
active: true
tags:
  - json
  - developer
  - tools
author:
  name: Dev Team
  url: https://example.com`;

export function YamlToJsonTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseYaml(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    return { output: JSON.stringify(result.data, null, 2) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_YAML}
      convert={convert}
      inputLabel="YAML input"
      outputLabel="JSON output"
      inputPlaceholder="Paste your YAML here to convert it to JSON..."
      outputPlaceholder="Converted JSON will appear here."
      downloadFilename="converted.json"
      downloadMimeType="application/json"
    />
  );
}
