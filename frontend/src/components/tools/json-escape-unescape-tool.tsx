"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";

const SAMPLE_RAW = `Hello "World"!\nLine two with a \\backslash\\ and a tab:\tend.`;
const SAMPLE_ESCAPED = '"Hello \\"World\\"!\\nLine two with a \\\\backslash\\\\ and a tab:\\tend."';

type Mode = "escape" | "unescape";

function escapeText(input: string): string {
  return JSON.stringify(input);
}

function unescapeText(input: string): { output: string; error?: string } {
  const trimmed = input.trim();
  const quoted = trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"');
  const candidate = quoted ? trimmed : `"${trimmed}"`;
  try {
    return { output: JSON.parse(candidate) };
  } catch {
    try {
      return { output: JSON.parse(`"${trimmed.replace(/"/g, '\\"')}"`) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Could not unescape this string" };
    }
  }
}

export function JsonEscapeUnescapeTool() {
  const [mode, setMode] = useState<Mode>("escape");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: "" };
    return mode === "escape" ? { output: escapeText(input) } : unescapeText(input);
  }, [input, mode]);

  function loadSample() {
    setInput(mode === "escape" ? SAMPLE_RAW : SAMPLE_ESCAPED);
  }

  function handleCopy() {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <div className="flex items-center rounded-lg border border-border p-0.5">
          <button
            onClick={() => setMode("escape")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              mode === "escape" ? "bg-foreground text-background" : "text-muted"
            }`}
          >
            Escape
          </button>
          <button
            onClick={() => setMode("unescape")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              mode === "unescape" ? "bg-foreground text-background" : "text-muted"
            }`}
          >
            Unescape
          </button>
        </div>
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>{mode === "escape" ? "Raw text" : "Escaped JSON string"}</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="plaintext"
            placeholder={
              mode === "escape"
                ? "Type or paste raw text to escape for use inside a JSON string..."
                : 'Paste an escaped JSON string (e.g. "line1\\nline2") to decode...'
            }
            height="18rem"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>{mode === "escape" ? "Escaped output" : "Unescaped output"}</span>
            <div className="flex items-center gap-3">
              <span>{byteSize(result.output).toLocaleString()} bytes</span>
              <button
                onClick={handleCopy}
                disabled={!result.output}
                className="font-medium text-foreground disabled:text-muted"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <CodeEditor value={result.output} readOnly language="plaintext" placeholder="Output will appear here." height="18rem" />
        </div>
      </div>

      {result.error && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Could not unescape</p>
          <p className="mt-1 text-muted">{result.error}</p>
        </div>
      )}
    </div>
  );
}
