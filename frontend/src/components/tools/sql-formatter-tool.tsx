"use client";

import { useCallback, useState } from "react";
import { format } from "sql-formatter";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";

const SAMPLE_SQL = `select u.id, u.name, o.total from users u inner join orders o on o.user_id = u.id where o.total > 100 and u.active = true order by o.total desc limit 10;`;

type Dialect = "sql" | "mysql" | "postgresql" | "sqlite" | "tsql" | "bigquery";
type KeywordCase = "preserve" | "upper" | "lower";

const DIALECTS: { value: Dialect; label: string }[] = [
  { value: "sql", label: "Standard SQL" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "tsql", label: "SQL Server (T-SQL)" },
  { value: "bigquery", label: "BigQuery" },
];

export function SqlFormatterTool() {
  const [dialect, setDialect] = useState<Dialect>("sql");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [indent, setIndent] = useState(2);

  const convert = useCallback(
    (input: string): ConvertResult => {
      try {
        const output = format(input, { language: dialect, keywordCase, tabWidth: indent });
        return { output };
      } catch (e) {
        return { output: "", error: e instanceof Error ? e.message : "Could not format this SQL." };
      }
    },
    [dialect, keywordCase, indent]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE_SQL}
      convert={convert}
      inputLabel="SQL input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your raw or messy SQL query here..."
      outputPlaceholder="Formatted SQL will appear here."
      downloadFilename="formatted.sql"
      downloadMimeType="text/plain"
      toolbarExtra={
        <>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Dialect
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as Dialect)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              {DIALECTS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
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
