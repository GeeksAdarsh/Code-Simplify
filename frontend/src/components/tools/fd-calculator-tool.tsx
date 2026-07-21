"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateFd } from "@/lib/finance-extra-utils";

export function FdCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState(4);

  const result = useMemo(() => calculateFd(principal, rate, years, compounding), [principal, rate, years, compounding]);

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
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Compounding frequency</label>
          <select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            <option value={1}>Annually</option>
            <option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Deposit amount</span>
          <input type="number" min={0} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={1} max={12} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Tenure: {years} year(s)</span>
          <input type="range" min={1} max={10} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Maturity value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.maturityValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Principal invested</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(principal)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Interest earned</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInterest)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Uses standard compound interest with your selected compounding frequency. Actual bank FD rates and payout
        options vary by bank and tenure \u2014 check with your bank for exact terms.
      </p>
    </div>
  );
}
