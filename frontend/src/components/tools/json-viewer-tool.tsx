"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize, parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{"name":"CodeSimplify","version":1.0,"active":true,"tags":["json","developer","tools"],"author":{"name":"Dev Team","url":"https://example.com"},"stars":null}`;

export function JsonViewerTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => parseJson(input), [input]);

  const formatted = useMemo(() => {
    if (result.error || result.data === undefined) return "";
    return JSON.stringify(result.data, null, 2);
  }, [result]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_JSON)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>JSON input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="json" placeholder="Paste your JSON here to view it..." height="24rem" />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Highlighted view</div>
          <CodeEditor value={formatted} readOnly language="json" placeholder="Formatted JSON will appear here." height="24rem" />
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
