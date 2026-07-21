"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateCagr, formatMoney } from "@/lib/finance-utils";

export function CagrCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [years, setYears] = useState(5);

  const cagr = useMemo(() => calculateCagr(initialValue, finalValue, years), [initialValue, finalValue, years]);

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
          <span className="mb-1 block text-muted">Initial value</span>
          <input type="number" min={0.01} value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Final value</span>
          <input type="number" min={0} value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Duration: {years} year(s)</span>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 card p-4">
        <p className="text-xs text-muted">CAGR (Compound Annual Growth Rate)</p>
        <p className="mt-1 font-mono text-3xl font-semibold">{cagr.toFixed(2)}%</p>
        <p className="mt-1 text-xs text-muted">
          {currency}{formatMoney(initialValue)} grew to {currency}{formatMoney(finalValue)} over {years} year(s)
        </p>
      </div>

      <p className="mt-4 text-xs text-muted">
        CAGR = ((Final Value / Initial Value)^(1/years) &minus; 1) &times; 100. It smooths out year-to-year
        volatility into a single average annual growth rate.
      </p>
    </div>
  );
}
