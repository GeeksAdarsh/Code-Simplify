"use client";

import { useMemo, useState } from "react";
import { COMMON_TIMEZONES, formatInTimeZone, getTimeZoneOffsetLabel } from "@/lib/datetime-utils";

function nowInputValue(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export function TimezoneConverterTool() {
  const [dateInput, setDateInput] = useState(nowInputValue());
  const [sourceZone, setSourceZone] = useState("UTC");
  const [selectedZones, setSelectedZones] = useState<string[]>(["America/New_York", "Europe/London", "Asia/Kolkata", "Asia/Tokyo"]);

  const sourceDate = useMemo(() => {
    if (!dateInput) return null;
    const localGuess = new Date(dateInput);
    if (Number.isNaN(localGuess.getTime())) return null;

    if (sourceZone === "UTC") return new Date(dateInput + "Z");

    const offsetLabel = getTimeZoneOffsetLabel(localGuess, sourceZone);
    const match = offsetLabel.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return localGuess;
    const offsetHours = Number(match[1]);
    const offsetMinutes = Number(match[2] ?? 0) * (offsetHours < 0 ? -1 : 1);
    const asUtcMs = Date.parse(dateInput + "Z") - (offsetHours * 60 + offsetMinutes) * 60_000;
    return new Date(asUtcMs);
  }, [dateInput, sourceZone]);

  function toggleZone(zone: string) {
    setSelectedZones((prev) => (prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]));
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Date &amp; time</span>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Source time zone</span>
          <select
            value={sourceZone}
            onChange={(e) => setSourceZone(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-2 mt-4 text-xs text-muted">Compare with:</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {COMMON_TIMEZONES.map((tz) => (
          <button
            key={tz}
            onClick={() => toggleZone(tz)}
            className={`rounded-full border px-3 py-1 text-xs ${
              selectedZones.includes(tz) ? "border-foreground bg-foreground text-background" : "border-border text-muted"
            }`}
          >
            {tz}
          </button>
        ))}
      </div>

      {sourceDate && (
        <div className="grid gap-2 sm:grid-cols-2">
          {selectedZones.map((tz) => (
            <div key={tz} className="card flex items-center justify-between p-3">
              <div>
                <p className="text-xs text-muted">{tz}</p>
                <p className="font-mono text-sm font-medium">{formatInTimeZone(sourceDate, tz)}</p>
              </div>
              <span className="text-xs text-muted">{getTimeZoneOffsetLabel(sourceDate, tz)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
