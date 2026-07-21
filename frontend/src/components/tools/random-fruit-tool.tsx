"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomFruit } from "@/lib/fun-random-utils";

export function RandomFruitTool() {
  const generate = useCallback(() => generateRandomFruit(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">Great for classroom games, grocery-list ideas, and smoothie inspiration.</p>
    </div>
  );
}
