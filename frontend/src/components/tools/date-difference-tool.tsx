"use client";

import { useMemo, useState } from "react";
import { dateDifference } from "@/lib/datetime-utils";
import { Stat, StatGrid } from "@/components/tools/shared/stat-grid";

export function DateDifferenceTool() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2026-07-18");

  const diff = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
    return dateDifference(start, end);
  }, [startDate, endDate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
      </div>

      {diff && (
        <div className="mt-4">
          <div className="card mb-4 p-4">
            <p className="text-xs text-muted">Difference</p>
            <p className="mt-1 font-mono text-2xl font-semibold">
              {diff.years > 0 && `${diff.years}y `}
              {(diff.years > 0 || diff.months > 0) && `${diff.months}m `}
              {diff.days}d {diff.hours}h {diff.minutes}m {diff.seconds}s
            </p>
          </div>
          <StatGrid>
            <Stat label="Total days" value={diff.totalDays.toLocaleString()} />
            <Stat label="Total weeks" value={diff.totalWeeks.toLocaleString()} />
            <Stat label="Total hours" value={diff.totalHours.toLocaleString()} />
            <Stat label="Total minutes" value={diff.totalMinutes.toLocaleString()} />
          </StatGrid>
        </div>
      )}
    </div>
  );
}
