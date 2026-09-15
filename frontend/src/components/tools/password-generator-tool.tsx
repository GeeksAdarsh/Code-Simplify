"use client";

import { useEffect, useState } from "react";
import { generatePassword, checkPasswordStrength } from "@/lib/password-utils";

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const options = { length, uppercase, lowercase, numbers, symbols, excludeAmbiguous };

  function regenerate() {
    const next = generatePassword(options);
    setPassword(next);
    if (next) setHistory((prev) => [next, ...prev].slice(0, 5));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  function handleCopy(value: string, index: number) {
    navigator.clipboard.writeText(value);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  const noCharsetSelected = !uppercase && !lowercase && !numbers && !symbols;
  const strength = password ? checkPasswordStrength(password) : null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="card space-y-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Length: {length}</label>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-foreground" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-foreground" />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="accent-foreground" />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="accent-foreground" />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="accent-foreground" />
            Symbols (!@#$)
          </label>
        </div>

        <label className="flex items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="accent-foreground"
          />
          Exclude ambiguous characters (i, l, 1, L, o, 0, O)
        </label>

        <button onClick={regenerate} disabled={noCharsetSelected} className="btn btn-primary h-9 w-full text-sm disabled:opacity-50">
          Generate new password
        </button>
        {noCharsetSelected && <p className="text-xs text-muted">Select at least one character set above.</p>}
      </div>

      <div className="flex flex-col gap-3">
        <div className="card px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Generated password</span>
            <button onClick={() => handleCopy(password, -1)} disabled={!password} className="text-xs font-medium text-foreground disabled:text-muted">
              {copied === -1 ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-2 break-all font-mono text-lg">{password || "—"}</p>
          {strength && (
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted">
                {strength.label} · ~{strength.entropyBits} bits of entropy
              </p>
            </div>
          )}
        </div>

        {history.length > 1 && (
          <div className="card px-4 py-3">
            <p className="mb-2 text-xs font-medium text-muted">Recent passwords</p>
            <ul className="space-y-1.5">
              {history.slice(1).map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-xs">{p}</span>
                  <button onClick={() => handleCopy(p, i)} className="shrink-0 text-xs font-medium text-foreground">
                    {copied === i ? "Copied!" : "Copy"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
