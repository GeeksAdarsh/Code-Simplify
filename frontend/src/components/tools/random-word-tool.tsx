"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomWord } from "@/lib/random-utils";

export function RandomWordTool() {
  const generate = useCallback(() => generateRandomWord(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} />
      <p className="mt-3 text-xs text-muted">
        Great for mock/test data, word games, brainstorming, and placeholder content.
      </p>
    </div>
  );
}
