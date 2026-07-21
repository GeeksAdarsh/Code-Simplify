"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateDebtPayoff, type Debt } from "@/lib/finance-extra-utils";

export function DebtPayoffCalculatorTool() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: "Credit card", balance: 80000, annualRatePercent: 36, minPayment: 4000 },
    { name: "Personal loan", balance: 200000, annualRatePercent: 13, minPayment: 6000 },
  ]);
  const [extraBudget, setExtraBudget] = useState(5000);
  const [method, setMethod] = useState<"snowball" | "avalanche">("avalanche");

  function updateDebt(index: number, patch: Partial<Debt>) {
    setDebts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }
  function addDebt() {
    setDebts((prev) => [...prev, { name: "", balance: 0, annualRatePercent: 15, minPayment: 0 }]);
  }
  function removeDebt(index: number) {
    setDebts((prev) => prev.filter((_, i) => i !== index));
  }

  const result = useMemo(() => calculateDebtPayoff(debts, extraBudget, method), [debts, extraBudget, method]);

  return (
    <div>
      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-muted">Debts</p>
        <div className="space-y-2">
          {debts.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" value={d.name} onChange={(e) => updateDebt(i, { name: e.target.value })} placeholder="Name" className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none" />
              <input type="number" min={0} value={d.balance} onChange={(e) => updateDebt(i, { balance: Number(e.target.value) })} placeholder="Balance" className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
              <input type="number" min={0} value={d.annualRatePercent} onChange={(e) => updateDebt(i, { annualRatePercent: Number(e.target.value) })} placeholder="Rate %" className="w-20 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
              <input type="number" min={0} value={d.minPayment} onChange={(e) => updateDebt(i, { minPayment: Number(e.target.value) })} placeholder="Min payment" className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
              {debts.length > 1 && (
                <button onClick={() => removeDebt(i)} className="shrink-0 text-xs text-muted hover:text-foreground">Remove</button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addDebt} className="btn btn-secondary mt-3 h-9 px-4 text-sm">+ Add debt</button>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Extra monthly budget (beyond min payments)</span>
            <input type="number" min={0} value={extraBudget} onChange={(e) => setExtraBudget(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
          </label>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Strategy</label>
            <select value={method} onChange={(e) => setMethod(e.target.value as typeof method)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
              <option value="avalanche">Avalanche (highest rate first \u2014 saves most interest)</option>
              <option value="snowball">Snowball (smallest balance first \u2014 quick wins)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Time to debt-free</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{(result.totalMonths / 12).toFixed(1)} yrs ({result.totalMonths} mo)</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total interest paid</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalInterestPaid)}</p>
        </div>
      </div>

      {result.order.length > 0 && (
        <div className="mt-3 card p-4">
          <p className="mb-2 text-xs text-muted">Payoff order</p>
          <ol className="list-inside list-decimal text-sm">
            {result.order.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ol>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        The avalanche method pays off the highest-interest debt first, minimizing total interest. The snowball
        method pays off the smallest balance first for psychological quick wins. Both apply your extra budget to
        one debt at a time while paying minimums on the rest.
      </p>
    </div>
  );
}
