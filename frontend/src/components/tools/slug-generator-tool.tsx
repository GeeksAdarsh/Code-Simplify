"use client";

import { useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { slugify } from "@/lib/text-utils";

const SAMPLE = "10 Best Developer Tools You Should Try in 2026!";

export function SlugGeneratorTool() {
  const [separator, setSeparator] = useState<"-" | "_">("-");

  function convert(input: string): ConvertResult {
    return { output: slugify(input, separator) };
  }

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="Text or title"
      outputLabel="Slug"
      inputPlaceholder="Type a title or sentence here..."
      downloadFilename="slug.txt"
      toolbarExtra={
        <select
          value={separator}
          onChange={(e) => setSeparator(e.target.value as "-" | "_")}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          <option value="-">Hyphens (-)</option>
          <option value="_">Underscores (_)</option>
        </select>
      }
    />
  );
}
