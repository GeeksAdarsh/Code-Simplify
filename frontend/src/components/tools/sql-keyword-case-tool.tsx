"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { convertKeywordCase } from "@/lib/sql-utils";

const SAMPLE_LOWER = `select u.id, u.name, o.total
from users u
inner join orders o on o.user_id = u.id
where o.total > 100 and u.active = 1
order by o.total desc
limit 10;`;

const SAMPLE_UPPER = `SELECT u.id, u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.total > 100 AND u.active = 1
ORDER BY o.total DESC
LIMIT 10;`;

interface SqlKeywordCaseToolProps {
  targetCase: "upper" | "lower";
}

export function SqlKeywordCaseTool({ targetCase }: SqlKeywordCaseToolProps) {
  const convert = useCallback(
    (input: string): ConvertResult => {
      return { output: convertKeywordCase(input, targetCase) };
    },
    [targetCase]
  );

  return (
    <div>
      <ConvertTool
        sampleInput={targetCase === "upper" ? SAMPLE_LOWER : SAMPLE_UPPER}
        convert={convert}
        inputLabel="SQL input"
        outputLabel={targetCase === "upper" ? "Uppercase keywords" : "Lowercase keywords"}
        inputPlaceholder="Paste your SQL here to change the casing of its keywords..."
        outputPlaceholder="Converted SQL will appear here."
        downloadFilename={targetCase === "upper" ? "uppercase.sql" : "lowercase.sql"}
        downloadMimeType="text/plain"
      />
      <p className="mt-2 text-xs text-muted">
        Only reserved SQL keywords (SELECT, FROM, WHERE, JOIN, and 100+ others) are converted — table names, column
        names, string literals, and comments are left untouched, and the original layout is preserved.
      </p>
    </div>
  );
}
