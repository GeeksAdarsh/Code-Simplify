"use client";

import { useState } from "react";
import { generateRandomInt } from "@/lib/random-utils";

export function NumberPickerTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [avoidRepeat, setAvoidRepeat] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [picking, setPicking] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  function pick() {
    if (picking) return;
    setPicking(true);
    setTimeout(() => {
      let value = generateRandomInt(min, max);
      if (avoidRepeat && history.length < Math.abs(max - min) + 1) {
        let attempts = 0;
        while (history.includes(value) && attempts < 200) {
          value = generateRandomInt(min, max);
          attempts++;
        }
      }
      setResult(value);
      setHistory((h) => [value, ...h].slice(0, 30));
      setPicking(false);
    }, 350);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
        <label className="flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={avoidRepeat} onChange={(e) => setAvoidRepeat(e.target.checked)} className="accent-foreground" />
          Avoid recent repeats
        </label>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-foreground/20 bg-surface text-4xl font-bold">
          {picking ? "\u2026" : result ?? "?"}
        </div>
        <button onClick={pick} disabled={picking} className="btn btn-primary mt-6 h-10 px-6 text-sm disabled:opacity-50">
          {picking ? "Picking\u2026" : "Pick a Number"}
        </button>
      </div>

      {history.length > 1 && (
        <div className="mt-6">
          <p className="mb-2 text-center text-xs text-muted">Recent picks</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {history.slice(1).map((n, i) => (
              <span key={i} className="rounded border border-border px-2 py-1 text-xs font-mono">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
