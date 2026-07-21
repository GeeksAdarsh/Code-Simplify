"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateRd } from "@/lib/finance-extra-utils";

export function RdCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [months, setMonths] = useState(24);

  const result = useMemo(() => calculateRd(monthlyDeposit, rate, months), [monthlyDeposit, rate, months]);

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
          <span className="mb-1 block text-muted">Monthly deposit</span>
          <input type="number" min={0} value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={1} max={12} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Tenure: {months} month(s)</span>
          <input type="range" min={3} max={120} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Maturity value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.maturityValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total deposited</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalDeposited)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Interest earned</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInterest)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Assumes monthly compounding on a fixed monthly deposit. Banks often compound RDs quarterly, so actual
        maturity value may differ slightly from this estimate.
      </p>
    </div>
  );
}
