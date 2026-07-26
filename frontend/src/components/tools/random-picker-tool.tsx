"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { generateRandomInt } from "@/lib/random-utils";

const SAMPLE_OPTIONS = "Pizza\nSushi\nTacos\nBurgers\nPasta";

export function RandomPickerTool() {
  const [optionsText, setOptionsText] = useState(SAMPLE_OPTIONS);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);
  const [remaining, setRemaining] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const options = optionsText
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);

  const pool = initialized ? remaining : options;

  function pick() {
    if (pool.length === 0) return;
    const index = generateRandomInt(0, pool.length - 1);
    const value = pool[index];
    setPicked(value);
    if (removeAfterPick) {
      const next = pool.filter((_, i) => i !== index);
      setRemaining(next);
      setInitialized(true);
    }
  }

  function reset() {
    setRemaining(options);
    setInitialized(true);
    setPicked(null);
  }

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Options (one per line)</label>
        <CodeEditor
          value={optionsText}
          onChange={(v) => {
            setOptionsText(v);
            setInitialized(false);
            setPicked(null);
          }}
          language="plaintext"
          height="9rem"
          className="rounded border border-border"
        />
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={removeAfterPick}
              onChange={(e) => {
                setRemoveAfterPick(e.target.checked);
                setInitialized(false);
                setPicked(null);
              }}
              className="accent-foreground"
            />
            Remove option after it's picked (no repeats)
          </label>
          <button onClick={pick} disabled={pool.length === 0} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
            Pick One
          </button>
          {removeAfterPick && initialized && (
            <button onClick={reset} className="btn btn-secondary h-9 px-4 text-sm">
              Reset list
            </button>
          )}
          <p className="text-xs text-muted">{pool.length} option(s) left</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex min-h-20 w-full max-w-md items-center justify-center rounded-2xl border-4 border-foreground/20 bg-surface px-6 py-6 text-center text-2xl font-semibold">
          {picked ?? "?"}
        </div>
      </div>
    </div>
  );
}
