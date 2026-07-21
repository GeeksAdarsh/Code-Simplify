"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateTermInsuranceNeed } from "@/lib/finance-extra-utils";

export function TermInsuranceNeedCalculatorTool() {
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [yearsToRetirement, setYearsToRetirement] = useState(25);
  const [outstandingLoans, setOutstandingLoans] = useState(2000000);
  const [futureGoals, setFutureGoals] = useState(1000000);
  const [existingSavings, setExistingSavings] = useState(500000);
  const [existingCover, setExistingCover] = useState(0);

  const need = useMemo(
    () => calculateTermInsuranceNeed(annualIncome, yearsToRetirement, outstandingLoans, futureGoals, existingSavings, existingCover),
    [annualIncome, yearsToRetirement, outstandingLoans, futureGoals, existingSavings, existingCover]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual income</span>
          <input type="number" min={0} value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Years to retirement: {yearsToRetirement}</span>
          <input type="range" min={5} max={35} value={yearsToRetirement} onChange={(e) => setYearsToRetirement(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Outstanding loans (home, car, etc.)</span>
          <input type="number" min={0} value={outstandingLoans} onChange={(e) => setOutstandingLoans(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Future goals (education, marriage, etc.)</span>
          <input type="number" min={0} value={futureGoals} onChange={(e) => setFutureGoals(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Existing savings/investments</span>
          <input type="number" min={0} value={existingSavings} onChange={(e) => setExistingSavings(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Existing term insurance cover</span>
          <input type="number" min={0} value={existingCover} onChange={(e) => setExistingCover(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-1">
        <div className="card p-4">
          <p className="text-xs text-muted">Recommended term insurance sum assured</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(need)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Adds income replacement (until your planned retirement age) to outstanding loans and future goal costs,
        then subtracts your existing savings and cover \u2014 a more detailed, goal-based version of the standard
        Human Life Value method used by financial planners.
      </p>
    </div>
  );
}
