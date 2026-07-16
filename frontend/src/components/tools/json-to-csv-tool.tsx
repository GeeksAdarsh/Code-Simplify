"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { jsonToCsv } from "@/lib/json-convert";
import { parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `[
  { "id": 1, "name": "Jane Doe", "role": "Engineer", "remote": true },
  { "id": 2, "name": "John Smith", "role": "Designer", "remote": false }
]`;

export function JsonToCsvTool() {
  const convert = useCallback((input: string): ConvertResult => {
    const result = parseJson(input);
    if (result.error) {
      const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
      return { output: "", error: `${result.error.message}${location}` };
    }
    return { output: jsonToCsv(result.data) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_JSON}
        convert={convert}
        inputLabel="JSON input"
        outputLabel="CSV output"
        inputPlaceholder="Paste a JSON array of objects here to convert it to CSV..."
        outputPlaceholder="Converted CSV will appear here."
        downloadFilename="converted.csv"
        downloadMimeType="text/csv"
      />
      <p className="mt-2 text-xs text-muted">
        Works best with a JSON array of flat or nested objects. Nested objects are flattened with dot notation
        (e.g. <code className="font-mono">author.name</code>); nested arrays are kept as JSON strings in a
        single cell.
      </p>
    </div>
  );
}
