"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { formatCss, minifyCss } from "@/lib/css-utils";

const SAMPLE_CSS = `.card{background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:16px}
.card h1{font-size:20px;margin:0 0 8px;color:#111}
@media (max-width: 640px){.card{padding:12px}}`;

type IndentOption = "2" | "4" | "tab";

export function CssFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const formatted = formatCss(input, indent === "tab" ? 1 : Number(indent));
      return indent === "tab" ? formatted.replace(/^ +/gm, (spaces) => "\t".repeat(spaces.length)) : formatted;
    } catch {
      return "";
    }
  }, [input, indent]);

  function handleMinify() {
    setInput(minifyCss(input));
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.css";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button
          onClick={() => output && setInput(output)}
          disabled={!output}
          className="btn btn-primary h-8 px-3 text-xs disabled:opacity-50"
        >
          Format
        </button>
        <button onClick={handleMinify} className="btn btn-secondary h-8 px-3 text-xs">
          Minify
        </button>
        <button onClick={() => setInput(SAMPLE_CSS)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
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

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="css" placeholder="Paste your CSS here..." height="24rem" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Output</span>
            <div className="flex items-center gap-3">
              <span>{byteSize(output).toLocaleString()} bytes</span>
              <button onClick={handleCopy} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                Download
              </button>
            </div>
          </div>
          <CodeEditor value={output} readOnly language="css" placeholder="Formatted CSS will appear here." height="24rem" />
        </div>
      </div>
    </div>
  );
}
