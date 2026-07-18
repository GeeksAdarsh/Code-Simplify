"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ColorInput, ControlRow, RangeInput, SelectInput } from "@/components/tools/shared/css-generator-layout";

type Shape =
  | "circle"
  | "ellipse"
  | "inset"
  | "triangle"
  | "trapezoid"
  | "parallelogram"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "star"
  | "message"
  | "arrow-right";

const PRESET_SHAPES: Record<string, string> = {
  triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
  parallelogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
  pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  message: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
  "arrow-right": "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
};

const SHAPE_OPTIONS: { value: Shape; label: string }[] = [
  { value: "circle", label: "Circle" },
  { value: "ellipse", label: "Ellipse" },
  { value: "inset", label: "Inset" },
  { value: "triangle", label: "Triangle" },
  { value: "trapezoid", label: "Trapezoid" },
  { value: "parallelogram", label: "Parallelogram" },
  { value: "pentagon", label: "Pentagon" },
  { value: "hexagon", label: "Hexagon" },
  { value: "octagon", label: "Octagon" },
  { value: "star", label: "Star" },
  { value: "message", label: "Message bubble" },
  { value: "arrow-right", label: "Arrow (right)" },
];

export function CssClipPathGeneratorTool() {
  const [shape, setShape] = useState<Shape>("circle");
  const [circleRadius, setCircleRadius] = useState(50);
  const [ellipseX, setEllipseX] = useState(50);
  const [ellipseY, setEllipseY] = useState(40);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [insetTop, setInsetTop] = useState(10);
  const [insetRight, setInsetRight] = useState(10);
  const [insetBottom, setInsetBottom] = useState(10);
  const [insetLeft, setInsetLeft] = useState(10);
  const [insetRound, setInsetRound] = useState(0);
  const [boxColor, setBoxColor] = useState("#0a0a0a");

  const clipPath = useMemo(() => {
    if (shape === "circle") return `circle(${circleRadius}% at ${posX}% ${posY}%)`;
    if (shape === "ellipse") return `ellipse(${ellipseX}% ${ellipseY}% at ${posX}% ${posY}%)`;
    if (shape === "inset") return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round ${insetRound}px)`;
    return PRESET_SHAPES[shape];
  }, [shape, circleRadius, ellipseX, ellipseY, posX, posY, insetTop, insetRight, insetBottom, insetLeft, insetRound]);

  const code = useMemo(
    () =>
      `.clip-box {
  clip-path: ${clipPath};
}`,
    [clipPath],
  );

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="clip-path.css"
      controls={
        <>
          <ControlRow label="Shape">
            <SelectInput value={shape} onChange={setShape} options={SHAPE_OPTIONS} />
          </ControlRow>

          {shape === "circle" && (
            <>
              <ControlRow label="Radius" value={`${circleRadius}%`}>
                <RangeInput min={0} max={100} value={circleRadius} onChange={setCircleRadius} />
              </ControlRow>
              <ControlRow label="Position X" value={`${posX}%`}>
                <RangeInput min={0} max={100} value={posX} onChange={setPosX} />
              </ControlRow>
              <ControlRow label="Position Y" value={`${posY}%`}>
                <RangeInput min={0} max={100} value={posY} onChange={setPosY} />
              </ControlRow>
            </>
          )}

          {shape === "ellipse" && (
            <>
              <ControlRow label="Radius X" value={`${ellipseX}%`}>
                <RangeInput min={0} max={100} value={ellipseX} onChange={setEllipseX} />
              </ControlRow>
              <ControlRow label="Radius Y" value={`${ellipseY}%`}>
                <RangeInput min={0} max={100} value={ellipseY} onChange={setEllipseY} />
              </ControlRow>
              <ControlRow label="Position X" value={`${posX}%`}>
                <RangeInput min={0} max={100} value={posX} onChange={setPosX} />
              </ControlRow>
              <ControlRow label="Position Y" value={`${posY}%`}>
                <RangeInput min={0} max={100} value={posY} onChange={setPosY} />
              </ControlRow>
            </>
          )}

          {shape === "inset" && (
            <>
              <ControlRow label="Top" value={`${insetTop}%`}>
                <RangeInput min={0} max={45} value={insetTop} onChange={setInsetTop} />
              </ControlRow>
              <ControlRow label="Right" value={`${insetRight}%`}>
                <RangeInput min={0} max={45} value={insetRight} onChange={setInsetRight} />
              </ControlRow>
              <ControlRow label="Bottom" value={`${insetBottom}%`}>
                <RangeInput min={0} max={45} value={insetBottom} onChange={setInsetBottom} />
              </ControlRow>
              <ControlRow label="Left" value={`${insetLeft}%`}>
                <RangeInput min={0} max={45} value={insetLeft} onChange={setInsetLeft} />
              </ControlRow>
              <ControlRow label="Round corners" value={`${insetRound}px`}>
                <RangeInput min={0} max={60} value={insetRound} onChange={setInsetRound} />
              </ControlRow>
            </>
          )}

          <ControlRow label="Box color">
            <ColorInput value={boxColor} onChange={setBoxColor} />
          </ControlRow>
        </>
      }
      preview={<div className="h-56 w-56" style={{ clipPath, backgroundColor: boxColor }} />}
    />
  );
}
