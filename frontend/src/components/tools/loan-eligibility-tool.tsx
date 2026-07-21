"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculatePrincipalFromEmi, formatMoney } from "@/lib/finance-utils";

export function LoanEligibilityTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [existingEmis, setExistingEmis] = useState(0);
  const [foirPercent, setFoirPercent] = useState(50);
  const [rate, setRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(15);

  const result = useMemo(() => {
    const maxTotalEmi = (monthlyIncome * foirPercent) / 100;
    const maxNewEmi = Math.max(0, maxTotalEmi - existingEmis);
    const eligibleAmount = calculatePrincipalFromEmi(maxNewEmi, rate, Math.round(tenureYears * 12));
    return { maxNewEmi, eligibleAmount };
  }, [monthlyIncome, existingEmis, foirPercent, rate, tenureYears]);

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
          <span className="mb-1 block text-muted">Net monthly income</span>
          <input type="number" min={0} value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Existing monthly EMIs / obligations</span>
          <input type="number" min={0} value={existingEmis} onChange={(e) => setExistingEmis(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Max EMI-to-income ratio (FOIR): {foirPercent}%</span>
          <input type="range" min={20} max={70} value={foirPercent} onChange={(e) => setFoirPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={1} max={25} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Desired tenure: {tenureYears} year(s)</span>
          <input type="range" min={1} max={30} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Max EMI you can afford</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.maxNewEmi)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Estimated loan eligibility</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.eligibleAmount)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Uses the common FOIR (Fixed Obligation to Income Ratio) method most Indian lenders use: your total EMIs
        (existing + new) shouldn't exceed a set percentage of your net monthly income. Actual eligibility varies by
        lender, credit score, and other factors.
      </p>
    </div>
  );
}
