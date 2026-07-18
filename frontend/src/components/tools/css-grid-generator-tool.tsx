"use client";

import { useMemo, useState } from "react";
import { CssGeneratorLayout, ControlRow, RangeInput, SelectInput } from "@/components/tools/shared/css-generator-layout";

type Align = "stretch" | "start" | "center" | "end";

export function CssGridGeneratorTool() {
  const [columns, setColumns] = useState(4);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [justifyItems, setJustifyItems] = useState<Align>("stretch");
  const [alignItems, setAlignItems] = useState<Align>("stretch");

  const code = useMemo(
    () =>
      `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}`,
    [columns, rows, columnGap, rowGap, justifyItems, alignItems],
  );

  const cellCount = columns * rows;

  return (
    <CssGeneratorLayout
      code={code}
      codeFilename="grid.css"
      controls={
        <>
          <ControlRow label="Columns" value={columns}>
            <RangeInput min={1} max={8} value={columns} onChange={setColumns} />
          </ControlRow>
          <ControlRow label="Rows" value={rows}>
            <RangeInput min={1} max={6} value={rows} onChange={setRows} />
          </ControlRow>
          <ControlRow label="Column gap" value={`${columnGap}px`}>
            <RangeInput min={0} max={48} value={columnGap} onChange={setColumnGap} />
          </ControlRow>
          <ControlRow label="Row gap" value={`${rowGap}px`}>
            <RangeInput min={0} max={48} value={rowGap} onChange={setRowGap} />
          </ControlRow>
          <ControlRow label="Justify items">
            <SelectInput
              value={justifyItems}
              onChange={setJustifyItems}
              options={[
                { value: "stretch", label: "stretch" },
                { value: "start", label: "start" },
                { value: "center", label: "center" },
                { value: "end", label: "end" },
              ]}
            />
          </ControlRow>
          <ControlRow label="Align items">
            <SelectInput
              value={alignItems}
              onChange={setAlignItems}
              options={[
                { value: "stretch", label: "stretch" },
                { value: "start", label: "start" },
                { value: "center", label: "center" },
                { value: "end", label: "end" },
              ]}
            />
          </ControlRow>
        </>
      }
      preview={
        <div
          className="w-full max-w-md"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 48px)`,
            columnGap: `${columnGap}px`,
            rowGap: `${rowGap}px`,
            justifyItems,
            alignItems,
          }}
        >
          {Array.from({ length: cellCount }, (_, i) => (
            <div
              key={i}
              className="flex h-full w-full items-center justify-center rounded bg-foreground text-xs font-medium text-background"
            >
              {i + 1}
            </div>
          ))}
        </div>
      }
    />
  );
}
