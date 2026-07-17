"use client";

import { useEffect, useMemo, useState } from "react";
import { signJwt, type JwtAlgorithm } from "@/lib/jwt-utils";
import { byteSize, parseJson } from "@/lib/json-utils";

const SAMPLE_PAYLOAD = `{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin"
}`;

const EXPIRY_OPTIONS: { value: string; label: string; seconds: number | null }[] = [
  { value: "none", label: "No expiry", seconds: null },
  { value: "15m", label: "15 minutes", seconds: 15 * 60 },
  { value: "1h", label: "1 hour", seconds: 60 * 60 },
  { value: "1d", label: "1 day", seconds: 60 * 60 * 24 },
  { value: "7d", label: "7 days", seconds: 60 * 60 * 24 * 7 },
  { value: "30d", label: "30 days", seconds: 60 * 60 * 24 * 30 },
];

export function JwtGeneratorTool() {
  const [payloadInput, setPayloadInput] = useState(SAMPLE_PAYLOAD);
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [algorithm, setAlgorithm] = useState<JwtAlgorithm>("HS256");
  const [addIat, setAddIat] = useState(true);
  const [expiryOption, setExpiryOption] = useState("1h");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);

  const parsedPayload = useMemo(() => parseJson(payloadInput), [payloadInput]);

  useEffect(() => {
    if (!payloadInput.trim()) {
      setToken("");
      setError(undefined);
      return;
    }
    if (parsedPayload.error) {
      setToken("");
      setError(`Invalid payload JSON: ${parsedPayload.error.message}`);
      return;
    }
    if (parsedPayload.data === null || typeof parsedPayload.data !== "object" || Array.isArray(parsedPayload.data)) {
      setToken("");
      setError("Payload must be a JSON object of claims.");
      return;
    }

    const claims: Record<string, unknown> = { ...(parsedPayload.data as Record<string, unknown>) };
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (addIat) claims.iat = nowSeconds;

    const expiry = EXPIRY_OPTIONS.find((o) => o.value === expiryOption);
    if (expiry?.seconds) claims.exp = nowSeconds + expiry.seconds;

    const header = { alg: algorithm, typ: "JWT" };

    let cancelled = false;
    signJwt(header, claims, secret, algorithm)
      .then((signed) => {
        if (!cancelled) {
          setToken(signed);
          setError(undefined);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not sign this token.");
      });

    return () => {
      cancelled = true;
    };
  }, [payloadInput, parsedPayload, secret, algorithm, addIat, expiryOption]);

  function handleCopy() {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card space-y-4 p-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Payload (claims)</label>
            <textarea
              value={payloadInput}
              onChange={(e) => setPayloadInput(e.target.value)}
              spellCheck={false}
              className="h-40 w-full resize-none rounded border border-border bg-background p-2.5 font-mono text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as JwtAlgorithm)}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
              >
                <option value="HS256">HS256</option>
                <option value="HS384">HS384</option>
                <option value="HS512">HS512</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Expires in</label>
              <select
                value={expiryOption}
                onChange={(e) => setExpiryOption(e.target.value)}
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
              >
                {EXPIRY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-muted">
            <input type="checkbox" checked={addIat} onChange={(e) => setAddIat(e.target.checked)} className="accent-foreground" />
            Automatically add &quot;iat&quot; (issued at) claim
          </label>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Secret key</label>
            <input
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="your-256-bit-secret"
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Generated JWT</span>
            <div className="flex items-center gap-3">
              <span>{byteSize(token).toLocaleString()} bytes</span>
              <button onClick={handleCopy} disabled={!token} className="font-medium text-foreground disabled:text-muted">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            value={token}
            readOnly
            placeholder="Your signed JWT will appear here."
            spellCheck={false}
            className="h-40 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
          {error && <p className="border-t border-border px-3 py-2 text-xs text-muted">{error}</p>}
          {token && !error && (
            <p className="border-t border-border px-3 py-2 text-xs text-muted">
              Header and payload are Base64URL-encoded, not encrypted \u2014 never put secrets inside a JWT payload.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
