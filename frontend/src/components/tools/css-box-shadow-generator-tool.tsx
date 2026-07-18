"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ColorInput, ControlRow, RangeInput } from "@/components/tools/shared/css-generator-layout";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const value = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = Number.parseInt(value, 16);
  if (Number.isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function CssBoxShadowGeneratorTool() {
  const [offsetX, setOffsetX] = useState(4);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#0a0a0a");
  const [opacity, setOpacity] = useState(0.25);
  const [inset, setInset] = useState(false);
  const [boxColor, setBoxColor] = useState("#ffffff");

  const shadowColor = useMemo(() => {
    const [r, g, b] = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const shadowValue = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`;

  const code = useMemo(
    () =>
      `.shadow-box {
  box-shadow: ${shadowValue};
}`,
    [shadowValue],
  );

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="box-shadow.css"
      controls={
        <>
          <ControlRow label="Offset X" value={`${offsetX}px`}>
            <RangeInput min={-50} max={50} value={offsetX} onChange={setOffsetX} />
          </ControlRow>
          <ControlRow label="Offset Y" value={`${offsetY}px`}>
            <RangeInput min={-50} max={50} value={offsetY} onChange={setOffsetY} />
          </ControlRow>
          <ControlRow label="Blur radius" value={`${blur}px`}>
            <RangeInput min={0} max={100} value={blur} onChange={setBlur} />
          </ControlRow>
          <ControlRow label="Spread radius" value={`${spread}px`}>
            <RangeInput min={-50} max={50} value={spread} onChange={setSpread} />
          </ControlRow>
          <ControlRow label="Shadow color">
            <ColorInput value={color} onChange={setColor} />
          </ControlRow>
          <ControlRow label="Opacity" value={opacity.toFixed(2)}>
            <RangeInput min={0} max={1} step={0.01} value={opacity} onChange={setOpacity} />
          </ControlRow>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
              style={{ accentColor: "var(--accent)" }}
            />
            Inset shadow
          </label>
          <ControlRow label="Box color">
            <ColorInput value={boxColor} onChange={setBoxColor} />
          </ControlRow>
        </>
      }
      preview={<div className="h-40 w-40 rounded-xl" style={{ boxShadow: shadowValue, backgroundColor: boxColor }} />}
    />
  );
}
