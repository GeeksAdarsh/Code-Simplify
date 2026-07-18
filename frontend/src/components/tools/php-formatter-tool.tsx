"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { formatPhp } from "@/lib/php-utils";

const SAMPLE_PHP = `<?php
class Greeter {
private string $name;
public function __construct(string $name) {
$this->name = $name;
}
public function greet(): string {
if (empty($this->name)) {
return "Hello, stranger!";
}
return "Hello, " . $this->name . "!";
}
}
$g = new Greeter("World");
echo $g->greet();`;

export function PhpFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: formatPhp(input, 4) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_PHP}
        convert={convert}
        inputLabel="PHP input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your PHP code here to fix its indentation..."
        outputPlaceholder="Formatted PHP will appear here."
        downloadFilename="formatted.php"
        downloadMimeType="application/x-httpd-php"
      />
      <p className="mt-2 text-xs text-muted">
        This formatter re-indents your code based on brace/bracket/parenthesis nesting depth (4-space indent), and
        correctly skips over single- and double-quoted strings and comments. It preserves your existing line breaks
        rather than fully re-flowing statements. Heredoc/nowdoc blocks (&lt;&lt;&lt;EOT) are a known edge case.
      </p>
    </div>
  );
}
