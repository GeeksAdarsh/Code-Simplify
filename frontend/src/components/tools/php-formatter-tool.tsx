"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatPhp } from "@/lib/php-utils";

const SAMPLE_PHP = `<?php
class Greeter{private string $name;public function __construct(string $name){$this->name=$name;}
public function greet():string{if(empty($this->name)){return "Hello, stranger!";}return "Hello, ".$this->name."!";}}
$g=new Greeter("World");echo $g->greet();`;

export function PhpFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      return { output: await formatPhp(input, 4) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, []);

  return (
    <div>
      <AsyncConvertTool
        sampleInput={SAMPLE_PHP}
        convert={convert}
        inputLabel="PHP input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your PHP code here to format it..."
        outputPlaceholder="Formatted PHP will appear here."
        downloadFilename="formatted.php"
        downloadMimeType="application/x-httpd-php"
      />
      <p className="mt-2 text-xs text-muted">
        Powered by Prettier&apos;s PHP plugin: 4-space indents, one statement per line, PSR-style braces and spacing,
        and wrapping at 100 characters. Code with syntax errors shows an error instead of a guess.
      </p>
    </div>
  );
}
