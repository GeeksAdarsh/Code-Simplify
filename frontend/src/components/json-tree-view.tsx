"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useState, type ReactNode } from "react";

export interface JsonTreeViewHandle {
  expandAll: () => void;
  collapseAll: () => void;
}

interface JsonTreeViewProps {
  data: unknown;
  searchTerm?: string;
  searchMode?: "keys" | "values";
  onMatchCountChange?: (count: number) => void;
}

type JsonType = "object" | "array" | "string" | "number" | "boolean" | "null";

function getType(value: unknown): JsonType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "object") return "object";
  return t as JsonType;
}

function isContainer(type: JsonType) {
  return type === "object" || type === "array";
}

function entriesOf(value: unknown, type: JsonType): [string, unknown][] {
  if (type === "array") return (value as unknown[]).map((v, i) => [String(i), v]);
  return Object.entries(value as Record<string, unknown>);
}

function renderPrimitive(value: unknown, type: JsonType): string {
  if (type === "string") return `"${value as string}"`;
  if (type === "null") return "null";
  return String(value);
}

function primitiveClass(type: JsonType): string {
  switch (type) {
    case "string":
      return "tok-string";
    case "number":
      return "tok-number";
    case "boolean":
      return "tok-boolean";
    case "null":
      return "tok-null";
    default:
      return "";
  }
}

function collectContainerPaths(value: unknown, path: string, acc: Set<string>) {
  const type = getType(value);
  if (!isContainer(type)) return;
  acc.add(path);
  for (const [key, child] of entriesOf(value, type)) {
    collectContainerPaths(child, `${path}.${key}`, acc);
  }
}

function collectMatches(
  value: unknown,
  path: string,
  key: string | null,
  term: string,
  mode: "keys" | "values",
  matches: Set<string>,
  ancestorsToExpand: Set<string>
) {
  const type = getType(value);
  const lower = term.toLowerCase();
  const isMatch =
    mode === "keys"
      ? key !== null && key.toLowerCase().includes(lower)
      : !isContainer(type) && renderPrimitive(value, type).toLowerCase().includes(lower);

  if (isMatch) {
    matches.add(path);
    const parts = path.split(".");
    for (let i = 1; i < parts.length; i++) {
      ancestorsToExpand.add(parts.slice(0, i).join("."));
    }
  }

  if (isContainer(type)) {
    for (const [k, child] of entriesOf(value, type)) {
      collectMatches(child, `${path}.${k}`, k, term, mode, matches, ancestorsToExpand);
    }
  }
}

function highlight(text: string, term: string): ReactNode {
  if (!term) return text;
  const lower = text.toLowerCase();
  const needle = term.toLowerCase();
  const parts: ReactNode[] = [];
  let start = 0;

  while (start < text.length) {
    const idx = lower.indexOf(needle, start);
    if (idx === -1) {
      parts.push(text.slice(start));
      break;
    }
    if (idx > start) parts.push(text.slice(start, idx));
    parts.push(
      <mark key={`${idx}-${start}`} className="tok-match">
        {text.slice(idx, idx + term.length)}
      </mark>
    );
    start = idx + term.length;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

interface NodeProps {
  nodeKey: string | null;
  isArrayIndex: boolean;
  value: unknown;
  path: string;
  depth: number;
  isLast: boolean;
  collapsed: Set<string>;
  onToggle: (path: string) => void;
  searchTerm: string;
  searchMode: "keys" | "values";
  matches: Set<string>;
}

function JsonNode({
  nodeKey,
  isArrayIndex,
  value,
  path,
  depth,
  isLast,
  collapsed,
  onToggle,
  searchTerm,
  searchMode,
  matches,
}: NodeProps) {
  const type = getType(value);
  const container = isContainer(type);
  const isMatch = matches.has(path);
  const indent = depth * 16;

  const keyLabel =
    nodeKey === null ? null : isArrayIndex ? (
      <span className="text-muted">{nodeKey}: </span>
    ) : (
      <span className="tok-key">
        &quot;{searchMode === "keys" ? highlight(nodeKey, searchTerm) : nodeKey}&quot;
      </span>
    );

  if (!container) {
    const text = renderPrimitive(value, type);
    return (
      <div
        className={`flex gap-1 py-0.5 font-mono text-xs leading-relaxed ${isMatch ? "bg-foreground/5" : ""}`}
        style={{ paddingLeft: indent + 20 }}
      >
        {keyLabel}
        {nodeKey !== null && !isArrayIndex && <span className="text-muted">: </span>}
        <span className={primitiveClass(type)}>
          {searchMode === "values" ? highlight(text, searchTerm) : text}
        </span>
        {!isLast && <span className="text-muted">,</span>}
      </div>
    );
  }

  const entries = entriesOf(value, type);
  const [open, close] = type === "array" ? ["[", "]"] : ["{", "}"];
  const isCollapsed = collapsed.has(path);

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-0.5 font-mono text-xs ${isMatch ? "bg-foreground/5" : ""}`}
        style={{ paddingLeft: indent }}
      >
        <button
          type="button"
          onClick={() => onToggle(path)}
          className="w-4 shrink-0 text-muted hover:text-foreground"
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? "\u25b6" : "\u25bc"}
        </button>
        {keyLabel}
        {nodeKey !== null && !isArrayIndex && <span className="text-muted">: </span>}
        <span className="text-muted">{open}</span>
        {isCollapsed && (
          <>
            <span className="italic text-muted">
              {" "}
              {entries.length} {entries.length === 1 ? "item" : "items"}{" "}
            </span>
            <span className="text-muted">{close}</span>
            {!isLast && <span className="text-muted">,</span>}
          </>
        )}
        {!isCollapsed && entries.length === 0 && (
          <>
            <span className="text-muted">{close}</span>
            {!isLast && <span className="text-muted">,</span>}
          </>
        )}
      </div>
      {!isCollapsed && entries.length > 0 && (
        <>
          {entries.map(([k, v], i) => (
            <JsonNode
              key={k}
              nodeKey={k}
              isArrayIndex={type === "array"}
              value={v}
              path={`${path}.${k}`}
              depth={depth + 1}
              isLast={i === entries.length - 1}
              collapsed={collapsed}
              onToggle={onToggle}
              searchTerm={searchTerm}
              searchMode={searchMode}
              matches={matches}
            />
          ))}
          <div className="font-mono text-xs text-muted" style={{ paddingLeft: indent + 20 }}>
            {close}
            {!isLast && ","}
          </div>
        </>
      )}
    </div>
  );
}

export const JsonTreeView = forwardRef<JsonTreeViewHandle, JsonTreeViewProps>(function JsonTreeView(
  { data, searchTerm = "", searchMode = "keys", onMatchCountChange },
  ref
) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    const type = getType(data);
    if (isContainer(type)) {
      for (const [key, child] of entriesOf(data, type)) {
        collectContainerPaths(child, `root.${key}`, initial);
      }
    }
    return initial;
  });

  useImperativeHandle(ref, () => ({
    expandAll: () => setCollapsed(new Set()),
    collapseAll: () => {
      const all = new Set<string>();
      collectContainerPaths(data, "root", all);
      setCollapsed(all);
    },
  }));

  const { matches, mustExpand } = useMemo(() => {
    const m = new Set<string>();
    const expand = new Set<string>();
    if (searchTerm.trim()) {
      collectMatches(data, "root", null, searchTerm.trim(), searchMode, m, expand);
    }
    return { matches: m, mustExpand: expand };
  }, [data, searchTerm, searchMode]);

  useEffect(() => {
    onMatchCountChange?.(matches.size);
  }, [matches, onMatchCountChange]);

  const effectiveCollapsed = useMemo(() => {
    if (mustExpand.size === 0) return collapsed;
    const next = new Set(collapsed);
    for (const p of mustExpand) next.delete(p);
    return next;
  }, [collapsed, mustExpand]);

  function handleToggle(path: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  const rootType = getType(data);

  return (
    <div className="scrollbar-thin tool-workspace-height overflow-auto bg-background p-3">
      <JsonNode
        nodeKey={null}
        isArrayIndex={false}
        value={data}
        path="root"
        depth={0}
        isLast
        collapsed={effectiveCollapsed}
        onToggle={handleToggle}
        searchTerm={searchTerm.trim()}
        searchMode={searchMode}
        matches={matches}
      />
      {!isContainer(rootType) && (
        <p className="mt-2 text-xs text-muted">Tree view works best with object or array JSON.</p>
      )}
    </div>
  );
});
