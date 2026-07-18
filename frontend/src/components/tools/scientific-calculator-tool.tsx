"use client";

import { useMemo, useState } from "react";
import { evaluateExpression } from "@/lib/number-utils";

const BUTTON_ROWS: string[][] = [
  ["sin(", "cos(", "tan(", "(", ")"],
  ["log(", "ln(", "sqrt(", "^", "%"],
  ["7", "8", "9", "/", "pi"],
  ["4", "5", "6", "*", "e"],
  ["1", "2", "3", "-", "AC"],
  ["0", ".", "=", "+", "\u232b"],
];

export function ScientificCalculatorTool() {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!expression.trim()) return null;
    try {
      const value = evaluateExpression(expression);
      return Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  }, [expression]);

  function press(token: string) {
    setError(null);
    if (token === "AC") {
      setExpression("");
      return;
    }
    if (token === "\u232b") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }
    if (token === "=") {
      evaluate();
      return;
    }
    setExpression((prev) => prev + token);
  }

  function evaluate() {
    if (!expression.trim()) return;
    try {
      const value = evaluateExpression(expression);
      if (!Number.isFinite(value)) throw new Error("Result is not a finite number");
      const resultStr = String(Math.round(value * 1e10) / 1e10);
      setHistory((prev) => [{ expression, result: resultStr }, ...prev].slice(0, 10));
      setExpression(resultStr);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid expression");
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
      <div>
        <div className="card p-4">
          <input
            value={expression}
            onChange={(e) => {
              setExpression(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") evaluate();
            }}
            placeholder="0"
            spellCheck={false}
            className="w-full bg-transparent text-right font-mono text-2xl outline-none"
          />
          <div className="mt-1 text-right font-mono text-sm text-muted">
            {error ? error : preview !== null ? `= ${preview.toLocaleString(undefined, { maximumFractionDigits: 8 })}` : "\u00a0"}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-2">
          {BUTTON_ROWS.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => press(btn)}
              className={`btn h-11 px-0 font-mono text-sm ${
                btn === "=" ? "btn-primary" : "btn-secondary"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">
          Supports +, \u2212, \u00d7, \u00f7, ^ (power), % (modulo), parentheses, and functions: sin, cos, tan, asin, acos, atan
          (degrees), sqrt, cbrt, log (base 10), ln, exp, abs, round, floor, ceil, plus constants pi and e.
        </p>
      </div>

      <div className="card p-3">
        <p className="mb-2 text-xs text-muted">History</p>
        {history.length === 0 ? (
          <p className="text-xs text-muted">No calculations yet.</p>
        ) : (
          <ul className="space-y-2 text-xs">
            {history.map((h, i) => (
              <li key={i} className="cursor-pointer border-b border-border pb-2 last:border-b-0" onClick={() => setExpression(h.result)}>
                <p className="truncate text-muted">{h.expression}</p>
                <p className="font-mono font-medium">= {h.result}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
