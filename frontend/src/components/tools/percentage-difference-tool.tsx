"use client";

import { useMemo, useState } from "react";
import { percentageChange, percentageDifference } from "@/lib/number-utils";

export function PercentageDifferenceTool() {
  const [a, setA] = useState("80");
  const [b, setB] = useState("100");

  const diff = useMemo(() => percentageDifference(parseFloat(a), parseFloat(b)), [a, b]);
  const change = useMemo(() => percentageChange(parseFloat(a), parseFloat(b)), [a, b]);
  const valid = !Number.isNaN(diff) && !Number.isNaN(change);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Value A</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Value B</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Percentage difference</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{valid ? `${diff.toLocaleString(undefined, { maximumFractionDigits: 4 })}%` : "—"}</p>
          <p className="mt-2 text-xs text-muted">Symmetric difference relative to the average of A and B. Order doesn&apos;t matter.</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Percentage change (A → B)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">
            {valid ? `${change >= 0 ? "+" : ""}${change.toLocaleString(undefined, { maximumFractionDigits: 4 })}%` : "—"}
          </p>
          <p className="mt-2 text-xs text-muted">Relative to A. Positive means B is larger; negative means B is smaller.</p>
        </div>
      </div>
    </div>
  );
}
