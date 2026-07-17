"use client";

import { useMemo, useState } from "react";
import { checkPasswordStrength } from "@/lib/password-utils";

const SCORE_LABELS = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

export function PasswordStrengthTool() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const result = useMemo(() => checkPasswordStrength(password), [password]);

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Password</label>
        <div className="flex items-center gap-2">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to check its strength..."
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-2 font-mono text-sm outline-none"
          />
          <button onClick={() => setShow((s) => !s)} className="btn btn-secondary h-9 shrink-0 px-3 text-xs">
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mt-4">
          <div className="flex h-2 w-full gap-1 overflow-hidden rounded-full bg-border">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex-1 rounded-full ${i <= result.score && password ? "bg-foreground" : "bg-border"}`} />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-medium">{password ? SCORE_LABELS[result.score] : "No password entered"}</span>
            {password && <span className="text-xs text-muted">~{result.entropyBits} bits of entropy</span>}
          </div>
        </div>

        {password && (
          <p className="mt-2 text-xs text-muted">
            Estimated time to crack (offline attack, 10 billion guesses/sec): <span className="font-medium text-foreground">{result.crackTimeDisplay}</span>
          </p>
        )}
      </div>

      <div className="mt-4 card px-4 py-3">
        <p className="text-xs font-medium text-muted">Feedback</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {result.feedback.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-muted">&#8226;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-muted">
        Your password is analyzed entirely in your browser using JavaScript \u2014 it is never sent to a server or
        stored anywhere.
      </p>
    </div>
  );
}
