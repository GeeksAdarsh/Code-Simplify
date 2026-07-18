"use client";

import { useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { convertCase, type CaseType } from "@/lib/text-utils";

const CASES: { value: CaseType; label: string }[] = [
  { value: "upper", label: "UPPERCASE" },
  { value: "lower", label: "lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "constant", label: "CONSTANT_CASE" },
];

const SAMPLE = "The Quick Brown Fox Jumps Over The Lazy Dog";

export function CaseConverterTool() {
  const [caseType, setCaseType] = useState<CaseType>("title");

  function convert(input: string): ConvertResult {
    return { output: convertCase(input, caseType) };
  }

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="Text"
      outputLabel={CASES.find((c) => c.value === caseType)?.label ?? "Output"}
      inputPlaceholder="Type or paste text here..."
      downloadFilename="converted.txt"
      toolbarExtra={
        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value as CaseType)}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          {CASES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      }
    />
  );
}
