"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomName } from "@/lib/random-utils";

export function RandomNameTool() {
  const generate = useCallback(() => generateRandomName().full, []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} />
      <p className="mt-3 text-xs text-muted">
        Generates fictional first + last name combinations for mock data, placeholders, and test accounts.
      </p>
    </div>
  );
}
