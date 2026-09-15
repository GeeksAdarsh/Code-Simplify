"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateLifeInsuranceNeed } from "@/lib/finance-extra-utils";

export function LifeInsuranceCalculatorTool() {
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [yearsToReplace, setYearsToReplace] = useState(15);
  const [liabilities, setLiabilities] = useState(1500000);
  const [existingCover, setExistingCover] = useState(0);

  const need = useMemo(
    () => calculateLifeInsuranceNeed(annualIncome, yearsToReplace, liabilities, existingCover),
    [annualIncome, yearsToReplace, liabilities, existingCover]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual income</span>
          <input type="number" min={0} value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Years of income to replace: {yearsToReplace}</span>
          <input type="range" min={5} max={30} value={yearsToReplace} onChange={(e) => setYearsToReplace(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Outstanding loans/liabilities</span>
          <input type="number" min={0} value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Existing life cover</span>
          <input type="number" min={0} value={existingCover} onChange={(e) => setExistingCover(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-1">
        <div className="card p-4">
          <p className="text-xs text-muted">Recommended life cover</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(need)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Uses a simplified Human Life Value approach: replaces your income for the chosen number of years, plus
        outstanding liabilities, minus any existing cover. A common rule of thumb is 10–15x your annual income.
        For a more goal-specific number (education, marriage, retirement), use the Term Insurance Need Calculator.
      </p>
    </div>
  );
}
