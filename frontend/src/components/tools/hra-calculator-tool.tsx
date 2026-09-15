"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateHraExemption } from "@/lib/finance-extra-utils";

export function HraCalculatorTool() {
  const [basicMonthly, setBasicMonthly] = useState(40000);
  const [hraMonthly, setHraMonthly] = useState(20000);
  const [rentMonthly, setRentMonthly] = useState(18000);
  const [isMetro, setIsMetro] = useState(true);

  const exemption = useMemo(
    () => calculateHraExemption(basicMonthly * 12, hraMonthly * 12, rentMonthly * 12, isMetro),
    [basicMonthly, hraMonthly, rentMonthly, isMetro]
  );
  const taxableHra = Math.max(0, hraMonthly * 12 - exemption);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Basic salary (monthly)</span>
          <input type="number" min={0} value={basicMonthly} onChange={(e) => setBasicMonthly(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">HRA received (monthly)</span>
          <input type="number" min={0} value={hraMonthly} onChange={(e) => setHraMonthly(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Rent paid (monthly)</span>
          <input type="number" min={0} value={rentMonthly} onChange={(e) => setRentMonthly(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">City type</label>
          <select value={isMetro ? "metro" : "non-metro"} onChange={(e) => setIsMetro(e.target.value === "metro")} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            <option value="metro">Metro (Delhi, Mumbai, Kolkata, Chennai)</option>
            <option value="non-metro">Non-metro</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">HRA exemption (annual)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(exemption)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Taxable HRA (annual)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"₹"}{formatMoney(taxableHra)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        HRA exemption is the minimum of: actual HRA received, rent paid minus 10% of basic salary, and 50% (metro)
        or 40% (non-metro) of basic salary — as per the old tax regime rules. HRA exemption isn&apos;t available under
        the new tax regime.
      </p>
    </div>
  );
}
