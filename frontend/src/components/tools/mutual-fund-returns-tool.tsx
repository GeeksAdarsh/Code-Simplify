"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateMutualFundReturns, formatMoney } from "@/lib/finance-utils";

export function MutualFundReturnsTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [units, setUnits] = useState(500);
  const [purchaseNav, setPurchaseNav] = useState(20);
  const [currentNav, setCurrentNav] = useState(28);
  const [includeDuration, setIncludeDuration] = useState(true);
  const [years, setYears] = useState(3);

  const result = useMemo(
    () => calculateMutualFundReturns(units, purchaseNav, currentNav, includeDuration ? years : undefined),
    [units, purchaseNav, currentNav, includeDuration, years]
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
          <span className="mb-1 block text-muted">Units held</span>
          <input type="number" min={0} value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Purchase NAV</span>
          <input type="number" min={0} value={purchaseNav} onChange={(e) => setPurchaseNav(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current NAV</span>
          <input type="number" min={0} value={currentNav} onChange={(e) => setCurrentNav(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="flex items-center gap-1.5 text-sm sm:col-span-2">
          <input type="checkbox" checked={includeDuration} onChange={(e) => setIncludeDuration(e.target.checked)} className="accent-foreground" />
          Also calculate annualized return
        </label>
        {includeDuration && (
          <label className="block text-xs sm:col-span-2">
            <span className="mb-1 block text-muted">Holding period: {years} year(s)</span>
            <input type="range" min={1} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
          </label>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Invested value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.investedValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Current value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.currentValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Absolute return</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.absoluteReturnPercent.toFixed(2)}%</p>
        </div>
        {result.annualizedReturnPercent !== null && (
          <div className="card p-4">
            <p className="text-xs text-muted">Annualized return (CAGR)</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{result.annualizedReturnPercent.toFixed(2)}%</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        Enter your units held plus the NAV (Net Asset Value) at purchase and today, from your fund statement or
        app, to see your gain and return percentage.
      </p>
    </div>
  );
}
