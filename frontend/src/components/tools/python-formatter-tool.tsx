"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatPythonCode } from "@/lib/python-utils";

const SAMPLE_PY = `import os,sys
class Greeter :
  def __init__( self,name='World' ):
        self.name=name
  def greet(self,times = 1):
    if not self.name : return 'Hello, stranger!'
    return ', '.join( [f'Hello, {self.name}!' for _ in range(times)] )
def main():
    g=Greeter( 'World' );print(g.greet(times=2))
if __name__=='__main__':
    main()`;

export function PythonFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      return { output: await formatPythonCode(input, 4) };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      const crammed = input.trim().split("\n").length <= 3;
      return {
        output: "",
        error: crammed
          ? `${message}. Python uses line breaks and indentation for structure, so each statement and block needs its own line before it can be formatted.`
          : `${message}. The code must be valid Python 3.`,
      };
    }
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_PY}
        convert={convert}
        inputLabel="Python input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Python code here to format it..."
        outputPlaceholder="Formatted Python will appear here."
        downloadFilename="formatted.py"
        downloadMimeType="text/x-python"
      />
      <p className="mt-2 text-xs text-muted">
        Powered by Ruff, which formats in the same style as Black: 4-space indents, spacing around operators and
        commas, double quotes, one statement per line, and wrapping at 88 characters. It runs in your browser.
      </p>
    </div>
  );
}
