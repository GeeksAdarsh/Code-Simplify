"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { jsonToCsv } from "@/lib/json-convert";
import { extractRowsFromXml, xmlToJsObject } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<employees>
  <employee id="1">
    <name>Jane Doe</name>
    <role>Engineer</role>
  </employee>
  <employee id="2">
    <name>John Smith</name>
    <role>Designer</role>
  </employee>
</employees>`;

export function XmlToCsvTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = xmlToJsObject(input);
    if (result.error) return { output: "", error: result.error };
    const rows = extractRowsFromXml(result.data);
    return { output: jsonToCsv(rows) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_XML}
        convert={convert}
        inputLabel="XML input"
        outputLabel="CSV output"
        inputPlaceholder="Paste your XML here to convert it to CSV..."
        outputPlaceholder="Converted CSV will appear here."
        downloadFilename="converted.csv"
        downloadMimeType="text/csv"
      />
      <p className="mt-2 text-xs text-muted">
        Works best with XML that has a list of repeated child elements (like multiple{" "}
        <code className="font-mono">&lt;employee&gt;</code> elements) &mdash; each one becomes a CSV row.
      </p>
    </div>
  );
}
