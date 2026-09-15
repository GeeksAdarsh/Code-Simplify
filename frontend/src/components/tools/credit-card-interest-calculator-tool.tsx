"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateCreditCardPayoff } from "@/lib/finance-extra-utils";

export function CreditCardInterestCalculatorTool() {
  const [balance, setBalance] = useState(50000);
  const [rate, setRate] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(3000);

  const result = useMemo(() => calculateCreditCardPayoff(balance, rate, monthlyPayment), [balance, rate, monthlyPayment]);
  const minRequiredPayment = (balance * rate) / 12 / 100;

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Outstanding balance</span>
          <input type="number" min={0} value={balance} onChange={(e) => setBalance(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual interest rate (APR): {rate}%</span>
          <input type="range" min={12} max={48} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Fixed monthly payment</span>
          <input type="number" min={0} value={monthlyPayment} onChange={(e) => setMonthlyPayment(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      {result.months === null ? (
        <div className="mt-4 card p-4">
          <p className="text-sm text-muted">
            Your monthly payment doesn&apos;t cover the interest accruing on this balance (interest alone is roughly{" "}
            <span className="font-mono text-foreground">{formatMoney(minRequiredPayment)}</span>/month). Increase your
            payment to make progress on the balance.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="card p-4">
            <p className="text-xs text-muted">Months to pay off</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{result.months}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-muted">Total interest paid</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalInterestPaid)}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-muted">Total amount paid</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalPaid)}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Credit card interest compounds monthly and is usually much higher than other loans — paying only the
        minimum can take years and cost far more than the original balance. Paying more than the minimum each
        month dramatically reduces total interest.
      </p>
    </div>
  );
}
