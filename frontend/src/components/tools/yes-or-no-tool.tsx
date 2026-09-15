"use client";

import { useState } from "react";
import { generateRandomInt } from "@/lib/random-utils";

export function YesOrNoTool() {
  const [answer, setAnswer] = useState<"Yes" | "No" | null>(null);
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState<("Yes" | "No")[]>([]);

  function ask() {
    if (thinking) return;
    setThinking(true);
    setAnswer(null);
    setTimeout(() => {
      const result: "Yes" | "No" = generateRandomInt(0, 1) === 0 ? "Yes" : "No";
      setAnswer(result);
      setHistory((h) => [result, ...h].slice(0, 20));
      setThinking(false);
    }, 500);
  }

  const yesCount = history.filter((h) => h === "Yes").length;
  const noCount = history.filter((h) => h === "No").length;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-40 w-40 items-center justify-center rounded-full border-4 text-3xl font-bold transition-colors ${
          answer === "Yes"
            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-600"
            : answer === "No"
              ? "border-red-500/60 bg-red-500/10 text-red-600"
              : "border-foreground/20 bg-surface text-muted"
        }`}
      >
        {thinking ? "❓" : answer ?? "?"}
      </div>

      <button onClick={ask} disabled={thinking} className="btn btn-primary mt-6 h-10 px-6 text-sm disabled:opacity-50">
        {thinking ? "Thinking…" : "Ask the Question"}
      </button>

      {history.length > 0 && (
        <div className="mt-6 w-full max-w-sm">
          <p className="mb-2 text-center text-xs text-muted">
            Yes: {yesCount} &middot; No: {noCount} &middot; Total: {history.length}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {history.map((h, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-medium ${
                  h === "Yes" ? "border-emerald-500/40 text-emerald-600" : "border-red-500/40 text-red-600"
                }`}
                title={h}
              >
                {h === "Yes" ? "Y" : "N"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
