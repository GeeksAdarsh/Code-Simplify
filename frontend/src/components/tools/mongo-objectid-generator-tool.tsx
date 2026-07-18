"use client";

import { useEffect, useState } from "react";
import { decodeObjectId, generateObjectId } from "@/lib/mongo-utils";

export function MongoObjectIdGeneratorTool() {
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const [decodeInput, setDecodeInput] = useState("");

  function regenerate() {
    setIds(Array.from({ length: count }, () => generateObjectId()));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  const decoded = decodeInput.trim() ? decodeObjectId(decodeInput) : null;

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-sm font-semibold">Generate ObjectIds</h3>
        <div className="card flex flex-wrap items-end gap-4 p-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">How many</label>
            <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded border border-border bg-background px-2.5 py-1.5 text-sm">
              {[1, 5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button onClick={regenerate} className="btn btn-primary h-9 px-4 text-sm">
            Regenerate
          </button>
        </div>
        <div className="mt-4 card divide-y divide-border p-0">
          {ids.map((id, i) => (
            <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="font-mono text-sm">{id}</span>
              <button onClick={() => handleCopy(id, i)} className="shrink-0 text-xs font-medium text-foreground">
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Decode an ObjectId</h3>
        <input
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="Paste a 24-character ObjectId here..."
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-foreground"
        />
        {decoded && "error" in decoded && (
          <div className="card mt-3 border-foreground/30 px-4 py-3 text-sm text-muted">{decoded.error}</div>
        )}
        {decoded && !("error" in decoded) && (
          <div className="card mt-3 overflow-hidden p-0">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
              <span className="text-muted">Creation timestamp</span>
              <span className="font-mono">{decoded.timestamp.toISOString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
              <span className="text-muted">Random value</span>
              <span className="font-mono">{decoded.randomValue}</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <span className="text-muted">Counter</span>
              <span className="font-mono">{decoded.counter}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
