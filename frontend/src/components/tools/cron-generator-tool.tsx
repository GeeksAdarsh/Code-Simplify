"use client";

import { useMemo, useState } from "react";
import { CRON_PRESETS, describeCron, getNextRuns } from "@/lib/cron-utils";

const FIELD_DEFS = [
  { key: "minute", label: "Minute", placeholder: "*", hint: "0-59" },
  { key: "hour", label: "Hour", placeholder: "*", hint: "0-23" },
  { key: "dayOfMonth", label: "Day of month", placeholder: "*", hint: "1-31" },
  { key: "month", label: "Month", placeholder: "*", hint: "1-12" },
  { key: "dayOfWeek", label: "Day of week", placeholder: "*", hint: "0-6 (Sun-Sat)" },
] as const;

export function CronGeneratorTool() {
  const [fields, setFields] = useState({ minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "*" });

  const expression = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
  const description = useMemo(() => describeCron(expression), [expression]);
  const nextRuns = useMemo(() => getNextRuns(expression, 5), [expression]);
  const [copied, setCopied] = useState(false);

  function applyPreset(exp: string) {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = exp.split(" ");
    setFields({ minute, hour, dayOfMonth, month, dayOfWeek });
  }

  function copy() {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {CRON_PRESETS.map((p) => (
          <button key={p.expression} onClick={() => applyPreset(p.expression)} className="btn btn-secondary h-8 px-3 text-xs">
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {FIELD_DEFS.map((def) => (
          <label key={def.key} className="block text-xs">
            <span className="mb-1 block text-muted">{def.label}</span>
            <input
              value={fields[def.key]}
              onChange={(e) => setFields((prev) => ({ ...prev, [def.key]: e.target.value || "*" }))}
              placeholder={def.placeholder}
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
            <span className="mt-1 block text-muted">{def.hint}</span>
          </label>
        ))}
      </div>

      <div className="card mt-4 flex items-center justify-between p-4">
        <p className="font-mono text-xl font-semibold">{expression}</p>
        <button onClick={copy} className="btn btn-secondary h-8 px-3 text-xs">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="mt-3 text-sm">{description}</p>

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
    </div>
  );
}
