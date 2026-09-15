"use client";

import { useMemo, useState } from "react";
import { generateHarmony, generateShadesAndTints, randomHex, type HarmonyType } from "@/lib/color-utils";
import { Swatch } from "@/components/tools/shared/color-shared";

const HARMONIES: { value: HarmonyType; label: string; description: string }[] = [
  { value: "complementary", label: "Complementary", description: "Base color plus its opposite on the color wheel." },
  { value: "analogous", label: "Analogous", description: "Neighboring hues for a calm, cohesive look." },
  { value: "triadic", label: "Triadic", description: "Three hues evenly spaced 120° apart." },
  { value: "tetradic", label: "Tetradic", description: "Four hues evenly spaced 90° apart." },
  { value: "split-complementary", label: "Split-complementary", description: "Base plus the two hues next to its opposite." },
  { value: "monochromatic", label: "Monochromatic", description: "Five lightness steps of a single hue." },
];

export function PaletteGeneratorTool() {
  const [base, setBase] = useState("#0ea5e9");
  const [harmony, setHarmony] = useState<HarmonyType>("complementary");
  const [copied, setCopied] = useState<string | null>(null);

  const palette = useMemo(() => generateHarmony(base, harmony), [base, harmony]);
  const shadesTints = useMemo(() => generateShadesAndTints(base, 5), [base]);
  const activeHarmony = HARMONIES.find((h) => h.value === harmony)!;

  function copy(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-xs text-muted">Base color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="h-9 w-11 cursor-pointer rounded border border-border bg-background"
            />
            <input
              value={base}
              onChange={(e) => setBase(e.target.value)}
              spellCheck={false}
              className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Harmony</label>
          <select
            value={harmony}
            onChange={(e) => setHarmony(e.target.value as HarmonyType)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {HARMONIES.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => setBase(randomHex())} className="btn btn-secondary h-9 px-3 text-xs">
          Random base
        </button>
      </div>

      <p className="mt-2 text-xs text-muted">{activeHarmony.description}</p>

      <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}>
        {palette.map((hex) => (
          <button key={hex} onClick={() => copy(hex)} className="text-left">
            <Swatch hex={hex} size="h-24 w-full" />
            <p className="mt-1.5 text-center font-mono text-xs">{copied === hex ? "Copied!" : hex}</p>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Shades (darker)</h3>
        <div className="grid grid-cols-5 gap-3">
          {shadesTints.shades.map((hex) => (
            <button key={hex} onClick={() => copy(hex)} className="text-left">
              <Swatch hex={hex} size="h-14 w-full" />
              <p className="mt-1 text-center font-mono text-[11px]">{copied === hex ? "Copied!" : hex}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Tints (lighter)</h3>
        <div className="grid grid-cols-5 gap-3">
          {shadesTints.tints.map((hex) => (
            <button key={hex} onClick={() => copy(hex)} className="text-left">
              <Swatch hex={hex} size="h-14 w-full" />
              <p className="mt-1 text-center font-mono text-[11px]">{copied === hex ? "Copied!" : hex}</p>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">Click any swatch to copy its hex code.</p>
    </div>
  );
}
