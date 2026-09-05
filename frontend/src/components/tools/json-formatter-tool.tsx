"use client";

import { useMemo, useRef, useState, type DragEvent } from "react";
import { CodeEditor } from "@/components/code-editor";
import { JsonTreeView, type JsonTreeViewHandle } from "@/components/json-tree-view";
import { computeJsonStats, formatBytes } from "@/lib/json-stats";

const SAMPLE_JSON = `{"name":"CodeSimplify","version":1.0,"active":true,"tags":["json","developer","tools"],"author":{"name":"Dev Team","url":"https://example.com"},"stars":null}`;

type IndentOption = "2" | "4" | "tab";
type OutputTab = "text" | "tree" | "raw" | "minified";
type SearchMode = "keys" | "values";

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

const TABS: { id: OutputTab; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "tree", label: "Tree" },
  { id: "raw", label: "Raw" },
  { id: "minified", label: "Minified" },
];

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputTab>("text");
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("keys");
  const [matchCount, setMatchCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const treeRef = useRef<JsonTreeViewHandle>(null);

  const parsed = useMemo(() => {
    if (!input.trim()) {
      return { value: undefined as unknown, formatted: "", minified: "", error: null as { message: string; line?: number; column?: number } | null };
    }
    try {
      let value = JSON.parse(input);
      if (sortKeys) value = sortObjectKeys(value);
      const formatted = JSON.stringify(value, null, indentString(indent));
      const minified = JSON.stringify(value);
      return { value, formatted, minified, error: null };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      const location = locateError(input, message);
      return {
        value: undefined,
        formatted: "",
        minified: "",
        error: { message, line: location?.line, column: location?.column },
      };
    }
  }, [input, indent, sortKeys]);

  const { value: parsedValue, formatted: output, minified, error } = parsed;

  const stats = useMemo(() => {
    if (error || !output) return null;
    return computeJsonStats(parsedValue, output);
  }, [parsedValue, output, error]);

  const activeContent = activeTab === "minified" ? minified : output;

  function loadTextIntoInput(text: string) {
    setInput(text);
    setActiveTab("text");
  }

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") loadTextIntoInput(reader.result);
    };
    reader.readAsText(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }

  function handleFormat() {
    if (output) setInput(output);
  }

  function handleMinify() {
    if (minified) setInput(minified);
  }

  function handleCopy() {
    if (!activeContent) return;
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!activeContent) return;
    const blob = new Blob([activeContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeTab === "minified" ? "minified.json" : "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={handleFormat} disabled={!output} className="btn btn-primary h-8 px-3 text-xs disabled:opacity-50">
          Format
        </button>
        <button onClick={handleMinify} disabled={!minified} className="btn btn-secondary h-8 px-3 text-xs disabled:opacity-50">
          Minify
        </button>
        <button onClick={() => loadTextIntoInput(SAMPLE_JSON)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>

        <div className="ml-auto flex flex-wrap items-center gap-3">
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
        <div
          className="relative flex flex-col border-b border-border sm:border-b-0 sm:border-r"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Input</span>
            <div className="flex items-center gap-3">
              <span>{new TextEncoder().encode(input).length.toLocaleString()} bytes</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-medium text-foreground hover:underline"
              >
                Upload .json
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="json"
            placeholder="Paste JSON here, or drag & drop a .json file..."
          />
          {isDragging && (
            <div className="pointer-events-none absolute inset-0 top-8 flex items-center justify-center border-2 border-dashed border-foreground bg-background/90">
              <p className="text-sm font-medium">Drop JSON file here</p>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <div className="flex items-center gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`rounded px-2 py-1 font-medium transition-colors ${
                    activeTab === t.id ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleCopy} disabled={!activeContent} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} disabled={!activeContent} className="font-medium text-foreground disabled:text-muted">
                Download
              </button>
            </div>
          </div>

          {activeTab === "tree" && !error && parsedValue !== undefined && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-3 py-1.5">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchMode === "keys" ? "Search keys..." : "Search values..."}
                className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-xs outline-none"
              />
              <select
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value as SearchMode)}
                className="rounded border border-border bg-background px-1.5 py-1 text-xs text-foreground"
              >
                <option value="keys">Keys</option>
                <option value="values">Values</option>
              </select>
              {searchTerm && <span className="text-xs text-muted">{matchCount} match{matchCount === 1 ? "" : "es"}</span>}
              <button onClick={() => treeRef.current?.expandAll()} className="btn btn-secondary h-7 px-2 text-xs">
                Expand All
              </button>
              <button onClick={() => treeRef.current?.collapseAll()} className="btn btn-secondary h-7 px-2 text-xs">
                Collapse All
              </button>
            </div>
          )}

          {activeTab === "text" && <CodeEditor value={output} language="json" readOnly placeholder="Formatted JSON will appear here." />}

          {activeTab === "tree" &&
            (error || parsedValue === undefined ? (
              <div className="tool-workspace-height flex items-center justify-center px-4 text-center text-sm text-muted">
                {input.trim() ? "Fix the JSON errors to see the tree view." : "Enter JSON to see the tree view."}
              </div>
            ) : (
              <JsonTreeView
                ref={treeRef}
                data={parsedValue}
                searchTerm={searchTerm}
                searchMode={searchMode}
                onMatchCountChange={setMatchCount}
              />
            ))}

          {activeTab === "raw" && (
            <pre className="scrollbar-thin tool-workspace-height w-full overflow-auto whitespace-pre-wrap break-words bg-background p-3 font-mono text-sm">
              {output || "Formatted JSON will appear here."}
            </pre>
          )}

          {activeTab === "minified" && (
            <pre className="scrollbar-thin tool-workspace-height w-full overflow-auto whitespace-pre-wrap break-words bg-background p-3 font-mono text-sm">
              {minified || "Minified JSON will appear here."}
            </pre>
          )}
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

      {stats && (
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 text-center sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Objects" value={stats.objects.toLocaleString()} />
          <Stat label="Arrays" value={stats.arrays.toLocaleString()} />
          <Stat label="Keys" value={stats.keys.toLocaleString()} />
          <Stat label="Characters" value={stats.characters.toLocaleString()} />
          <Stat label="Size" value={formatBytes(stats.bytes)} />
          <Stat label="Depth" value={stats.depth.toLocaleString()} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
