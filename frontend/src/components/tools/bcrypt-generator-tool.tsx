"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";

export function BcryptGeneratorTool() {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState("");
  const [hashing, setHashing] = useState(false);
  const [copied, setCopied] = useState(false);

  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<"idle" | "checking" | "match" | "no-match" | "error">("idle");

  async function handleGenerate() {
    if (!password) return;
    setHashing(true);
    try {
      const generated = await bcrypt.hash(password, rounds);
      setHash(generated);
    } finally {
      setHashing(false);
    }
  }

  function handleCopy() {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleVerify() {
    if (!verifyPassword || !verifyHash) return;
    setVerifyResult("checking");
    try {
      const isMatch = await bcrypt.compare(verifyPassword, verifyHash);
      setVerifyResult(isMatch ? "match" : "no-match");
    } catch {
      setVerifyResult("error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="card space-y-4 p-4">
        <h3 className="text-sm font-medium">Generate a bcrypt hash</h3>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to hash..."
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">
            Salt rounds: {rounds} {rounds >= 13 && <span className="text-muted">(slower, more secure)</span>}
          </label>
          <input
            type="range"
            min={4}
            max={14}
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
        <button onClick={handleGenerate} disabled={!password || hashing} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
          {hashing ? "Hashing\u2026" : "Generate hash"}
        </button>

        {hash && (
          <div className="rounded-lg border border-border bg-background px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Bcrypt hash</span>
              <button onClick={handleCopy} className="text-xs font-medium text-foreground">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-1 break-all font-mono text-sm">{hash}</p>
          </div>
        )}
      </div>

      <div className="card space-y-4 p-4">
        <h3 className="text-sm font-medium">Verify a password against a hash</h3>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Password</label>
          <input
            type="text"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="Enter the plain-text password..."
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Bcrypt hash</label>
          <input
            type="text"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            placeholder="$2a$10$..."
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={!verifyPassword || !verifyHash || verifyResult === "checking"}
          className="btn btn-secondary h-9 px-4 text-sm disabled:opacity-50"
        >
          {verifyResult === "checking" ? "Checking\u2026" : "Verify"}
        </button>

        {verifyResult === "match" && <p className="badge border-foreground text-foreground">Password matches the hash &#10003;</p>}
        {verifyResult === "no-match" && <p className="badge border-foreground text-foreground">Password does not match &#10007;</p>}
        {verifyResult === "error" && <p className="text-xs text-muted">That doesn&apos;t look like a valid bcrypt hash.</p>}
      </div>

      <p className="text-xs text-muted">
        Bcrypt hashing runs entirely in your browser using a pure JavaScript implementation \u2014 your password is
        never sent anywhere. Higher salt rounds are more secure but take longer to compute.
      </p>
    </div>
  );
}
