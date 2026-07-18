"use client";

import { useCallback, useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { parseJson } from "@/lib/json-utils";
import { jsonToSqlInserts } from "@/lib/sql-utils";

const SAMPLE_JSON = `[
  { "id": 1, "name": "Jane Doe", "email": "jane@example.com", "active": true },
  { "id": 2, "name": "John Smith", "email": "john@example.com", "active": false }
]`;

export function JsonToSqlTool() {
  const [tableName, setTableName] = useState("users");

  const convert = useCallback(
    (input: string): ConvertResult => {
      const result = parseJson(input);
      if (result.error) {
        const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
        return { output: "", error: `${result.error.message}${location}` };
      }
      const output = jsonToSqlInserts(result.data, tableName);
      if (!output) return { output: "", error: "Provide a JSON object or an array of objects to convert." };
      return { output };
    },
    [tableName]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE_JSON}
      convert={convert}
      inputLabel="JSON input"
      outputLabel="SQL output"
      inputPlaceholder="Paste a JSON object or array of objects here..."
      outputPlaceholder="Generated INSERT statements will appear here."
      downloadFilename="insert.sql"
      downloadMimeType="text/plain"
      toolbarExtra={
        <label className="flex items-center gap-1.5 text-xs text-muted">
          Table name
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="table_name"
            className="w-32 rounded border border-border bg-background px-1.5 py-1 text-foreground outline-none"
          />
        </label>
      }
    />
  );
}
