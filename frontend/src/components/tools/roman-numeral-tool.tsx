"use client";

import { useState } from "react";
import { fromRoman, toRoman } from "@/lib/number-utils";

export function RomanNumeralTool() {
  const [decimalText, setDecimalText] = useState("");
  const [romanText, setRomanText] = useState("");
  const [errorField, setErrorField] = useState<"decimal" | "roman" | null>(null);

  function handleDecimalChange(text: string) {
    setDecimalText(text);
    if (!text.trim()) {
      setRomanText("");
      setErrorField(null);
      return;
    }
    const num = Number(text);
    const roman = toRoman(num);
    if (roman === null) {
      setErrorField("decimal");
      return;
    }
    setRomanText(roman);
    setErrorField(null);
  }

  function handleRomanChange(text: string) {
    setRomanText(text);
    if (!text.trim()) {
      setDecimalText("");
      setErrorField(null);
      return;
    }
    const num = fromRoman(text);
    if (num === null) {
      setErrorField("roman");
      return;
    }
    setDecimalText(String(num));
    setErrorField(null);
  }

  function loadSample() {
    setDecimalText("2026");
    setRomanText(toRoman(2026) ?? "");
    setErrorField(null);
  }

  function clear() {
    setDecimalText("");
    setRomanText("");
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
          <span className="mb-1 block text-muted">Number (1-3999)</span>
          <input
            value={decimalText}
            onChange={(e) => handleDecimalChange(e.target.value)}
            placeholder="e.g. 2026"
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground ${
              errorField === "decimal" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Roman numeral</span>
          <input
            value={romanText}
            onChange={(e) => handleRomanChange(e.target.value)}
            placeholder="e.g. MMXXVI"
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm uppercase outline-none focus:border-foreground ${
              errorField === "roman" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
      </div>

      {errorField === "decimal" && (
        <p className="mt-2 text-xs text-muted">Enter a whole number between 1 and 3999 (standard Roman numerals don&apos;t support 0 or negatives).</p>
      )}
      {errorField === "roman" && <p className="mt-2 text-xs text-muted">That doesn&apos;t look like a valid Roman numeral.</p>}
    </div>
  );
}
