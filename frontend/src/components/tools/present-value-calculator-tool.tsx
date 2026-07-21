"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculatePresentValue } from "@/lib/finance-extra-utils";

export function PresentValueCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [futureValue, setFutureValue] = useState(1000000);
  const [rate, setRate] = useState(8);
  const [periods, setPeriods] = useState(10);

  const presentValue = useMemo(() => calculatePresentValue(futureValue, rate, periods), [futureValue, rate, periods]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div />

        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Future value (target amount)</span>
          <input type="number" min={0} value={futureValue} onChange={(e) => setFutureValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Discount rate: {rate}%</span>
          <input type="range" min={0} max={25} step={0.25} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Number of years: {periods}</span>
          <input type="range" min={1} max={40} value={periods} onChange={(e) => setPeriods(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-1">
        <div className="card p-4">
          <p className="text-xs text-muted">Present value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(presentValue)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        PV = FV / (1 + r)^n. Tells you how much a future sum of money is worth today, discounted at your chosen
        rate \u2014 useful for comparing goals, offers, or investments payable at different points in time.
      </p>
    </div>
  );
}
