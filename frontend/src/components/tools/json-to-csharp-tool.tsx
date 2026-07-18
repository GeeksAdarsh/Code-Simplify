"use client";

import { CodeGenTool } from "@/components/tools/shared/code-gen-tool";
import { renderCSharp } from "@/lib/json-to-code";

const SAMPLE_JSON = `{
  "name": "Jane Doe",
  "age": 29,
  "active": true,
  "tags": ["engineer", "dotnet"],
  "address": { "city": "Austin", "zip": "73301" }
}`;

export function JsonToCSharpTool() {
  return (
    <CodeGenTool
      sampleInput={SAMPLE_JSON}
      renderCode={(schema) => renderCSharp(schema)}
      outputLabel="C# output"
      downloadExtension="cs"
      downloadMimeType="text/plain"
      defaultRootName="Root"
    />
  );
}
