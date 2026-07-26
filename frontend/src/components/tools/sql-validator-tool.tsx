"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { splitSqlSegments, SQL_KEYWORDS } from "@/lib/sql-utils";

const SAMPLE_SQL = `SELECT u.id, u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.total > 100 AND u.active = true
ORDER BY o.total DESC
LIMIT 10;`;

const SAMPLE_INVALID_SQL = `SELECT * FROM users WHERE (id = 1;`;

interface ValidationResult {
  valid: boolean;
  error?: string;
  statementCount?: number;
  keywordCount?: number;
}

function validateSql(input: string): ValidationResult {
  try {
    format(input, { language: "sql" });
  } catch (e) {
    const message = e instanceof Error ? e.message.split("\n")[0] : "Could not parse this SQL.";
    return { valid: false, error: message };
  }

  const segments = splitSqlSegments(input);
  const codeText = segments.filter((s) => s.type === "code").map((s) => s.text).join("");
  const statementCount = codeText.split(";").filter((s) => s.trim().length > 0).length;

  const keywordSet = new Set<string>(SQL_KEYWORDS);
  const words = codeText.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [];
  const keywordCount = words.filter((w) => keywordSet.has(w.toUpperCase())).length;

  return { valid: true, statementCount, keywordCount };
}

export function SqlValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? validateSql(input) : null), [input]);
  const status: "empty" | "valid" | "invalid" = !input.trim() ? "empty" : result?.valid ? "valid" : "invalid";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_SQL)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <button onClick={() => setInput(SAMPLE_INVALID_SQL)} className="btn btn-secondary h-8 px-3 text-xs">
          Load invalid example
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>SQL input</span>
          <span>{byteSize(input).toLocaleString()} bytes</span>
        </div>
        <CodeEditor value={input} onChange={setInput} language="sql" placeholder="Paste your SQL query here to validate its syntax..." height="20rem" />
      </div>

      <div className="mt-4">
        {status === "empty" && (
          <div className="card px-4 py-3 text-sm text-muted">Paste a SQL query above to see validation results.</div>
        )}
        {status === "valid" && result && (
          <div className="card flex flex-wrap items-center gap-4 border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Valid SQL &#10003;</span>
            <span className="text-muted">Statements: {result.statementCount}</span>
            <span className="text-muted">Keywords: {result.keywordCount}</span>
          </div>
        )}
        {status === "invalid" && result?.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid SQL &#10007;</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
