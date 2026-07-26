"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { diffLines, summarizeDiff } from "@/lib/text-diff-utils";

const SAMPLE_A = "The quick brown fox\njumps over the lazy dog\nEvery day is a good day\nThe end.";
const SAMPLE_B = "The quick brown fox\njumps over the sleepy dog\nEvery single day is a good day\nThe end.\nOne more line.";

const lineStyles: Record<string, string> = {
  added: "bg-foreground/5 border-l-2 border-foreground",
  removed: "bg-foreground/5 border-l-2 border-foreground/30 opacity-70",
  equal: "border-l-2 border-transparent",
};

const linePrefix: Record<string, string> = { added: "+", removed: "\u2212", equal: " " };

export function TextDiffTool() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const entries = useMemo(() => diffLines(textA, textB, ignoreCase, ignoreWhitespace), [textA, textB, ignoreCase, ignoreWhitespace]);
  const summary = useMemo(() => summarizeDiff(entries), [entries]);

  function loadSample() {
    setTextA(SAMPLE_A);
    setTextB(SAMPLE_B);
  }

  function clear() {
    setTextA("");
    setTextB("");
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
          Ignore case
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} />
          Ignore whitespace
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={clear} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Original</div>
          <CodeEditor value={textA} onChange={setTextA} language="plaintext" placeholder="Paste the original text here..." height="14rem" />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Changed</div>
          <CodeEditor value={textB} onChange={setTextB} language="plaintext" placeholder="Paste the changed text here..." height="14rem" />
        </div>
      </div>

      {(textA || textB) && (
        <div className="mt-4">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge border-foreground text-foreground">+{summary.added} added</span>
            <span className="badge border-foreground text-foreground">{"\u2212"}{summary.removed} removed</span>
            <span className="badge">{summary.unchanged} unchanged</span>
          </div>
          <div className="max-h-96 overflow-auto rounded-xl border border-border font-mono text-xs">
            {entries.map((entry, i) => (
              <div key={i} className={`flex gap-3 whitespace-pre-wrap px-3 py-0.5 ${lineStyles[entry.type]}`}>
                <span className="w-4 shrink-0 select-none text-muted">{linePrefix[entry.type]}</span>
                <span>{entry.line || "\u00a0"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
