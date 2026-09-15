"use client";

import { useMemo, useState } from "react";
import {
  CURRENCY_OPTIONS,
  calculateAmortizationSchedule,
  calculateEmi,
  formatMoney,
} from "@/lib/finance-utils";

interface LoanEmiToolProps {
  amountLabel?: string;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  defaultRate?: number;
  defaultTenureYears?: number;
  maxTenureYears?: number;
  showDownPayment?: boolean;
  showMoratorium?: boolean;
}

export function LoanEmiTool({
  amountLabel = "Loan amount",
  defaultAmount,
  minAmount = 0,
  maxAmount,
  defaultRate = 9.5,
  defaultTenureYears = 5,
  maxTenureYears = 30,
  showDownPayment = false,
  showMoratorium = false,
}: LoanEmiToolProps) {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [price, setPrice] = useState(defaultAmount);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [rate, setRate] = useState(defaultRate);
  const [tenureYears, setTenureYears] = useState(defaultTenureYears);
  const [moratoriumMonths, setMoratoriumMonths] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);

  const downPayment = showDownPayment ? Math.round((price * downPaymentPercent) / 100) : 0;
  const loanAmount = Math.max(0, price - downPayment);
  const months = Math.round(tenureYears * 12);

  const adjustedPrincipal = useMemo(() => {
    if (!showMoratorium || moratoriumMonths <= 0) return loanAmount;
    const monthlyRate = rate / 12 / 100;
    return loanAmount + loanAmount * monthlyRate * moratoriumMonths;
  }, [loanAmount, rate, moratoriumMonths, showMoratorium]);

  const result = useMemo(() => calculateEmi(adjustedPrincipal, rate, months), [adjustedPrincipal, rate, months]);
  const schedule = useMemo(
    () => (showSchedule ? calculateAmortizationSchedule(adjustedPrincipal, rate, months) : []),
    [adjustedPrincipal, rate, months, showSchedule]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div />

        <label className="block text-xs">
          <span className="mb-1 block text-muted">{showDownPayment ? "Vehicle / item price" : amountLabel}</span>
          <input
            type="number"
            min={minAmount}
            max={maxAmount}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </label>

        {showDownPayment && (
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Down payment: {downPaymentPercent}% ({currency}{formatMoney(downPayment)})</span>
            <input
              type="range"
              min={0}
              max={80}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </label>
        )}

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}% p.a.</span>
          <input
            type="range"
            min={1}
            max={30}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Tenure: {tenureYears} year(s)</span>
          <input
            type="range"
            min={1}
            max={maxTenureYears}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </label>

        {showMoratorium && (
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Moratorium / grace period: {moratoriumMonths} month(s)</span>
            <input
              type="range"
              min={0}
              max={48}
              value={moratoriumMonths}
              onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </label>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Monthly EMI</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.emi)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total interest</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInterest)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total payment</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalPayment)}</p>
        </div>
      </div>

      {showMoratorium && moratoriumMonths > 0 && (
        <p className="mt-3 text-xs text-muted">
          Interest accrued during the {moratoriumMonths}-month moratorium ({currency}
          {formatMoney(adjustedPrincipal - loanAmount)}) has been added to the principal before calculating your
          post-moratorium EMI, matching how most education loans work.
        </p>
      )}

      <button onClick={() => setShowSchedule((s) => !s)} className="btn btn-secondary mt-4 h-9 px-4 text-sm">
        {showSchedule ? "Hide" : "Show"} yearly amortization schedule
      </button>

      {showSchedule && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Principal paid</th>
                <th className="py-2 pr-4">Interest paid</th>
                <th className="py-2 pr-4">Ending balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schedule.map((row) => (
                <tr key={row.year}>
                  <td className="py-2 pr-4">{row.year}</td>
                  <td className="py-2 pr-4 font-mono">{currency}{formatMoney(row.principalPaid)}</td>
                  <td className="py-2 pr-4 font-mono">{currency}{formatMoney(row.interestPaid)}</td>
                  <td className="py-2 pr-4 font-mono">{currency}{formatMoney(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Calculated using the standard reducing-balance EMI formula. This is an estimate for planning purposes —
        actual EMI, processing fees, and eligibility depend on your lender.
      </p>
    </div>
  );
}
