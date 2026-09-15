"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateNetWorth, type NetWorthItem } from "@/lib/finance-extra-utils";

export function NetWorthCalculatorTool() {
  const [assets, setAssets] = useState<NetWorthItem[]>([
    { name: "Cash & bank balance", amount: 100000 },
    { name: "Investments", amount: 300000 },
  ]);
  const [liabilities, setLiabilities] = useState<NetWorthItem[]>([{ name: "Credit card / loans", amount: 50000 }]);

  function updateList(setList: typeof setAssets, index: number, patch: Partial<NetWorthItem>) {
    setList((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  const result = useMemo(() => calculateNetWorth(assets, liabilities), [assets, liabilities]);

  function renderList(title: string, list: NetWorthItem[], setList: typeof setAssets) {
    return (
      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-muted">{title}</p>
        <div className="space-y-2">
          {list.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateList(setList, i, { name: e.target.value })}
                placeholder="Name"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                value={item.amount}
                onChange={(e) => updateList(setList, i, { amount: Number(e.target.value) })}
                placeholder="Amount"
                className="w-32 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              {list.length > 1 && (
                <button onClick={() => setList((prev) => prev.filter((_, j) => j !== i))} className="shrink-0 text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setList((prev) => [...prev, { name: "", amount: 0 }])} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {renderList("Assets", assets, setAssets)}
        {renderList("Liabilities", liabilities, setLiabilities)}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Total assets</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalAssets)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total liabilities</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.totalLiabilities)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Net worth</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{formatMoney(result.netWorth)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Net worth = Total assets − Total liabilities. Add all your assets (cash, investments, property, etc.)
        and liabilities (loans, credit card debt, etc.) to see your overall financial position at a glance.
      </p>
    </div>
  );
}
