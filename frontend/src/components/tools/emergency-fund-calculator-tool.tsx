"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateEmergencyFund } from "@/lib/finance-extra-utils";

export function EmergencyFundCalculatorTool() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [monthsOfCoverage, setMonthsOfCoverage] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlySavingsCapacity, setMonthlySavingsCapacity] = useState(5000);

  const result = useMemo(
    () => calculateEmergencyFund(monthlyExpenses, monthsOfCoverage, currentSavings, monthlySavingsCapacity),
    [monthlyExpenses, monthsOfCoverage, currentSavings, monthlySavingsCapacity]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Essential monthly expenses</span>
          <input type="number" min={0} value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Desired coverage: {monthsOfCoverage} month(s)</span>
          <input type="range" min={3} max={12} value={monthsOfCoverage} onChange={(e) => setMonthsOfCoverage(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current emergency savings</span>
          <input type="number" min={0} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Monthly savings capacity</span>
          <input type="number" min={0} value={monthlySavingsCapacity} onChange={(e) => setMonthlySavingsCapacity(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Target emergency fund</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.targetAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Shortfall</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.shortfall)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Months to reach goal</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.monthsToGoal === null ? "\u2014" : `${result.monthsToGoal} mo`}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Financial planners typically recommend 3\u20136 months of essential expenses as an emergency fund (up to 12
        months for single-income households or freelancers). Keep this fund in a liquid, easily accessible account
        like a savings account or liquid mutual fund.
      </p>
    </div>
  );
}
