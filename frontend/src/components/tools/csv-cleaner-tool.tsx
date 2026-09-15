"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { parseCsv, stringifyCsv } from "@/lib/csv-utils";

const SAMPLE_CSV = `id,name,role,remote
1,  Jane Doe ,Engineer,true
1,  Jane Doe ,Engineer,true
2,John Smith,  Designer ,false
,,,
3,,Product Manager,`;

type Delimiter = "," | ";" | "\t";

export function CsvCleanerTool() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [trim, setTrim] = useState(true);
  const [removeEmptyRows, setRemoveEmptyRows] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => (input.trim() ? parseCsv(input, delimiter) : { headers: [], rows: [] }), [
    input,
    delimiter,
  ]);

  const cleaned = useMemo(() => {
    if (parsed.error || parsed.headers.length === 0) return { headers: [], rows: [], removedEmpty: 0, removedDuplicates: 0 };

    const clean = (v: string) => (trim ? v.trim() : v);
    const headers = parsed.headers.map(clean);
    let rows = parsed.rows.map((row) => row.map(clean));

    let removedEmpty = 0;
    if (removeEmptyRows) {
      const before = rows.length;
      rows = rows.filter((row) => row.some((cell) => cell !== ""));
      removedEmpty = before - rows.length;
    }

    let removedDuplicates = 0;
    if (removeDuplicates) {
      const seen = new Set<string>();
      const before = rows.length;
      rows = rows.filter((row) => {
        const key = row.join("");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      removedDuplicates = before - rows.length;
    }

    return { headers, rows, removedEmpty, removedDuplicates };
  }, [parsed, trim, removeEmptyRows, removeDuplicates]);

  const output = cleaned.headers.length > 0 ? stringifyCsv(cleaned.headers, cleaned.rows, delimiter) : "";

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_CSV)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="accent-foreground" />
            Trim whitespace
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input
              type="checkbox"
              checked={removeEmptyRows}
              onChange={(e) => setRemoveEmptyRows(e.target.checked)}
              className="accent-foreground"
            />
            Remove empty rows
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="accent-foreground"
            />
            Remove duplicate rows
          </label>
        </div>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>CSV input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="plaintext" placeholder="Paste messy CSV here to clean it up..." height="20rem" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Cleaned output</span>
            <div className="flex items-center gap-3">
              <span>{byteSize(output).toLocaleString()} bytes</span>
              <button onClick={handleCopy} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} disabled={!output} className="font-medium text-foreground disabled:text-muted">
                Download
              </button>
            </div>
          </div>
          <CodeEditor value={output} readOnly language="plaintext" placeholder="Cleaned CSV will appear here." height="20rem" />
        </div>
      </div>

      {parsed.error && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Could not parse CSV</p>
          <p className="mt-1 text-muted">{parsed.error}</p>
        </div>
      )}

      {output && (
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
          <span>{parsed.rows.length} rows in</span>
          <span>{cleaned.rows.length} rows out</span>
          {cleaned.removedEmpty > 0 && <span>{cleaned.removedEmpty} empty rows removed</span>}
          {cleaned.removedDuplicates > 0 && <span>{cleaned.removedDuplicates} duplicate rows removed</span>}
        </div>
      )}
    </div>
  );
}
