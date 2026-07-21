"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateStockAverage, type StockLot, formatMoney } from "@/lib/finance-utils";

export function StockAveragePriceTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [lots, setLots] = useState<StockLot[]>([
    { quantity: 10, price: 100 },
    { quantity: 5, price: 120 },
  ]);
  const [useCurrentPrice, setUseCurrentPrice] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(110);

  function updateLot(index: number, patch: Partial<StockLot>) {
    setLots((prev) => prev.map((lot, i) => (i === index ? { ...lot, ...patch } : lot)));
  }

  function addLot() {
    setLots((prev) => [...prev, { quantity: 1, price: 100 }]);
  }

  function removeLot(index: number) {
    setLots((prev) => prev.filter((_, i) => i !== index));
  }

  const result = useMemo(() => calculateStockAverage(lots, useCurrentPrice ? currentPrice : undefined), [lots, useCurrentPrice, currentPrice]);

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
        <p className="mb-2 text-xs font-medium text-muted">Buy transactions</p>
        <div className="space-y-2">
          {lots.map((lot, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={lot.quantity}
                onChange={(e) => updateLot(i, { quantity: Number(e.target.value) })}
                placeholder="Quantity"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                value={lot.price}
                onChange={(e) => updateLot(i, { price: Number(e.target.value) })}
                placeholder="Price per share"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              {lots.length > 1 && (
                <button onClick={() => removeLot(i)} className="shrink-0 text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addLot} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add buy transaction
        </button>

        <label className="mt-4 flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={useCurrentPrice} onChange={(e) => setUseCurrentPrice(e.target.checked)} className="accent-foreground" />
          Calculate profit/loss using a current market price
        </label>
        {useCurrentPrice && (
          <input
            type="number"
            min={0}
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value))}
            className="mt-2 w-full max-w-xs rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Total quantity</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.totalQuantity}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Average buy price</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.averagePrice)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total invested</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInvested)}</p>
        </div>
        {result.profitOrLoss !== null && (
          <div className="card p-4">
            <p className="text-xs text-muted">Profit / loss</p>
            <p className="mt-1 font-mono text-2xl font-semibold">
              {currency}{formatMoney(result.profitOrLoss)} ({result.profitOrLossPercent!.toFixed(2)}%)
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        Add each buy transaction (quantity and price per share) to calculate your true average cost across
        multiple purchases \u2014 useful when averaging up or down on a position.
      </p>
    </div>
  );
}
