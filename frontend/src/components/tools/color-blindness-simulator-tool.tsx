"use client";

import { useCallback, useRef, useState } from "react";
import { simulateColorBlindness, simulateColorBlindnessOnImageData, type ColorBlindnessType } from "@/lib/color-utils";

const TYPES: { value: ColorBlindnessType; label: string; prevalence: string }[] = [
  { value: "protanopia", label: "Protanopia", prevalence: "~1% of men \u2014 red-blind" },
  { value: "deuteranopia", label: "Deuteranopia", prevalence: "~1% of men \u2014 green-blind" },
  { value: "tritanopia", label: "Tritanopia", prevalence: "<0.1% \u2014 blue-blind" },
  { value: "achromatopsia", label: "Achromatopsia", prevalence: "Very rare \u2014 no color vision" },
];

const DEMO_COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#a855f7", "#ec4899", "#0a0a0a", "#14b8a6"];

const MAX_DIMENSION = 480;

export function ColorBlindnessSimulatorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);
  const canvasRefs = useRef<Record<ColorBlindnessType, HTMLCanvasElement | null>>({
    protanopia: null,
    deuteranopia: null,
    tritanopia: null,
    achromatopsia: null,
  });
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderImage = useCallback((src: string) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      setDimensions({ w, h });

      const original = originalCanvasRef.current;
      if (original) {
        original.width = w;
        original.height = h;
        original.getContext("2d")?.drawImage(img, 0, 0, w, h);
      }

      for (const type of Object.keys(canvasRefs.current) as ColorBlindnessType[]) {
        const canvas = canvasRefs.current[type];
        if (!canvas) continue;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        simulateColorBlindnessOnImageData(imageData.data, type);
        ctx.putImageData(imageData, 0, 0);
      }
    };
    img.src = src;
  }, []);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImageSrc(src);
      renderImage(src);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Quick color swatches</h3>
        <div className="overflow-auto rounded-xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-3 py-2 font-medium">Original</th>
                {TYPES.map((t) => (
                  <th key={t.value} className="px-3 py-2 font-medium">
                    {t.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_COLORS.map((hex) => {
                const rgb = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
                return (
                  <tr key={hex} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded border border-border" style={{ backgroundColor: hex }} />
                        <span className="font-mono">{hex}</span>
                      </div>
                    </td>
                    {TYPES.map((t) => {
                      const sim = simulateColorBlindness(rgb, t.value);
                      const simHex = `#${[sim.r, sim.g, sim.b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
                      return (
                        <td key={t.value} className="px-3 py-2">
                          <span className="inline-block h-6 w-6 rounded border border-border align-middle" style={{ backgroundColor: simHex }} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Upload an image (e.g. a UI screenshot or chart)</h3>
        <label className="btn btn-secondary inline-flex h-9 cursor-pointer items-center px-4 text-xs">
          Choose image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="sr-only"
          />
        </label>

        <canvas ref={originalCanvasRef} className="hidden" />

        {imageSrc && dimensions && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">Original</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- local data-URL preview, not an optimizable remote asset */}
              <img src={imageSrc} alt="Original upload" className="w-full rounded-lg border border-border" style={{ maxHeight: 260, objectFit: "contain" }} />
            </div>
            {TYPES.map((t) => (
              <div key={t.value}>
                <p className="mb-1.5 text-xs font-medium text-muted">
                  {t.label} <span className="text-muted/70">({t.prevalence})</span>
                </p>
                <canvas
                  ref={(el) => {
                    canvasRefs.current[t.value] = el;
                  }}
                  className="w-full rounded-lg border border-border"
                  style={{ maxHeight: 260, objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        Simulations use standard color-vision-deficiency transform matrices and are an approximation, not a medical
        diagnostic tool. Everything runs locally in your browser via the Canvas API \u2014 images are never uploaded.
      </p>
    </div>
  );
}
