"use client";

import { useMemo, useState } from "react";
import { DEFAULT_PROMPT_FORMAT_OPTIONS, diffStats, formatPrompt, type PromptFormatOptions } from "@/lib/prompt-utils";

const SAMPLE = `You are a helpful assistant.   


Please follow these rules:
1. Be concise    
2. Use \u201csimple\u201d language
3. Avoid jargon \u2014 explain acronyms



Respond only in JSON.`;

export function PromptFormatterTool() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<PromptFormatOptions>(DEFAULT_PROMPT_FORMAT_OPTIONS);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => formatPrompt(input, options), [input, options]);
  const stats = useMemo(() => diffStats(input, output), [input, output]);

  function toggle(key: keyof PromptFormatOptions) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={options.trimTrailingWhitespace} onChange={() => toggle("trimTrailingWhitespace")} className="accent-foreground" />
            Trim trailing spaces
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={options.collapseBlankLines} onChange={() => toggle("collapseBlankLines")} className="accent-foreground" />
            Collapse blank lines
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={options.collapseSpaces} onChange={() => toggle("collapseSpaces")} className="accent-foreground" />
            Collapse spaces
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={options.normalizeQuotes} onChange={() => toggle("normalizeQuotes")} className="accent-foreground" />
            Normalize smart quotes
          </label>
        </div>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Prompt input</span>
            <span>{stats.charsBefore.toLocaleString()} chars &middot; {stats.linesBefore} lines</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your raw prompt here..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Cleaned output</span>
            <div className="flex items-center gap-3">
              <span>{stats.charsAfter.toLocaleString()} chars &middot; {stats.linesAfter} lines</span>
              <button onClick={copy} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Cleaned prompt will appear here."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
}
