"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateEmi, calculatePrepaymentImpact, formatMoney } from "@/lib/finance-utils";

export function LoanPrepaymentTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [principal, setPrincipal] = useState(2000000);
  const [rate, setRate] = useState(9);
  const [tenureYears, setTenureYears] = useState(20);
  const [prepaymentAmount, setPrepaymentAmount] = useState(200000);
  const [prepaymentAtMonth, setPrepaymentAtMonth] = useState(12);

  const months = Math.round(tenureYears * 12);
  const { emi } = useMemo(() => calculateEmi(principal, rate, months), [principal, rate, months]);

  const result = useMemo(
    () => calculatePrepaymentImpact(principal, rate, months, prepaymentAmount, prepaymentAtMonth),
    [principal, rate, months, prepaymentAmount, prepaymentAtMonth]
  );

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
          <span className="mb-1 block text-muted">Outstanding loan amount</span>
          <input type="number" min={0} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current EMI: {currency}{formatMoney(emi)}</span>
          <input type="range" min={1} max={25} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
          <span className="mt-1 block text-[10px] text-muted">Interest rate: {rate}% p.a.</span>
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Remaining tenure: {tenureYears} year(s)</span>
          <input type="range" min={1} max={30} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Prepayment amount</span>
          <input type="number" min={0} value={prepaymentAmount} onChange={(e) => setPrepaymentAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Prepayment made in month: {prepaymentAtMonth}</span>
          <input type="range" min={1} max={months} value={prepaymentAtMonth} onChange={(e) => setPrepaymentAtMonth(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">New tenure</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{(result.newMonths / 12).toFixed(1)} yrs</p>
          <p className="mt-1 text-xs text-muted">{result.monthsSaved} month(s) saved</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Interest saved</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.interestSaved)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">New total interest</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.newTotalInterest)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Assumes your EMI stays the same after the one-time prepayment, so your loan tenure shortens instead \u2014
        the most common way lenders apply prepayments unless you specifically request a lower EMI instead.
      </p>
    </div>
  );
}
