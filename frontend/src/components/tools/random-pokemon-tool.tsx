"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomPokemon } from "@/lib/fun-random-utils";

export function RandomPokemonTool() {
  const generate = useCallback(() => generateRandomPokemon(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Picks a name from the original Generation I Pok\u00e9mon lineup \u2014 a fun, unofficial fan tool for
        deciding your next team member or starter.
      </p>
    </div>
  );
}
