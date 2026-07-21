"use client";

import { useMemo, useState } from "react";
import { CURRENCY_OPTIONS, formatMoney } from "@/lib/finance-utils";
import { calculateRetirementCorpus } from "@/lib/finance-extra-utils";

export function RetirementCalculatorTool() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0].value);
  const [currentExpense, setCurrentExpense] = useState(50000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(11);
  const [postReturn, setPostReturn] = useState(7);

  const result = useMemo(
    () => calculateRetirementCorpus(currentExpense, currentAge, retirementAge, lifeExpectancy, inflation, preReturn, postReturn),
    [currentExpense, currentAge, retirementAge, lifeExpectancy, inflation, preReturn, postReturn]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div />

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Current monthly expenses</span>
          <input type="number" min={0} value={currentExpense} onChange={(e) => setCurrentExpense(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <div className="grid grid-cols-3 gap-2">
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Current age</span>
            <input type="number" min={16} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Retire at</span>
            <input type="number" min={30} value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Life expect.</span>
            <input type="number" min={retirementAge + 1} value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
          </label>
        </div>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Inflation: {inflation}% p.a.</span>
          <input type="range" min={2} max={12} step={0.5} value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Return before retirement: {preReturn}% p.a.</span>
          <input type="range" min={4} max={16} step={0.5} value={preReturn} onChange={(e) => setPreReturn(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Return after retirement: {postReturn}% p.a.</span>
          <input type="range" min={2} max={12} step={0.5} value={postReturn} onChange={(e) => setPostReturn(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs text-muted">Retirement corpus needed</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.corpusNeeded)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Monthly expense at retirement</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.futureMonthlyExpense)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Required monthly SIP</p>
          <p className="mt-1 font-mono text-2xl font-semibold">{currency}{formatMoney(result.requiredMonthlySip)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Inflates your current expenses to your retirement year, then calculates the corpus needed to sustain that
        (inflation-adjusted) expense through your retirement years, and the monthly SIP required to build it.
        Actual results depend heavily on real-world market returns and inflation, which fluctuate over time.
      </p>
    </div>
  );
}
