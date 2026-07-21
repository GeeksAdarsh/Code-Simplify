"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomVegetable } from "@/lib/fun-random-utils";

export function RandomVegetableTool() {
  const generate = useCallback(() => generateRandomVegetable(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">Useful for meal planning, classroom games, and healthy-eating challenges.</p>
    </div>
  );
}
