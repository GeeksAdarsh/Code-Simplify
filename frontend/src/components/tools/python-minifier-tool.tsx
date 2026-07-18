"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { minifyPython } from "@/lib/python-utils";

const SAMPLE_PY = `class Greeter:
    # Stores the name to greet
    def __init__(self, name):
        self.name = name

    def greet(self):
        # Handle the empty-name case
        if not self.name:
            return "Hello, stranger!"

        return f"Hello, {self.name}!"


def main():
    g = Greeter("World")
    print(g.greet())


if __name__ == "__main__":
    main()`;

export function PythonMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: minifyPython(input) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_PY}
        convert={convert}
        inputLabel="Python input"
        outputLabel="Minified output"
        inputPlaceholder="Paste your Python code here to strip comments and shrink indentation..."
        outputPlaceholder="Minified Python will appear here."
        downloadFilename="minified.py"
        downloadMimeType="text/x-python"
      />
      <p className="mt-2 text-xs text-muted">
        Since Python is whitespace-sensitive, this can't collapse everything onto one line like a JS minifier. Instead
        it strips comments and blank lines, and shrinks every indentation level down to a single space \u2014 relative
        nesting (all Python actually requires) is fully preserved, so the output remains valid, runnable Python.
      </p>
    </div>
  );
}
