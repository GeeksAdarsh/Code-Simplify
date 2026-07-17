"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ColorInput, ControlRow, RangeInput } from "@/components/tools/shared/css-generator-layout";

export function CssBorderRadiusGeneratorTool() {
  const [linked, setLinked] = useState(true);
  const [topLeft, setTopLeft] = useState(24);
  const [topRight, setTopRight] = useState(24);
  const [bottomRight, setBottomRight] = useState(24);
  const [bottomLeft, setBottomLeft] = useState(24);
  const [color, setColor] = useState("#0a0a0a");

  function updateCorner(setter: (v: number) => void, value: number) {
    if (linked) {
      setTopLeft(value);
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    } else {
      setter(value);
    }
  }

  const borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const code = useMemo(
    () =>
      `.rounded-box {
  border-radius: ${borderRadius};
}`,
    [borderRadius],
  );

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="border-radius.css"
      controls={
        <>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={linked}
              onChange={(e) => setLinked(e.target.checked)}
              style={{ accentColor: "var(--accent)" }}
            />
            Link all corners
          </label>
          <ControlRow label="Top left" value={`${topLeft}px`}>
            <RangeInput min={0} max={150} value={topLeft} onChange={(v) => updateCorner(setTopLeft, v)} />
          </ControlRow>
          <ControlRow label="Top right" value={`${topRight}px`}>
            <RangeInput min={0} max={150} value={topRight} onChange={(v) => updateCorner(setTopRight, v)} />
          </ControlRow>
          <ControlRow label="Bottom right" value={`${bottomRight}px`}>
            <RangeInput min={0} max={150} value={bottomRight} onChange={(v) => updateCorner(setBottomRight, v)} />
          </ControlRow>
          <ControlRow label="Bottom left" value={`${bottomLeft}px`}>
            <RangeInput min={0} max={150} value={bottomLeft} onChange={(v) => updateCorner(setBottomLeft, v)} />
          </ControlRow>
          <ControlRow label="Box color">
            <ColorInput value={color} onChange={setColor} />
          </ControlRow>
        </>
      }
      preview={<div className="h-48 w-48" style={{ borderRadius, backgroundColor: color }} />}
    />
  );
}
