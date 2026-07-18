"use client";

import { useMemo, useState } from "react";
import { getLineStats } from "@/lib/text-utils";
import { Stat, StatGrid } from "@/components/tools/shared/stat-grid";

export function LineCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => getLineStats(text), [text]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setText("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        spellCheck={false}
        className="h-64 w-full resize-none rounded-b-xl border border-border bg-background p-3 font-mono text-sm outline-none"
      />

      <div className="mt-4">
        <StatGrid>
          <Stat label="Total lines" value={stats.totalLines.toLocaleString()} />
          <Stat label="Non-empty lines" value={stats.nonEmptyLines.toLocaleString()} />
          <Stat label="Empty lines" value={stats.emptyLines.toLocaleString()} />
          <Stat label="Average line length" value={stats.averageLineLength.toFixed(1)} />
          <Stat
            label="Longest line"
            value={stats.totalLines ? `${stats.longestLineLength} chars (line ${stats.longestLineNumber})` : "\u2014"}
          />
        </StatGrid>
      </div>
    </div>
  );
}
