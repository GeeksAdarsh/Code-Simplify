"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { sqlInsertsToJson } from "@/lib/sql-utils";

const SAMPLE_SQL = `INSERT INTO users (id, name, email, active) VALUES
(1, 'Jane Doe', 'jane@example.com', true),
(2, 'John Smith', 'john@example.com', false);`;

export function SqlToJsonTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = sqlInsertsToJson(input);
    if (result.error) return { output: "", error: result.error };
    return { output: JSON.stringify(result.rows, null, 2) };
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE_SQL}
      convert={convert}
      inputLabel="SQL input (INSERT statements)"
      outputLabel="JSON output"
      inputPlaceholder="Paste one or more INSERT INTO ... VALUES statements here..."
      outputPlaceholder="Converted JSON will appear here."
      downloadFilename="converted.json"
      downloadMimeType="application/json"
    />
  );
}
