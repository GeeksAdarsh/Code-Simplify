"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomDrink } from "@/lib/fun-random-utils";

export function RandomDrinkTool() {
  const generate = useCallback(() => generateRandomDrink(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">A quick pick for what to drink next \u2014 all non-alcoholic beverages.</p>
    </div>
  );
}
