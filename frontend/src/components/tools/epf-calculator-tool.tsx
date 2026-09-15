"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateEpf } from "@/lib/finance-extra-utils";

export function EpfCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [basicSalary, setBasicSalary] = useState(30000);
  const [employeePercent, setEmployeePercent] = useState(12);
  const [employerPercent, setEmployerPercent] = useState(12);
  const [rate, setRate] = useState(8.25);
  const [years, setYears] = useState(25);
  const [increment, setIncrement] = useState(5);
  const [currentBalance, setCurrentBalance] = useState(0);

  const result = useMemo(
    () => calculateEpf(basicSalary, employeePercent, employerPercent, rate, years, increment, currentBalance),
    [basicSalary, employeePercent, employerPercent, rate, years, increment, currentBalance]
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
          <span className="mb-1 block text-muted">Current monthly basic + DA</span>
          <input type="number" min={0} value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current EPF balance</span>
          <input type="number" min={0} value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Employee contribution: {employeePercent}%</span>
          <input type="range" min={1} max={20} step={0.25} value={employeePercent} onChange={(e) => setEmployeePercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Employer contribution: {employerPercent}%</span>
          <input type="range" min={1} max={20} step={0.25} value={employerPercent} onChange={(e) => setEmployerPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">EPF interest rate: {rate}% p.a.</span>
          <input type="range" min={5} max={12} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Annual salary increment: {increment}%</span>
          <input type="range" min={0} max={20} value={increment} onChange={(e) => setIncrement(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Years to retirement: {years} year(s)</span>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">EPF corpus at retirement</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.maturityValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total contribution</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalContribution)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Interest earned</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.totalInterest)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Simplified estimate: combines employee + employer contributions on your basic salary, compounded annually,
        with your salary increasing every year. Real EPF calculations also account for EPS diversion and monthly
        compounding — treat this as a rough long-term projection.
      </p>
    </div>
  );
}
