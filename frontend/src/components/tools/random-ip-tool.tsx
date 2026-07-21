"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomIPv4, generateRandomIPv6 } from "@/lib/random-utils";

export function RandomIpTool() {
  const [version, setVersion] = useState<"v4" | "v6">("v4");
  const generate = useCallback(() => (version === "v4" ? generateRandomIPv4() : generateRandomIPv6()), [version]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as "v4" | "v6")}
              className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
            >
              <option value="v4">IPv4</option>
              <option value="v6">IPv6</option>
            </select>
          </div>
        }
      />
      <p className="mt-3 text-xs text-muted">
        For test/mock data only. Addresses are fully random and not checked against real allocation or
        reserved ranges, so they may occasionally land in private or reserved blocks.
      </p>
    </div>
  );
}
