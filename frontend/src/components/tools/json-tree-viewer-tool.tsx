"use client";

import { useMemo, useState } from "react";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{
  "name": "CodeSimplify",
  "version": 1.0,
  "active": true,
  "tags": ["json", "developer", "tools"],
  "author": { "name": "Dev Team", "url": "https://example.com" },
  "stars": null
}`;

function isContainer(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function collectContainerPaths(value: unknown, path: string, out: string[]) {
  if (Array.isArray(value)) {
    if (value.length > 0) out.push(path);
    value.forEach((item, i) => collectContainerPaths(item, `${path}[${i}]`, out));
  } else if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length > 0) out.push(path);
    entries.forEach(([key, val]) => collectContainerPaths(val, `${path}.${key}`, out));
  }
}

function valueLabel(value: unknown): { text: string; className: string } {
  if (value === null) return { text: "null", className: "tok-null" };
  if (typeof value === "string") return { text: `"${value}"`, className: "tok-string" };
  if (typeof value === "number") return { text: String(value), className: "tok-number" };
  if (typeof value === "boolean") return { text: String(value), className: "tok-boolean" };
  return { text: "", className: "" };
}

interface TreeNodeProps {
  keyName?: string;
  value: unknown;
  path: string;
  collapsed: Set<string>;
  toggle: (path: string) => void;
  depth: number;
}

function TreeNode({ keyName, value, path, collapsed, toggle, depth }: TreeNodeProps) {
  if (!isContainer(value)) {
    const label = valueLabel(value);
    return (
      <div className="py-0.5" style={{ paddingLeft: depth * 16 }}>
        {keyName !== undefined && <span className="tok-key mr-1.5">{keyName}:</span>}
        <span className={`font-mono text-sm ${label.className}`}>{label.text}</span>
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries = isArray
    ? (value as unknown[]).map((v, i) => [String(i), v] as const)
    : Object.entries(value as Record<string, unknown>);
  const isCollapsed = collapsed.has(path);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";

  return (
    <div>
      <div className="flex items-center gap-1.5 py-0.5" style={{ paddingLeft: depth * 16 }}>
        {entries.length > 0 ? (
          <button
            onClick={() => toggle(path)}
            aria-label={isCollapsed ? "Expand" : "Collapse"}
            className="flex h-4 w-4 shrink-0 items-center justify-center text-xs text-muted hover:text-foreground"
          >
            {isCollapsed ? "+" : "\u2212"}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}
        {keyName !== undefined && <span className="tok-key">{keyName}:</span>}
        <span className="font-mono text-sm text-muted">
          {openBracket}
          {isCollapsed && entries.length > 0 && (
            <span> {entries.length} {isArray ? "items" : "keys"} </span>
          )}
          {(isCollapsed || entries.length === 0) && closeBracket}
        </span>
      </div>
      {!isCollapsed &&
        entries.map(([key, val]) => (
          <TreeNode
            key={key}
            keyName={isArray ? undefined : key}
            value={val}
            path={isArray ? `${path}[${key}]` : `${path}.${key}`}
            collapsed={collapsed}
            toggle={toggle}
            depth={depth + 1}
          />
        ))}
      {!isCollapsed && entries.length > 0 && (
        <div className="font-mono text-sm text-muted" style={{ paddingLeft: depth * 16 + 20 }}>
          {closeBracket}
        </div>
      )}
    </div>
  );
}

export function JsonTreeViewerTool() {
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const result = useMemo(() => parseJson(input), [input]);

  function toggle(path: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  function expandAll() {
    setCollapsed(new Set());
  }

  function collapseAll() {
    if (result.error || result.data === undefined) return;
    const paths: string[] = [];
    collectContainerPaths(result.data, "$", paths);
    setCollapsed(new Set(paths));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_JSON)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <button onClick={expandAll} className="btn btn-secondary h-8 px-3 text-xs">
          Expand all
        </button>
        <button onClick={collapseAll} className="btn btn-secondary h-8 px-3 text-xs">
          Collapse all
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JSON input</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here to explore it as a tree..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Tree</div>
          <div className="h-96 overflow-auto bg-background p-3">
            {result.error || result.data === undefined ? (
              <p className="text-sm text-muted">Tree will appear here.</p>
            ) : (
              <TreeNode value={result.data} path="$" collapsed={collapsed} toggle={toggle} depth={0} />
            )}
          </div>
        </div>
      </div>

      {result.error && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid JSON</p>
          <p className="mt-1 text-muted">
            {result.error.message}
            {result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
