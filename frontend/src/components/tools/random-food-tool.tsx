"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomFood } from "@/lib/fun-random-utils";

export function RandomFoodTool() {
  const generate = useCallback(() => generateRandomFood(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Can&apos;t decide what to eat? Generate a random dish from around the world for dinner inspiration.
      </p>
    </div>
  );
}
