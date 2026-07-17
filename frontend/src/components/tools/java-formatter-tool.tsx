"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { reindentCode } from "@/lib/java-utils";

const SAMPLE_JAVA = `public class Greeter {
private final String name;
public Greeter(String name) {
this.name = name;
}
public String greet() {
if (name == null || name.isEmpty()) {
return "Hello, stranger!";
}
return "Hello, " + name + "!";
}
public static void main(String[] args) {
Greeter g = new Greeter("World");
System.out.println(g.greet());
}
}`;

export function JavaFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: reindentCode(input, { indentSize: 4 }) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_JAVA}
        convert={convert}
        inputLabel="Java input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Java code here to fix its indentation..."
        outputPlaceholder="Formatted Java will appear here."
        downloadFilename="Formatted.java"
        downloadMimeType="text/x-java-source"
      />
      <p className="mt-2 text-xs text-muted">
        This formatter re-indents your code based on brace, bracket, and parenthesis nesting (4-space indent). It
        preserves existing line breaks, strings, and comments rather than fully re-flowing statements like an IDE's
        code formatter would.
      </p>
    </div>
  );
}
