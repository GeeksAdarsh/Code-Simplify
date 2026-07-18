"use client";

import { useEffect, useState } from "react";
import { generateRandomToken, type TokenFormat } from "@/lib/token-utils";

const FORMATS: { value: TokenFormat; label: string }[] = [
  { value: "hex", label: "Hexadecimal" },
  { value: "base64url", label: "Base64 (URL-safe)" },
  { value: "alphanumeric", label: "Alphanumeric" },
];

const PRESETS = [
  { label: "Custom", prefix: "" },
  { label: "sk_live_...", prefix: "sk_live_" },
  { label: "sk_test_...", prefix: "sk_test_" },
  { label: "pk_live_...", prefix: "pk_live_" },
  { label: "api_...", prefix: "api_" },
];

export function ApiKeyGeneratorTool() {
  const [prefix, setPrefix] = useState("sk_live_");
  const [length, setLength] = useState(32);
  const [format, setFormat] = useState<TokenFormat>("hex");
  const [count, setCount] = useState(5);
  const [keys, setKeys] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function regenerate() {
    setKeys(Array.from({ length: count }, () => `${prefix}${generateRandomToken(length, format)}`));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, length, format, count]);

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(keys.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Prefix</label>
          <div className="flex gap-2">
            <input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-32 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
            />
            <select
              onChange={(e) => setPrefix(e.target.value)}
              value=""
              className="rounded border border-border bg-background px-2 py-1.5 text-xs text-muted"
            >
              <option value="" disabled>
                Presets
              </option>
              {PRESETS.map((p) => (
                <option key={p.label} value={p.prefix}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Key length: {length}</label>
          <input type="range" min={16} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-40 accent-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Character set</label>
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
        <button onClick={handleCopyAll} disabled={keys.length === 0} className="btn btn-secondary h-9 px-4 text-sm disabled:opacity-50">
          {copied === -1 ? "Copied all!" : "Copy all"}
        </button>
      </div>

      <div className="mt-4 card divide-y divide-border p-0">
        {keys.map((key, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="break-all font-mono text-sm">{key}</span>
            <button onClick={() => handleCopy(key, i)} className="shrink-0 text-xs font-medium text-foreground">
              {copied === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">
        Keys are generated using your browser&apos;s cryptographically secure random number generator
        (<code className="font-mono">crypto.getRandomValues</code>) and never leave your device. Treat generated keys as
        secrets: store them in a secrets manager, not in source control.
      </p>
    </div>
  );
}
