"use client";

import { useMemo, useState } from "react";
import { byteSize } from "@/lib/json-utils";
import { formatXml, minifyXml, validateXml } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?><catalog><book id="1"><title>Learning XML</title><author>Jane Doe</author><price>29.99</price></book><book id="2"><title>DevToolbox Guide</title><author>Dev Team</author><price>19.99</price></book></catalog>`;

type IndentOption = "2" | "4" | "tab";

export function XmlFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");

  const validation = useMemo(() => (input.trim() ? validateXml(input) : { valid: true }), [input]);

  const output = useMemo(() => {
    if (!input.trim() || !validation.valid) return "";
    const indentStr = indent === "tab" ? "\t" : " ".repeat(Number(indent));
    try {
      return formatXml(input, indentStr);
    } catch {
      return "";
    }
  }, [input, indent, validation.valid]);

  const [copied, setCopied] = useState(false);

  function handleMinify() {
    if (!validation.valid) return;
    setInput(minifyXml(input));
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.xml";
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
        <button onClick={() => setInput(SAMPLE_XML)} className="btn btn-secondary h-8 px-3 text-xs">
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
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your XML here..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
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
          <textarea
            value={output}
            readOnly
            placeholder="Formatted XML will appear here."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      {!validation.valid && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid XML</p>
          <p className="mt-1 whitespace-pre-wrap text-muted">{validation.error}</p>
        </div>
      )}
    </div>
  );
}
