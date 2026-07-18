"use client";

import { useState } from "react";
import { parseIntSafe, toBase } from "@/lib/number-utils";

export function BaseConverterTool({
  radix,
  label,
  placeholder,
  sampleDecimal,
}: {
  radix: number;
  label: string;
  placeholder: string;
  sampleDecimal: number;
}) {
  const [decimalText, setDecimalText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [errorField, setErrorField] = useState<"decimal" | "other" | null>(null);

  function handleDecimalChange(text: string) {
    setDecimalText(text);
    if (!text.trim()) {
      setOtherText("");
      setErrorField(null);
      return;
    }
    const value = parseIntSafe(text, 10);
    if (value === null) {
      setErrorField("decimal");
      return;
    }
    setOtherText(toBase(value, radix));
    setErrorField(null);
  }

  function handleOtherChange(text: string) {
    setOtherText(text);
    if (!text.trim()) {
      setDecimalText("");
      setErrorField(null);
      return;
    }
    const value = parseIntSafe(text, radix);
    if (value === null) {
      setErrorField("other");
      return;
    }
    setDecimalText(String(value));
    setErrorField(null);
  }

  function loadSample() {
    setDecimalText(String(sampleDecimal));
    setOtherText(toBase(sampleDecimal, radix));
    setErrorField(null);
  }

  function clear() {
    setDecimalText("");
    setOtherText("");
    setErrorField(null);
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={clear} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Decimal (base 10)</span>
          <input
            value={decimalText}
            onChange={(e) => handleDecimalChange(e.target.value)}
            placeholder="e.g. 255"
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground ${
              errorField === "decimal" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">{label}</span>
          <input
            value={otherText}
            onChange={(e) => handleOtherChange(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground ${
              errorField === "other" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
      </div>

      {errorField && (
        <p className="mt-2 text-xs text-muted">
          Could not parse that {errorField === "decimal" ? "decimal" : label.toLowerCase()} value.
        </p>
      )}
    </div>
  );
}
