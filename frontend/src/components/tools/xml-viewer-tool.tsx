"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { formatXml, validateXml } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?><catalog><book id="1"><title>Learning XML</title><author>Jane Doe</author><price>29.99</price></book></catalog>`;

export function XmlViewerTool() {
  const [input, setInput] = useState("");

  const validation = useMemo(() => (input.trim() ? validateXml(input) : { valid: true }), [input]);

  const formatted = useMemo(() => {
    if (!input.trim() || !validation.valid) return "";
    try {
      return formatXml(input);
    } catch {
      return "";
    }
  }, [input, validation.valid]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_XML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>XML input</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="xml" placeholder="Paste your XML here to view it..." height="24rem" />
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Highlighted view</div>
          <CodeEditor value={formatted} readOnly language="xml" placeholder="Formatted XML will appear here." height="24rem" />
        </div>
      </div>

      {!validation.valid && input.trim() && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Invalid XML</p>
          <p className="mt-1 whitespace-pre-wrap text-muted">{validation.error}</p>
        </div>
      )}
    </div>
  );
}
