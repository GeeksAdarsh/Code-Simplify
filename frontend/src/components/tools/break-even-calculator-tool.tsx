"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateBreakEven } from "@/lib/finance-extra-utils";

export function BreakEvenCalculatorTool() {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [variableCost, setVariableCost] = useState(100);
  const [pricePerUnit, setPricePerUnit] = useState(250);

  const result = useMemo(() => calculateBreakEven(fixedCosts, variableCost, pricePerUnit), [fixedCosts, variableCost, pricePerUnit]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Total fixed costs</span>
          <input type="number" min={0} value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Variable cost per unit</span>
          <input type="number" min={0} value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Selling price per unit</span>
          <input type="number" min={0} value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Contribution margin/unit</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.contributionMarginPerUnit)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Break-even units</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{Number.isFinite(result.breakEvenUnits) ? Math.ceil(result.breakEvenUnits) : "\u221E"}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Break-even revenue</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{Number.isFinite(result.breakEvenRevenue) ? formatMoney(result.breakEvenRevenue) : "\u221E"}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Break-even point = Fixed costs \u00F7 (Price per unit \u2212 Variable cost per unit). If your selling price is at
        or below your variable cost, break-even is never reached and the answer shows infinity.
      </p>
    </div>
  );
}
