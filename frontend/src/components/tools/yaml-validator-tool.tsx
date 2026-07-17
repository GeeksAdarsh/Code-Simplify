"use client";

import { useMemo, useState } from "react";
import { byteSize, countNodes, jsonTypeOf } from "@/lib/json-utils";
import { parseYaml } from "@/lib/yaml-utils";

const SAMPLE_YAML = `name: DevToolbox
version: 1.0
active: true
tags:
  - json
  - developer
author:
  name: Dev Team
  url: https://example.com`;

const SAMPLE_INVALID_YAML = `name: DevToolbox
tags: [json, developer
active: true`;

export function YamlValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? parseYaml(input) : { data: undefined }), [input]);
  const stats = useMemo(() => (result.data !== undefined ? countNodes(result.data) : null), [result.data]);

  const status: "empty" | "valid" | "invalid" = !input.trim() ? "empty" : result.error ? "invalid" : "valid";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_YAML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <button onClick={() => setInput(SAMPLE_INVALID_YAML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load invalid example
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>YAML input</span>
          <span>{byteSize(input).toLocaleString()} bytes</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your YAML here to validate it..."
          spellCheck={false}
          className="h-80 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4">
        {status === "empty" && (
          <div className="card px-4 py-3 text-sm text-muted">Paste YAML above to see validation results.</div>
        )}
        {status === "valid" && (
          <div className="card flex flex-wrap items-center gap-4 border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Valid YAML &#10003;</span>
            <span className="text-muted">Type: {jsonTypeOf(result.data)}</span>
            {stats && (
              <>
                <span className="text-muted">Keys: {stats.keys}</span>
                <span className="text-muted">Items: {stats.items}</span>
                <span className="text-muted">Max depth: {stats.depth}</span>
              </>
            )}
          </div>
        )}
        {status === "invalid" && result.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid YAML &#10007;</span>
            <p className="mt-2 text-muted">
              {result.error.message}
              {result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
