"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateDiscount, calculateOriginalPriceFromDiscount } from "@/lib/finance-extra-utils";

export function DiscountCalculatorTool() {
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [price, setPrice] = useState(2000);
  const [discountPercent, setDiscountPercent] = useState(20);

  const forwardResult = useMemo(() => calculateDiscount(price, discountPercent), [price, discountPercent]);
  const originalPrice = useMemo(() => calculateOriginalPriceFromDiscount(price, discountPercent), [price, discountPercent]);

  return (
    <div>
      <div className="mb-3 flex gap-2 text-xs">
        <button onClick={() => setMode("forward")} className={`btn h-9 flex-1 ${mode === "forward" ? "btn-primary" : "btn-secondary"}`}>
          Find discounted price
        </button>
        <button onClick={() => setMode("reverse")} className={`btn h-9 flex-1 ${mode === "reverse" ? "btn-primary" : "btn-secondary"}`}>
          Find original price
        </button>
      </div>

      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">{mode === "forward" ? "Original price" : "Discounted (final) price"}</span>
          <input type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Discount: {discountPercent}%</span>
          <input type="range" min={0} max={90} value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      {mode === "forward" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="card p-4">
            <p className="text-xs text-muted">You save</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(forwardResult.discountAmount)}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-muted">Final price</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(forwardResult.finalPrice)}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-1">
          <div className="card p-4">
            <p className="text-xs text-muted">Original price (before discount)</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(originalPrice)}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Switch modes to either apply a discount percentage to a known price, or work backwards from a discounted
        price to find what the original price must have been.
      </p>
    </div>
  );
}
