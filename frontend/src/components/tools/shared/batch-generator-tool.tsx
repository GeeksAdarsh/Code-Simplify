"use client";

import { type ReactNode, useEffect, useState } from "react";

interface BatchGeneratorToolProps {
  generate: () => string;
  controls?: ReactNode;
  countOptions?: number[];
  defaultCount?: number;
  monospace?: boolean;
}

export function BatchGeneratorTool({
  generate,
  controls,
  countOptions = [1, 5, 10, 20],
  defaultCount = 5,
  monospace = true,
}: BatchGeneratorToolProps) {
  const [count, setCount] = useState(defaultCount);
  const [items, setItems] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function regenerate() {
    setItems(Array.from({ length: count }, () => generate()));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, generate]);

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(items.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        {controls}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">How many</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {countOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button onClick={regenerate} className="btn btn-primary h-9 px-4 text-sm">
          Regenerate
        </button>
        <button onClick={handleCopyAll} disabled={items.length === 0} className="btn btn-secondary h-9 px-4 text-sm disabled:opacity-50">
          {copied === -1 ? "Copied all!" : "Copy all"}
        </button>
      </div>

      <div className="mt-4 card divide-y divide-border p-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className={`break-all text-sm ${monospace ? "font-mono" : ""}`}>{item}</span>
            <button onClick={() => handleCopy(item, i)} className="shrink-0 text-xs font-medium text-foreground">
              {copied === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
