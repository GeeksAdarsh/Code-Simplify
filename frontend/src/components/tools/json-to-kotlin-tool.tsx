"use client";

import { CodeGenTool } from "@/components/tools/shared/code-gen-tool";
import { renderKotlin } from "@/lib/json-to-code";

const SAMPLE_JSON = `{
  "name": "Jane Doe",
  "age": 29,
  "active": true,
  "tags": ["engineer", "kotlin"],
  "address": { "city": "Austin", "zip": "73301" }
}`;

export function JsonToKotlinTool() {
  return (
    <CodeGenTool
      sampleInput={SAMPLE_JSON}
      renderCode={(schema) => renderKotlin(schema)}
      outputLabel="Kotlin output"
      downloadExtension="kt"
      downloadMimeType="text/plain"
      defaultRootName="Root"
    />
  );
}
