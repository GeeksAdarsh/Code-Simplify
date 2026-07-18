"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ColorInput, ControlRow, RangeInput, SelectInput } from "@/components/tools/shared/css-generator-layout";

type GradientType = "linear" | "radial";
type RadialShape = "circle" | "ellipse";

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const PRESETS: { name: string; angle: number; stops: [string, string] }[] = [
  { name: "Sunset", angle: 90, stops: ["#ff512f", "#f09819"] },
  { name: "Ocean", angle: 120, stops: ["#2193b0", "#6dd5ed"] },
  { name: "Violet", angle: 135, stops: ["#4776e6", "#8e54e9"] },
  { name: "Mono", angle: 90, stops: ["#0a0a0a", "#6b6b6b"] },
  { name: "Forest", angle: 100, stops: ["#134e5e", "#71b280"] },
  { name: "Peach", angle: 90, stops: ["#ffecd2", "#fcb69f"] },
];

let nextStopId = 3;

export function ColorGradientGeneratorTool() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState<RadialShape>("circle");
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: "#2193b0", position: 0 },
    { id: 2, color: "#6dd5ed", position: 100 },
  ]);

  function updateStop(id: number, patch: Partial<ColorStop>) {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addStop() {
    if (stops.length >= 6) return;
    const id = nextStopId++;
    setStops((prev) => [...prev, { id, color: "#ffffff", position: 100 }]);
  }

  function removeStop(id: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setType("linear");
    setAngle(preset.angle);
    setStops([
      { id: 1, color: preset.stops[0], position: 0 },
      { id: 2, color: preset.stops[1], position: 100 },
    ]);
  }

  const stopsCss = useMemo(
    () =>
      [...stops]
        .sort((a, b) => a.position - b.position)
        .map((s) => `${s.color} ${s.position}%`)
        .join(", "),
    [stops],
  );

  const gradientValue =
    type === "linear" ? `linear-gradient(${angle}deg, ${stopsCss})` : `radial-gradient(${shape}, ${stopsCss})`;

  const code = useMemo(
    () =>
      `background: ${gradientValue};

/* Tailwind (arbitrary value) */
bg-[${gradientValue.replace(/\s+/g, "_")}]`,
    [gradientValue],
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs hover:border-foreground"
          >
            <span
              className="h-3.5 w-3.5 rounded-full border border-border"
              style={{ background: `linear-gradient(${preset.angle}deg, ${preset.stops[0]}, ${preset.stops[1]})` }}
            />
            {preset.name}
          </button>
        ))}
      </div>

      <CssGeneratorLayout
        code={code}
        codeFilename="gradient.css"
        controls={
          <>
            <ControlRow label="Type">
              <SelectInput
                value={type}
                onChange={setType}
                options={[
                  { value: "linear", label: "Linear" },
                  { value: "radial", label: "Radial" },
                ]}
              />
            </ControlRow>
            {type === "linear" ? (
              <ControlRow label="Angle" value={`${angle}\u00b0`}>
                <RangeInput min={0} max={360} value={angle} onChange={setAngle} />
              </ControlRow>
            ) : (
              <ControlRow label="Shape">
                <SelectInput
                  value={shape}
                  onChange={setShape}
                  options={[
                    { value: "circle", label: "Circle" },
                    { value: "ellipse", label: "Ellipse" },
                  ]}
                />
              </ControlRow>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Color stops</span>
              <button onClick={addStop} disabled={stops.length >= 6} className="btn btn-secondary h-7 px-2 text-xs disabled:opacity-40">
                + Add stop
              </button>
            </div>

            {stops.map((stop) => (
              <div key={stop.id} className="rounded-lg border border-border p-2.5">
                <div className="mb-2 flex items-center justify-between">
                  <ColorInput value={stop.color} onChange={(color) => updateStop(stop.id, { color })} />
                  <button
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="ml-2 text-xs text-muted hover:text-foreground disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>
                <ControlRow label="Position" value={`${stop.position}%`}>
                  <RangeInput
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(position) => updateStop(stop.id, { position })}
                  />
                </ControlRow>
              </div>
            ))}
          </>
        }
        preview={<div className="h-48 w-full max-w-md rounded-xl" style={{ background: gradientValue }} />}
      />
    </div>
  );
}
