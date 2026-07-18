"use client";

import { useMemo, useState } from "react";
import { validateOpenAiSchema } from "@/lib/openai-schema-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = JSON.stringify(
  {
    name: "extract_contact",
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        phone: { type: ["string", "null"] },
      },
      required: ["name", "email", "phone"],
      additionalProperties: false,
    },
    strict: true,
  },
  null,
  2
);

export function OpenAiSchemaValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? validateOpenAiSchema(input) : null), [input]);

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
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a JSON Schema (or a full response_format / function definition) here..."
          spellCheck={false}
          className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Paste a JSON Schema above to check it against OpenAI structured output constraints.</div>}
        {result && (
          <>
            <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted">
              <span>Properties: <span className="font-medium text-foreground">{result.propertyCount}</span></span>
              <span>Max depth: <span className="font-medium text-foreground">{result.maxDepth}</span></span>
              <span>Enum values: <span className="font-medium text-foreground">{result.enumValueCount}</span></span>
            </div>
            <LintResults issues={result.issues} validLabel="Looks compatible with strict mode" />
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        This checks your schema against OpenAI&apos;s documented structured outputs / strict function-calling
        constraints (additionalProperties: false, all properties required, supported types, nesting and size limits).
        Always confirm against OpenAI&apos;s current docs before shipping, since these constraints can change.
      </p>
    </div>
  );
}
