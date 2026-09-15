"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateCommission } from "@/lib/finance-extra-utils";

export function CommissionCalculatorTool() {
  const [saleAmount, setSaleAmount] = useState(100000);
  const [commissionPercent, setCommissionPercent] = useState(5);

  const result = useMemo(() => calculateCommission(saleAmount, commissionPercent), [saleAmount, commissionPercent]);

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sale amount</span>
          <input type="number" min={0} value={saleAmount} onChange={(e) => setSaleAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Commission rate: {commissionPercent}%</span>
          <input type="range" min={0} max={50} step={0.5} value={commissionPercent} onChange={(e) => setCommissionPercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Commission earned</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.commission)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net amount (after commission)</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.netAmount)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Calculates a flat-rate commission on a sale amount — useful for sales reps, brokers, affiliates, or
        agents working on a simple percentage-based commission structure.
      </p>
    </div>
  );
}
