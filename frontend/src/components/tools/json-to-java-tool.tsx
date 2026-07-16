"use client";

import { CodeGenTool } from "@/components/tools/shared/code-gen-tool";
import { renderJava } from "@/lib/json-to-code";

const SAMPLE_JSON = `{
  "name": "Jane Doe",
  "age": 29,
  "active": true,
  "tags": ["engineer", "java"],
  "address": { "city": "Austin", "zip": "73301" }
}`;

export function JsonToJavaTool() {
  return (
    <CodeGenTool
      sampleInput={SAMPLE_JSON}
      renderCode={(schema) => renderJava(schema, "Root")}
      outputLabel="Java output"
      downloadExtension="java"
      downloadMimeType="text/x-java-source"
      defaultRootName="Root"
    />
  );
}
