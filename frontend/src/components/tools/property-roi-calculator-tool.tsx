"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculatePropertyRoi } from "@/lib/finance-extra-utils";

export function PropertyRoiCalculatorTool() {
  const [purchasePrice, setPurchasePrice] = useState(5000000);
  const [purchaseCosts, setPurchaseCosts] = useState(300000);
  const [annualRent, setAnnualRent] = useState(300000);
  const [annualExpenses, setAnnualExpenses] = useState(60000);
  const [appreciationRate, setAppreciationRate] = useState(6);
  const [holdingYears, setHoldingYears] = useState(10);
  const [sellingCostsPercent, setSellingCostsPercent] = useState(2);

  const result = useMemo(
    () => calculatePropertyRoi(purchasePrice, purchaseCosts, annualRent, annualExpenses, appreciationRate, holdingYears, sellingCostsPercent),
    [purchasePrice, purchaseCosts, annualRent, annualExpenses, appreciationRate, holdingYears, sellingCostsPercent]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Purchase price</span>
          <input type="number" min={0} value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Purchase costs (stamp duty, renovation, etc.)</span>
          <input type="number" min={0} value={purchaseCosts} onChange={(e) => setPurchaseCosts(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual rental income</span>
          <input type="number" min={0} value={annualRent} onChange={(e) => setAnnualRent(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual expenses (tax, maintenance)</span>
          <input type="number" min={0} value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Appreciation: {appreciationRate}% p.a.</span>
          <input type="range" min={0} max={15} step={0.5} value={appreciationRate} onChange={(e) => setAppreciationRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Holding period: {holdingYears} year(s)</span>
          <input type="range" min={1} max={30} value={holdingYears} onChange={(e) => setHoldingYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Selling costs: {sellingCostsPercent}%</span>
          <input type="range" min={0} max={10} step={0.5} value={sellingCostsPercent} onChange={(e) => setSellingCostsPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Projected sale value</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.saleValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net rental income (over holding period)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.totalRentalIncome - result.totalExpenses)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net profit</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.netProfit)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total ROI / Annualized ROI</p>
          <p className="mt-1 font-mono text-xl font-semibold">{result.totalRoiPercent.toFixed(1)}% / {result.annualizedRoiPercent.toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Combines rental income (minus expenses) with projected capital appreciation over your holding period,
        minus selling costs, to estimate total and annualized ROI on a property investment. Doesn&apos;t account for
        financing costs (EMI/interest) if the property is purchased with a loan.
      </p>
    </div>
  );
}
