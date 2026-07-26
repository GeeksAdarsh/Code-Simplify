"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { evaluateXPath } from "@/lib/xml-utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1"><title>Learning XML</title><price>29.99</price></book>
  <book id="2"><title>CodeSimplify Guide</title><price>19.99</price></book>
</catalog>`;

const SAMPLE_XPATH = "//book/title";

export function XPathTesterTool() {
  const [xml, setXml] = useState("");
  const [expression, setExpression] = useState("");

  const result = useMemo(() => evaluateXPath(xml, expression), [xml, expression]);

  function loadSample() {
    setXml(SAMPLE_XML);
    setExpression(SAMPLE_XPATH);
  }

  function clear() {
    setXml("");
    setExpression("");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={clear} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="border-b border-border px-3 py-1.5 text-xs text-muted">XML document</div>
        <CodeEditor value={xml} onChange={setXml} language="xml" placeholder="Paste your XML document here..." height="16rem" />
        <div className="border-t border-border">
          <div className="border-b border-border px-3 py-1.5 text-xs text-muted">XPath expression</div>
          <input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. //book/title"
            spellCheck={false}
            className="w-full bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        {result.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Error</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}

        {!result.error && expression.trim() && xml.trim() && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <span className="badge border-foreground text-foreground">
                {result.resultType === "node-set"
                  ? `${result.values.length} match${result.values.length === 1 ? "" : "es"}`
                  : result.resultType || "no result"}
              </span>
            </div>
            {result.values.length > 0 && (
              <ul className="space-y-2">
                {result.values.map((v, i) => (
                  <li key={i} className="card overflow-x-auto px-4 py-3 font-mono text-xs">
                    {v}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {!expression.trim() && (
          <p className="text-sm text-muted">Enter an XPath expression above to see matching results here.</p>
        )}
      </div>
    </div>
  );
}
