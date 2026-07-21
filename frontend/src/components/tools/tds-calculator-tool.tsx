"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateTds } from "@/lib/finance-extra-utils";

const TDS_SECTIONS = [
  { label: "Salary (Sec 192) \u2014 as per slab", rate: 0 },
  { label: "Professional/technical fees (Sec 194J) \u2014 10%", rate: 10 },
  { label: "Rent \u2014 land/building (Sec 194I) \u2014 10%", rate: 10 },
  { label: "Contractor payments (Sec 194C) \u2014 2%", rate: 2 },
  { label: "Commission/brokerage (Sec 194H) \u2014 5%", rate: 5 },
  { label: "Interest other than securities (Sec 194A) \u2014 10%", rate: 10 },
  { label: "Custom rate", rate: -1 },
];

export function TdsCalculatorTool() {
  const [amount, setAmount] = useState(50000);
  const [sectionIndex, setSectionIndex] = useState(1);
  const [customRate, setCustomRate] = useState(10);

  const rate = TDS_SECTIONS[sectionIndex].rate === -1 ? customRate : TDS_SECTIONS[sectionIndex].rate;
  const result = useMemo(() => calculateTds(amount, rate), [amount, rate]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Payment amount (\u20B9)</span>
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">TDS section</label>
          <select value={sectionIndex} onChange={(e) => setSectionIndex(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {TDS_SECTIONS.map((s, i) => (
              <option key={s.label} value={i}>{s.label}</option>
            ))}
          </select>
        </div>

        {TDS_SECTIONS[sectionIndex].rate === -1 && (
          <label className="block text-xs sm:col-span-2">
            <span className="mb-1 block text-muted">Custom TDS rate: {customRate}%</span>
            <input type="range" min={0} max={30} step={0.5} value={customRate} onChange={(e) => setCustomRate(Number(e.target.value))} className="w-full accent-foreground" />
          </label>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">TDS amount ({rate}%)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(result.tdsAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net payable</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(result.netPayable)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        TDS rates shown are representative rates commonly used under the Income Tax Act&apos;s key sections and are for
        quick reference only \u2014 actual applicable rates depend on PAN availability, recipient type, and thresholds.
        Verify against the current Income Tax Department TDS rate chart before deducting.
      </p>
    </div>
  );
}
