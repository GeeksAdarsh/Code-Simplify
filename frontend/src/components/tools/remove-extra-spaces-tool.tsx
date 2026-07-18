"use client";

import { useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { removeExtraSpaces } from "@/lib/text-utils";

const SAMPLE = "This   text   has     extra   spaces.\n\n\nAnd   blank lines.   \n   Trailing and leading spaces.   ";

export function RemoveExtraSpacesTool() {
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);

  function convert(input: string): ConvertResult {
    return { output: removeExtraSpaces(input, { collapseSpaces, trimLines, removeBlankLines }) };
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} />
          Collapse multiple spaces/tabs
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
          Trim start/end of each line
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={removeBlankLines} onChange={(e) => setRemoveBlankLines(e.target.checked)} />
          Remove blank lines
        </label>
      </div>

      <ConvertTool
        sampleInput={SAMPLE}
        convert={convert}
        inputLabel="Text"
        outputLabel="Cleaned text"
        inputPlaceholder="Paste messy text here..."
        downloadFilename="cleaned.txt"
      />
    </div>
  );
}
