"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateCryptoProfit } from "@/lib/finance-extra-utils";

export function CryptoProfitCalculatorTool() {
  const [quantity, setQuantity] = useState(0.5);
  const [buyPrice, setBuyPrice] = useState(3000000);
  const [sellPrice, setSellPrice] = useState(3800000);
  const [buyFeePercent, setBuyFeePercent] = useState(0.5);
  const [sellFeePercent, setSellFeePercent] = useState(0.5);

  const result = useMemo(
    () => calculateCryptoProfit(quantity, buyPrice, sellPrice, buyFeePercent, sellFeePercent),
    [quantity, buyPrice, sellPrice, buyFeePercent, sellFeePercent]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Quantity</span>
          <input type="number" min={0} step="any" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div />

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Buy price (per unit)</span>
          <input type="number" min={0} value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sell price (per unit)</span>
          <input type="number" min={0} value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Buy fee: {buyFeePercent}%</span>
          <input type="range" min={0} max={5} step={0.05} value={buyFeePercent} onChange={(e) => setBuyFeePercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sell fee: {sellFeePercent}%</span>
          <input type="range" min={0} max={5} step={0.05} value={sellFeePercent} onChange={(e) => setSellFeePercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Cost basis (incl. fee)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.costBasis)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Sale proceeds (after fee)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.saleProceeds)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net profit / ROI</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.netProfit)} ({result.roiPercent.toFixed(2)}%)</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Accounts for exchange trading fees on both the buy and sell side to give you a realistic net profit and
        ROI. Remember that crypto gains are typically taxable in most jurisdictions — check local tax rules
        separately.
      </p>
    </div>
  );
}
