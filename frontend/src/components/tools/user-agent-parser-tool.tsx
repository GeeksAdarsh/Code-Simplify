"use client";

import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { parseUserAgent } from "@/lib/user-agent-utils";

const SAMPLE_UAS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
];

export function UserAgentParserTool() {
  const [ua, setUa] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setUa(navigator.userAgent);
      setAutoDetected(true);
    }
  }, []);

  const result = useMemo(() => (ua.trim() ? parseUserAgent(ua) : undefined), [ua]);

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">User-Agent string</label>
        <CodeEditor
          value={ua}
          onChange={(v) => {
            setUa(v);
            setAutoDetected(false);
          }}
          language="plaintext"
          placeholder="Paste a User-Agent string here..."
          height="5rem"
          className="rounded border border-border"
        />
        {autoDetected && <p className="mt-1 text-xs text-muted">Auto-detected from your current browser.</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          {SAMPLE_UAS.map((sample, i) => (
            <button
              key={i}
              onClick={() => {
                setUa(sample);
                setAutoDetected(false);
              }}
              className="btn btn-secondary h-8 px-3 text-xs"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard label="Browser" value={result.isBot ? "—" : formatNameVersion(result.browserName, result.browserVersion)} />
          <InfoCard label="Engine" value={formatNameVersion(result.engineName, result.engineVersion)} />
          <InfoCard label="Operating system" value={formatNameVersion(result.osName, result.osVersion)} />
          <InfoCard label="Device type" value={result.deviceType} />
          <InfoCard label="Is bot/crawler" value={result.isBot ? "Yes" : "No"} />
          <InfoCard label="Parsed comment tokens" value={String(result.comments.length)} />
        </div>
      )}

      {result && result.comments.length > 0 && (
        <div className="mt-4 card p-4">
          <p className="text-xs font-medium text-muted">Raw comment tokens</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.comments.map((c, i) => (
              <span key={i} className="rounded border border-border bg-background px-2 py-1 font-mono text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Parsing is heuristic and runs entirely in your browser — User-Agent strings are inherently spoofable and
        not a reliable way to detect capabilities.
      </p>
    </div>
  );
}

function formatNameVersion(name?: string, version?: string): string {
  if (!name) return "Unknown";
  return version ? `${name} ${version}` : name;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 break-all font-mono text-sm">{value}</p>
    </div>
  );
}
