"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateMetalValue } from "@/lib/finance-extra-utils";

const UNITS = [
  { label: "Gram", factor: 1 },
  { label: "10 grams", factor: 10 },
  { label: "Kilogram", factor: 1000 },
  { label: "Troy ounce", factor: 31.1035 },
];

export function SilverPriceCalculatorTool() {
  const [ratePerGram, setRatePerGram] = useState(85);
  const [unitIndex, setUnitIndex] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [makingChargesPercent, setMakingChargesPercent] = useState(0);

  const weightInGrams = quantity * UNITS[unitIndex].factor;
  const value = useMemo(() => calculateMetalValue(ratePerGram, weightInGrams), [ratePerGram, weightInGrams]);
  const makingCharges = value * (makingChargesPercent / 100);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Silver rate (per gram)</span>
          <input type="number" min={0} value={ratePerGram} onChange={(e) => setRatePerGram(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Unit</label>
          <select value={unitIndex} onChange={(e) => setUnitIndex(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {UNITS.map((u, i) => (
              <option key={u.label} value={i}>{u.label}</option>
            ))}
          </select>
        </div>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Quantity</span>
          <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Making charges: {makingChargesPercent}%</span>
          <input type="range" min={0} max={30} value={makingChargesPercent} onChange={(e) => setMakingChargesPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Weight</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{weightInGrams.toFixed(2)} g</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Silver value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(value)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total with making charges</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(value + makingCharges)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Enter today&apos;s silver rate per gram from your local jeweller or a live price source \u2014 this calculator
        doesn&apos;t fetch live rates. Making charges and GST for jewellery are typically added on top.
      </p>
    </div>
  );
}
