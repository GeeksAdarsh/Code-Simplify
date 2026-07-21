"use client";

import { useEffect, useState } from "react";
import { generateRandomFlag } from "@/lib/fun-random-utils";

export function RandomFlagTool() {
  const [count, setCount] = useState(6);
  const [flags, setFlags] = useState<ReturnType<typeof generateRandomFlag>[]>([]);

  function regenerate() {
    setFlags(Array.from({ length: count }, () => generateRandomFlag()));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

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
            {[1, 4, 6, 12, 20].map((n) => (
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

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {flags.map((flag, i) => (
          <div key={i} className="card flex flex-col items-center gap-2 p-4 text-center">
            <span className="text-4xl leading-none">{flag.emoji}</span>
            <span className="text-sm font-medium">{flag.country}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">
        Flags are rendered as standard Unicode emoji, so appearance may vary slightly by device and browser.
      </p>
    </div>
  );
}
