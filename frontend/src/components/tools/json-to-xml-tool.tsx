"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { jsonToXml } from "@/lib/json-convert";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{
  "employee": {
    "name": "Jane Doe",
    "role": "Engineer",
    "active": true,
    "skills": ["Java", "TypeScript"]
  }
}`;

export function JsonToXmlTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseJson(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    return { output: jsonToXml(result.data) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_JSON}
      convert={convert}
      inputLabel="JSON input"
      outputLabel="XML output"
      inputPlaceholder="Paste your JSON here to convert it to XML..."
      outputPlaceholder="Converted XML will appear here."
      downloadFilename="converted.xml"
      downloadMimeType="application/xml"
    />
  );
}
