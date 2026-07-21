"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateFire } from "@/lib/finance-extra-utils";

export function FireCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [annualExpenses, setAnnualExpenses] = useState(600000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(30000);
  const [returnRate, setReturnRate] = useState(10);

  const result = useMemo(
    () => calculateFire(annualExpenses, withdrawalRate, currentSavings, monthlySavings, returnRate),
    [annualExpenses, withdrawalRate, currentSavings, monthlySavings, returnRate]
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
          <span className="mb-1 block text-muted">Current annual expenses</span>
          <input type="number" min={0} value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Safe withdrawal rate: {withdrawalRate}%</span>
          <input type="range" min={2} max={6} step={0.25} value={withdrawalRate} onChange={(e) => setWithdrawalRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current savings/investments</span>
          <input type="number" min={0} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Monthly savings</span>
          <input type="number" min={0} value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Expected annual return: {returnRate}%</span>
          <input type="range" min={2} max={16} step={0.5} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Your FIRE number</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.fireNumber)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Years to FIRE</p>
          <p className="mt-1 font-mono text-2xl font-semibold">
            {result.yearsToFire === null ? "100+ yrs" : result.yearsToFire === 0 ? "Already there!" : `${result.yearsToFire.toFixed(1)} yrs`}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Your FIRE number is your annual expenses divided by your safe withdrawal rate (the classic 4% rule implies
        a 25x expenses corpus). Years to FIRE simulates your savings growing monthly at your expected return until
        it reaches that number.
      </p>
    </div>
  );
}
