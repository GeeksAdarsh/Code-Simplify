"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { countXmlElements, validateXml } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>Learning XML</title>
    <author>Jane Doe</author>
  </book>
</catalog>`;

const SAMPLE_INVALID_XML = `<catalog>
  <book id="1">
    <title>Learning XML</title>
  </book>
</catalog2>`;

export function XmlValidatorTool() {
  const [input, setInput] = useState("");

  const validation = useMemo(() => (input.trim() ? validateXml(input) : { valid: true }), [input]);
  const stats = useMemo(() => (validation.valid && input.trim() ? countXmlElements(input) : null), [
    validation.valid,
    input,
  ]);

  const status: "empty" | "valid" | "invalid" = !input.trim() ? "empty" : validation.valid ? "valid" : "invalid";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_XML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <button onClick={() => setInput(SAMPLE_INVALID_XML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load invalid example
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>XML input</span>
          <span>{byteSize(input).toLocaleString()} bytes</span>
        </div>
        <CodeEditor value={input} onChange={setInput} language="xml" placeholder="Paste your XML here to validate it..." height="20rem" />
      </div>

      <div className="mt-4">
        {status === "empty" && (
          <div className="card px-4 py-3 text-sm text-muted">Paste XML above to see validation results.</div>
        )}
        {status === "valid" && (
          <div className="card flex flex-wrap items-center gap-4 border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Valid XML &#10003;</span>
            {stats && (
              <>
                <span className="text-muted">Elements: {stats.elements}</span>
                <span className="text-muted">Max depth: {stats.depth}</span>
              </>
            )}
          </div>
        )}
        {status === "invalid" && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid XML &#10007;</span>
            <p className="mt-2 whitespace-pre-wrap text-muted">{validation.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
