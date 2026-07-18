"use client";

import { useCallback, useState } from "react";
import { format } from "sql-formatter";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";

const SAMPLE = `select u.id, u.name, count(o.id) as order_count from users u left join orders o on o.user_id = u.id where u.created_at > now() - interval '30 days' group by u.id, u.name having count(o.id) > 0 order by order_count desc limit 20;`;

type KeywordCase = "preserve" | "upper" | "lower";

export function PostgresqlFormatterTool() {
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [indent, setIndent] = useState(2);

  const convert = useCallback(
    (input: string): ConvertResult => {
      try {
        const output = format(input, { language: "postgresql", keywordCase, tabWidth: indent });
        return { output };
      } catch (e) {
        return { output: "", error: e instanceof Error ? e.message : "Could not format this SQL." };
      }
    },
    [keywordCase, indent]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="PostgreSQL input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your raw PostgreSQL query here..."
      outputPlaceholder="Formatted SQL will appear here."
      downloadFilename="formatted.sql"
      downloadMimeType="text/plain"
      toolbarExtra={
        <>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Keywords
            <select
              value={keywordCase}
              onChange={(e) => setKeywordCase(e.target.value as KeywordCase)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve</option>
            </select>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Indent
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        </>
      }
    />
  );
}
