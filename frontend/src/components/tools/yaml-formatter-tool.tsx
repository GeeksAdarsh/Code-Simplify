"use client";

import { useMemo, useState } from "react";
import { dump } from "js-yaml";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { parseYaml } from "@/lib/yaml-utils";

const SAMPLE_YAML = `name: CodeSimplify
version: 1.0
active: true
tags:
  - json
  - developer
  - tools
author:
  name: Dev Team
  url: https://example.com
stars: null`;

type IndentOption = "2" | "4";

export function YamlFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [flowStyle, setFlowStyle] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => (input.trim() ? parseYaml(input) : { data: undefined }), [input]);

  const output = useMemo(() => {
    if (!input.trim() || result.error || result.data === undefined) return "";
    try {
      return dump(result.data, { indent: Number(indent), flowLevel: flowStyle ? 0 : -1, lineWidth: -1 });
    } catch {
      return "";
    }
  }, [input, indent, flowStyle, result]);

  function handleFormat() {
    if (output) setInput(output);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/x-yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.yaml";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={handleFormat} disabled={!output} className="btn btn-primary h-8 px-3 text-xs disabled:opacity-50">
          Format
        </button>
        <button onClick={() => setInput(SAMPLE_YAML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input
              type="checkbox"
              checked={flowStyle}
              onChange={(e) => setFlowStyle(e.target.checked)}
              className="accent-foreground"
            />
            Compact (flow) style
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
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="yaml" placeholder="Paste your YAML here..." height="24rem" />
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
          <CodeEditor value={output} readOnly language="yaml" placeholder="Formatted YAML will appear here." height="24rem" />
        </div>
      </div>

      {result.error && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid YAML</p>
          <p className="mt-1 text-muted">
            {result.error.message}
            {result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
