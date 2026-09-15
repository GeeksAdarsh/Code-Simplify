"use client";

import { useMemo, useState } from "react";
import { calculateBmi, type BmiUnit } from "@/lib/number-utils";

export function BmiCalculatorTool() {
  const [unit, setUnit] = useState<BmiUnit>("metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) return null;
    return calculateBmi(w, h, unit);
  }, [weight, height, unit]);

  function switchUnit(next: BmiUnit) {
    if (next === unit) return;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!Number.isNaN(w) && !Number.isNaN(h)) {
      if (next === "imperial") {
        setWeight((w * 2.20462262).toFixed(1));
        setHeight((h / 2.54).toFixed(1));
      } else {
        setWeight((w / 2.20462262).toFixed(1));
        setHeight((h * 2.54).toFixed(1));
      }
    }
    setUnit(next);
  }

  const markerPercent = result ? Math.min(100, Math.max(0, ((result.bmi - 15) / (40 - 15)) * 100)) : 0;

  return (
    <div>
      <div className="mb-4 inline-flex rounded-lg border border-border p-0.5 text-xs">
        <button
          onClick={() => switchUnit("metric")}
          className={`rounded-md px-3 py-1.5 ${unit === "metric" ? "bg-foreground text-background" : "text-muted"}`}
        >
          Metric (kg / cm)
        </button>
        <button
          onClick={() => switchUnit("imperial")}
          className={`rounded-md px-3 py-1.5 ${unit === "imperial" ? "bg-foreground text-background" : "text-muted"}`}
        >
          Imperial (lb / in)
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Weight ({unit === "metric" ? "kg" : "lb"})</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Height ({unit === "metric" ? "cm" : "in"})</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
      </div>

      <div className="card mt-4 p-4">
        <p className="text-xs text-muted">Your BMI</p>
        <p className="mt-1 font-mono text-4xl font-semibold">{result ? result.bmi.toFixed(1) : "—"}</p>
        <p className="mt-1 text-sm font-medium">{result?.category}</p>

        <div className="relative mt-4 h-2 rounded-full bg-border">
          {result && (
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-background bg-foreground"
              style={{ left: `calc(${markerPercent}% - 7px)` }}
            />
          )}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-muted">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        BMI is a general screening tool and doesn&apos;t account for muscle mass, bone density, age, sex, or ethnicity. Consult a
        healthcare professional for a full health assessment.
      </p>
    </div>
  );
}
