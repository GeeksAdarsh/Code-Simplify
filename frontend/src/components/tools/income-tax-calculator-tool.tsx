"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateIncomeTax } from "@/lib/finance-extra-utils";

export function IncomeTaxCalculatorTool() {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);

  const result = useMemo(() => calculateIncomeTax(annualIncome, deductions), [annualIncome, deductions]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Gross annual income (₹)</span>
          <input type="number" min={0} value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Deductions (80C, 80D, etc. — old regime only)</span>
          <input type="number" min={0} value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={`card p-4 ${result.betterRegime === "new" ? "ring-1 ring-foreground/30" : ""}`}>
          <p className="text-xs text-muted">New regime tax {result.betterRegime === "new" && "(better)"}</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.newRegimeTax)}</p>
        </div>
        <div className={`card p-4 ${result.betterRegime === "old" ? "ring-1 ring-foreground/30" : ""}`}>
          <p className="text-xs text-muted">Old regime tax {result.betterRegime === "old" && "(better)"}</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(result.oldRegimeTax)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Illustrative estimate using representative Indian income tax slabs (a ₹50,000 standard deduction, the
        Section 87A rebate, and 4% health &amp; education cess included). Income tax slabs change with each Union
        Budget — always verify against the current assessment year&apos;s official slabs or consult a tax professional
        before filing.
      </p>
    </div>
  );
}
