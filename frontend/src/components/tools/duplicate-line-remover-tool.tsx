"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { removeDuplicateLines } from "@/lib/text-utils";

const SAMPLE = "apple\nbanana\napple\ncherry\nBanana\ndate\ncherry";

export function DuplicateLineRemoverTool() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreBlank, setIgnoreBlank] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => removeDuplicateLines(text, { caseSensitive, trimLines, ignoreBlank }),
    [text, caseSensitive, trimLines, ignoreBlank],
  );

  function handleCopy() {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case-sensitive
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
          Trim whitespace
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={ignoreBlank} onChange={(e) => setIgnoreBlank(e.target.checked)} />
          Keep blank lines
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setText(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setText("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Input</div>
          <CodeEditor value={text} onChange={setText} language="plaintext" placeholder="Paste text with duplicate lines here..." height="18rem" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Output {text && `(removed ${result.removedCount} duplicate${result.removedCount === 1 ? "" : "s"})`}</span>
            <button onClick={handleCopy} disabled={!result.output} className="font-medium text-foreground disabled:text-muted">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <CodeEditor value={result.output} readOnly language="plaintext" placeholder="Deduplicated text will appear here..." height="18rem" />
        </div>
      </div>
    </div>
  );
}
