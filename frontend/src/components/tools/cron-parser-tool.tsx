"use client";

import { useMemo, useState } from "react";
import { CRON_PRESETS, describeCron, getNextRuns, validateCron } from "@/lib/cron-utils";

export function CronParserTool() {
  const [expression, setExpression] = useState("*/15 9-17 * * 1-5");

  const validation = useMemo(() => validateCron(expression), [expression]);
  const description = useMemo(() => (validation.valid ? describeCron(expression) : null), [expression, validation.valid]);
  const nextRuns = useMemo(() => (validation.valid ? getNextRuns(expression, 5) : []), [expression, validation.valid]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {CRON_PRESETS.map((p) => (
          <button key={p.expression} onClick={() => setExpression(p.expression)} className="btn btn-secondary h-8 px-3 text-xs">
            {p.label}
          </button>
        ))}
      </div>

      <input
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="* * * * *"
        spellCheck={false}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 font-mono text-lg outline-none focus:border-foreground"
      />

      {!validation.valid ? (
        <p className="mt-3 text-sm text-muted">{validation.error}</p>
      ) : (
        <>
          <p className="mt-3 text-sm">{description}</p>

          <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
            {(["minute", "hour", "dayOfMonth", "month", "dayOfWeek"] as const).map((key) => (
              <div key={key} className="card p-2">
                <p className="text-muted">{key}</p>
                <p className="mt-1 font-mono font-medium">{validation.fields?.[key]}</p>
              </div>
            ))}
          </div>

          {nextRuns.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-muted">Next 5 run times</p>
              <ul className="space-y-1 font-mono text-sm">
                {nextRuns.map((run, i) => (
                  <li key={i} className="card px-3 py-2">
                    {run.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {validation.valid && nextRuns.length === 0 && (
            <p className="mt-4 text-xs text-muted">No matching run times found in the next ~4 years.</p>
          )}
        </>
      )}
    </div>
  );
}
