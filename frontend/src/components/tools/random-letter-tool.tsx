"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomLetter, type LetterCase } from "@/lib/random-utils";

const CASE_OPTIONS: { value: LetterCase; label: string }[] = [
  { value: "mixed", label: "Mixed case" },
  { value: "upper", label: "Uppercase" },
  { value: "lower", label: "Lowercase" },
];

export function RandomLetterTool() {
  const [letterCase, setLetterCase] = useState<LetterCase>("mixed");
  const generate = useCallback(() => generateRandomLetter(letterCase), [letterCase]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Case</label>
            <select
              value={letterCase}
              onChange={(e) => setLetterCase(e.target.value as LetterCase)}
              className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
            >
              {CASE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        }
      />
      <p className="mt-3 text-xs text-muted">Picks a random letter from A to Z on every generation.</p>
    </div>
  );
}
