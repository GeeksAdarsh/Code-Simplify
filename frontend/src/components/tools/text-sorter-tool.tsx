"use client";

import { useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { sortLines, type SortMode, type SortOrder } from "@/lib/text-utils";

const SAMPLE = "banana\napple\n30\ncherry\n5\nApple\n12";

export function TextSorterTool() {
  const [mode, setMode] = useState<SortMode>("alphabetical");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);

  function convert(input: string): ConvertResult {
    return { output: sortLines(input, { mode, order, caseSensitive, removeDuplicates, removeEmpty }) };
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end gap-4">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Sort by</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as SortMode)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="numeric">Numeric</option>
            <option value="length">Line length</option>
          </select>
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Order</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as SortOrder)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label className="flex items-center gap-1.5 pb-2 text-xs">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case-sensitive
        </label>
        <label className="flex items-center gap-1.5 pb-2 text-xs">
          <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />
          Remove duplicates
        </label>
        <label className="flex items-center gap-1.5 pb-2 text-xs">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          Remove empty lines
        </label>
      </div>

      <ConvertTool
        sampleInput={SAMPLE}
        convert={convert}
        inputLabel="Lines"
        outputLabel="Sorted lines"
        inputPlaceholder="Paste one item per line..."
        downloadFilename="sorted.txt"
      />
    </div>
  );
}
