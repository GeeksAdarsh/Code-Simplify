"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateUuidV1, generateUuidV4, generateUuidV7, formatGuid } from "@/lib/uuid-utils";

const GENERATORS = {
  v1: generateUuidV1,
  v4: generateUuidV4,
  v7: generateUuidV7,
};

interface UuidGeneratorToolProps {
  version: "v1" | "v4" | "v7";
}

export function UuidGeneratorTool({ version }: UuidGeneratorToolProps) {
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const generate = useCallback(() => {
    const raw = GENERATORS[version]();
    return formatGuid(raw, { uppercase, hyphens });
  }, [version, uppercase, hyphens]);

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
            <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="accent-foreground" />
            Include hyphens
          </label>
        </>
      }
    />
  );
}
