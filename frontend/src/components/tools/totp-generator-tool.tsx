"use client";

import { useEffect, useState } from "react";
import { buildTotpUri, generateTotp, generateTotpSecret, secondsRemainingInPeriod, type TotpAlgorithm } from "@/lib/auth-utils";

export function TotpGeneratorTool() {
  const [secret, setSecret] = useState("");
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);
  const [algorithm, setAlgorithm] = useState<TotpAlgorithm>("SHA-1");
  const [issuer, setIssuer] = useState("CodeSimplify");
  const [account, setAccount] = useState("user@example.com");

  const [code, setCode] = useState("");
  const [remaining, setRemaining] = useState(30);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSecret(generateTotpSecret());
  }, []);

  useEffect(() => {
    if (!secret.trim()) {
      setCode("");
      return;
    }
    let cancelled = false;

    async function tick() {
      try {
        const result = await generateTotp(secret, { digits, period, algorithm });
        if (!cancelled) {
          setCode(result);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not generate a code from this secret.");
      }
      setRemaining(secondsRemainingInPeriod(period));
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [secret, digits, period, algorithm]);

  function copy(value: string) {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const uri = secret.trim() ? buildTotpUri(secret, account || "account", issuer, { digits, period, algorithm }) : "";

  return (
    <div>
      <div className="card flex flex-col items-center gap-3 py-8 text-center">
        <span className="text-xs uppercase tracking-wide text-muted">Current code</span>
        {error ? (
          <p className="max-w-xs text-sm text-muted">{error}</p>
        ) : (
          <button onClick={() => copy(code)} className="font-mono text-4xl font-semibold tracking-[0.3em]">
            {code || "—".repeat(digits)}
          </button>
        )}
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-foreground transition-[width] duration-1000 ease-linear"
            style={{ width: `${(remaining / period) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted">Refreshes in {remaining}s{copied && " · Copied!"}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          <span className="mb-1 block text-muted">Secret (Base32)</span>
          <div className="flex gap-2">
            <input
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
            <button onClick={() => setSecret(generateTotpSecret())} className="btn btn-secondary h-9 shrink-0 px-3 text-xs">
              New secret
            </button>
          </div>
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Issuer</span>
          <input value={issuer} onChange={(e) => setIssuer(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Account label</span>
          <input value={account} onChange={(e) => setAccount(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Digits</span>
          <select value={digits} onChange={(e) => setDigits(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground">
            <option value={6}>6</option>
            <option value={8}>8</option>
          </select>
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Period (seconds)</span>
          <select value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground">
            <option value={30}>30</option>
            <option value={60}>60</option>
          </select>
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Algorithm</span>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as TotpAlgorithm)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground">
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </label>
      </div>

      {uri && (
        <div className="card mt-4 p-0">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>otpauth:// URI (for authenticator apps / QR code generators)</span>
            <button onClick={() => copy(uri)} className="font-medium text-foreground">
              Copy
            </button>
          </div>
          <p className="break-all p-3 font-mono text-sm">{uri}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Codes are generated entirely in your browser via the Web Crypto API and are RFC 6238-compliant, matching apps like
        Google Authenticator and Authy. Your secret never leaves your device.
      </p>
    </div>
  );
}
