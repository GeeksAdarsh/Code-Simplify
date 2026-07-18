"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { minifyJavaScript } from "@/lib/js-format-utils";

const SAMPLE_JS = `function greet(name) {
  const greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

const users = [
  { id: 1, name: "Ann" },
  { id: 2, name: "Ben" },
];

users.forEach((u) => greet(u.name));`;

export function JsMinifierTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    return minifyJavaScript(input);
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_JS}
        convert={convert}
        inputLabel="JavaScript input"
        outputLabel="Minified output"
        inputPlaceholder="Paste your JavaScript here to minify it..."
        outputPlaceholder="Minified JavaScript will appear here."
        downloadFilename="minified.js"
        downloadMimeType="text/javascript"
      />
      <p className="mt-2 text-xs text-muted">
        Powered by Terser \u2014 removes whitespace and comments, and shortens local variable names to reduce file size.
      </p>
    </div>
  );
}
