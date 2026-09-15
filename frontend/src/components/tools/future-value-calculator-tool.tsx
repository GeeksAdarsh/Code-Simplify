"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateFutureValue } from "@/lib/finance-extra-utils";

export function FutureValueCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [presentValue, setPresentValue] = useState(100000);
  const [periodicContribution, setPeriodicContribution] = useState(0);
  const [rate, setRate] = useState(8);
  const [periods, setPeriods] = useState(10);

  const futureValue = useMemo(
    () => calculateFutureValue(presentValue, rate, periods, periodicContribution),
    [presentValue, rate, periods, periodicContribution]
  );
  const totalContributed = presentValue + periodicContribution * periods;

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

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Present value (initial amount)</span>
          <input type="number" min={0} value={presentValue} onChange={(e) => setPresentValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Periodic contribution (per year)</span>
          <input type="number" min={0} value={periodicContribution} onChange={(e) => setPeriodicContribution(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual rate: {rate}%</span>
          <input type="range" min={0} max={25} step={0.25} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Number of years: {periods}</span>
          <input type="range" min={1} max={40} value={periods} onChange={(e) => setPeriods(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Future value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(futureValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total contributed</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(totalContributed)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        FV = PV × (1 + r)^n, plus the future value of any equal periodic contributions added at the end of each
        year. A general-purpose time-value-of-money calculator useful for any compounding scenario.
      </p>
    </div>
  );
}
