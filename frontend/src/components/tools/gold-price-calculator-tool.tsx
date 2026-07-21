"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { GOLD_PURITY_FACTORS, calculateMetalValue } from "@/lib/finance-extra-utils";

const PURITY_KEYS = Object.keys(GOLD_PURITY_FACTORS);
const UNITS = [
  { label: "Gram", factor: 1 },
  { label: "10 grams", factor: 10 },
  { label: "Troy ounce", factor: 31.1035 },
  { label: "Tola", factor: 11.6638 },
];

export function GoldPriceCalculatorTool() {
  const [ratePerGram, setRatePerGram] = useState(6500);
  const [purity, setPurity] = useState(PURITY_KEYS[0]);
  const [unitIndex, setUnitIndex] = useState(0);
  const [quantity, setQuantity] = useState(10);
  const [makingChargesPercent, setMakingChargesPercent] = useState(0);

  const weightInGrams = quantity * UNITS[unitIndex].factor;
  const value = useMemo(
    () => calculateMetalValue(ratePerGram, weightInGrams, GOLD_PURITY_FACTORS[purity]),
    [ratePerGram, weightInGrams, purity]
  );
  const makingCharges = value * (makingChargesPercent / 100);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Gold rate (per gram, 24K)</span>
          <input type="number" min={0} value={ratePerGram} onChange={(e) => setRatePerGram(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Purity</label>
          <select value={purity} onChange={(e) => setPurity(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {PURITY_KEYS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Quantity</span>
          <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Unit</label>
          <select value={unitIndex} onChange={(e) => setUnitIndex(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {UNITS.map((u, i) => (
              <option key={u.label} value={i}>{u.label}</option>
            ))}
          </select>
        </div>

        <label className="block text-xs sm:col-span-2">
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
          <p className="text-xs text-muted">Gold value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(value)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total with making charges</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(value + makingCharges)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Enter today&apos;s 24K gold rate per gram (check your local jeweller or a live gold price site) \u2014 this
        calculator doesn&apos;t fetch live rates. Purity factors convert the 24K rate to 22K/18K/14K equivalents.
        Optional making charges and GST are added separately by jewellers.
      </p>
    </div>
  );
}
