"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { validateCsp } from "@/lib/csp-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; img-src * data:; object-src 'none'";

export function CspValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? validateCsp(input) : null), [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <CodeEditor value={input} onChange={setInput} language="plaintext" placeholder="Paste your Content-Security-Policy header value here..." height="8rem" />
      </div>

      <div className="mt-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Paste a CSP header value above to validate it.</div>}
        {result && (
          <>
            <p className="mb-3 text-sm text-muted">
              {result.directiveCount} directive{result.directiveCount === 1 ? "" : "s"} found.
            </p>
            <LintResults issues={result.issues} validLabel="No issues found" />
          </>
        )}
      </div>
    </div>
  );
}
