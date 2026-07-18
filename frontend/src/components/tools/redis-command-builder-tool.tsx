"use client";

import { useMemo, useState } from "react";
import { buildRedisCommand, REDIS_COMMANDS } from "@/lib/redis-utils";

export function RedisCommandBuilderTool() {
  const [commandName, setCommandName] = useState(REDIS_COMMANDS[0].command);
  const [values, setValues] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const spec = REDIS_COMMANDS.find((c) => c.command === commandName) ?? REDIS_COMMANDS[0];

  const command = useMemo(() => buildRedisCommand(spec, values), [spec, values]);

  function selectCommand(name: string) {
    setCommandName(name);
    setValues([]);
  }

  function setValue(index: number, value: string) {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function copy() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-0 rounded-xl border border-border sm:grid-cols-2">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:border-b-0 sm:border-r">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Command</span>
          <select
            value={commandName}
            onChange={(e) => selectCommand(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          >
            {REDIS_COMMANDS.map((c) => (
              <option key={c.command} value={c.command}>
                {c.command}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-muted">{spec.description}</p>

        {spec.args.map((arg, i) => (
          <label key={arg.name} className="block text-xs">
            <span className="mb-1 block text-muted">
              {arg.name}
              {arg.optional && " (optional)"}
            </span>
            <input
              value={values[i] ?? ""}
              onChange={(e) => setValue(i, e.target.value)}
              placeholder={arg.placeholder}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </label>
        ))}
        {spec.args.length === 0 && <p className="text-xs text-muted">This command takes no arguments.</p>}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Command</span>
          <button onClick={copy} className="font-medium text-foreground">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="break-all p-3 font-mono text-sm">{command}</p>
      </div>
    </div>
  );
}
