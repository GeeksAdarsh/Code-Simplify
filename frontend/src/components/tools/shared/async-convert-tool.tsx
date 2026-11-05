"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { languageFromFilename, languageFromLabel } from "@/lib/monaco-language";
import { warnIfSampleUnchanged } from "@/lib/sample-check";

export interface ConvertResult {
  output: string;
  error?: string;
}

interface AsyncConvertToolProps {
  sampleInput: string;
  convert: (input: string) => Promise<ConvertResult>;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  downloadFilename: string;
  downloadMimeType?: string;
  toolbarExtra?: ReactNode;
  debounceMs?: number;
  /** Monaco language id for the input editor; guessed from inputLabel when omitted. */
  inputLanguage?: string;
  /** Monaco language id for the output editor; guessed from downloadFilename when omitted. */
  outputLanguage?: string;
}

export function AsyncConvertTool({
  sampleInput,
  convert,
  inputLabel,
  outputLabel,
  inputPlaceholder,
  outputPlaceholder,
  downloadFilename,
  downloadMimeType = "text/plain",
  toolbarExtra,
  debounceMs = 300,
  inputLanguage,
  outputLanguage,
}: AsyncConvertToolProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ConvertResult>({ output: "" });
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    if (!input.trim()) {
      setResult({ output: "" });
      setPending(false);
      return;
    }

    setPending(true);
    const id = ++requestId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await convert(input);
        if (requestId.current === id) {
          setResult(res);
          setPending(false);
        }
      } catch (e) {
        if (requestId.current === id) {
          setResult({ output: "", error: e instanceof Error ? e.message : "Conversion failed" });
          setPending(false);
        }
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [input, convert, debounceMs]);

  useEffect(() => {
    warnIfSampleUnchanged(outputLabel, sampleInput, input, result.output);
  }, [outputLabel, sampleInput, input, result.output]);

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
          <CodeEditor
            value={input}
            onChange={setInput}
            language={inputLanguage ?? languageFromLabel(inputLabel)}
            placeholder={inputPlaceholder}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>{outputLabel}</span>
            <div className="flex items-center gap-3">
              {pending && <span>Working...</span>}
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
          <CodeEditor
            value={result.output}
            readOnly
            language={outputLanguage ?? languageFromFilename(downloadFilename)}
            placeholder={outputPlaceholder}
          />
        </div>
      </div>

      {result.error && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Conversion error</p>
          <p className="mt-1 whitespace-pre-wrap text-muted">{result.error}</p>
        </div>
      )}
    </div>
  );
}
