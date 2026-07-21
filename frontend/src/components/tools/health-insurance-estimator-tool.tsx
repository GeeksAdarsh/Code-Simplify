"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { estimateHealthInsurancePremium } from "@/lib/finance-extra-utils";

export function HealthInsuranceEstimatorTool() {
  const [age, setAge] = useState(35);
  const [familySize, setFamilySize] = useState(3);
  const [sumInsuredLakhs, setSumInsuredLakhs] = useState(10);
  const [cityTier, setCityTier] = useState<1 | 2 | 3>(1);

  const estimatedPremium = useMemo(
    () => estimateHealthInsurancePremium(age, familySize, sumInsuredLakhs, cityTier),
    [age, familySize, sumInsuredLakhs, cityTier]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Eldest member&apos;s age: {age}</span>
          <input type="range" min={1} max={80} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Family size (members covered): {familySize}</span>
          <input type="range" min={1} max={8} value={familySize} onChange={(e) => setFamilySize(Number(e.target.value))} className="w-full accent-foreground" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sum insured: \u20B9{sumInsuredLakhs} lakh</span>
          <input type="range" min={3} max={100} value={sumInsuredLakhs} onChange={(e) => setSumInsuredLakhs(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">City tier</label>
          <select value={cityTier} onChange={(e) => setCityTier(Number(e.target.value) as 1 | 2 | 3)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            <option value={1}>Tier 1 (metro)</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-1">
        <div className="card p-4">
          <p className="text-xs text-muted">Estimated annual premium</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{"\u20B9"}{formatMoney(estimatedPremium)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        This is a rough, ballpark estimate based on typical age-band and city-tier premium patterns \u2014 it is{" "}
        <strong>not</strong> a real insurer quote. Actual health insurance premiums depend on medical history,
        specific insurer pricing, add-ons, and underwriting. Always get quotes directly from insurers for an
        accurate price.
      </p>
    </div>
  );
}
