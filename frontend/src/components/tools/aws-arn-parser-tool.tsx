"use client";

import { useMemo, useState } from "react";
import { parseArn } from "@/lib/aws-utils";

const SAMPLE = "arn:aws:s3:::my-app-bucket/uploads/photo.jpg";

const SAMPLES = [
  "arn:aws:s3:::my-app-bucket/uploads/photo.jpg",
  "arn:aws:iam::123456789012:role/lambda-execution-role",
  "arn:aws:lambda:us-east-1:123456789012:function:my-function",
  "arn:aws:dynamodb:us-west-2:123456789012:table/Users",
  "arn:aws:ec2:eu-west-1:123456789012:instance/i-0abcd1234efgh5678",
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm last:border-b-0">
      <span className="text-muted">{label}</span>
      <span className="font-mono">{value || <span className="text-muted">&mdash;</span>}</span>
    </div>
  );
}

export function AwsArnParserTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? parseArn(input) : null), [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="arn:aws:service:region:account-id:resource"
          spellCheck={false}
          className="w-full bg-background font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <button key={s} onClick={() => setInput(s)} className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-foreground">
            {s.split(":")[2]}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Paste an AWS ARN above to break it down.</div>}
        {result && "error" in result && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid ARN</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}
        {result && !("error" in result) && (
          <div className="card overflow-hidden p-0">
            <Row label="Partition" value={result.partition} />
            <Row label="Service" value={result.service} />
            <Row label="Region" value={result.region || "(global)"} />
            <Row label="Account ID" value={result.accountId || "(none)"} />
            {result.resourceType && <Row label="Resource type" value={result.resourceType} />}
            <Row label="Resource ID" value={result.resourceId} />
          </div>
        )}
      </div>
    </div>
  );
}
