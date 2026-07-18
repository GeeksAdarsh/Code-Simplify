"use client";

import { CodeGenTool } from "@/components/tools/shared/code-gen-tool";
import { renderTypeScript } from "@/lib/json-to-code";

const SAMPLE_JSON = `{
  "name": "Jane Doe",
  "age": 29,
  "active": true,
  "tags": ["engineer", "typescript"],
  "address": { "city": "Austin", "zip": "73301" }
}`;

export function JsonToTypeScriptTool() {
  return (
    <CodeGenTool
      sampleInput={SAMPLE_JSON}
      renderCode={(schema) => renderTypeScript(schema)}
      outputLabel="TypeScript output"
      downloadExtension="ts"
      downloadMimeType="text/plain"
      defaultRootName="Root"
    />
  );
}
