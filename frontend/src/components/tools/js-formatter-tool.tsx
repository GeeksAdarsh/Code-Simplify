"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatJavaScript } from "@/lib/js-format-utils";

const SAMPLE_JS = `function greet(name){const greeting="Hello, "+name+"!";console.log(greeting);return greeting}
const users=[{id:1,name:"Ann"},{id:2,name:"Ben"}];users.forEach(u=>greet(u.name));`;

export function JsFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      const output = await formatJavaScript(input);
      return { output };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Formatting failed. Check your JavaScript syntax." };
    }
  }, []);

  return (
    <AsyncConvertTool
      sampleInput={SAMPLE_JS}
      convert={convert}
      inputLabel="JavaScript input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your JavaScript here to format it..."
      outputPlaceholder="Formatted JavaScript will appear here."
      downloadFilename="formatted.js"
      downloadMimeType="text/javascript"
    />
  );
}
