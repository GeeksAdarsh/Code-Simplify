"use client";

import { useMemo, useState } from "react";
import { analyzeIamPolicy } from "@/lib/iam-utils";
import { LintResults } from "@/components/tools/shared/lint-results";
import { byteSize } from "@/lib/json-utils";

const SAMPLE = JSON.stringify(
  {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AllowS3Read",
        Effect: "Allow",
        Action: ["s3:GetObject", "s3:ListBucket"],
        Resource: ["arn:aws:s3:::my-app-bucket", "arn:aws:s3:::my-app-bucket/*"],
      },
      {
        Sid: "AllowLogging",
        Effect: "Allow",
        Action: "logs:PutLogEvents",
        Resource: "*",
      },
    ],
  },
  null,
  2
);

export function AwsIamPolicyFormatterTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => (input.trim() ? analyzeIamPolicy(input) : null), [input]);

  const copy = () => {
    if (!result?.formatted) return;
    navigator.clipboard.writeText(result.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>IAM policy JSON</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your IAM policy JSON document here..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Formatted output</span>
            <button onClick={copy} disabled={!result?.formatted} className="font-medium text-foreground disabled:text-muted">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={result?.formatted ?? ""}
            readOnly
            placeholder="Formatted policy will appear here."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        {result && (
          <>
            <p className="mb-3 text-sm text-muted">
              {result.statementCount} statement{result.statementCount === 1 ? "" : "s"} found.
            </p>
            <LintResults issues={result.issues} validLabel="No issues found" />
          </>
        )}
      </div>
    </div>
  );
}
