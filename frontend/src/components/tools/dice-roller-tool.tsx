"use client";

import { useState } from "react";
import { generateRandomInt } from "@/lib/random-utils";

const DIE_TYPES = [4, 6, 8, 10, 12, 20];

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
};

function DieFace({ value, sides }: { value: number; sides: number }) {
  if (sides === 6) {
    return (
      <div className="relative h-16 w-16 rounded-lg border-2 border-foreground/30 bg-surface shadow-sm">
        {PIPS[value]?.map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-foreground/30 bg-surface text-xl font-bold shadow-sm">
      {value}
    </div>
  );
}

export function DiceRollerTool() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [values, setValues] = useState<number[]>([4, 6]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      setValues(Array.from({ length: count }, () => generateRandomInt(1, sides)));
      setRolling(false);
    }, 450);
  }

  const total = values.reduce((sum, v) => sum + v, 0);

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Die type</label>
          <select
            value={sides}
            onChange={(e) => setSides(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {DIE_TYPES.map((s) => (
              <option key={s} value={s}>
                D{s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Number of dice</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button onClick={roll} disabled={rolling} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
          {rolling ? "Rolling\u2026" : "Roll"}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {values.map((v, i) => (
          <div key={i} className={rolling ? "animate-spin" : ""} style={{ animationDuration: "0.15s" }}>
            <DieFace value={rolling ? generateRandomInt(1, sides) : v} sides={sides} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <p className="mt-4 text-center text-sm text-muted">
          Total: <span className="font-semibold text-foreground">{total}</span>
        </p>
      )}
    </div>
  );
}
