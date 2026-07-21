"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateProfitMargin } from "@/lib/finance-extra-utils";

export function ProfitMarginCalculatorTool() {
  const [costPrice, setCostPrice] = useState(500);
  const [sellingPrice, setSellingPrice] = useState(750);

  const result = useMemo(() => calculateProfitMargin(costPrice, sellingPrice), [costPrice, sellingPrice]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Cost price</span>
          <input type="number" min={0} value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Selling price</span>
          <input type="number" min={0} value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Profit</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.profit)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Margin</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.marginPercent.toFixed(2)}%</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Markup</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.markupPercent.toFixed(2)}%</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Margin is profit as a percentage of the selling price; markup is profit as a percentage of the cost
        price. Both describe the same profit in different ways \u2014 margin is usually used for pricing analysis,
        markup for setting prices from cost.
      </p>
    </div>
  );
}
