"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { deobfuscateJavaScript } from "@/lib/js-format-utils";

const SAMPLE_JS = `function a(b){let c=0;for(const d of b){c+=d.price*d.quantity}return c}const e=[{price:9.99,quantity:2},{price:14.5,quantity:1}];console.log("\\x54\\x6f\\x74\\x61\\x6c\\x3a\\x20\\x24"+a(e).toFixed(2));`;

export function JsDeobfuscatorTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    return deobfuscateJavaScript(input);
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_JS}
        convert={convert}
        inputLabel="Obfuscated/minified JavaScript"
        outputLabel="Readable output"
        inputPlaceholder="Paste minified or obfuscated JavaScript here to clean it up..."
        outputPlaceholder="Reformatted, readable JavaScript will appear here."
        downloadFilename="deobfuscated.js"
        downloadMimeType="text/javascript"
      />
      <p className="mt-2 text-xs text-muted">
        This tool reformats minified code with proper indentation and decodes hex/unicode-escaped string literals
        (\\xNN, \\uNNNN) back into readable text. It cannot reverse variable-name mangling or heavy control-flow
        obfuscation, since that information is discarded permanently during obfuscation.
      </p>
    </div>
  );
}
