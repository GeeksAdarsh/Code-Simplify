function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isValidTagName(name: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_.-]*$/.test(name);
}

function sanitizeTagName(name: string): string {
  return isValidTagName(name) ? name : "item";
}

function valueToXml(key: string, value: unknown, indent: string): string {
  const tag = sanitizeTagName(key);

  if (Array.isArray(value)) {
    return value.map((item) => valueToXml(key, item, indent)).join("\n");
  }

  if (value !== null && typeof value === "object") {
    const children = Object.entries(value as Record<string, unknown>)
      .map(([childKey, childValue]) => valueToXml(childKey, childValue, indent + "  "))
      .join("\n");
    return `${indent}<${tag}>\n${children}\n${indent}</${tag}>`;
  }

  const text = value === null || value === undefined ? "" : escapeXml(String(value));
  return `${indent}<${tag}>${text}</${tag}>`;
}

export function jsonToXml(data: unknown, rootName = "root"): string {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n';

  if (Array.isArray(data)) {
    const items = data.map((item) => valueToXml("item", item, "  ")).join("\n");
    return `${header}<${rootName}>\n${items}\n</${rootName}>`;
  }

  if (data !== null && typeof data === "object") {
    const children = Object.entries(data as Record<string, unknown>)
      .map(([key, value]) => valueToXml(key, value, "  "))
      .join("\n");
    return `${header}<${rootName}>\n${children}\n</${rootName}>`;
  }

  return `${header}<${rootName}>${escapeXml(String(data))}</${rootName}>`;
}

function flattenForCsv(value: unknown, prefix: string, out: Record<string, unknown>) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) {
      out[prefix] = "";
      return;
    }
    for (const [key, val] of entries) {
      flattenForCsv(val, prefix ? `${prefix}.${key}` : key, out);
    }
    return;
  }

  if (Array.isArray(value)) {
    out[prefix] = JSON.stringify(value);
    return;
  }

  out[prefix] = value;
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToCsv(data: unknown): string {
  const rows: unknown[] = Array.isArray(data) ? data : [data];
  const flatRows = rows.map((row) => {
    const flat: Record<string, unknown> = {};
    flattenForCsv(row, "", flat);
    return flat;
  });

  const headers: string[] = [];
  for (const row of flatRows) {
    for (const key of Object.keys(row)) {
      if (!headers.includes(key)) headers.push(key);
    }
  }

  const headerLine = headers.map(csvEscape).join(",");
  const lines = flatRows.map((row) => headers.map((h) => csvEscape(row[h])).join(","));

  return [headerLine, ...lines].join("\n");
}
