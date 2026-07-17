"use client";

import { useEffect, useState } from "react";
import { generateRandomInt, generateUniqueRandomInts } from "@/lib/random-utils";

export function RandomNumberTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const range = Math.abs(max - min) + 1;
  const invalidUnique = unique && count > range;

  function regenerate() {
    if (unique) {
      setNumbers(generateUniqueRandomInts(min, max, count));
    } else {
      setNumbers(Array.from({ length: count }, () => generateRandomInt(min, max)));
    }
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, count, unique]);

  function handleCopy(value: number, index: number) {
    navigator.clipboard.writeText(String(value));
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(numbers.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
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
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">How many</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="accent-foreground" />
          No duplicates
        </label>
        <button onClick={regenerate} disabled={invalidUnique} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
          Regenerate
        </button>
        <button onClick={handleCopyAll} disabled={numbers.length === 0} className="btn btn-secondary h-9 px-4 text-sm disabled:opacity-50">
          {copied === -1 ? "Copied all!" : "Copy all"}
        </button>
      </div>

      {invalidUnique && (
        <p className="mt-2 text-xs text-muted">
          The range [{min}, {max}] only contains {range} unique values \u2014 reduce the count or widen the range.
        </p>
      )}

      <div className="mt-4 card divide-y divide-border p-0">
        {numbers.map((n, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="font-mono text-sm">{n}</span>
            <button onClick={() => handleCopy(n, i)} className="shrink-0 text-xs font-medium text-foreground">
              {copied === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">
        Numbers are generated using your browser&apos;s cryptographically secure random number generator, not
        Math.random().
      </p>
    </div>
  );
}
