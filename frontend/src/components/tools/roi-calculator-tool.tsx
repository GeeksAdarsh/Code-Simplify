"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateRoi, formatMoney } from "@/lib/finance-utils";

export function RoiCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [initialValue, setInitialValue] = useState(50000);
  const [finalValue, setFinalValue] = useState(65000);
  const [includeDuration, setIncludeDuration] = useState(false);
  const [years, setYears] = useState(2);

  const result = useMemo(
    () => calculateRoi(initialValue, finalValue, includeDuration ? years : undefined),
    [initialValue, finalValue, includeDuration, years]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div />

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Initial investment</span>
          <input type="number" min={0.01} value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Final / current value</span>
          <input type="number" min={0} value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="flex items-center gap-1.5 text-sm sm:col-span-2">
          <input type="checkbox" checked={includeDuration} onChange={(e) => setIncludeDuration(e.target.checked)} className="accent-foreground" />
          Also calculate annualized return (need holding period)
        </label>
        {includeDuration && (
          <label className="block text-xs sm:col-span-2">
            <span className="mb-1 block text-muted">Holding period: {years} year(s)</span>
            <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
          </label>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Gain / loss</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.gain)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">ROI</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.roiPercent.toFixed(2)}%</p>
        </div>
        {result.annualizedPercent !== null && (
          <div className="card p-4">
            <p className="text-xs text-muted">Annualized return</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{result.annualizedPercent.toFixed(2)}%</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        ROI = (Final Value &minus; Initial Value) / Initial Value &times; 100. It doesn't account for the time
        held unless you enable the annualized return option.
      </p>
    </div>
  );
}
