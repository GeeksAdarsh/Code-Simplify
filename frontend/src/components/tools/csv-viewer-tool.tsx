"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { DataTable } from "@/components/tools/shared/data-table";
import { byteSize } from "@/lib/json-utils";
import { parseCsv } from "@/lib/csv-utils";

const SAMPLE_CSV = `id,name,role,remote\n1,Jane Doe,Engineer,true\n2,John Smith,Designer,false\n3,"Lee, Sam",Product Manager,true`;

type Delimiter = "," | ";" | "\t";

export function CsvViewerTool() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");

  const result = useMemo(() => (input.trim() ? parseCsv(input, delimiter) : { headers: [], rows: [] }), [
    input,
    delimiter,
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_CSV)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
          Delimiter
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as Delimiter)}
            className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={"\t"}>Tab</option>
          </select>
        </label>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>CSV input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="plaintext" placeholder="Paste your CSV here to view it as a table..." height="24rem" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Table view</span>
            {result.rows.length > 0 && (
              <span>
                {result.rows.length} rows &times; {result.headers.length} columns
              </span>
            )}
          </div>
          <div className="h-96 overflow-auto">
            {result.error ? (
              <p className="p-3 text-sm text-muted">{result.error}</p>
            ) : result.headers.length > 0 ? (
              <DataTable headers={result.headers} rows={result.rows} />
            ) : (
              <p className="p-3 text-sm text-muted">A table preview will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
