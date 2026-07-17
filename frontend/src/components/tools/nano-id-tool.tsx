"use client";

import { useCallback, useState } from "react";
import { nanoid, customAlphabet } from "nanoid";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

export function NanoIdTool() {
  const [length, setLength] = useState(21);
  const [useCustomAlphabet, setUseCustomAlphabet] = useState(false);
  const [customChars, setCustomChars] = useState(DEFAULT_ALPHABET);

  const generate = useCallback(() => {
    if (useCustomAlphabet && customChars.trim()) {
      return customAlphabet(customChars.trim(), length)();
    }
    return nanoid(length);
  }, [length, useCustomAlphabet, customChars]);

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
                min={2}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-40 accent-foreground"
              />
            </div>
            <label className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={useCustomAlphabet}
                onChange={(e) => setUseCustomAlphabet(e.target.checked)}
                className="accent-foreground"
              />
              Custom alphabet
            </label>
          </>
        }
      />
      {useCustomAlphabet && (
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-muted">Alphabet</label>
          <input
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
      )}
      <p className="mt-3 text-xs text-muted">
        Nano ID is a tiny, URL-friendly unique ID generator. The default 21-character ID has a similar collision
        probability to a UUID v4 while being significantly shorter.
      </p>
    </div>
  );
}
