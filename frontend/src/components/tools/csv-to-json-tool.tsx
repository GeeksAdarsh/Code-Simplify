"use client";

import { useCallback, useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { csvToObjects } from "@/lib/csv-utils";

const SAMPLE_CSV = `id,name,role,remote
1,Jane Doe,Engineer,true
2,John Smith,Designer,false`;

type Delimiter = "," | ";" | "\t";

export function CsvToJsonTool() {
  const [delimiter, setDelimiter] = useState<Delimiter>(",");

  const convert = useCallback(
    (input: string): ConvertResult => {
      const result = csvToObjects(input, delimiter);
      if (result.error) return { output: "", error: result.error };
      return { output: JSON.stringify(result.data, null, 2) };
    },
    [delimiter]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE_CSV}
      convert={convert}
      inputLabel="CSV input"
      outputLabel="JSON output"
      inputPlaceholder="Paste your CSV here to convert it to JSON..."
      outputPlaceholder="Converted JSON will appear here."
      downloadFilename="converted.json"
      downloadMimeType="application/json"
      toolbarExtra={
        <label className="flex items-center gap-1.5 text-xs text-muted">
          Delimiter
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as Delimiter)}
            className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
          >
            <option value=",">Comma</option>
            <option value=";">Semicolon</option>
            <option value={"\t"}>Tab</option>
          </select>
        </label>
      }
    />
  );
}
