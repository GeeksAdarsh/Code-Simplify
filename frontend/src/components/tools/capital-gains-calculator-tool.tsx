"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateCapitalGains } from "@/lib/finance-extra-utils";

export function CapitalGainsCalculatorTool() {
  const [assetType, setAssetType] = useState<"equity" | "property" | "other">("equity");
  const [purchasePrice, setPurchasePrice] = useState(100000);
  const [salePrice, setSalePrice] = useState(150000);
  const [purchaseDate, setPurchaseDate] = useState("2023-01-15");
  const [saleDate, setSaleDate] = useState("2025-06-15");

  const result = useMemo(
    () => calculateCapitalGains(purchasePrice, salePrice, purchaseDate, saleDate, assetType),
    [purchasePrice, salePrice, purchaseDate, saleDate, assetType]
  );

  const rateNote =
    assetType === "equity"
      ? result.isLongTerm
        ? "LTCG on listed equity/equity funds is typically taxed at 12.5% above a ₹1.25 lakh annual exemption."
        : "STCG on listed equity/equity funds is typically taxed at 20%."
      : result.isLongTerm
        ? "LTCG on this asset type may be eligible for indexation benefit (property) — typical rate is 12.5%–20% depending on asset and indexation choice."
        : "STCG on this asset type is added to your income and taxed at your slab rate.";

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Asset type</label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value as typeof assetType)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            <option value="equity">Equity / Equity mutual fund</option>
            <option value="property">Property / Real estate</option>
            <option value="other">Other (gold, debt fund, etc.)</option>
          </select>
        </div>
        <div />

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Purchase price</span>
          <input type="number" min={0} value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sale price</span>
          <input type="number" min={0} value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Purchase date</span>
          <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sale date</span>
          <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Capital gain / loss</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.gain)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Holding period</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.holdingMonths.toFixed(1)} months</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Classification</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.isLongTerm ? "Long-term" : "Short-term"}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">{rateNote} Capital gains tax rules and rates change frequently —
        verify current rates with a tax advisor or the Income Tax Department before filing.
      </p>
    </div>
  );
}
