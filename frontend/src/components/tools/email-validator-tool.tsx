"use client";

import { useMemo, useState } from "react";
import { validateEmail } from "@/lib/email-utils";

const SAMPLE_VALID = "jordan.lee+newsletter@example.com";
const SAMPLE_INVALID = "john..doe@@gmial,com";

export function EmailValidatorTool() {
  const [email, setEmail] = useState("");
  const result = useMemo(() => (email.trim() ? validateEmail(email) : undefined), [email]);

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          spellCheck={false}
          className="w-full rounded border border-border bg-background px-2.5 py-2 font-mono text-sm outline-none"
        />
        <div className="mt-2 flex gap-2">
          <button onClick={() => setEmail(SAMPLE_VALID)} className="btn btn-secondary h-8 px-3 text-xs">
            Load valid example
          </button>
          <button onClick={() => setEmail(SAMPLE_INVALID)} className="btn btn-secondary h-8 px-3 text-xs">
            Load invalid example
          </button>
          <button onClick={() => setEmail("")} className="btn btn-secondary h-8 px-3 text-xs">
            Clear
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-4 card p-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${result.valid ? "bg-foreground" : "bg-foreground/40"}`}
            />
            <span className="text-sm font-semibold">{result.valid ? "Valid email address" : "Invalid email address"}</span>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded border border-border bg-background px-3 py-2">
              <p className="text-xs text-muted">Local part</p>
              <p className="mt-0.5 font-mono">{result.localPart || "\u2014"}</p>
            </div>
            <div className="rounded border border-border bg-background px-3 py-2">
              <p className="text-xs text-muted">Domain</p>
              <p className="mt-0.5 font-mono">{result.domain || "\u2014"}</p>
            </div>
          </div>

          {result.suggestion && (
            <p className="mt-3 text-xs text-muted">
              Did you mean{" "}
              <button
                onClick={() => setEmail(`${result.localPart}@${result.suggestion}`)}
                className="font-medium text-foreground underline"
              >
                {result.localPart}@{result.suggestion}
              </button>
              ?
            </p>
          )}

          {result.issues.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted">Issues found</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted">&#8226;</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Validation runs entirely in your browser \u2014 the email address you enter is never sent to a server. This
        checks syntax only; it does not verify the mailbox actually exists or accepts mail.
      </p>
    </div>
  );
}
