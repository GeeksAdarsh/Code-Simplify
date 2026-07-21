"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomMacAddress } from "@/lib/random-utils";

export function RandomMacAddressTool() {
  const [uppercase, setUppercase] = useState(false);
  const generate = useCallback(() => generateRandomMacAddress(uppercase), [uppercase]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-foreground"
            />
            Uppercase
          </label>
        }
      />
      <p className="mt-3 text-xs text-muted">
        Generated with the locally-administered bit set, so these addresses are clearly test values and won't
        collide with real vendor-assigned hardware MAC addresses.
      </p>
    </div>
  );
}
