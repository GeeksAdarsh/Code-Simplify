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

export function CssTextShadowGeneratorTool() {
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState("#0a0a0a");
  const [opacity, setOpacity] = useState(0.5);
  const [textColor, setTextColor] = useState("#111111");
  const [fontSize, setFontSize] = useState(40);
  const [text, setText] = useState("DevToolbox");

  const shadowColor = useMemo(() => {
    const [r, g, b] = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const shadowValue = `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`;

  const code = useMemo(
    () =>
      `.shadow-text {
  text-shadow: ${shadowValue};
}`,
    [shadowValue],
  );

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="text-shadow.css"
      controls={
        <>
          <ControlRow label="Preview text">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            />
          </ControlRow>
          <ControlRow label="Font size" value={`${fontSize}px`}>
            <RangeInput min={12} max={80} value={fontSize} onChange={setFontSize} />
          </ControlRow>
          <ControlRow label="Offset X" value={`${offsetX}px`}>
            <RangeInput min={-30} max={30} value={offsetX} onChange={setOffsetX} />
          </ControlRow>
          <ControlRow label="Offset Y" value={`${offsetY}px`}>
            <RangeInput min={-30} max={30} value={offsetY} onChange={setOffsetY} />
          </ControlRow>
          <ControlRow label="Blur radius" value={`${blur}px`}>
            <RangeInput min={0} max={40} value={blur} onChange={setBlur} />
          </ControlRow>
          <ControlRow label="Shadow color">
            <ColorInput value={color} onChange={setColor} />
          </ControlRow>
          <ControlRow label="Opacity" value={opacity.toFixed(2)}>
            <RangeInput min={0} max={1} step={0.01} value={opacity} onChange={setOpacity} />
          </ControlRow>
          <ControlRow label="Text color">
            <ColorInput value={textColor} onChange={setTextColor} />
          </ControlRow>
        </>
      }
      preview={
        <p
          className="px-4 text-center font-bold"
          style={{ textShadow: shadowValue, color: textColor, fontSize: `${fontSize}px` }}
        >
          {text || "DevToolbox"}
        </p>
      }
    />
  );
}
