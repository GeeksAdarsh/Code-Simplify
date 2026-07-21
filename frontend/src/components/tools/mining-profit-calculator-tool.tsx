"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateMiningProfit } from "@/lib/finance-extra-utils";

export function MiningProfitCalculatorTool() {
  const [coinsPerDay, setCoinsPerDay] = useState(0.0005);
  const [coinPrice, setCoinPrice] = useState(3500000);
  const [powerWatts, setPowerWatts] = useState(3000);
  const [electricityCost, setElectricityCost] = useState(8);
  const [poolFeePercent, setPoolFeePercent] = useState(1);

  const result = useMemo(
    () => calculateMiningProfit(coinsPerDay, coinPrice, powerWatts, electricityCost, poolFeePercent),
    [coinsPerDay, coinPrice, powerWatts, electricityCost, poolFeePercent]
  );

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Estimated coins mined per day</span>
          <input type="number" min={0} step="any" value={coinsPerDay} onChange={(e) => setCoinsPerDay(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Coin price (per unit)</span>
          <input type="number" min={0} value={coinPrice} onChange={(e) => setCoinPrice(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Power consumption (watts)</span>
          <input type="number" min={0} value={powerWatts} onChange={(e) => setPowerWatts(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Electricity cost (per kWh)</span>
          <input type="number" min={0} step="any" value={electricityCost} onChange={(e) => setElectricityCost(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none" />
        </label>
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Pool fee: {poolFeePercent}%</span>
          <input type="range" min={0} max={5} step={0.1} value={poolFeePercent} onChange={(e) => setPoolFeePercent(Number(e.target.value))} className="w-full accent-foreground" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs text-muted">Daily revenue (after pool fee)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.dailyRevenue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Daily electricity cost</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.dailyElectricityCost)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Daily net profit</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.dailyNetProfit)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Monthly net profit (30 days)</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.monthlyNetProfit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Get your estimated daily coin reward from your mining pool&apos;s dashboard or a hardware-specific mining
        calculator (it depends on network difficulty, which changes constantly and isn&apos;t available offline).
        Enter it here along with your rig&apos;s power draw and local electricity rate to see your real net profit
        after costs and pool fees.
      </p>
    </div>
  );
}
