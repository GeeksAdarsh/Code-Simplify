"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { formatGo } from "@/lib/go-utils";

const SAMPLE_GO = `package main
import "fmt"
type Greeter struct {
Name string
}
func (g Greeter) Greet() string {
if g.Name == "" {
return "Hello, stranger!"
}
return fmt.Sprintf("Hello, %s!", g.Name)
}
func main() {
g := Greeter{Name: "World"}
fmt.Println(g.Greet())
}`;

export function GoFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: formatGo(input, 4) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_GO}
        convert={convert}
        inputLabel="Go input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Go code here to fix its indentation..."
        outputPlaceholder="Formatted Go will appear here."
        downloadFilename="formatted.go"
        downloadMimeType="text/x-go"
      />
      <p className="mt-2 text-xs text-muted">
        This formatter re-indents your code based on brace nesting depth. Note that gofmt (the standard Go formatter)
        uses tabs by default — this tool uses spaces, so run gofmt locally before committing if your project
        enforces tab-indented Go source.
      </p>
    </div>
  );
}
