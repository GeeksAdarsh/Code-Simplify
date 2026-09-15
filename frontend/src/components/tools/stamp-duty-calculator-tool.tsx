"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { STAMP_DUTY_RATES_BY_STATE, calculateStampDuty } from "@/lib/finance-extra-utils";

const STATES = Object.keys(STAMP_DUTY_RATES_BY_STATE);

export function StampDutyCalculatorTool() {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [state, setState] = useState(STATES[0]);
  const [registrationFeePercent, setRegistrationFeePercent] = useState(1);

  const rate = STAMP_DUTY_RATES_BY_STATE[state];
  const result = useMemo(() => calculateStampDuty(propertyValue, rate, registrationFeePercent), [propertyValue, rate, registrationFeePercent]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Property value</span>
          <input type="number" min={0} value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {STATES.map((s) => (
              <option key={s} value={s}>{s} ({STAMP_DUTY_RATES_BY_STATE[s]}%)</option>
            ))}
          </select>
        </div>

        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Registration fee: {registrationFeePercent}%</span>
          <input type="range" min={0} max={3} step={0.1} value={registrationFeePercent} onChange={(e) => setRegistrationFeePercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Stamp duty</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.stampDuty)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Registration fee</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.registrationFee)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total charges</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.total)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Stamp duty rates vary significantly by Indian state, property type, and owner gender, and are revised
        periodically by state governments. The rates shown are representative reference values — verify the
        current rate on your state&apos;s registration department website before a transaction.
      </p>
    </div>
  );
}
