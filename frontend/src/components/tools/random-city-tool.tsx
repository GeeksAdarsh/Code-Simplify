"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomCity } from "@/lib/fun-random-utils";

export function RandomCityTool() {
  const generate = useCallback(() => generateRandomCity(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Pulls from major cities around the world \u2014 handy for travel inspiration and geography practice.
      </p>
    </div>
  );
}
