"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatJava } from "@/lib/java-utils";

const SAMPLE_JAVA = `public class Greeter{private final String name;public Greeter(String name){this.name=name;}
public String greet(){if(name==null||name.isEmpty()){return "Hello, stranger!";}return "Hello, "+name+"!";}
public static void main(String[] args){Greeter g=new Greeter("World");System.out.println(g.greet());}}`;

export function JavaFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      return { output: await formatJava(input, 4) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_JAVA}
        convert={convert}
        inputLabel="Java input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Java code here to format it..."
        outputPlaceholder="Formatted Java will appear here."
        downloadFilename="Formatted.java"
        downloadMimeType="text/x-java-source"
      />
      <p className="mt-2 text-xs text-muted">
        Powered by Prettier&apos;s Java plugin: it rebuilds the layout from scratch with 4-space indents, one
        statement per line, standard spacing, and wrapping at 100 characters. Code with syntax errors shows an error
        instead of a guess.
      </p>
    </div>
  );
}
