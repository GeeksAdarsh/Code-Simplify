"use client";

import { useMemo, useState } from "react";
import { diffJson, stringifyValue, type DiffEntry } from "@/lib/json-diff";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_A = `{
  "name": "CodeSimplify",
  "version": 1.0,
  "active": true,
  "tags": ["json", "tools"]
}`;

const SAMPLE_B = `{
  "name": "CodeSimplify Pro",
  "version": 2.0,
  "active": true,
  "tags": ["json", "tools", "yaml"],
  "beta": true
}`;

const typeStyles: Record<DiffEntry["type"], { label: string; className: string }> = {
  added: { label: "+ added", className: "border-foreground/40" },
  removed: { label: "\u2212 removed", className: "border-foreground/40" },
  changed: { label: "~ changed", className: "border-foreground/40" },
};

export function JsonDiffTool() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const resultA = useMemo(() => parseJson(inputA), [inputA]);
  const resultB = useMemo(() => parseJson(inputB), [inputB]);

  const diffs = useMemo(() => {
    if (!inputA.trim() || !inputB.trim() || resultA.error || resultB.error) return [];
    return diffJson(resultA.data, resultB.data);
  }, [inputA, inputB, resultA, resultB]);

  function loadSample() {
    setInputA(SAMPLE_A);
    setInputB(SAMPLE_B);
  }

  function clear() {
    setInputA("");
    setInputB("");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={clear} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JSON A (original)</div>
          <textarea
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Paste the original JSON here..."
            spellCheck={false}
            className="h-72 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
          {resultA.error && (
            <p className="border-t border-border px-3 py-2 text-xs text-muted">Invalid JSON: {resultA.error.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JSON B (changed)</div>
          <textarea
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Paste the changed JSON here..."
            spellCheck={false}
            className="h-72 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
          {resultB.error && (
            <p className="border-t border-border px-3 py-2 text-xs text-muted">Invalid JSON: {resultB.error.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {inputA.trim() && inputB.trim() && !resultA.error && !resultB.error && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <span className="badge border-foreground text-foreground">
                {diffs.length === 0 ? "No differences" : `${diffs.length} difference${diffs.length === 1 ? "" : "s"}`}
              </span>
            </div>
            {diffs.length > 0 && (
              <ul className="space-y-2">
                {diffs.map((entry, i) => (
                  <li key={i} className={`card px-4 py-3 text-sm ${typeStyles[entry.type].className}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge">{typeStyles[entry.type].label}</span>
                      <code className="font-mono text-xs text-muted">{entry.path}</code>
                    </div>
                    <div className="mt-2 grid gap-1 font-mono text-xs">
                      {entry.type !== "added" && (
                        <div className="text-muted">
                          <span className="mr-1">A:</span>
                          {stringifyValue(entry.oldValue)}
                        </div>
                      )}
                      {entry.type !== "removed" && (
                        <div>
                          <span className="mr-1 text-muted">B:</span>
                          {stringifyValue(entry.newValue)}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
