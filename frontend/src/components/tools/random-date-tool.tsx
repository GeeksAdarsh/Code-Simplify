"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { formatDate, generateRandomDate } from "@/lib/random-utils";

const CURRENT_YEAR = new Date().getFullYear();

export function RandomDateTool() {
  const [startYear, setStartYear] = useState(CURRENT_YEAR - 10);
  const [endYear, setEndYear] = useState(CURRENT_YEAR);

  const generate = useCallback(() => formatDate(generateRandomDate(startYear, endYear)), [startYear, endYear]);

  return (
    <div>
      <BatchGeneratorTool
        generate={generate}
        controls={
          <>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">From year</label>
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">To year</label>
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
            </div>
          </>
        }
      />
      <p className="mt-3 text-xs text-muted">Dates are picked uniformly at random between the two years (inclusive), in YYYY-MM-DD format.</p>
    </div>
  );
}
