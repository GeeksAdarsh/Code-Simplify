"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomUsername } from "@/lib/random-utils";

export function RandomUsernameTool() {
  const generate = useCallback(() => generateRandomUsername(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} />
      <p className="mt-3 text-xs text-muted">
        Combines a random adjective, noun, and number \u2014 handy for test accounts, demo data, and placeholder
        profiles.
      </p>
    </div>
  );
}
