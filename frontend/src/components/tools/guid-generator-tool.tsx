"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateUuidV4, formatGuid } from "@/lib/uuid-utils";

export function GuidGeneratorTool() {
  const [uppercase, setUppercase] = useState(false);
  const [braces, setBraces] = useState(true);
  const [hyphens, setHyphens] = useState(true);

  const generate = useCallback(() => {
    return formatGuid(generateUuidV4(), { uppercase, braces, hyphens });
  }, [uppercase, braces, hyphens]);

  return (
    <BatchGeneratorTool
      generate={generate}
      controls={
        <>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-foreground" />
            Uppercase
          </label>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={braces} onChange={(e) => setBraces(e.target.checked)} className="accent-foreground" />
            Braces {"{}"}
          </label>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="accent-foreground" />
            Include hyphens
          </label>
        </>
      }
    />
  );
}
