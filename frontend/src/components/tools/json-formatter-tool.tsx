"use client";

import { useMemo, useState } from "react";

const SAMPLE_JSON = `{"name":"CodeSimplify","version":1.0,"active":true,"tags":["json","developer","tools"],"author":{"name":"Dev Team","url":"https://example.com"},"stars":null}`;

type IndentOption = "2" | "4" | "tab";

function locateError(input: string, message: string): { line: number; column: number } | null {
  const match = message.match(/position (\d+)/i);
  if (!match) return null;
  const position = Number(match[1]);
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === "\n") {
      line++;
      lastNewline = i;
    }
  }
  return { line, column: position - lastNewline };
}

function indentString(option: IndentOption): string | number {
  if (option === "tab") return "\t";
  return Number(option);
}

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) {
      setError(null);
      return "";
    }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObjectKeys(parsed);
      const formatted = JSON.stringify(parsed, null, indentString(indent));
      setError(null);
      return formatted;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      const location = locateError(input, message);
      setError({ message, line: location?.line, column: location?.column });
      return "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, indent, sortKeys]);

  const stats = useMemo(() => {
    const inputBytes = new TextEncoder().encode(input).length;
    const outputBytes = new TextEncoder().encode(output).length;
    return { inputBytes, outputBytes };
  }, [input, output]);

  function handleFormat() {
    if (output) setInput(output);
  }

  function handleMinify() {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch {
      // leave error state to the memoized output above
    }
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={handleFormat} disabled={!output} className="btn btn-primary h-8 px-3 text-xs disabled:opacity-50">
          Format
        </button>
        <button onClick={handleMinify} className="btn btn-secondary h-8 px-3 text-xs">
          Minify
        </button>
        <button
          onClick={() => {
            setInput(SAMPLE_JSON);
          }}
          className="btn btn-secondary h-8 px-3 text-xs"
        >
          Load sample
        </button>
        <button
          onClick={() => setInput("")}
          className="btn btn-secondary h-8 px-3 text-xs"
        >
          Clear
        </button>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="accent-foreground"
            />
            Sort keys
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Indent
            <select
              value={indent}
              onChange={(e) => setIndent(e.target.value as IndentOption)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Input</span>
            <span>{stats.inputBytes.toLocaleString()} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Output</span>
            <div className="flex items-center gap-3">
              <span>{stats.outputBytes.toLocaleString()} bytes</span>
              <button onClick={handleCopy} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                Download
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid JSON</p>
          <p className="mt-1 text-muted">
            {error.message}
            {error.line ? ` (line ${error.line}, column ${error.column})` : ""}
          </p>
        </div>
      )}
    </div>
  );
}

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObjectKeys);
  if (value !== null && typeof value === "object") {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = sortObjectKeys((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return value;
}
