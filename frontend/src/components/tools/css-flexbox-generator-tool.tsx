"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ControlRow, RangeInput, SelectInput } from "@/components/tools/shared/css-generator-layout";

type Direction = "row" | "row-reverse" | "column" | "column-reverse";
type Justify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";

export function CssFlexboxGeneratorTool() {
  const [direction, setDirection] = useState<Direction>("row");
  const [justifyContent, setJustifyContent] = useState<Justify>("flex-start");
  const [alignItems, setAlignItems] = useState<AlignItems>("stretch");
  const [wrap, setWrap] = useState<Wrap>("nowrap");
  const [gap, setGap] = useState(12);
  const [itemCount, setItemCount] = useState(5);

  const code = useMemo(
    () =>
      `.flex-container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`,
    [direction, justifyContent, alignItems, wrap, gap],
  );

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="flexbox.css"
      controls={
        <>
          <ControlRow label="Direction">
            <SelectInput
              value={direction}
              onChange={setDirection}
              options={[
                { value: "row", label: "row" },
                { value: "row-reverse", label: "row-reverse" },
                { value: "column", label: "column" },
                { value: "column-reverse", label: "column-reverse" },
              ]}
            />
          </ControlRow>
          <ControlRow label="Justify content">
            <SelectInput
              value={justifyContent}
              onChange={setJustifyContent}
              options={[
                { value: "flex-start", label: "flex-start" },
                { value: "center", label: "center" },
                { value: "flex-end", label: "flex-end" },
                { value: "space-between", label: "space-between" },
                { value: "space-around", label: "space-around" },
                { value: "space-evenly", label: "space-evenly" },
              ]}
            />
          </ControlRow>
          <ControlRow label="Align items">
            <SelectInput
              value={alignItems}
              onChange={setAlignItems}
              options={[
                { value: "stretch", label: "stretch" },
                { value: "flex-start", label: "flex-start" },
                { value: "center", label: "center" },
                { value: "flex-end", label: "flex-end" },
                { value: "baseline", label: "baseline" },
              ]}
            />
          </ControlRow>
          <ControlRow label="Flex wrap">
            <SelectInput
              value={wrap}
              onChange={setWrap}
              options={[
                { value: "nowrap", label: "nowrap" },
                { value: "wrap", label: "wrap" },
                { value: "wrap-reverse", label: "wrap-reverse" },
              ]}
            />
          </ControlRow>
          <ControlRow label="Gap" value={`${gap}px`}>
            <RangeInput min={0} max={48} value={gap} onChange={setGap} />
          </ControlRow>
          <ControlRow label="Items" value={itemCount}>
            <RangeInput min={1} max={10} value={itemCount} onChange={setItemCount} />
          </ControlRow>
        </>
      }
      preview={
        <div
          className="h-full max-h-[220px] w-full max-w-xl"
          style={{
            display: "flex",
            flexDirection: direction,
            justifyContent,
            alignItems,
            flexWrap: wrap,
            gap: `${gap}px`,
            minHeight: 220,
          }}
        >
          {Array.from({ length: itemCount }, (_, i) => (
            <div
              key={i}
              className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-foreground text-xs font-medium text-background"
            >
              {i + 1}
            </div>
          ))}
        </div>
      }
    />
  );
}
