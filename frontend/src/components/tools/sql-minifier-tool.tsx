"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { minifySql } from "@/lib/sql-utils";

const SAMPLE_SQL = `SELECT
  u.id,
  u.name, -- customer name
  o.total
FROM users u
INNER JOIN orders o
  ON o.user_id = u.id
WHERE o.total > 100
  AND u.active = true
ORDER BY o.total DESC
LIMIT 10;`;

export function SqlMinifierTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: minifySql(input) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_SQL}
        convert={convert}
        inputLabel="SQL input"
        outputLabel="Minified output"
        inputPlaceholder="Paste your SQL here to strip comments and whitespace..."
        outputPlaceholder="Minified SQL will appear here."
        downloadFilename="minified.sql"
        downloadMimeType="text/plain"
      />
      <p className="mt-2 text-xs text-muted">
        Tip: minifying strips comments, line breaks, and extra whitespace to shrink your SQL for embedding in scripts
        or migrations, while keeping string literals untouched.
      </p>
    </div>
  );
}
