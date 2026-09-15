"use client";

import { useMemo, useState } from "react";
import { evaluateWcag, parseCssColor } from "@/lib/color-utils";

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
        pass ? "border-border" : "border-foreground/30"
      }`}
    >
      <span className="text-muted">{label}</span>
      <span className={`font-semibold ${pass ? "" : "text-muted"}`}>{pass ? "Pass" : "Fail"}</span>
    </div>
  );
}

export function ContrastCheckerTool() {
  const [foreground, setForeground] = useState("#0a0a0a");
  const [background, setBackground] = useState("#ffffff");

  const result = useMemo(() => {
    const fg = parseCssColor(foreground);
    const bg = parseCssColor(background);
    if (!fg || !bg) return null;
    return evaluateWcag(fg, bg);
  }, [foreground, background]);

  function swap() {
    setForeground(background);
    setBackground(foreground);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Foreground (text) color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={/^#[0-9a-fA-F]{6}$/.test(foreground) ? foreground : "#000000"}
              onChange={(e) => setForeground(e.target.value)}
              className="h-9 w-11 cursor-pointer rounded border border-border bg-background"
            />
            <input
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </div>
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Background color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={/^#[0-9a-fA-F]{6}$/.test(background) ? background : "#ffffff"}
              onChange={(e) => setBackground(e.target.value)}
              className="h-9 w-11 cursor-pointer rounded border border-border bg-background"
            />
            <input
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </div>
        </label>
      </div>

      <button onClick={swap} className="btn btn-secondary mt-3 h-8 px-3 text-xs">
        Swap colors
      </button>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_260px]">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex flex-col items-start justify-center gap-2 p-8" style={{ backgroundColor: background, color: foreground }}>
            <p className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</p>
            <p className="text-sm">Normal-sized body text sample at this contrast ratio.</p>
            <p className="text-lg font-bold">Large / bold text sample (18pt+ or 14pt+ bold)</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="card p-4 text-center">
            <p className="text-xs text-muted">Contrast ratio</p>
            <p className="mt-1 font-mono text-3xl font-semibold">{result ? result.ratio.toFixed(2) : "—"}</p>
            <p className="text-xs text-muted">: 1</p>
          </div>
          {result && (
            <>
              <Badge pass={result.aaNormal} label="WCAG AA · normal text (≥ 4.5)" />
              <Badge pass={result.aaLarge} label="WCAG AA · large text (≥ 3)" />
              <Badge pass={result.aaaNormal} label="WCAG AAA · normal text (≥ 7)" />
              <Badge pass={result.aaaLarge} label="WCAG AAA · large text (≥ 4.5)" />
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Ratios are calculated per the WCAG 2.x relative luminance formula. AA is the minimum most sites should meet; AAA is
        a stricter, enhanced standard. &quot;Large text&quot; means at least 18pt (24px) regular or 14pt (18.5px) bold.
      </p>
    </div>
  );
}
