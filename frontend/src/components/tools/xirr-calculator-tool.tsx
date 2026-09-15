"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateXirr, type DatedCashFlow } from "@/lib/finance-utils";

const TODAY = new Date().toISOString().slice(0, 10);

export function XirrCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [flows, setFlows] = useState<DatedCashFlow[]>([
    { date: "2023-01-15", amount: -100000 },
    { date: "2024-06-10", amount: -50000 },
    { date: TODAY, amount: 180000 },
  ]);

  function updateFlow(index: number, patch: Partial<DatedCashFlow>) {
    setFlows((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function addFlow() {
    setFlows((prev) => [...prev, { date: TODAY, amount: 0 }]);
  }

  function removeFlow(index: number) {
    setFlows((prev) => prev.filter((_, i) => i !== index));
  }

  const xirr = useMemo(() => calculateXirr(flows), [flows]);
  const hasValidSigns = flows.some((f) => f.amount < 0) && flows.some((f) => f.amount > 0);

  return (
    <div>
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded border border-border bg-background px-2.5 py-1.5 text-sm">
          {CURRENCY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-muted">
          Cash flows (use negative for money invested, positive for money received back)
        </p>
        <div className="space-y-2">
          {flows.map((flow, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="date"
                value={flow.date}
                onChange={(e) => updateFlow(i, { date: e.target.value })}
                className="rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="number"
                value={flow.amount}
                onChange={(e) => updateFlow(i, { amount: Number(e.target.value) })}
                placeholder="Amount"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              {flows.length > 2 && (
                <button onClick={() => removeFlow(i)} className="shrink-0 text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addFlow} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add cash flow
        </button>
        {!hasValidSigns && <p className="mt-2 text-xs text-muted">Add at least one negative (invested) and one positive (returned) amount.</p>}
      </div>

      <div className="mt-4 card p-4">
        <p className="text-xs text-muted">XIRR (annualized return)</p>
        <p className="mt-1 font-mono text-3xl font-semibold">{xirr !== null ? `${xirr.toFixed(2)}%` : "—"}</p>
      </div>

      <p className="mt-4 text-xs text-muted">
        XIRR accounts for the exact dates of each cash flow, making it accurate for irregular investments like SIPs
        with varying amounts and dates, top-ups, and partial withdrawals — unlike a simple CAGR calculation.
      </p>
    </div>
  );
}
