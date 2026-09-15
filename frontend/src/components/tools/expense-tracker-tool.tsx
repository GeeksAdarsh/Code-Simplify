"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";

interface Expense {
  description: string;
  category: string;
  amount: number;
}

const CATEGORIES = ["Food", "Transport", "Housing", "Utilities", "Entertainment", "Shopping", "Health", "Other"];

export function ExpenseTrackerTool() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { description: "Groceries", category: "Food", amount: 1500 },
    { description: "Fuel", category: "Transport", amount: 800 },
  ]);

  function updateExpense(index: number, patch: Partial<Expense>) {
    setExpenses((prev) => prev.map((e, i) => (i === index ? { ...e, ...patch } : e)));
  }
  function addExpense() {
    setExpenses((prev) => [...prev, { description: "", category: CATEGORIES[0], amount: 0 }]);
  }
  function removeExpense(index: number) {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  }

  const byCategory = useMemo(() => {
    const totals = new Map<string, number>();
    for (const e of expenses) totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
    return [...totals.entries()].sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-muted">Expenses</p>
        <div className="space-y-2">
          {expenses.map((e, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={e.description}
                onChange={(ev) => updateExpense(i, { description: ev.target.value })}
                placeholder="Description"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
              <select
                value={e.category}
                onChange={(ev) => updateExpense(i, { category: ev.target.value })}
                className="w-36 shrink-0 rounded border border-border bg-background px-2.5 py-1.5 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                value={e.amount}
                onChange={(ev) => updateExpense(i, { amount: Number(ev.target.value) })}
                placeholder="Amount"
                className="w-28 shrink-0 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
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
          + Add expense
        </button>
      </div>

      <div className="mt-4 card p-4">
        <p className="mb-3 text-xs text-muted">Total spent: <span className="font-mono font-semibold text-foreground">{formatMoney(total)}</span></p>
        <div className="space-y-2">
          {byCategory.map(([category, amount]) => (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>{category}</span>
                <span className="font-mono">{formatMoney(amount)} ({total > 0 ? ((amount / total) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full bg-foreground" style={{ width: `${total > 0 ? (amount / total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Log individual expenses with a category to see where your money goes. All data stays in your browser and
        resets when you leave the page — for ongoing tracking, export or note down your totals periodically.
      </p>
    </div>
  );
}
