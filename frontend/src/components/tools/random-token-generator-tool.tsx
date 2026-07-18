"use client";

import { useEffect, useState } from "react";
import { generateRandomToken, type TokenFormat } from "@/lib/token-utils";

const FORMATS: { value: TokenFormat; label: string }[] = [
  { value: "hex", label: "Hexadecimal" },
  { value: "base64", label: "Base64" },
  { value: "base64url", label: "Base64 (URL-safe)" },
  { value: "alphanumeric", label: "Alphanumeric" },
  { value: "numeric", label: "Numeric (PIN)" },
];

export function RandomTokenGeneratorTool() {
  const [length, setLength] = useState(32);
  const [format, setFormat] = useState<TokenFormat>("hex");
  const [count, setCount] = useState(5);
  const [tokens, setTokens] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function regenerate() {
    setTokens(Array.from({ length: count }, () => generateRandomToken(length, format)));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, format, count]);

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(tokens.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Length: {length}</label>
          <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-40 accent-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as TokenFormat)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">How many</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button onClick={regenerate} className="btn btn-primary h-9 px-4 text-sm">
          Regenerate
        </button>
        <button onClick={handleCopyAll} disabled={tokens.length === 0} className="btn btn-secondary h-9 px-4 text-sm disabled:opacity-50">
          {copied === -1 ? "Copied all!" : "Copy all"}
        </button>
      </div>

      <div className="mt-4 card divide-y divide-border p-0">
        {tokens.map((token, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="break-all font-mono text-sm">{token}</span>
            <button onClick={() => handleCopy(token, i)} className="shrink-0 text-xs font-medium text-foreground">
              {copied === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">
        Tokens are generated using your browser&apos;s cryptographically secure random number generator
        (<code>crypto.getRandomValues</code>) and never leave your device.
      </p>
    </div>
  );
}
