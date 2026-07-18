"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { obfuscateJavaScript } from "@/lib/js-format-utils";

const SAMPLE_JS = `function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

const cart = [
  { price: 9.99, quantity: 2 },
  { price: 14.5, quantity: 1 },
];

console.log("Total: $" + calculateTotal(cart).toFixed(2));`;

export function JsObfuscatorTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    return obfuscateJavaScript(input);
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_JS}
        convert={convert}
        inputLabel="JavaScript input"
        outputLabel="Obfuscated output"
        inputPlaceholder="Paste your JavaScript here to obfuscate it..."
        outputPlaceholder="Obfuscated JavaScript will appear here."
        downloadFilename="obfuscated.js"
        downloadMimeType="text/javascript"
      />
      <p className="mt-2 text-xs text-muted">
        This tool renames local variables/functions, strips whitespace, and hex-encodes string literals to make source
        code harder to read at a glance. It's a lightweight obfuscation for deterring casual copying \u2014 it is not a
        substitute for proper security controls, since determined users can still deobfuscate or debug the output.
      </p>
    </div>
  );
}
