"use client";

import { useCallback, useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { parseCsv, stringifyCsv } from "@/lib/csv-utils";

const SAMPLE_CSV = `id,name,role,remote
1,  Jane Doe ,Engineer,true
2,John Smith,  Designer,false
3,"Lee, Sam",Product Manager,true`;

type Delimiter = "," | ";" | "\t";

export function CsvFormatterTool() {
  const [inputDelimiter, setInputDelimiter] = useState<Delimiter>(",");
  const [outputDelimiter, setOutputDelimiter] = useState<Delimiter>(",");
  const [trim, setTrim] = useState(true);

  const convert = useCallback(
    (input: string): ConvertResult => {
      const parsed = parseCsv(input, inputDelimiter);
      if (parsed.error) return { output: "", error: parsed.error };
      const clean = (v: string) => (trim ? v.trim() : v);
      const headers = parsed.headers.map(clean);
      const rows = parsed.rows.map((row) => row.map(clean));
      return { output: stringifyCsv(headers, rows, outputDelimiter) };
    },
    [inputDelimiter, outputDelimiter, trim]
  );

  return (
    <ConvertTool
      sampleInput={SAMPLE_CSV}
      convert={convert}
      inputLabel="CSV input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your CSV here to clean up and reformat it..."
      outputPlaceholder="Formatted CSV will appear here."
      downloadFilename="formatted.csv"
      downloadMimeType="text/csv"
      toolbarExtra={
        <>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="accent-foreground" />
            Trim whitespace
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Input delimiter
            <select
              value={inputDelimiter}
              onChange={(e) => setInputDelimiter(e.target.value as Delimiter)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value=",">Comma</option>
              <option value=";">Semicolon</option>
              <option value={"\t"}>Tab</option>
            </select>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Output delimiter
            <select
              value={outputDelimiter}
              onChange={(e) => setOutputDelimiter(e.target.value as Delimiter)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value=",">Comma</option>
              <option value=";">Semicolon</option>
              <option value={"\t"}>Tab</option>
            </select>
          </label>
        </>
      }
    />
  );
}
