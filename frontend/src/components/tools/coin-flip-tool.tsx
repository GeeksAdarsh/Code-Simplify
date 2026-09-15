"use client";

import { useState } from "react";
import { generateRandomInt } from "@/lib/random-utils";

export function CoinFlipTool() {
  const [side, setSide] = useState<"heads" | "tails">("heads");
  const [flipping, setFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [history, setHistory] = useState<("heads" | "tails")[]>([]);

  function flip() {
    if (flipping) return;
    const result: "heads" | "tails" = generateRandomInt(0, 1) === 0 ? "heads" : "tails";
    setFlipping(true);
    setFlipCount((c) => c + 1);
    setTimeout(() => {
      setSide(result);
      setHistory((h) => [result, ...h].slice(0, 20));
      setFlipping(false);
    }, 700);
  }

  const heads = history.filter((h) => h === "heads").length;
  const tails = history.filter((h) => h === "tails").length;

  return (
    <div className="flex flex-col items-center">
      <div className="[perspective:800px]">
        <div
          key={flipCount}
          className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-foreground/20 bg-surface text-2xl font-bold shadow-sm"
          style={{
            animation: flipping ? "coin-flip 0.7s ease-in-out" : undefined,
          }}
        >
          {flipping ? "✨" : side === "heads" ? "Heads" : "Tails"}
        </div>
      </div>

      <button onClick={flip} disabled={flipping} className="btn btn-primary mt-6 h-10 px-6 text-sm disabled:opacity-50">
        {flipping ? "Flipping…" : "Flip Coin"}
      </button>

      {history.length > 0 && (
        <div className="mt-6 w-full max-w-sm">
          <p className="mb-2 text-center text-xs text-muted">
            Heads: {heads} &middot; Tails: {tails} &middot; Total flips: {history.length}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {history.map((h, i) => (
              <span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-[10px] font-medium"
                title={h}
              >
                {h === "heads" ? "H" : "T"}
              </span>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes coin-flip {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(360deg) scale(1.08); }
          100% { transform: rotateY(720deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
