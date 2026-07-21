"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomAnimal } from "@/lib/fun-random-utils";

export function RandomAnimalTool() {
  const generate = useCallback(() => generateRandomAnimal(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Fun for icebreaker games, kids&apos; activities, drawing prompts, and &quot;guess the animal&quot; challenges.
      </p>
    </div>
  );
}
