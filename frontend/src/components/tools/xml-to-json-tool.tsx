"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { xmlToJsObject } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<book id="1">
  <title>Learning XML</title>
  <author>Jane Doe</author>
  <price>29.99</price>
</book>`;

export function XmlToJsonTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = xmlToJsObject(input);
    if (result.error) return { output: "", error: result.error };
    return { output: JSON.stringify(result.data, null, 2) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_XML}
        convert={convert}
        inputLabel="XML input"
        outputLabel="JSON output"
        inputPlaceholder="Paste your XML here to convert it to JSON..."
        outputPlaceholder="Converted JSON will appear here."
        downloadFilename="converted.json"
        downloadMimeType="application/json"
      />
      <p className="mt-2 text-xs text-muted">
        Attributes are converted to <code className="font-mono">@attribute</code> keys; mixed text content
        becomes a <code className="font-mono">#text</code> key. Repeated child elements become arrays.
      </p>
    </div>
  );
}
