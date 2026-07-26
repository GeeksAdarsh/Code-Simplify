"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { generateRandomInt } from "@/lib/random-utils";

const SAMPLE_OPTIONS = "Pizza\nSushi\nTacos\nBurgers\nPasta\nSalad";

const PALETTE = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
];

export function SpinWheelTool() {
  const [optionsText, setOptionsText] = useState(SAMPLE_OPTIONS);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const options = useMemo(
    () =>
      optionsText
        .split("\n")
        .map((o) => o.trim())
        .filter(Boolean),
    [optionsText]
  );

  const segAngle = options.length > 0 ? 360 / options.length : 0;

  const conicGradient = useMemo(() => {
    if (options.length === 0) return "transparent";
    const stops = options.map((_, i) => `${PALETTE[i % PALETTE.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`);
    return `conic-gradient(${stops.join(", ")})`;
  }, [options, segAngle]);

  function spin() {
    if (spinning || options.length < 2) return;
    setSpinning(true);
    setWinner(null);

    const targetIndex = generateRandomInt(0, options.length - 1);
    const center = targetIndex * segAngle + segAngle / 2;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (360 - center - currentMod + 3600) % 360;
    const extraSpins = 6 * 360;
    const newRotation = rotation + extraSpins + delta;

    setRotation(newRotation);
    setTimeout(() => {
      setWinner(options[targetIndex]);
      setSpinning(false);
    }, 3500);
  }

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Wheel options (one per line, at least 2)</label>
        <CodeEditor
          value={optionsText}
          onChange={(v) => {
            setOptionsText(v);
            setWinner(null);
          }}
          language="plaintext"
          height="9rem"
          className="rounded border border-border"
        />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative h-72 w-72">
          <div
            className="absolute inset-0 rounded-full border-4 border-foreground/20 shadow-sm"
            style={{
              background: conicGradient,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.16, 0.99)" : "none",
            }}
          >
            {options.map((label, i) => {
              const angle = i * segAngle + segAngle / 2;
              return (
                <div key={i} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <span
                    className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-white drop-shadow"
                    style={{ top: "-118px" }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[-4px] -translate-x-1/2 text-3xl leading-none">\u25BC</div>
        </div>

        <button onClick={spin} disabled={spinning || options.length < 2} className="btn btn-primary mt-6 h-10 px-6 text-sm disabled:opacity-50">
          {spinning ? "Spinning\u2026" : "Spin the Wheel"}
        </button>

        {options.length < 2 && <p className="mt-2 text-xs text-muted">Add at least 2 options to spin the wheel.</p>}

        {winner && (
          <p className="mt-4 text-center text-lg">
            Winner: <span className="font-bold">{winner}</span>
          </p>
        )}
      </div>
    </div>
  );
}
