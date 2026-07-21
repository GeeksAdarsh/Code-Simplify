"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { formatTime, generateRandomTime } from "@/lib/random-utils";

export function RandomTimeTool() {
  const [use24Hour, setUse24Hour] = useState(true);
  const generate = useCallback(() => formatTime(generateRandomTime(), use24Hour), [use24Hour]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Format</label>
            <select
              value={use24Hour ? "24" : "12"}
              onChange={(e) => setUse24Hour(e.target.value === "24")}
              className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
            >
              <option value="24">24-hour</option>
              <option value="12">12-hour (AM/PM)</option>
            </select>
          </div>
        }
      />
      <p className="mt-3 text-xs text-muted">Generates a random time of day, uniformly distributed across all 24 hours.</p>
    </div>
  );
}
