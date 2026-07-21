"use client";

import { useMemo, useState } from "react";
import { calculateRentalYield } from "@/lib/finance-extra-utils";

export function RentalYieldCalculatorTool() {
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [annualExpenses, setAnnualExpenses] = useState(30000);

  const result = useMemo(
    () => calculateRentalYield(propertyValue, monthlyRent * 12, annualExpenses),
    [propertyValue, monthlyRent, annualExpenses]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Property value</span>
          <input type="number" min={0} value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Monthly rental income</span>
          <input type="number" min={0} value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Annual expenses (maintenance, tax, insurance)</span>
          <input type="number" min={0} value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Gross rental yield</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.grossYieldPercent.toFixed(2)}%</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net rental yield</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{result.netYieldPercent.toFixed(2)}%</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Gross yield = Annual rent \u00F7 Property value. Net yield further subtracts annual expenses like
        maintenance, property tax, and insurance. In India, residential rental yields typically range 2\u20134%, while
        commercial properties often yield higher.
      </p>
    </div>
  );
}
