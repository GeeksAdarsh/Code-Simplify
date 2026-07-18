export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const FIELD_RANGES: Record<keyof CronFields, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  dayOfMonth: [1, 31],
  month: [1, 12],
  dayOfWeek: [0, 6],
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function splitCron(expression: string): CronFields | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  return { minute, hour, dayOfMonth, month, dayOfWeek };
}

/** Expands a single cron field (e.g. "*\/5", "1-5", "1,3,5", "*") into the concrete set of matching values. */
export function expandField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();

  for (const part of field.split(",")) {
    const [range, step] = part.split("/");
    const stepNum = step ? parseInt(step, 10) : 1;
    if (Number.isNaN(stepNum) || stepNum <= 0) throw new Error(`Invalid step in "${part}"`);

    let rangeStart = min;
    let rangeEnd = max;

    if (range !== "*") {
      if (range.includes("-")) {
        const [s, e] = range.split("-").map(Number);
        if (Number.isNaN(s) || Number.isNaN(e)) throw new Error(`Invalid range "${range}"`);
        rangeStart = s;
        rangeEnd = e;
      } else {
        const n = Number(range);
        if (Number.isNaN(n)) throw new Error(`Invalid value "${range}"`);
        rangeStart = n;
        rangeEnd = step ? max : n;
      }
    }

    if (rangeStart < min || rangeEnd > max || rangeStart > rangeEnd) {
      throw new Error(`Value out of range in "${part}" (expected ${min}-${max})`);
    }

    for (let v = rangeStart; v <= rangeEnd; v += stepNum) values.add(v);
  }

  return [...values].sort((a, b) => a - b);
}

export interface CronValidationResult {
  valid: boolean;
  error?: string;
  fields?: CronFields;
  expanded?: Record<keyof CronFields, number[]>;
}

export function validateCron(expression: string): CronValidationResult {
  const fields = splitCron(expression);
  if (!fields) return { valid: false, error: "A cron expression must have exactly 5 space-separated fields (minute hour day month weekday)." };

  const expanded: Partial<Record<keyof CronFields, number[]>> = {};
  for (const key of Object.keys(fields) as (keyof CronFields)[]) {
    const [min, max] = FIELD_RANGES[key];
    try {
      expanded[key] = expandField(fields[key], min, max);
    } catch (err) {
      return { valid: false, error: `${key}: ${err instanceof Error ? err.message : "invalid value"}` };
    }
  }

  return { valid: true, fields, expanded: expanded as Record<keyof CronFields, number[]> };
}

function listToPhrase(values: number[], names?: string[]): string {
  const format = (v: number) => names?.[v] ?? String(v);
  if (values.length === 1) return format(values[0]);
  if (values.length === 2) return `${format(values[0])} and ${format(values[1])}`;
  return `${values.slice(0, -1).map(format).join(", ")}, and ${format(values[values.length - 1])}`;
}

export function describeCron(expression: string): string {
  const result = validateCron(expression);
  if (!result.valid || !result.fields || !result.expanded) return result.error ?? "Invalid cron expression";

  const { minute } = result.fields;
  const exp = result.expanded;

  const allMinutes = exp.minute.length === 60;
  const allHours = exp.hour.length === 24;
  const allDom = exp.dayOfMonth.length === 31;
  const allMonths = exp.month.length === 12;
  const allDow = exp.dayOfWeek.length === 7;

  let timePhrase: string;
  if (allMinutes && allHours) {
    timePhrase = "Every minute";
  } else if (allMinutes) {
    timePhrase = `Every minute during hour(s) ${listToPhrase(exp.hour)}`;
  } else if (minute.includes("/") && allHours) {
    timePhrase = `Every ${minute.split("/")[1]} minutes`;
  } else if (allHours) {
    timePhrase = `At minute(s) ${listToPhrase(exp.minute)} of every hour`;
  } else {
    const times = exp.hour.flatMap((h) => exp.minute.map((m) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`));
    timePhrase = times.length > 6 ? `At ${times.length} specific times` : `At ${times.join(", ")}`;
  }

  const parts: string[] = [timePhrase];

  if (!allDom) parts.push(`on day(s) ${listToPhrase(exp.dayOfMonth)} of the month`);
  if (!allMonths) parts.push(`in ${listToPhrase(exp.month, ["", ...MONTH_NAMES])}`);
  if (!allDow) parts.push(`on ${listToPhrase(exp.dayOfWeek, DAY_NAMES)}`);

  return parts.join(", ") + ".";
}

export interface CronMatchTest {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

function matches(date: Date, exp: CronMatchTest): boolean {
  return (
    exp.minute.includes(date.getMinutes()) &&
    exp.hour.includes(date.getHours()) &&
    exp.dayOfMonth.includes(date.getDate()) &&
    exp.month.includes(date.getMonth() + 1) &&
    exp.dayOfWeek.includes(date.getDay())
  );
}

/** Brute-force search (minute granularity) for the next N times a cron expression matches, capped to avoid runaway loops. */
export function getNextRuns(expression: string, count: number, from: Date = new Date(), maxIterations = 4 * 366 * 24 * 60): Date[] {
  const result = validateCron(expression);
  if (!result.valid || !result.expanded) return [];

  const runs: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let iterations = 0;
  while (runs.length < count && iterations < maxIterations) {
    if (matches(cursor, result.expanded)) runs.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
    iterations++;
  }

  return runs;
}

export const CRON_PRESETS: { label: string; expression: string }[] = [
  { label: "Every minute", expression: "* * * * *" },
  { label: "Every 5 minutes", expression: "*/5 * * * *" },
  { label: "Every 15 minutes", expression: "*/15 * * * *" },
  { label: "Every hour", expression: "0 * * * *" },
  { label: "Every day at midnight", expression: "0 0 * * *" },
  { label: "Every day at 9am", expression: "0 9 * * *" },
  { label: "Every Monday at 9am", expression: "0 9 * * 1" },
  { label: "Every weekday at 9am", expression: "0 9 * * 1-5" },
  { label: "First day of every month", expression: "0 0 1 * *" },
  { label: "Every 6 hours", expression: "0 */6 * * *" },
];
