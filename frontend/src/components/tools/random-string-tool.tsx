"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomString, type RandomStringCharset } from "@/lib/random-utils";

const CHARSET_OPTIONS: { value: RandomStringCharset; label: string }[] = [
  { value: "letters-numbers", label: "Letters + numbers" },
  { value: "letters", label: "Letters only" },
  { value: "numbers", label: "Numbers only" },
  { value: "hex", label: "Hexadecimal" },
  { value: "custom", label: "Custom characters" },
];

export function RandomStringTool() {
  const [length, setLength] = useState(12);
  const [charset, setCharset] = useState<RandomStringCharset>("letters-numbers");
  const [customChars, setCustomChars] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const generate = useCallback(() => {
    return generateRandomString(length, charset, customChars);
  }, [length, charset, customChars]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Length: {length}</label>
              <input
                type="range"
                min={1}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-40 accent-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Character set</label>
              <select
                value={charset}
                onChange={(e) => setCharset(e.target.value as RandomStringCharset)}
                className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
              >
                {CHARSET_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        }
      />
      {charset === "custom" && (
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-muted">Custom characters (pool to pick from)</label>
          <input
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
      )}
      <p className="mt-3 text-xs text-muted">
        Strings are generated using your browser&apos;s cryptographically secure random number generator
        (<code>crypto.getRandomValues</code>).
      </p>
    </div>
  );
}
