"use client";

import { useEffect, useState } from "react";
import { generateRandomHexColor } from "@/lib/random-utils";

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}

export function RandomColorTool() {
  const [count, setCount] = useState(8);
  const [colors, setColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function regenerate() {
    setColors(Array.from({ length: count }, () => generateRandomHexColor()));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handleCopy(hex: string, index: number) {
    navigator.clipboard.writeText(hex);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">How many</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {[1, 4, 8, 16, 24].map((n) => (
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

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {colors.map((hex, i) => (
          <button
            key={i}
            onClick={() => handleCopy(hex, i)}
            className="card overflow-hidden p-0 text-left transition-transform hover:scale-[1.02]"
          >
            <div className="h-20 w-full" style={{ backgroundColor: hex }} />
            <div className="p-2.5">
              <p className="font-mono text-sm font-medium">{copied === i ? "Copied!" : hex.toUpperCase()}</p>
              <p className="text-xs text-muted">{hexToRgb(hex)}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">Click any swatch to copy its HEX code. Colors are fully random — not curated palettes.</p>
    </div>
  );
}
