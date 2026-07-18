"use client";

import { useEffect, useMemo, useState } from "react";
import { convertTemperature, convertUnit, UNIT_CATEGORIES, type TemperatureUnit, type UnitCategory } from "@/lib/number-utils";

const CATEGORIES: { value: UnitCategory; label: string }[] = [
  { value: "length", label: "Length" },
  { value: "weight", label: "Weight" },
  { value: "temperature", label: "Temperature" },
  { value: "volume", label: "Volume" },
  { value: "area", label: "Area" },
  { value: "speed", label: "Speed" },
];

const TEMPERATURE_UNITS: { value: TemperatureUnit; label: string }[] = [
  { value: "celsius", label: "Celsius (\u00b0C)" },
  { value: "fahrenheit", label: "Fahrenheit (\u00b0F)" },
  { value: "kelvin", label: "Kelvin (K)" },
];

export function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [value, setValue] = useState("1");

  useEffect(() => {
    if (category === "temperature") {
      setFromUnit("celsius");
      setToUnit("fahrenheit");
    } else {
      const units = UNIT_CATEGORIES[category];
      setFromUnit(units[0].key);
      setToUnit(units[1]?.key ?? units[0].key);
    }
  }, [category]);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) return null;
    if (category === "temperature") {
      return convertTemperature(num, fromUnit as TemperatureUnit, toUnit as TemperatureUnit);
    }
    return convertUnit(num, category, fromUnit, toUnit);
  }, [category, fromUnit, toUnit, value]);

  const units = category === "temperature" ? TEMPERATURE_UNITS : UNIT_CATEGORIES[category].map((u) => ({ value: u.key, label: u.label }));

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div>
      <label className="mb-4 block text-xs">
        <span className="mb-1 block text-muted">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as UnitCategory)}
          className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm sm:w-auto"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto_1fr]">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Value</span>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">From</span>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
        <button onClick={swap} title="Swap units" className="btn btn-secondary h-9 w-9 shrink-0 justify-self-center px-0 text-sm">
          {"\u21c4"}
        </button>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">To</span>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card mt-4 p-4">
        <p className="text-xs text-muted">Result</p>
        <p className="mt-1 break-all font-mono text-2xl font-semibold">
          {result === null ? "\u2014" : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
        </p>
      </div>
    </div>
  );
}
