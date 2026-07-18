"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { minifyXml, validateXml } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>Learning XML</title>
    <author>Jane Doe</author>
    <price>29.99</price>
  </book>
  <book id="2">
    <title>CodeSimplify Guide</title>
    <author>Dev Team</author>
    <price>19.99</price>
  </book>
</catalog>`;

export function XmlMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const validation = validateXml(input);
    if (!validation.valid) return { output: "", error: validation.error };
    return { output: minifyXml(input) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_XML}
      convert={convert}
      inputLabel="XML input"
      outputLabel="Minified output"
      inputPlaceholder="Paste your XML here to minify it..."
      outputPlaceholder="Minified XML will appear here."
      downloadFilename="minified.xml"
      downloadMimeType="application/xml"
    />
  );
}
