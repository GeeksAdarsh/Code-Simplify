"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomTvShow } from "@/lib/fun-random-utils";

export function RandomTvShowTool() {
  const generate = useCallback(() => generateRandomTvShow(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Picks from a curated list of popular, well-reviewed shows across genres — great for your next binge.
      </p>
    </div>
  );
}
