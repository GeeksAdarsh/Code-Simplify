"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateGst } from "@/lib/finance-extra-utils";

const GST_RATES = [0, 3, 5, 12, 18, 28];

export function GstCalculatorTool() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => calculateGst(amount, rate, mode === "inclusive"), [amount, rate, mode]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Amount (₹)</span>
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">GST rate</label>
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {GST_RATES.map((r) => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 text-xs sm:col-span-2">
          <button onClick={() => setMode("exclusive")} className={`btn h-9 flex-1 ${mode === "exclusive" ? "btn-primary" : "btn-secondary"}`}>
            Add GST (amount excludes GST)
          </button>
          <button onClick={() => setMode("inclusive")} className={`btn h-9 flex-1 ${mode === "inclusive" ? "btn-primary" : "btn-secondary"}`}>
            Remove GST (amount includes GST)
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Base amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.baseAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">GST amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.gstAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total amount</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.totalAmount)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Use &quot;Add GST&quot; when your amount excludes tax, or &quot;Remove GST&quot; when it&apos;s already tax-inclusive
        (e.g. an MRP or invoice total) to back out the base price and GST component.
      </p>
    </div>
  );
}
