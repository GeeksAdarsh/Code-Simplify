export interface CsvParseResult {
  headers: string[];
  rows: string[][];
  error?: string;
}

/** RFC 4180-style CSV parser: handles quoted fields, embedded delimiters/newlines, and escaped quotes ("" inside a quoted field). */
export function parseCsv(input: string, delimiter = ","): CsvParseResult {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = input.length;

  while (i < len) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === delimiter) {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }
    if (char === "\r") {
      i += 1;
      continue;
    }
    if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += 1;
      continue;
    }
    field += char;
    i += 1;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (inQuotes) {
    return { headers: [], rows: [], error: "Unterminated quoted field \u2014 check for a missing closing quote." };
  }

  const nonEmptyRows = rows.filter((r) => !(r.length === 1 && r[0] === ""));
  const [headers, ...dataRows] = nonEmptyRows;
  return { headers: headers ?? [], rows: dataRows };
}

export interface CsvToObjectsResult {
  data?: Record<string, string>[];
  headers?: string[];
  error?: string;
}

export function csvToObjects(input: string, delimiter = ","): CsvToObjectsResult {
  const parsed = parseCsv(input, delimiter);
  if (parsed.error) return { error: parsed.error };
  if (parsed.headers.length === 0) return { data: [], headers: [] };

  const headers = parsed.headers.map((h, i) => h.trim() || `column${i + 1}`);
  const data = parsed.rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });

  return { data, headers };
}

function needsQuoting(value: string, delimiter: string): boolean {
  return /["\n\r]/.test(value) || value.includes(delimiter);
}

export function csvEscapeField(value: string, delimiter: string): string {
  if (needsQuoting(value, delimiter)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function stringifyCsv(headers: string[], rows: string[][], delimiter = ","): string {
  const lines = [headers, ...rows].map((r) => r.map((f) => csvEscapeField(f ?? "", delimiter)).join(delimiter));
  return lines.join("\r\n");
}

export function objectsToCsv(objects: Record<string, unknown>[], delimiter = ","): string {
  const headers: string[] = [];
  for (const obj of objects) {
    for (const key of Object.keys(obj)) {
      if (!headers.includes(key)) headers.push(key);
    }
  }
  const rows = objects.map((obj) => headers.map((h) => (obj[h] === undefined || obj[h] === null ? "" : String(obj[h]))));
  return stringifyCsv(headers, rows, delimiter);
}
