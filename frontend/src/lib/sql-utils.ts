export const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
  "CREATE", "TABLE", "ALTER", "DROP", "TRUNCATE", "DATABASE", "SCHEMA", "INDEX", "VIEW",
  "JOIN", "INNER", "OUTER", "LEFT", "RIGHT", "FULL", "CROSS", "ON", "AS", "USING",
  "GROUP", "BY", "ORDER", "HAVING", "LIMIT", "OFFSET", "DISTINCT", "ALL", "UNION",
  "INTERSECT", "EXCEPT", "MINUS", "AND", "OR", "NOT", "IN", "IS", "NULL", "LIKE",
  "BETWEEN", "EXISTS", "ANY", "SOME", "CASE", "WHEN", "THEN", "ELSE", "END",
  "ASC", "DESC", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "UNIQUE", "CHECK",
  "DEFAULT", "CONSTRAINT", "CASCADE", "RESTRICT", "AUTO_INCREMENT", "IDENTITY",
  "INT", "INTEGER", "BIGINT", "SMALLINT", "TINYINT", "DECIMAL", "NUMERIC", "FLOAT",
  "DOUBLE", "REAL", "VARCHAR", "CHAR", "TEXT", "BLOB", "BOOLEAN", "BOOL", "DATE",
  "DATETIME", "TIMESTAMP", "TIME", "YEAR", "JSON", "UUID", "SERIAL",
  "BEGIN", "COMMIT", "ROLLBACK", "TRANSACTION", "SAVEPOINT", "GRANT", "REVOKE",
  "WITH", "RECURSIVE", "OVER", "PARTITION", "WINDOW", "FILTER", "RETURNING",
  "IF", "COLUMN", "COLUMNS", "ADD", "MODIFY", "RENAME", "TO", "COUNT", "SUM",
  "AVG", "MIN", "MAX", "COALESCE", "CAST", "CONVERT", "EXPLAIN", "ANALYZE",
] as const;

interface SqlSegment {
  type: "code" | "string" | "comment";
  text: string;
}

export function splitSqlSegments(sql: string): SqlSegment[] {
  const segments: SqlSegment[] = [];
  let buffer = "";
  let i = 0;
  const len = sql.length;

  const flushCode = () => {
    if (buffer) {
      segments.push({ type: "code", text: buffer });
      buffer = "";
    }
  };

  while (i < len) {
    const two = sql.slice(i, i + 2);

    if (two === "--") {
      flushCode();
      let j = i;
      while (j < len && sql[j] !== "\n") j++;
      segments.push({ type: "comment", text: sql.slice(i, j) });
      i = j;
      continue;
    }

    if (two === "/*") {
      flushCode();
      let j = sql.indexOf("*/", i + 2);
      j = j === -1 ? len : j + 2;
      segments.push({ type: "comment", text: sql.slice(i, j) });
      i = j;
      continue;
    }

    const ch = sql[i];
    if (ch === "'" || ch === '"' || ch === "`") {
      flushCode();
      let j = i + 1;
      while (j < len) {
        if (sql[j] === ch) {
          if (sql[j + 1] === ch) {
            j += 2;
            continue;
          }
          j += 1;
          break;
        }
        j += 1;
      }
      segments.push({ type: "string", text: sql.slice(i, j) });
      i = j;
      continue;
    }

    buffer += ch;
    i += 1;
  }

  flushCode();
  return segments;
}

export function convertKeywordCase(sql: string, targetCase: "upper" | "lower"): string {
  const keywordSet = new Set<string>(SQL_KEYWORDS);
  return splitSqlSegments(sql)
    .map((seg) => {
      if (seg.type !== "code") return seg.text;
      return seg.text.replace(/[A-Za-z_][A-Za-z0-9_]*/g, (word) => {
        if (!keywordSet.has(word.toUpperCase())) return word;
        return targetCase === "upper" ? word.toUpperCase() : word.toLowerCase();
      });
    })
    .join("");
}

export function minifySql(sql: string): string {
  const segments = splitSqlSegments(sql).filter((seg) => seg.type !== "comment");
  const joined = segments
    .map((seg) => {
      if (seg.type === "string") return seg.text;
      return seg.text.replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ").replace(/\s*\(\s*/g, "(").replace(/\s*\)\s*/g, ")");
    })
    .join("");
  return joined.replace(/\s+/g, " ").trim();
}

function splitTopLevelTuples(text: string): string[] {
  const tuples: string[] = [];
  let depth = 0;
  let current = "";
  let inString: string | null = null;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      current += ch;
      if (ch === inString) {
        if (text[i + 1] === inString) {
          current += text[++i];
          continue;
        }
        inString = null;
      }
      continue;
    }

    if (ch === "'" || ch === '"') {
      inString = ch;
      current += ch;
      continue;
    }

    if (ch === "(") {
      depth += 1;
      if (depth === 1) {
        current = "";
        continue;
      }
      current += ch;
      continue;
    }

    if (ch === ")") {
      depth -= 1;
      if (depth === 0) {
        tuples.push(current);
        current = "";
        continue;
      }
      current += ch;
      continue;
    }

    if (depth >= 1) current += ch;
  }

  return tuples;
}

function splitTopLevelValues(tuple: string): string[] {
  const values: string[] = [];
  let current = "";
  let inString: string | null = null;

  for (let i = 0; i < tuple.length; i++) {
    const ch = tuple[i];

    if (inString) {
      current += ch;
      if (ch === inString) {
        if (tuple[i + 1] === inString) {
          current += tuple[++i];
          continue;
        }
        inString = null;
      }
      continue;
    }

    if (ch === "'" || ch === '"') {
      inString = ch;
      current += ch;
      continue;
    }

    if (ch === ",") {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += ch;
  }

  values.push(current.trim());
  return values;
}

function parseSqlLiteral(raw: string): unknown {
  const v = raw.trim();
  if (/^null$/i.test(v)) return null;
  if (/^true$/i.test(v)) return true;
  if (/^false$/i.test(v)) return false;
  if (/^'([\s\S]*)'$/.test(v)) return v.slice(1, -1).replace(/''/g, "'");
  if (/^"([\s\S]*)"$/.test(v)) return v.slice(1, -1).replace(/""/g, '"');
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export interface SqlToJsonResult {
  rows: Record<string, unknown>[];
  tables: string[];
  error?: string;
}

export function sqlInsertsToJson(sql: string): SqlToJsonResult {
  const regex = /insert\s+into\s+[`"[]?([\w.]+)[`"\]]?\s*\(([^)]+)\)\s*values\s*([\s\S]*?);/gi;
  const rows: Record<string, unknown>[] = [];
  const tables: string[] = [];
  let match: RegExpExecArray | null;
  let found = false;

  while ((match = regex.exec(sql))) {
    found = true;
    const table = match[1];
    if (!tables.includes(table)) tables.push(table);

    const columns = match[2].split(",").map((c) => c.trim().replace(/^[`"[]|[`"\]]$/g, ""));
    const tuples = splitTopLevelTuples(match[3]);

    for (const tuple of tuples) {
      const values = splitTopLevelValues(tuple);
      const obj: Record<string, unknown> = {};
      columns.forEach((col, i) => {
        obj[col] = parseSqlLiteral(values[i] ?? "");
      });
      rows.push(obj);
    }
  }

  if (!found) {
    return { rows: [], tables: [], error: "No INSERT INTO ... VALUES statements found in the input." };
  }

  return { rows, tables };
}

function sqlEscapeLiteral(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "object") return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
  return `'${String(value).replace(/'/g, "''")}'`;
}

export function jsonToSqlInserts(data: unknown, tableName: string): string {
  const rows = Array.isArray(data) ? data : [data];
  const objRows = rows.filter((r) => r !== null && typeof r === "object" && !Array.isArray(r)) as Record<
    string,
    unknown
  >[];
  if (objRows.length === 0) return "";

  const columns: string[] = [];
  for (const row of objRows) {
    for (const key of Object.keys(row)) {
      if (!columns.includes(key)) columns.push(key);
    }
  }

  const table = tableName.trim() || "table_name";
  const columnList = columns.map((c) => `\`${c}\``).join(", ");

  return objRows
    .map((row) => {
      const values = columns.map((c) => sqlEscapeLiteral(row[c] ?? null)).join(", ");
      return `INSERT INTO \`${table}\` (${columnList}) VALUES (${values});`;
    })
    .join("\n");
}
