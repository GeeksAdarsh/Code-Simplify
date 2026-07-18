"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { flattenJsonRows } from "@/lib/json-convert";
import { byteSize, parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `[
  { "id": 1, "name": "Jane Doe", "role": "Engineer", "remote": true },
  { "id": 2, "name": "John Smith", "role": "Designer", "remote": false }
]`;

export function JsonToExcelTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => parseJson(input), [input]);
  const table = useMemo(() => {
    if (result.error || result.data === undefined) return null;
    return flattenJsonRows(result.data);
  }, [result]);

  function handleDownload() {
    if (!table) return;
    const worksheet = XLSX.utils.json_to_sheet(table.rows, { header: table.headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "converted.xlsx");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_JSON)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <button onClick={handleDownload} disabled={!table} className="btn btn-primary ml-auto h-8 px-3 text-xs disabled:opacity-50">
          Download Excel (.xlsx)
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>JSON input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a JSON array of objects here to convert it to Excel..."
            spellCheck={false}
            className="h-80 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Preview</div>
          <div className="h-80 overflow-auto">
            {table ? (
              <table className="w-full text-xs">
                <thead>
                  <tr className="sticky top-0 border-b border-border bg-surface text-left">
                    {table.headers.map((h) => (
                      <th key={h} className="whitespace-nowrap px-2 py-1.5 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      {table.headers.map((h) => (
                        <td key={h} className="whitespace-nowrap px-2 py-1.5 text-muted">
                          {String(row[h] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-3 text-sm text-muted">A preview table will appear here.</p>
            )}
          </div>
        </div>
      </div>

      {result.error && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid JSON</p>
          <p className="mt-1 text-muted">
            {result.error.message}
            {result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
