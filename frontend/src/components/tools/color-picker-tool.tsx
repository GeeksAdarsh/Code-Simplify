"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatCmyk,
  formatHsl,
  formatHsv,
  formatRgb,
  parseCssColor,
  randomHex,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from "@/lib/color-utils";
import { CopyField } from "@/components/tools/shared/color-shared";

declare global {
  interface Window {
    EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
  }
}

export function ColorPickerTool() {
  const [hex, setHex] = useState("#0ea5e9");
  const [textInput, setTextInput] = useState("#0ea5e9");
  const [textError, setTextError] = useState<string | null>(null);
  const [supportsEyeDropper, setSupportsEyeDropper] = useState(false);

  useEffect(() => {
    setSupportsEyeDropper(typeof window !== "undefined" && !!window.EyeDropper);
  }, []);

  function applyText(value: string) {
    setTextInput(value);
    const rgb = parseCssColor(value);
    if (!rgb) {
      setTextError("Could not parse that as a color. Try a hex code, rgb(), hsl(), or a named color.");
      return;
    }
    setTextError(null);
    setHex(rgbToHex(rgb));
  }

  function setFromPicker(value: string) {
    setHex(value);
    setTextInput(value);
    setTextError(null);
  }

  function randomize() {
    const value = randomHex();
    setFromPicker(value);
  }

  async function pickFromScreen() {
    if (!window.EyeDropper) return;
    try {
      const dropper = new window.EyeDropper();
      const result = await dropper.open();
      setFromPicker(result.sRGBHex);
    } catch {
      // user cancelled
    }
  }

  const rgb = useMemo(() => {
    const c = parseCssColor(hex);
    return c ?? { r: 0, g: 0, b: 0 };
  }, [hex]);

  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo(() => rgbToHsv(rgb), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-40 w-full rounded-xl border border-border shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <label className="btn btn-secondary h-9 w-full cursor-pointer px-3 text-xs">
            Choose color
            <input
              type="color"
              value={rgbToHex(rgb)}
              onChange={(e) => setFromPicker(e.target.value)}
              className="sr-only"
            />
          </label>
          <button onClick={randomize} className="btn btn-secondary h-9 w-full px-3 text-xs">
            Random color
          </button>
          {supportsEyeDropper && (
            <button onClick={pickFromScreen} className="btn btn-secondary h-9 w-full px-3 text-xs">
              Pick from screen
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Type or paste any color (hex, rgb, hsl, name)</span>
            <input
              value={textInput}
              onChange={(e) => applyText(e.target.value)}
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </label>
          {textError && <p className="text-xs text-muted">{textError}</p>}

          <div className="card mt-1 divide-y divide-border p-0">
            <CopyField label="HEX" value={rgbToHex(rgb)} />
            <CopyField label="RGB" value={formatRgb(rgb)} />
            <CopyField label="HSL" value={formatHsl(hsl)} />
            <CopyField label="HSV" value={formatHsv(hsv)} />
            <CopyField label="CMYK" value={formatCmyk(cmyk)} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        {supportsEyeDropper
          ? "Use \u201cPick from screen\u201d to sample any pixel on your screen (Chromium-based browsers), or paste a color value directly."
          : "The screen eyedropper is only available in Chromium-based browsers (Chrome, Edge). You can still paste any hex, rgb(), hsl(), or named color above."}
      </p>
    </div>
  );
}
