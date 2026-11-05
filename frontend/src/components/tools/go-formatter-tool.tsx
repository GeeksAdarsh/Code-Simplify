"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatGo } from "@/lib/go-utils";

const SAMPLE_GO = `package main
import ("fmt";"strings")
type Greeter struct{Name string;Times int}
func (g Greeter) Greet() string{
if g.Name==""{return "Hello, stranger!"}
return strings.Repeat(fmt.Sprintf("Hello, %s! ",g.Name),g.Times)
}
func main(){g:=Greeter{Name:"World",Times:2};fmt.Println(g.Greet())}`;

export function GoFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      return { output: await formatGo(input) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_GO}
        convert={convert}
        inputLabel="Go input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Go code here to format it..."
        outputPlaceholder="Formatted Go will appear here."
        downloadFilename="formatted.go"
        downloadMimeType="text/x-go"
      />
      <p className="mt-2 text-xs text-muted">
        Runs the official gofmt in your browser, so the output matches what <code>go fmt</code> produces: tab
        indentation, standard spacing, aligned struct fields, and one statement per line.
      </p>
    </div>
  );
}
