"use client";

import { useEffect, useState } from "react";
import { byteSize } from "@/lib/json-utils";
import { hmac, encodeDigest, type DigestEncoding, type ShaAlgorithm } from "@/lib/hash-utils";

const SAMPLE_MESSAGE = "The quick brown fox jumps over the lazy dog";
const SAMPLE_SECRET = "my-secret-key";

const ALGORITHMS: ShaAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function HmacGeneratorTool() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<ShaAlgorithm>("SHA-256");
  const [encoding, setEncoding] = useState<DigestEncoding>("hex");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!message || !secret) {
      setOutput("");
      return;
    }
    let cancelled = false;
    hmac(message, secret, algorithm).then((bytes) => {
      if (!cancelled) setOutput(encodeDigest(bytes, encoding));
    });
    return () => {
      cancelled = true;
    };
  }, [message, secret, algorithm, encoding]);

  function loadSample() {
    setMessage(SAMPLE_MESSAGE);
    setSecret(SAMPLE_SECRET);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button
          onClick={() => {
            setMessage("");
            setSecret("");
          }}
          className="btn btn-secondary h-8 px-3 text-xs"
        >
          Clear
        </button>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Hash
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as ShaAlgorithm)}
              className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
            >
              {ALGORITHMS.map((a) => (
                <option key={a} value={a}>
                  HMAC-{a.replace("-", "")}
                </option>
              ))}
            </select>
          </label>
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
        </div>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Message</span>
          <span>{byteSize(message).toLocaleString()} bytes</span>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type or paste the message to sign..."
          spellCheck={false}
          className="h-32 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
        <div className="border-t border-border px-3 py-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Secret key"
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 card px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">HMAC-{algorithm.replace("-", "")} signature</span>
          <button onClick={handleCopy} disabled={!output} className="text-xs font-medium text-foreground disabled:text-muted">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="mt-2 break-all font-mono text-sm">{output || "\u2014"}</p>
      </div>
    </div>
  );
}
