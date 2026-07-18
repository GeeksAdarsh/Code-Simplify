"use client";

import { type ReactNode, useMemo, useState } from "react";
import { byteSize } from "@/lib/json-utils";

export interface ConvertResult {
  output: string;
  error?: string;
}

interface ConvertToolProps {
  sampleInput: string;
  convert: (input: string) => ConvertResult;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  downloadFilename: string;
  downloadMimeType?: string;
  toolbarExtra?: ReactNode;
}

export function ConvertTool({
  sampleInput,
  convert,
  inputLabel,
  outputLabel,
  inputPlaceholder,
  outputPlaceholder,
  downloadFilename,
  downloadMimeType = "text/plain",
  toolbarExtra,
}: ConvertToolProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo<ConvertResult>(() => {
    if (!input.trim()) return { output: "" };
    try {
      return convert(input);
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Conversion failed" };
    }
  }, [input, convert]);

  function handleCopy() {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result.output) return;
    const blob = new Blob([result.output], { type: downloadMimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(sampleInput)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        {toolbarExtra && <div className="ml-auto flex items-center gap-3">{toolbarExtra}</div>}
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>{inputLabel}</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>{outputLabel}</span>
            <div className="flex items-center gap-3">
              <span>{byteSize(result.output).toLocaleString()} bytes</span>
              <button
                onClick={handleCopy}
                disabled={!result.output}
                className="font-medium text-foreground disabled:text-muted"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!result.output}
                className="font-medium text-foreground disabled:text-muted"
              >
                Download
              </button>
            </div>
          </div>
          <textarea
            value={result.output}
            readOnly
            placeholder={outputPlaceholder}
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      {result.error && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Conversion error</p>
          <p className="mt-1 text-muted">{result.error}</p>
        </div>
      )}
    </div>
  );
}
