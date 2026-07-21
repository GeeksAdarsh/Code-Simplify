"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomBook } from "@/lib/fun-random-utils";

export function RandomBookTool() {
  const generate = useCallback(() => generateRandomBook(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Picks from a curated list of classic and popular books \u2014 a fun way to find your next read.
      </p>
    </div>
  );
}
