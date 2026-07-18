"use client";

import { useMemo, useState } from "react";
import { getCharacterBreakdown, getTextStats } from "@/lib/text-utils";
import { Stat, StatGrid } from "@/components/tools/shared/stat-grid";

export function CharacterCounterTool() {
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(280);
  const stats = useMemo(() => getTextStats(text), [text]);
  const breakdown = useMemo(() => getCharacterBreakdown(text), [text]);

  const overLimit = maxLength > 0 && stats.charactersWithSpaces > maxLength;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setText("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <label className="flex items-center gap-2 text-xs text-muted">
          Max length
          <input
            type="number"
            min={0}
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value) || 0)}
            className="w-20 rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-foreground"
          />
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        spellCheck={false}
        className="h-64 w-full resize-none rounded-b-xl border border-border bg-background p-3 text-sm outline-none"
      />

      {maxLength > 0 && (
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className={overLimit ? "font-semibold text-foreground" : "text-muted"}>
            {stats.charactersWithSpaces} / {maxLength} characters {overLimit && `(${stats.charactersWithSpaces - maxLength} over)`}
          </span>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full ${overLimit ? "bg-foreground" : "bg-foreground/70"}`}
              style={{ width: `${Math.min(100, (stats.charactersWithSpaces / maxLength) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <StatGrid>
          <Stat label="With spaces" value={stats.charactersWithSpaces.toLocaleString()} />
          <Stat label="Without spaces" value={stats.charactersWithoutSpaces.toLocaleString()} />
          <Stat label="Letters" value={breakdown.letters.toLocaleString()} />
          <Stat label="Digits" value={breakdown.digits.toLocaleString()} />
          <Stat label="Spaces" value={breakdown.spaces.toLocaleString()} />
          <Stat label="Punctuation" value={breakdown.punctuation.toLocaleString()} />
          <Stat label="Uppercase" value={breakdown.uppercase.toLocaleString()} />
          <Stat label="Lowercase" value={breakdown.lowercase.toLocaleString()} />
        </StatGrid>
      </div>
    </div>
  );
}
