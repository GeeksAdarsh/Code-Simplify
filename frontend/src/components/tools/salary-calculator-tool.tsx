"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateSalaryBreakdown } from "@/lib/finance-extra-utils";

export function SalaryCalculatorTool() {
  const [annualCtc, setAnnualCtc] = useState(1200000);
  const [basicPercent, setBasicPercent] = useState(40);
  const [hraPercent, setHraPercent] = useState(50);
  const [pfPercent, setPfPercent] = useState(12);
  const [professionalTax, setProfessionalTax] = useState(200);

  const result = useMemo(
    () => calculateSalaryBreakdown(annualCtc, basicPercent, hraPercent, pfPercent, professionalTax),
    [annualCtc, basicPercent, hraPercent, pfPercent, professionalTax]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Annual CTC (₹)</span>
          <input type="number" min={0} value={annualCtc} onChange={(e) => setAnnualCtc(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Basic salary: {basicPercent}% of CTC</span>
          <input type="range" min={30} max={60} value={basicPercent} onChange={(e) => setBasicPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">HRA: {hraPercent}% of basic</span>
          <input type="range" min={0} max={50} value={hraPercent} onChange={(e) => setHraPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Employee PF: {pfPercent}% of basic</span>
          <input type="range" min={0} max={12} value={pfPercent} onChange={(e) => setPfPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Professional tax (monthly)</span>
          <input type="number" min={0} value={professionalTax} onChange={(e) => setProfessionalTax(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Basic (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.basic)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">HRA (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.hra)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Other allowances (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.otherAllowances)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Gross salary (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.grossMonthly)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Employee PF (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.employeePf)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net salary (monthly, pre-tax)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"₹"}{formatMoney(result.netMonthly)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Breaks down your CTC into common salary components based on typical percentage splits. This shows salary
        structure only (before income tax) — use the Take Home Salary Calculator for your final in-hand pay after
        estimated income tax.
      </p>
    </div>
  );
}
