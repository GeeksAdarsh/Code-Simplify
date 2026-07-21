"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateSukanya } from "@/lib/finance-extra-utils";

export function SukanyaCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [yearlyDeposit, setYearlyDeposit] = useState(50000);
  const [rate, setRate] = useState(8.2);
  const [depositYears, setDepositYears] = useState(15);
  const [maturityYears, setMaturityYears] = useState(21);

  const result = useMemo(
    () => calculateSukanya(yearlyDeposit, rate, depositYears, Math.max(depositYears, maturityYears)),
    [yearlyDeposit, rate, depositYears, maturityYears]
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
          <span className="mb-1 block text-muted">Yearly deposit (max \u20B91.5 lakh)</span>
          <input type="number" min={250} max={150000} value={yearlyDeposit} onChange={(e) => setYearlyDeposit(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input type="range" min={5} max={10} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Deposit period: {depositYears} year(s)</span>
          <input type="range" min={5} max={15} value={depositYears} onChange={(e) => setDepositYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Account matures at: {maturityYears} year(s) from opening</span>
          <input type="range" min={15} max={21} value={maturityYears} onChange={(e) => setMaturityYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Maturity value</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.maturityValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total deposited</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalDeposited)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Interest earned</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInterest)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Sukanya Samriddhi Yojana requires deposits for the first 15 years from account opening, after which the
        balance continues to earn interest untouched until maturity (21 years from opening). Verify the current
        SSY interest rate on the India Post website, as it&apos;s revised quarterly by the government.
      </p>
    </div>
  );
}
