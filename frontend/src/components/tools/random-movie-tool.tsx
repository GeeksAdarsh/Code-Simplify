"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomMovie } from "@/lib/fun-random-utils";

export function RandomMovieTool() {
  const generate = useCallback(() => generateRandomMovie(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Picks from a curated list of well-known, highly-rated movies across genres and decades \u2014 perfect for
        deciding what to watch tonight.
      </p>
    </div>
  );
}
