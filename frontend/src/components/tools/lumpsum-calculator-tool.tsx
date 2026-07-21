"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateLumpsumFutureValue, formatMoney } from "@/lib/finance-utils";

export function LumpsumCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [principal, setPrincipal] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateLumpsumFutureValue(principal, returnRate, years), [principal, returnRate, years]);

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
          <span className="mb-1 block text-muted">One-time investment amount</span>
          <input type="number" min={0} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Expected annual return: {returnRate}%</span>
          <input type="range" min={1} max={30} step={0.5} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Duration: {years} year(s)</span>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Future value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.futureValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Invested amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInvested)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Wealth gained</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.gain)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Uses annual compounding at a constant assumed rate of return. Actual investment returns vary year to year,
        so treat this as a planning estimate.
      </p>
    </div>
  );
}
