"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomNickname } from "@/lib/random-utils";

export function RandomNicknameTool() {
  const generate = useCallback(() => generateRandomNickname(), []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} />
      <p className="mt-3 text-xs text-muted">
        Combines a playful adjective with an animal name — perfect for gamertags, avatars, and demo profiles.
      </p>
    </div>
  );
}
