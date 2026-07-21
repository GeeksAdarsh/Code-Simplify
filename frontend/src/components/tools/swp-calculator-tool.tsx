"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateSwp, formatMoney } from "@/lib/finance-utils";

export function SwpCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [corpus, setCorpus] = useState(2000000);
  const [returnRate, setReturnRate] = useState(8);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(15000);
  const [years, setYears] = useState(20);

  const result = useMemo(() => calculateSwp(corpus, returnRate, monthlyWithdrawal, years), [corpus, returnRate, monthlyWithdrawal, years]);

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
          <span className="mb-1 block text-muted">Starting investment corpus</span>
          <input type="number" min={0} value={corpus} onChange={(e) => setCorpus(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Monthly withdrawal</span>
          <input type="number" min={0} value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Expected annual return: {returnRate}%</span>
          <input type="range" min={1} max={20} step={0.5} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Duration: {years} year(s)</span>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">{result.depleted ? "Corpus runs out after" : `Balance after ${years} years`}</p>
          <p className="mt-1 font-mono text-2xl font-semibold">
            {result.depleted ? `${(result.depletedAtMonth! / 12).toFixed(1)} yrs` : `${currency}${formatMoney(result.finalBalance)}`}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total withdrawn</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalWithdrawn)}</p>
        </div>
      </div>

      {result.depleted && (
        <p className="mt-3 text-xs text-muted">
          Your withdrawal rate is higher than your corpus can sustain at this return rate \u2014 consider a lower
          monthly withdrawal or a higher starting corpus.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Simulates month-by-month growth and withdrawals assuming a constant rate of return \u2014 real investment
        returns vary, so treat this as a planning estimate, not a guarantee.
      </p>
    </div>
  );
}
