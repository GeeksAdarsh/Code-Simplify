"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, calculateEmi, formatMoney } from "@/lib/finance-utils";

interface LoanOffer {
  label: string;
  principal: number;
  rate: number;
  tenureYears: number;
}

const DEFAULT_OFFERS: LoanOffer[] = [
  { label: "Offer A", principal: 2000000, rate: 8.5, tenureYears: 20 },
  { label: "Offer B", principal: 2000000, rate: 9.2, tenureYears: 20 },
];

export function LoanComparisonTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [offers, setOffers] = useState<LoanOffer[]>(DEFAULT_OFFERS);

  function updateOffer(index: number, patch: Partial<LoanOffer>) {
    setOffers((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  }

  function addOffer() {
    if (offers.length >= 4) return;
    setOffers((prev) => [...prev, { label: `Offer ${String.fromCharCode(65 + prev.length)}`, principal: 2000000, rate: 9, tenureYears: 20 }]);
  }

  function removeOffer(index: number) {
    setOffers((prev) => prev.filter((_, i) => i !== index));
  }

  const results = useMemo(
    () => offers.map((o) => ({ ...o, ...calculateEmi(o.principal, o.rate, Math.round(o.tenureYears * 12)) })),
    [offers]
  );

  const cheapestTotal = Math.min(...results.map((r) => r.totalPayment));

  return (
    <div>
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded border border-border bg-background px-2.5 py-1.5 text-sm">
          {CURRENCY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {offers.map((offer, i) => (
          <div key={i} className="card p-4">
            <div className="mb-2 flex items-center justify-between">
              <input
                value={offer.label}
                onChange={(e) => updateOffer(i, { label: e.target.value })}
                className="w-32 rounded border border-border bg-background px-2 py-1 text-sm font-medium outline-none"
              />
              {offers.length > 2 && (
                <button onClick={() => removeOffer(i)} className="text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
            <label className="block text-xs">
              <span className="mb-1 block text-muted">Loan amount</span>
              <input
                type="number"
                value={offer.principal}
                onChange={(e) => updateOffer(i, { principal: Number(e.target.value) })}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
            </label>
            <label className="mt-2 block text-xs">
              <span className="mb-1 block text-muted">Interest rate: {offer.rate}% p.a.</span>
              <input
                type="range"
                min={1}
                max={25}
                step={0.05}
                value={offer.rate}
                onChange={(e) => updateOffer(i, { rate: Number(e.target.value) })}
                className="w-full accent-foreground"
              />
            </label>
            <label className="mt-2 block text-xs">
              <span className="mb-1 block text-muted">Tenure: {offer.tenureYears} year(s)</span>
              <input
                type="range"
                min={1}
                max={30}
                value={offer.tenureYears}
                onChange={(e) => updateOffer(i, { tenureYears: Number(e.target.value) })}
                className="w-full accent-foreground"
              />
            </label>
          </div>
        ))}
      </div>

      {offers.length < 4 && (
        <button onClick={addOffer} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add another offer
        </button>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="py-2 pr-4">Offer</th>
              <th className="py-2 pr-4">EMI</th>
              <th className="py-2 pr-4">Total interest</th>
              <th className="py-2 pr-4">Total payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.map((r, i) => (
              <tr key={i} className={r.totalPayment === cheapestTotal ? "font-medium" : ""}>
                <td className="py-2 pr-4">{r.label}{r.totalPayment === cheapestTotal ? " \u2705" : ""}</td>
                <td className="py-2 pr-4 font-mono">{currency}{formatMoney(r.emi)}</td>
                <td className="py-2 pr-4 font-mono">{currency}{formatMoney(r.totalInterest)}</td>
                <td className="py-2 pr-4 font-mono">{currency}{formatMoney(r.totalPayment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">The checkmark marks the offer with the lowest total repayment amount.</p>
    </div>
  );
}
