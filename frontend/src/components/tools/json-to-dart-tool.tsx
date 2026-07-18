"use client";

import { CodeGenTool } from "@/components/tools/shared/code-gen-tool";
import { renderDart } from "@/lib/json-to-code";

const SAMPLE_JSON = `{
  "name": "Jane Doe",
  "age": 29,
  "active": true,
  "tags": ["engineer", "dart"],
  "address": { "city": "Austin", "zip": "73301" }
}`;

export function JsonToDartTool() {
  return (
    <CodeGenTool
      sampleInput={SAMPLE_JSON}
      renderCode={(schema) => renderDart(schema)}
      outputLabel="Dart output"
      downloadExtension="dart"
      downloadMimeType="text/plain"
      defaultRootName="Root"
    />
  );
}
