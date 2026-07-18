"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { formatPython } from "@/lib/python-utils";

const SAMPLE_PY = `class Greeter:
  def __init__(self, name):
        self.name = name

  def greet(self):
    if not self.name:
            return "Hello, stranger!"
    return f"Hello, {self.name}!"

def main():
    g = Greeter("World")
    print(g.greet())

if __name__ == "__main__":
    main()`;

export function PythonFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: formatPython(input, 4) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_PY}
        convert={convert}
        inputLabel="Python input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Python code here to normalize its indentation..."
        outputPlaceholder="Formatted Python will appear here."
        downloadFilename="formatted.py"
        downloadMimeType="text/x-python"
      />
      <p className="mt-2 text-xs text-muted">
        This formatter fixes mixed tabs/spaces and inconsistent indent widths using the same indentation-stack logic
        Python's own tokenizer relies on. Content inside triple-quoted strings is left completely untouched, and
        statement layout, spacing, and line length are not modified.
      </p>
    </div>
  );
}
