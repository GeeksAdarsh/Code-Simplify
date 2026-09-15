"use client";

import { useEffect, useState } from "react";

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function UnixTimestampTool() {
  const [now, setNow] = useState<number | null>(null);
  const [timestampInput, setTimestampInput] = useState("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  function convertTimestampToDate(): { local: string; utc: string; iso: string } | null {
    const num = Number(timestampInput.trim());
    if (!timestampInput.trim() || Number.isNaN(num)) return null;
    const ms = unit === "seconds" ? num * 1000 : num;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return null;
    return { local: date.toLocaleString(), utc: date.toUTCString(), iso: date.toISOString() };
  }

  const converted = convertTimestampToDate();

  function convertDateToTimestamp(): number | null {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return unit === "seconds" ? Math.floor(date.getTime() / 1000) : date.getTime();
  }

  const dateToTimestamp = convertDateToTimestamp();

  function useCurrentDate() {
    if (now !== null) setDateInput(toLocalInputValue(new Date(now)));
  }

  function useCurrentTimestamp() {
    if (now !== null) setTimestampInput(String(unit === "seconds" ? Math.floor(now / 1000) : now));
  }

  return (
    <div>
      <div className="card mb-4 flex flex-wrap items-center justify-between gap-2 p-4">
        <div>
          <p className="text-xs text-muted">Current Unix timestamp</p>
          <p className="mt-1 font-mono text-2xl font-semibold">
            {now === null ? "—" : unit === "seconds" ? Math.floor(now / 1000) : now}
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-border p-0.5 text-xs">
          <button onClick={() => setUnit("seconds")} className={`rounded-md px-3 py-1.5 ${unit === "seconds" ? "bg-foreground text-background" : "text-muted"}`}>
            Seconds
          </button>
          <button onClick={() => setUnit("milliseconds")} className={`rounded-md px-3 py-1.5 ${unit === "milliseconds" ? "bg-foreground text-background" : "text-muted"}`}>
            Milliseconds
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-4">
          <p className="mb-2 text-xs text-muted">Timestamp → Date</p>
          <div className="flex gap-2">
            <input
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder={unit === "seconds" ? "e.g. 1751328000" : "e.g. 1751328000000"}
              spellCheck={false}
              className="flex-1 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
            <button onClick={useCurrentTimestamp} className="btn btn-secondary h-9 shrink-0 px-3 text-xs">
              Now
            </button>
          </div>
          {timestampInput.trim() && !converted && <p className="mt-2 text-xs text-muted">Enter a valid numeric timestamp.</p>}
          {converted && (
            <div className="mt-3 space-y-1 font-mono text-sm">
              <p>Local: {converted.local}</p>
              <p>UTC: {converted.utc}</p>
              <p className="text-muted">ISO 8601: {converted.iso}</p>
            </div>
          )}
        </div>

        <div className="card p-4">
          <p className="mb-2 text-xs text-muted">Date → Timestamp</p>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              step={1}
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="flex-1 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
            />
            <button onClick={useCurrentDate} className="btn btn-secondary h-9 shrink-0 px-3 text-xs">
              Now
            </button>
          </div>
          {dateInput && dateToTimestamp === null && <p className="mt-2 text-xs text-muted">Enter a valid date.</p>}
          {dateToTimestamp !== null && (
            <p className="mt-3 font-mono text-2xl font-semibold">{dateToTimestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
}
