"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { formatMarkdown } from "@/lib/markdown-utils";

const SAMPLE_MD = `#Title
##Subtitle

* Item one
+ Item two
*   Item three


Some text with trailing spaces.   

\`\`\`js
*   not a list, this is code
\`\`\`


## Another section
`;

export function MarkdownFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: formatMarkdown(input) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_MD}
        convert={convert}
        inputLabel="Markdown input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Markdown here to clean it up..."
        outputPlaceholder="Formatted Markdown will appear here."
        downloadFilename="formatted.md"
        downloadMimeType="text/markdown"
      />
      <p className="mt-2 text-xs text-muted">
        Normalizes bullet markers to “-”, ensures a space after heading hashes, strips trailing whitespace, and
        collapses extra blank lines. Content inside fenced code blocks (``` or ~~~) is left completely untouched.
      </p>
    </div>
  );
}
