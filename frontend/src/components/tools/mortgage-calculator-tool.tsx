"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateEmi, formatMoney } from "@/lib/finance-utils";
import { calculateMortgagePiti } from "@/lib/finance-extra-utils";

export function MortgageCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[1].value);
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [tenureYears, setTenureYears] = useState(30);
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(1.1);
  const [annualInsurance, setAnnualInsurance] = useState(1500);
  const [monthlyHoa, setMonthlyHoa] = useState(0);

  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const { emi } = useMemo(() => calculateEmi(loanAmount, rate, tenureYears * 12), [loanAmount, rate, tenureYears]);
  const piti = useMemo(
    () => calculateMortgagePiti(emi, homePrice, propertyTaxPercent, annualInsurance, monthlyHoa),
    [emi, homePrice, propertyTaxPercent, annualInsurance, monthlyHoa]
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
          <span className="mb-1 block text-muted">Home price</span>
          <input type="number" min={0} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Down payment: {downPaymentPercent}% ({currency}{formatMoney(downPayment)})</span>
          <input type="range" min={0} max={90} value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Interest rate: {rate}%</span>
          <input type="range" min={1} max={15} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Loan term: {tenureYears} year(s)</span>
          <input type="range" min={5} max={30} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Property tax rate: {propertyTaxPercent}% p.a.</span>
          <input type="range" min={0} max={3} step={0.05} value={propertyTaxPercent} onChange={(e) => setPropertyTaxPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual home insurance</span>
          <input type="number" min={0} value={annualInsurance} onChange={(e) => setAnnualInsurance(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Monthly HOA / association fee</span>
          <input type="number" min={0} value={monthlyHoa} onChange={(e) => setMonthlyHoa(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Principal & interest</p>
          <p className="mt-1 font-mono text-xl font-semibold">{currency}{formatMoney(piti.principalAndInterest)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Property tax (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{currency}{formatMoney(piti.monthlyTax)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Insurance + HOA (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{currency}{formatMoney(piti.monthlyInsurance + piti.monthlyHoa)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total monthly payment (PITI)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(piti.totalMonthlyPayment)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        A US-style mortgage calculator that estimates your full monthly housing payment: Principal, Interest,
        Taxes, and Insurance (PITI), plus HOA fees if applicable. For a pure EMI-only calculation (common outside
        the US), use the Home Loan Calculator instead.
      </p>
    </div>
  );
}
