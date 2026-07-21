"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculatePension } from "@/lib/finance-extra-utils";

export function PensionCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [returnRate, setReturnRate] = useState(9);
  const [yearsToRetirement, setYearsToRetirement] = useState(25);
  const [payoutYears, setPayoutYears] = useState(20);
  const [annuityRate, setAnnuityRate] = useState(6);

  const result = useMemo(
    () => calculatePension(monthlyContribution, returnRate, yearsToRetirement, payoutYears, annuityRate),
    [monthlyContribution, returnRate, yearsToRetirement, payoutYears, annuityRate]
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
          <span className="mb-1 block text-muted">Monthly contribution</span>
          <input type="number" min={0} value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Expected return: {returnRate}% p.a.</span>
          <input type="range" min={1} max={15} step={0.5} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Years to retirement: {yearsToRetirement}</span>
          <input type="range" min={1} max={40} value={yearsToRetirement} onChange={(e) => setYearsToRetirement(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Pension payout period: {payoutYears} yrs</span>
          <input type="range" min={5} max={35} value={payoutYears} onChange={(e) => setPayoutYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Annuity rate during payout: {annuityRate}% p.a.</span>
          <input type="range" min={2} max={10} step={0.25} value={annuityRate} onChange={(e) => setAnnuityRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Corpus at retirement</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.corpusAtRetirement)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Estimated monthly pension</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.estimatedMonthlyPension)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Grows your monthly contributions until retirement, then spreads the resulting corpus evenly (with
        interest) over your chosen payout period to estimate a monthly pension. Real pension products vary widely
        in structure and guarantees.
      </p>
    </div>
  );
}
