"use client";

import { useCallback, useState } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { parseJson } from "@/lib/json-utils";
import { buildCodeSchema, type CodeSchema } from "@/lib/json-to-code";

interface CodeGenToolProps {
  sampleInput: string;
  renderCode: (schema: CodeSchema, rootName: string) => string;
  outputLabel: string;
  downloadExtension: string;
  downloadMimeType?: string;
  defaultRootName?: string;
}

export function CodeGenTool({
  sampleInput,
  renderCode,
  outputLabel,
  downloadExtension,
  downloadMimeType = "text/plain",
  defaultRootName = "Root",
}: CodeGenToolProps) {
  const [rootName, setRootName] = useState(defaultRootName);

  const convert = useCallback(
    (input: string): ConvertResult => {
      const result = parseJson(input);
      if (result.error) {
        const location = result.error.line ? ` (line ${result.error.line}, column ${result.error.column})` : "";
        return { output: "", error: `${result.error.message}${location}` };
      }
      const schema = buildCodeSchema(rootName || "Root", result.data);
      return { output: renderCode(schema, rootName || "Root") };
    },
    [rootName, renderCode]
  );

  return (
    <ConvertTool
      sampleInput={sampleInput}
      convert={convert}
      inputLabel="JSON input"
      outputLabel={outputLabel}
      inputPlaceholder="Paste your JSON here..."
      outputPlaceholder="Generated code will appear here."
      downloadFilename={`${rootName || "Root"}.${downloadExtension}`}
      downloadMimeType={downloadMimeType}
      toolbarExtra={
        <label className="flex items-center gap-1.5 text-xs text-muted">
          Root class name
          <input
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="w-28 rounded border border-border bg-background px-1.5 py-1 text-foreground"
          />
        </label>
      }
    />
  );
}
