"use client";

import { useMemo, useState } from "react";
import { getTextStats } from "@/lib/text-utils";
import { Stat, StatGrid } from "@/components/tools/shared/stat-grid";

const SAMPLE = "CodeSimplify is a free online toolbox for developers. It has hundreds of tools for JSON, text, colors, and more.";

export function WordCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => getTextStats(text), [text]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setText(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setText("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        spellCheck={false}
        className="h-64 w-full resize-none rounded-b-xl border border-border bg-background p-3 text-sm outline-none"
      />

      <div className="mt-4">
        <StatGrid>
          <Stat label="Words" value={stats.words.toLocaleString()} />
          <Stat label="Characters" value={stats.charactersWithSpaces.toLocaleString()} />
          <Stat label="Sentences" value={stats.sentences.toLocaleString()} />
          <Stat label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
          <Stat label="Reading time" value={`${Math.max(1, Math.ceil(stats.readingTimeMinutes))} min`} />
          <Stat label="Speaking time" value={`${Math.max(1, Math.ceil(stats.speakingTimeMinutes))} min`} />
        </StatGrid>
      </div>

      <p className="mt-4 text-xs text-muted">
        Reading time assumes ~200 words per minute; speaking time assumes ~130 words per minute (average speech pace).
      </p>
    </div>
  );
}
