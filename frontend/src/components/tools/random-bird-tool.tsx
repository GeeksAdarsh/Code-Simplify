"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomBird } from "@/lib/fun-random-utils";

export function RandomBirdTool() {
  const generate = useCallback(() => generateRandomBird(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">Great for birdwatching lists, classroom games, and trivia nights.</p>
    </div>
  );
}
