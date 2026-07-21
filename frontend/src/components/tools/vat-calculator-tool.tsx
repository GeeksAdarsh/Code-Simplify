"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateGst } from "@/lib/finance-extra-utils";

export function VatCalculatorTool() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => calculateGst(amount, rate, mode === "inclusive"), [amount, rate, mode]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Amount</span>
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">VAT rate: {rate}%</span>
          <input type="range" min={0} max={30} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <div className="flex gap-2 text-xs sm:col-span-2">
          <button onClick={() => setMode("exclusive")} className={`btn h-9 flex-1 ${mode === "exclusive" ? "btn-primary" : "btn-secondary"}`}>
            Add VAT (amount excludes VAT)
          </button>
          <button onClick={() => setMode("inclusive")} className={`btn h-9 flex-1 ${mode === "inclusive" ? "btn-primary" : "btn-secondary"}`}>
            Remove VAT (amount includes VAT)
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Net amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.baseAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">VAT amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.gstAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Gross amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalAmount)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Add VAT to a net (tax-exclusive) amount, or remove VAT from a gross (tax-inclusive) amount to find the net
        price and VAT component. VAT rates vary by country \u2014 adjust the rate to match your jurisdiction.
      </p>
    </div>
  );
}
