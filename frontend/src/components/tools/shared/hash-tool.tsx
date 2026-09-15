"use client";

import { useEffect, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import type { DigestEncoding } from "@/lib/hash-utils";

interface HashToolProps {
  algorithmName: string;
  sampleInput: string;
  digest: (text: string, encoding: DigestEncoding) => Promise<string> | string;
}

export function HashTool({ algorithmName, sampleInput, digest }: HashToolProps) {
  const [input, setInput] = useState("");
  const [encoding, setEncoding] = useState<DigestEncoding>("hex");
  const [uppercase, setUppercase] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    let cancelled = false;
    Promise.resolve(digest(input, encoding)).then((hash) => {
      if (!cancelled) setOutput(uppercase && encoding === "hex" ? hash.toUpperCase() : hash);
    });
    return () => {
      cancelled = true;
    };
  }, [input, encoding, uppercase, digest]);

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Encoding
            <select
              value={encoding}
              onChange={(e) => setEncoding(e.target.value as DigestEncoding)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              <option value="hex">Hex</option>
              <option value="base64">Base64</option>
            </select>
          </label>
          {encoding === "hex" && (
            <label className="flex items-center gap-1.5 text-xs text-muted">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-foreground" />
              Uppercase
            </label>
          )}
        </div>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Text input</span>
          <span>{byteSize(input).toLocaleString()} bytes</span>
        </div>
        <CodeEditor
          value={input}
          onChange={setInput}
          language="plaintext"
          placeholder={`Type or paste text here to compute its ${algorithmName} hash...`}
          height="10rem"
        />
      </div>

      <div className="mt-4 card px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">{algorithmName} hash</span>
          <button onClick={handleCopy} disabled={!output} className="text-xs font-medium text-foreground disabled:text-muted">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="mt-2 break-all font-mono text-sm">{output || "—"}</p>
      </div>
    </div>
  );
}
