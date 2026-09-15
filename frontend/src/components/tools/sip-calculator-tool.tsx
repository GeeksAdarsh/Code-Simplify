"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateSipFutureValue, formatMoney } from "@/lib/finance-utils";

export function SipCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateSipFutureValue(monthlyAmount, returnRate, years), [monthlyAmount, returnRate, years]);
  const investedPercent = result.futureValue > 0 ? (result.totalInvested / result.futureValue) * 100 : 0;

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
          <span className="mb-1 block text-muted">Monthly investment (SIP)</span>
          <input type="number" min={0} value={monthlyAmount} onChange={(e) => setMonthlyAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Expected annual return: {returnRate}%</span>
          <input type="range" min={1} max={30} step={0.5} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Investment duration: {years} year(s)</span>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Future value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.futureValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total invested</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInvested)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Wealth gained</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.gain)}</p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
        <div className="h-full bg-foreground" style={{ width: `${Math.min(100, investedPercent)}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted">
        {investedPercent.toFixed(0)}% invested capital, {(100 - investedPercent).toFixed(0)}% growth
      </p>

      <p className="mt-4 text-xs text-muted">
        Assumes your SIP installment is invested at the start of each month and compounds monthly at a constant
        rate of return — actual mutual fund returns fluctuate and are never perfectly constant.
      </p>
    </div>
  );
}
