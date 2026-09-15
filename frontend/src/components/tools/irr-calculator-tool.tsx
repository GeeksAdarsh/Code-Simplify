"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateIrr } from "@/lib/finance-utils";

export function IrrCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [flows, setFlows] = useState<number[]>([-100000, 20000, 30000, 40000, 50000]);

  function updateFlow(index: number, value: number) {
    setFlows((prev) => prev.map((f, i) => (i === index ? value : f)));
  }

  function addFlow() {
    setFlows((prev) => [...prev, 0]);
  }

  function removeFlow(index: number) {
    setFlows((prev) => prev.filter((_, i) => i !== index));
  }

  const irr = useMemo(() => calculateIrr(flows), [flows]);
  const hasValidSigns = flows.some((f) => f < 0) && flows.some((f) => f > 0);

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
          Cash flow per period (period 0 is usually your initial outlay, negative)
        </p>
        <div className="space-y-2">
          {flows.map((flow, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-muted">Period {i}</span>
              <input
                type="number"
                value={flow}
                onChange={(e) => updateFlow(i, Number(e.target.value))}
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
          + Add period
        </button>
        {!hasValidSigns && <p className="mt-2 text-xs text-muted">Add at least one negative (outflow) and one positive (inflow) amount.</p>}
      </div>

      <div className="mt-4 card p-4">
        <p className="text-xs text-muted">IRR (Internal Rate of Return)</p>
        <p className="mt-1 font-mono text-3xl font-semibold">{irr !== null ? `${irr.toFixed(2)}%` : "—"}</p>
      </div>

      <p className="mt-4 text-xs text-muted">
        IRR finds the discount rate at which the net present value of all periods' cash flows equals zero.
        Use this for cash flows spaced at regular intervals (e.g. yearly) — for irregular dates, use the XIRR
        Calculator instead.
      </p>
    </div>
  );
}
