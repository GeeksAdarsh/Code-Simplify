"use client";

import { useMemo, useState } from "react";
import { diffJson, stringifyValue } from "@/lib/json-diff";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_A = `{
  "id": 101,
  "name": "CodeSimplify",
  "plan": "free",
  "seats": 1
}`;

const SAMPLE_B = `{
  "id": 101,
  "name": "CodeSimplify",
  "plan": "pro",
  "seats": 5
}`;

export function JsonCompareTool() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const resultA = useMemo(() => parseJson(inputA), [inputA]);
  const resultB = useMemo(() => parseJson(inputB), [inputB]);
  const bothValid = Boolean(inputA.trim() && inputB.trim() && !resultA.error && !resultB.error);

  const rows = useMemo(() => {
    if (!bothValid) return [];
    const a = resultA.data as Record<string, unknown>;
    const b = resultB.data as Record<string, unknown>;
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
      const equal = JSON.stringify(a) === JSON.stringify(b);
      return [{ key: "$", equal, valueA: a, valueB: b }];
    }
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return Array.from(keys).map((key) => {
      const diffs = diffJson(a[key], b[key], key);
      return { key, equal: diffs.length === 0, valueA: a[key], valueB: b[key] };
    });
  }, [bothValid, resultA.data, resultB.data]);

  const equalCount = rows.filter((r) => r.equal).length;

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
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JSON A</div>
          <textarea
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Paste the first JSON here..."
            spellCheck={false}
            className="h-64 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JSON B</div>
          <textarea
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Paste the second JSON here..."
            spellCheck={false}
            className="h-64 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      {(resultA.error || resultB.error) && (inputA.trim() || inputB.trim()) && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm text-muted">
          {resultA.error && <p>JSON A error: {resultA.error.message}</p>}
          {resultB.error && <p>JSON B error: {resultB.error.message}</p>}
        </div>
      )}

      {bothValid && (
        <div className="mt-4">
          <div className="mb-3">
            <span className="badge border-foreground text-foreground">
              {equalCount === rows.length ? "Identical" : `${equalCount}/${rows.length} fields match`}
            </span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left text-xs text-muted">
                  <th className="px-3 py-2 font-medium">Key</th>
                  <th className="px-3 py-2 font-medium">A</th>
                  <th className="px-3 py-2 font-medium">B</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-2 font-mono text-xs">{row.key}</td>
                    <td className="max-w-xs truncate px-3 py-2 font-mono text-xs text-muted">
                      {stringifyValue(row.valueA)}
                    </td>
                    <td className="max-w-xs truncate px-3 py-2 font-mono text-xs text-muted">
                      {stringifyValue(row.valueB)}
                    </td>
                    <td className="px-3 py-2">
                      <span className="badge">{row.equal ? "match" : "differs"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
