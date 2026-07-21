"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculatePpf } from "@/lib/finance-extra-utils";

export function PpfCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [yearlyContribution, setYearlyContribution] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const result = useMemo(() => calculatePpf(yearlyContribution, rate, years), [yearlyContribution, rate, years]);

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
          <span className="mb-1 block text-muted">Yearly contribution</span>
          <input type="number" min={0} max={150000} value={yearlyContribution} onChange={(e) => setYearlyContribution(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={5} max={10} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Tenure: {years} year(s)</span>
          <input type="range" min={15} max={50} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
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
        Assumes a fixed yearly contribution made at the start of each year with annual compounding, matching the
        current PPF (Public Provident Fund) rules. The minimum lock-in is 15 years, extendable in blocks of 5.
        Current PPF contribution limit is \u20B91.5 lakh/year \u2014 verify the latest rate on the India Post/bank website.
      </p>
    </div>
  );
}
