"use client";

import { useMemo, useState } from "react";
import { percentageChange, percentageOf, whatPercent } from "@/lib/number-utils";

type Mode = "of" | "isWhatPercent" | "change";

const MODES: { value: Mode; label: string }[] = [
  { value: "of", label: "X% of Y" },
  { value: "isWhatPercent", label: "X is what % of Y" },
  { value: "change", label: "% increase/decrease from X to Y" },
];

export function PercentageCalculatorTool() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("20");
  const [y, setY] = useState("150");

  const result = useMemo(() => {
    const xn = parseFloat(x);
    const yn = parseFloat(y);
    if (Number.isNaN(xn) || Number.isNaN(yn)) return null;
    if (mode === "of") return percentageOf(xn, yn);
    if (mode === "isWhatPercent") return whatPercent(xn, yn);
    return percentageChange(xn, yn);
  }, [mode, x, y]);

  const sentence = useMemo(() => {
    if (result === null || Number.isNaN(result)) return null;
    if (mode === "of") return `${x}% of ${y} is ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}.`;
    if (mode === "isWhatPercent") return `${x} is ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}% of ${y}.`;
    return `Going from ${x} to ${y} is a ${result >= 0 ? "increase" : "decrease"} of ${Math.abs(result).toLocaleString(undefined, { maximumFractionDigits: 4 })}%.`;
  }, [mode, x, y, result]);

  return (
    <div>
      <label className="mb-4 block text-xs">
        <span className="mb-1 block text-muted">Calculation</span>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm sm:w-auto"
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">
            {mode === "of" ? "Percent (X%)" : mode === "isWhatPercent" ? "Value (X)" : "Original value (X)"}
          </span>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">
            {mode === "of" ? "Of value (Y)" : mode === "isWhatPercent" ? "Total (Y)" : "New value (Y)"}
          </span>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
      </div>

      <div className="card mt-4 p-4">
        <p className="text-xs text-muted">Result</p>
        <p className="mt-1 font-mono text-3xl font-semibold">
          {result === null || Number.isNaN(result) ? "\u2014" : `${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}${mode !== "of" ? "%" : ""}`}
        </p>
        {sentence && <p className="mt-2 text-sm text-muted">{sentence}</p>}
      </div>
    </div>
  );
}
