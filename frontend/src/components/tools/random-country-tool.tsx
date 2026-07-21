"use client";

import { useCallback } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { countryCodeToFlagEmoji, generateRandomCountry } from "@/lib/fun-random-utils";

export function RandomCountryTool() {
  const generate = useCallback(() => {
    const country = generateRandomCountry();
    return `${countryCodeToFlagEmoji(country.code)} ${country.name}`;
  }, []);

  return (
    <div>
      <BatchGeneratorTool generate={generate} monospace={false} countOptions={[1, 5, 10, 20]} />
      <p className="mt-3 text-xs text-muted">
        Great for travel bucket-list ideas, geography quizzes, and classroom games.
      </p>
    </div>
  );
}
