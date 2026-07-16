"use client";

import { useMemo, useState } from "react";
import { highlightJson } from "@/lib/json-highlight";
import { byteSize, parseJson } from "@/lib/json-utils";

const SAMPLE_JSON = `{"name":"DevToolbox","version":1.0,"active":true,"tags":["json","developer","tools"],"author":{"name":"Dev Team","url":"https://example.com"},"stars":null}`;

export function JsonViewerTool() {
  const [input, setInput] = useState("");
  const [wrap, setWrap] = useState(true);

  const result = useMemo(() => parseJson(input), [input]);

  const formatted = useMemo(() => {
    if (result.error || result.data === undefined) return "";
    return JSON.stringify(result.data, null, 2);
  }, [result]);

  const html = useMemo(() => (formatted ? highlightJson(formatted) : ""), [formatted]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_JSON)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="accent-foreground" />
          Wrap lines
        </label>
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
            placeholder="Paste your JSON here to view it..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Highlighted view</div>
          <pre
            className={`h-96 overflow-auto bg-background p-3 font-mono text-sm ${
              wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
            }`}
            dangerouslySetInnerHTML={{
              __html: html || '<span class="tok-null">Formatted JSON will appear here.</span>',
            }}
          />
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
