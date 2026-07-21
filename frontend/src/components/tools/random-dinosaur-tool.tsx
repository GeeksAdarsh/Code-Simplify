"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomDinosaur } from "@/lib/fun-random-utils";

export function RandomDinosaurTool() {
  const generate = useCallback(() => generateRandomDinosaur(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        A fun pick for dinosaur fans, classroom projects, and trivia nights.
      </p>
    </div>
  );
}
