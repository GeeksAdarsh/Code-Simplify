"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomAddress } from "@/lib/random-utils";

export function RandomAddressTool() {
  const generate = useCallback(() => generateRandomAddress().formatted, []);

  return (
    <div>
      <div className="card border-foreground/20 bg-surface p-4 text-sm">
        <p className="font-semibold">\u26A0\uFE0F Fake test data only</p>
        <p className="mt-1 text-muted">
          Addresses are randomly combined from generic street names and city/state pairs. They do not
          correspond to any real property or resident and should be used for testing and mock data only.
        </p>
      </div>
      <div className="mt-4">
        <BatchGeneratorTool generate={generate} monospace={false} />
      </div>
    </div>
  );
}
