"use client";

import { useMemo, useState } from "react";
import { dateDifference } from "@/lib/datetime-utils";
import { Stat, StatGrid } from "@/components/tools/shared/stat-grid";

function todayInputValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [asOfDate, setAsOfDate] = useState(todayInputValue());

  const age = useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    const birth = new Date(birthDate);
    const asOf = new Date(asOfDate);
    if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime()) || birth > asOf) return null;
    return dateDifference(birth, asOf);
  }, [birthDate, asOfDate]);

  const nextBirthday = useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    const birth = new Date(birthDate);
    const asOf = new Date(asOfDate);
    if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) return null;
    let next = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
    if (next < asOf) next = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const daysUntil = Math.ceil((next.getTime() - asOf.getTime()) / 86_400_000);
    return { date: next, daysUntil };
  }, [birthDate, asOfDate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Birth date</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">As of date</span>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
      </div>

      {age ? (
        <div className="mt-4">
          <div className="card mb-4 p-4">
            <p className="text-xs text-muted">Age</p>
            <p className="mt-1 font-mono text-3xl font-semibold">
              {age.years} years, {age.months} months, {age.days} days
            </p>
          </div>
          <StatGrid>
            <Stat label="Total days" value={age.totalDays.toLocaleString()} />
            <Stat label="Total weeks" value={age.totalWeeks.toLocaleString()} />
            <Stat label="Total months" value={(age.years * 12 + age.months).toLocaleString()} />
            <Stat label="Next birthday in" value={nextBirthday ? `${nextBirthday.daysUntil} days` : "—"} />
          </StatGrid>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted">Enter a birth date on or before the &quot;as of&quot; date.</p>
      )}
    </div>
  );
}
