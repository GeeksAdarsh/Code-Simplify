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

let nextStopId = 3;

export function CssGradientGeneratorTool() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState<RadialShape>("circle");
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: "#111111", position: 0 },
    { id: 2, color: "#4a4a4a", position: 100 },
  ]);

  function updateStop(id: number, patch: Partial<ColorStop>) {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addStop() {
    if (stops.length >= 5) return;
    const id = nextStopId++;
    setStops((prev) => [...prev, { id, color: "#ffffff", position: 100 }]);
  }

  function removeStop(id: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
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
      `.gradient-box {
  background: ${gradientValue};
}`,
    [gradientValue],
  );

  return (
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
            <button onClick={addStop} disabled={stops.length >= 5} className="btn btn-secondary h-7 px-2 text-xs disabled:opacity-40">
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
  );
}
