"use client";

import { useMemo, useState } from "react";
import { isLeapYear, leapYearsInRange } from "@/lib/datetime-utils";

export function LeapYearCheckerTool() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [rangeStart, setRangeStart] = useState(String(new Date().getFullYear()));
  const [rangeEnd, setRangeEnd] = useState(String(new Date().getFullYear() + 20));

  const yearNum = parseInt(year, 10);
  const isValid = year.trim() !== "" && !Number.isNaN(yearNum);
  const leap = isValid ? isLeapYear(yearNum) : null;

  const reason = useMemo(() => {
    if (!isValid) return null;
    if (yearNum % 400 === 0) return `${yearNum} is divisible by 400, so it is a leap year.`;
    if (yearNum % 100 === 0) return `${yearNum} is divisible by 100 but not by 400, so it is NOT a leap year.`;
    if (yearNum % 4 === 0) return `${yearNum} is divisible by 4 (and not by 100), so it is a leap year.`;
    return `${yearNum} is not divisible by 4, so it is NOT a leap year.`;
  }, [yearNum, isValid]);

  const rangeYears = useMemo(() => {
    const start = parseInt(rangeStart, 10);
    const end = parseInt(rangeEnd, 10);
    if (Number.isNaN(start) || Number.isNaN(end) || end < start || end - start > 1000) return null;
    return leapYearsInRange(start, end);
  }, [rangeStart, rangeEnd]);

  return (
    <div>
      <label className="mb-4 block text-xs">
        <span className="mb-1 block text-muted">Year</span>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-40 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
        />
      </label>

      {isValid && (
        <div className={`card p-4 ${leap ? "border-foreground" : ""}`}>
          <p className="font-mono text-2xl font-semibold">
            {yearNum} is {leap ? "a leap year" : "not a leap year"}
          </p>
          <p className="mt-2 text-sm text-muted">{reason}</p>
          <p className="mt-2 text-xs text-muted">{leap ? "February has 29 days." : "February has 28 days."}</p>
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 text-xs text-muted">List leap years in a range</p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="block text-xs">
            <span className="mb-1 block text-muted">From</span>
            <input
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">To</span>
            <input
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </label>
        </div>

        {rangeYears === null ? (
          <p className="mt-3 text-xs text-muted">Enter a valid range of up to 1000 years.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {rangeYears.map((y) => (
              <span key={y} className="badge font-mono">
                {y}
              </span>
            ))}
            {rangeYears.length === 0 && <p className="text-xs text-muted">No leap years in this range.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
