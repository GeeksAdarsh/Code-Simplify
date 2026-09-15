"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomEmoji } from "@/lib/random-utils";

export function RandomEmojiTool() {
  const generate = useCallback(() => generateRandomEmoji(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20, 40]} />
      <p className="mt-3 text-xs text-muted">
        Pulls from a curated set of faces, animals, food, and objects — useful for picking reaction emoji or
        seeding test data.
      </p>
    </div>
  );
}
