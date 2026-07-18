"use client";

import { useEffect, useState } from "react";
import { generateCodeChallenge, generateCodeVerifier } from "@/lib/auth-utils";

export function PkceGeneratorTool() {
  const [length, setLength] = useState(64);
  const [verifier, setVerifier] = useState("");
  const [challenge, setChallenge] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  async function regenerate(currentLength: number) {
    const v = generateCodeVerifier(currentLength);
    setVerifier(v);
    setChallenge(await generateCodeChallenge(v));
  }

  useEffect(() => {
    regenerate(length);
  }, [length]);

  function copy(label: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Verifier length: {length}</label>
          <input type="range" min={43} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-52 accent-foreground" />
        </div>
        <button onClick={() => regenerate(length)} className="btn btn-primary h-9 px-4 text-sm">
          Regenerate
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="card p-0">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>code_verifier</span>
            <button onClick={() => copy("verifier", verifier)} className="font-medium text-foreground">
              {copied === "verifier" ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="break-all p-3 font-mono text-sm">{verifier}</p>
        </div>
        <div className="card p-0">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>code_challenge (S256)</span>
            <button onClick={() => copy("challenge", challenge)} className="font-medium text-foreground">
              {copied === "challenge" ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="break-all p-3 font-mono text-sm">{challenge}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Generated using <code className="font-mono">crypto.getRandomValues</code> and{" "}
        <code className="font-mono">crypto.subtle.digest(&quot;SHA-256&quot;)</code> in your browser &mdash; nothing is sent to a
        server. Send <code className="font-mono">code_challenge</code> with{" "}
        <code className="font-mono">code_challenge_method=S256</code> in the authorization request, then send the matching{" "}
        <code className="font-mono">code_verifier</code> in the token exchange request.
      </p>
    </div>
  );
}
