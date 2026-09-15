"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomGame } from "@/lib/fun-random-utils";

export function RandomGameTool() {
  const generate = useCallback(() => generateRandomGame(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Picks from a curated list of popular video games across genres and platforms — great for deciding what
        to play next.
      </p>
    </div>
  );
}
