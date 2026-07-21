"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateBudget, type BudgetCategory } from "@/lib/finance-extra-utils";

export function BudgetPlannerTool() {
  const [monthlyIncome, setMonthlyIncome] = useState(60000);
  const [expenses, setExpenses] = useState<BudgetCategory[]>([
    { name: "Rent / housing", amount: 15000 },
    { name: "Groceries", amount: 6000 },
    { name: "Transport", amount: 3000 },
    { name: "Entertainment", amount: 2000 },
  ]);

  function updateExpense(index: number, patch: Partial<BudgetCategory>) {
    setExpenses((prev) => prev.map((e, i) => (i === index ? { ...e, ...patch } : e)));
  }
  function addExpense() {
    setExpenses((prev) => [...prev, { name: "", amount: 0 }]);
  }
  function removeExpense(index: number) {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  }

  const result = useMemo(() => calculateBudget(monthlyIncome, expenses), [monthlyIncome, expenses]);

  return (
    <div>
      <label className="mb-3 block text-xs">
        <span className="mb-1 block text-muted">Monthly income</span>
        <input type="number" min={0} value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full max-w-xs rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
      </label>

      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-muted">Expense categories</p>
        <div className="space-y-2">
          {expenses.map((e, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={e.name}
                onChange={(ev) => updateExpense(i, { name: ev.target.value })}
                placeholder="Category"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                value={e.amount}
                onChange={(ev) => updateExpense(i, { amount: Number(ev.target.value) })}
                placeholder="Amount"
                className="w-32 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              {expenses.length > 1 && (
                <button onClick={() => removeExpense(i)} className="shrink-0 text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addExpense} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add category
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Total expenses</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalExpenses)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Monthly savings</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.savings)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Savings rate</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.savingsRatePercent.toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        A healthy savings rate is generally considered 20% or more of income (the popular 50/30/20 rule allocates
        50% to needs, 30% to wants, and 20% to savings). Add as many custom expense categories as you need.
      </p>
    </div>
  );
}
