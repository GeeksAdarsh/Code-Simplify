"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateEmi, calculatePrincipalFromEmi, formatMoney } from "@/lib/finance-utils";

export function LoanAffordabilityTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [monthlyBudget, setMonthlyBudget] = useState(20000);
  const [rate, setRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(15);

  const months = Math.round(tenureYears * 12);

  const affordableAmount = useMemo(() => calculatePrincipalFromEmi(monthlyBudget, rate, months), [monthlyBudget, rate, months]);
  const check = useMemo(() => calculateEmi(affordableAmount, rate, months), [affordableAmount, rate, months]);

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
          <span className="mb-1 block text-muted">Monthly EMI budget</span>
          <input type="number" min={0} value={monthlyBudget} onChange={(e) => setMonthlyBudget(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={1} max={25} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Tenure: {tenureYears} year(s)</span>
          <input type="range" min={1} max={30} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Loan amount you can afford</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(affordableAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Resulting EMI (check)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(check.emi)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Answers &quot;how much loan can I take?&quot; by working backwards from the monthly EMI you're comfortable
        paying, at your chosen interest rate and tenure.
      </p>
    </div>
  );
}
