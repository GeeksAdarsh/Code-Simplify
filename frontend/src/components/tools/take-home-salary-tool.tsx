"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateTakeHomeSalary } from "@/lib/finance-extra-utils";

export function TakeHomeSalaryTool() {
  const [annualCtc, setAnnualCtc] = useState(1200000);
  const [basicPercent, setBasicPercent] = useState(40);
  const [pfPercent, setPfPercent] = useState(12);
  const [professionalTax, setProfessionalTax] = useState(200);
  const [useNewRegime, setUseNewRegime] = useState(true);

  const result = useMemo(
    () => calculateTakeHomeSalary(annualCtc, pfPercent, professionalTax, basicPercent, useNewRegime),
    [annualCtc, pfPercent, professionalTax, basicPercent, useNewRegime]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Annual CTC (\u20B9)</span>
          <input type="number" min={0} value={annualCtc} onChange={(e) => setAnnualCtc(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Basic salary: {basicPercent}% of CTC</span>
          <input type="range" min={30} max={60} value={basicPercent} onChange={(e) => setBasicPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Employee PF: {pfPercent}% of basic</span>
          <input type="range" min={0} max={12} value={pfPercent} onChange={(e) => setPfPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Professional tax (monthly)</span>
          <input type="number" min={0} value={professionalTax} onChange={(e) => setProfessionalTax(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Tax regime</label>
          <select value={useNewRegime ? "new" : "old"} onChange={(e) => setUseNewRegime(e.target.value === "new")} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            <option value="new">New regime</option>
            <option value="old">Old regime</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Gross salary (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"\u20B9"}{formatMoney(result.grossMonthly)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Estimated income tax (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"\u20B9"}{formatMoney(result.monthlyIncomeTax)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Employee PF (monthly)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{"\u20B9"}{formatMoney(result.monthlyPf)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Take-home salary (monthly)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(result.netMonthly)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Deducts employee PF, professional tax, and an estimated income tax (using illustrative slabs \u2014 see the
        Income Tax Calculator) from your gross salary to estimate your final monthly in-hand pay. Doesn&apos;t account
        for other deductions like TDS on perquisites, gratuity, or additional voluntary deductions.
      </p>
    </div>
  );
}
