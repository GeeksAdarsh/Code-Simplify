"use client";

import { useMemo, useState } from "react";
import { diffJson, stringifyValue } from "@/lib/json-diff";
import { xmlToJsObject } from "@/lib/xml-utils";

const SAMPLE_A = `<config>
  <name>CodeSimplify</name>
  <plan>free</plan>
  <seats>1</seats>
</config>`;

const SAMPLE_B = `<config>
  <name>CodeSimplify</name>
  <plan>pro</plan>
  <seats>5</seats>
</config>`;

export function XmlCompareTool() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const resultA = useMemo(() => xmlToJsObject(inputA), [inputA]);
  const resultB = useMemo(() => xmlToJsObject(inputB), [inputB]);
  const bothValid = Boolean(inputA.trim() && inputB.trim() && !resultA.error && !resultB.error);

  const diffs = useMemo(() => {
    if (!bothValid) return [];
    return diffJson(resultA.data, resultB.data);
  }, [bothValid, resultA.data, resultB.data]);

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
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">XML A (original)</div>
          <textarea
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Paste the original XML here..."
            spellCheck={false}
            className="h-72 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">XML B (changed)</div>
          <textarea
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Paste the changed XML here..."
            spellCheck={false}
            className="h-72 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      {(resultA.error || resultB.error) && (inputA.trim() || inputB.trim()) && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm text-muted">
          {resultA.error && <p>XML A error: {resultA.error}</p>}
          {resultB.error && <p>XML B error: {resultB.error}</p>}
        </div>
      )}

      {bothValid && (
        <div className="mt-4">
          <div className="mb-3">
            <span className="badge border-foreground text-foreground">
              {diffs.length === 0 ? "No differences" : `${diffs.length} difference${diffs.length === 1 ? "" : "s"}`}
            </span>
          </div>
          {diffs.length > 0 && (
            <ul className="space-y-2">
              {diffs.map((entry, i) => (
                <li key={i} className="card border-foreground/40 px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge">
                      {entry.type === "added" ? "+ added" : entry.type === "removed" ? "\u2212 removed" : "~ changed"}
                    </span>
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
        </div>
      )}
    </div>
  );
}
