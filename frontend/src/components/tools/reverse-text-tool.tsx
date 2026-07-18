"use client";

import { useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { reverseText, type ReverseMode } from "@/lib/text-utils";

const MODES: { value: ReverseMode; label: string }[] = [
  { value: "characters", label: "Reverse characters" },
  { value: "words", label: "Reverse word order" },
  { value: "lines", label: "Reverse line order" },
];

const SAMPLE = "CodeSimplify makes\ndeveloper tools\nfast and simple";

export function ReverseTextTool() {
  const [mode, setMode] = useState<ReverseMode>("characters");

  function convert(input: string): ConvertResult {
    return { output: reverseText(input, mode) };
  }

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="Text"
      outputLabel="Reversed"
      inputPlaceholder="Type or paste text here..."
      downloadFilename="reversed.txt"
      toolbarExtra={
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ReverseMode)}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      }
    />
  );
}
