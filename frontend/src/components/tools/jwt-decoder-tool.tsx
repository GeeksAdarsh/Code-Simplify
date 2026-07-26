"use client";

import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { decodeJwt, verifyJwtSignature } from "@/lib/jwt-utils";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function formatClaimTimestamp(value: unknown): string | null {
  if (typeof value !== "number") return null;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return null;
  return date.toUTCString();
}

export function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");

  const result = useMemo(() => (token.trim() ? decodeJwt(token) : null), [token]);

  useEffect(() => {
    if (!secret.trim() || !token.trim() || !result?.data) {
      setVerifyStatus("idle");
      return;
    }
    setVerifyStatus("checking");
    let cancelled = false;
    verifyJwtSignature(token, secret).then((isValid) => {
      if (!cancelled) setVerifyStatus(isValid ? "valid" : "invalid");
    });
    return () => {
      cancelled = true;
    };
  }, [token, secret, result]);

  const exp = result?.data ? formatClaimTimestamp(result.data.payload.exp) : null;
  const iat = result?.data ? formatClaimTimestamp(result.data.payload.iat) : null;
  const nbf = result?.data ? formatClaimTimestamp(result.data.payload.nbf) : null;
  const isExpired =
    result?.data && typeof result.data.payload.exp === "number" ? Date.now() > result.data.payload.exp * 1000 : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setToken(SAMPLE_JWT)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button
          onClick={() => {
            setToken("");
            setSecret("");
          }}
          className="btn btn-secondary h-8 px-3 text-xs"
        >
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="border-b border-border px-3 py-1.5 text-xs text-muted">JWT token</div>
        <CodeEditor value={token} onChange={setToken} language="plaintext" placeholder="Paste your JSON Web Token here (header.payload.signature)..." height="7rem" />
        <div className="flex items-center gap-2 border-t border-border px-3 py-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Optional: enter the HMAC secret to verify the signature"
            className="flex-1 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
          {verifyStatus === "valid" && <span className="badge border-foreground text-foreground">Signature valid &#10003;</span>}
          {verifyStatus === "invalid" && <span className="badge border-foreground text-foreground">Signature invalid &#10007;</span>}
          {verifyStatus === "checking" && <span className="text-xs text-muted">Checking\u2026</span>}
        </div>
      </div>

      <div className="mt-4">
        {!token.trim() && <div className="card px-4 py-3 text-sm text-muted">Paste a JWT above to decode its header and payload.</div>}

        {token.trim() && result?.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid token &#10007;</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}

        {result?.data && (
          <div className="space-y-4">
            <div className="card flex flex-wrap items-center gap-4 border-foreground/30 px-4 py-3 text-sm">
              <span className="badge border-foreground text-foreground">Valid JWT structure &#10003;</span>
              {typeof result.data.header.alg === "string" && <span className="text-muted">Algorithm: {result.data.header.alg}</span>}
              {iat && <span className="text-muted">Issued: {iat}</span>}
              {nbf && <span className="text-muted">Not before: {nbf}</span>}
              {exp && (
                <span className="text-muted">
                  Expires: {exp} {isExpired ? "(expired)" : "(not expired)"}
                </span>
              )}
            </div>

            <div className="grid gap-0 rounded-xl border border-border sm:grid-cols-2">
              <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
                <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Header</div>
                <CodeEditor value={result.data.headerRaw} readOnly language="json" height="14rem" />
              </div>
              <div className="flex flex-col">
                <div className="border-b border-border px-3 py-1.5 text-xs text-muted">Payload</div>
                <CodeEditor value={result.data.payloadRaw} readOnly language="json" height="14rem" />
              </div>
            </div>

            <div className="card px-4 py-3">
              <p className="text-xs text-muted">Signature (not verifiable without a secret)</p>
              <p className="mt-1 break-all font-mono text-xs">{result.data.signature}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
