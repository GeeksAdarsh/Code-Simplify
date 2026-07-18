"use client";

import { useMemo, useState } from "react";
import { awsCronToUnixCron, unixCronToAwsCron } from "@/lib/aws-utils";

type Direction = "unixToAws" | "awsToUnix";

export function AwsCronConverterTool() {
  const [direction, setDirection] = useState<Direction>("unixToAws");
  const [input, setInput] = useState("0 12 * * *");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return direction === "unixToAws" ? unixCronToAwsCron(input) : awsCronToUnixCron(input);
  }, [input, direction]);

  function swap() {
    const next = direction === "unixToAws" ? "awsToUnix" : "unixToAws";
    setDirection(next);
    setInput(result?.result ? result.result : next === "unixToAws" ? "0 12 * * *" : "cron(0 12 * * ? *)");
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className={`text-sm ${direction === "unixToAws" ? "font-medium" : "text-muted"}`}>Unix cron</span>
        <button onClick={swap} className="btn btn-secondary h-8 px-3 text-xs">
          &#8646; Swap
        </button>
        <span className={`text-sm ${direction === "awsToUnix" ? "font-medium" : "text-muted"}`}>AWS cron</span>
      </div>

      <label className="block text-xs">
        <span className="mb-1 block text-muted">{direction === "unixToAws" ? "Unix / cron expression (5 fields)" : "AWS cron expression (6 fields)"}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder={direction === "unixToAws" ? "0 12 * * *" : "cron(0 12 * * ? *)"}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-foreground"
        />
      </label>

      <div className="mt-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Enter a cron expression above to convert it.</div>}
        {result?.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Invalid</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}
        {result?.result && (
          <div className="card flex items-center justify-between gap-4 px-4 py-3">
            <code className="font-mono text-sm">{result.result}</code>
            <button
              onClick={() => navigator.clipboard.writeText(result.result!)}
              className="btn btn-secondary h-8 px-3 text-xs"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 text-xs text-muted sm:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <p className="font-medium text-foreground">Unix cron fields</p>
          <p className="mt-1 font-mono">minute hour day-of-month month day-of-week</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="font-medium text-foreground">AWS cron fields</p>
          <p className="mt-1 font-mono">cron(minute hour day-of-month month day-of-week year)</p>
        </div>
      </div>
    </div>
  );
}
