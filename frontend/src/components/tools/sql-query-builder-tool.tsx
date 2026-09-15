"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";

interface WhereCondition {
  id: number;
  connector: "AND" | "OR";
  column: string;
  operator: string;
  value: string;
}

const OPERATORS = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN", "IS NULL", "IS NOT NULL"];

let nextId = 1;

function newCondition(): WhereCondition {
  return { id: nextId++, connector: "AND", column: "", operator: "=", value: "" };
}

function quoteIfNeeded(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return trimmed;
  if (/^(true|false|null)$/i.test(trimmed)) return trimmed.toUpperCase();
  return `'${trimmed.replace(/'/g, "''")}'`;
}

export function SqlQueryBuilderTool() {
  const [table, setTable] = useState("users");
  const [columns, setColumns] = useState("id, name, email");
  const [distinct, setDistinct] = useState(false);
  const [conditions, setConditions] = useState<WhereCondition[]>([
    { id: 0, connector: "AND", column: "active", operator: "=", value: "true" },
  ]);
  const [orderColumn, setOrderColumn] = useState("id");
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("ASC");
  const [limit, setLimit] = useState("10");

  const sql = useMemo(() => {
    const cols = columns.trim() || "*";
    let query = `SELECT ${distinct ? "DISTINCT " : ""}${cols} FROM ${table.trim() || "table_name"}`;

    const validConditions = conditions.filter((c) => c.column.trim());
    if (validConditions.length > 0) {
      const clauses = validConditions.map((c, i) => {
        const prefix = i === 0 ? "" : ` ${c.connector} `;
        if (c.operator === "IS NULL" || c.operator === "IS NOT NULL") {
          return `${prefix}${c.column.trim()} ${c.operator}`;
        }
        if (c.operator === "IN") {
          const items = c.value
            .split(",")
            .map((v) => quoteIfNeeded(v))
            .filter(Boolean)
            .join(", ");
          return `${prefix}${c.column.trim()} IN (${items})`;
        }
        return `${prefix}${c.column.trim()} ${c.operator} ${quoteIfNeeded(c.value)}`;
      });
      query += ` WHERE ${clauses.join("")}`;
    }

    if (orderColumn.trim()) {
      query += ` ORDER BY ${orderColumn.trim()} ${orderDirection}`;
    }

    if (limit.trim() && /^\d+$/.test(limit.trim())) {
      query += ` LIMIT ${limit.trim()}`;
    }

    query += ";";

    try {
      return format(query, { language: "sql", keywordCase: "upper" });
    } catch {
      return query;
    }
  }, [table, columns, distinct, conditions, orderColumn, orderDirection, limit]);

  const [copied, setCopied] = useState(false);

  function addCondition() {
    setConditions((prev) => [...prev, newCondition()]);
  }

  function removeCondition(id: number) {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  }

  function updateCondition(id: number, patch: Partial<WhereCondition>) {
    setConditions((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function handleCopy() {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    const blob = new Blob([sql], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query.sql";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="card space-y-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Table</label>
          <input
            value={table}
            onChange={(e) => setTable(e.target.value)}
            placeholder="users"
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Columns (comma-separated, or *)</label>
          <input
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            placeholder="id, name, email"
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>

        <label className="flex items-center gap-1.5 text-xs text-muted">
          <input type="checkbox" checked={distinct} onChange={(e) => setDistinct(e.target.checked)} className="accent-foreground" />
          DISTINCT
        </label>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-muted">WHERE conditions</label>
            <button onClick={addCondition} className="text-xs font-medium text-foreground">
              + Add condition
            </button>
          </div>
          <div className="space-y-2">
            {conditions.map((c, i) => (
              <div key={c.id} className="flex flex-wrap items-center gap-1.5">
                {i > 0 && (
                  <select
                    value={c.connector}
                    onChange={(e) => updateCondition(c.id, { connector: e.target.value as "AND" | "OR" })}
                    className="rounded border border-border bg-background px-1 py-1 text-xs"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}
                <input
                  value={c.column}
                  onChange={(e) => updateCondition(c.id, { column: e.target.value })}
                  placeholder="column"
                  className="w-24 rounded border border-border bg-background px-2 py-1 text-xs outline-none"
                />
                <select
                  value={c.operator}
                  onChange={(e) => updateCondition(c.id, { operator: e.target.value })}
                  className="rounded border border-border bg-background px-1 py-1 text-xs"
                >
                  {OPERATORS.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
                {c.operator !== "IS NULL" && c.operator !== "IS NOT NULL" && (
                  <input
                    value={c.value}
                    onChange={(e) => updateCondition(c.id, { value: e.target.value })}
                    placeholder="value"
                    className="w-24 flex-1 rounded border border-border bg-background px-2 py-1 text-xs outline-none"
                  />
                )}
                <button onClick={() => removeCondition(c.id)} className="text-xs text-muted hover:text-foreground">
                  &#10005;
                </button>
              </div>
            ))}
            {conditions.length === 0 && <p className="text-xs text-muted">No conditions — all rows will be selected.</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Order by</label>
            <input
              value={orderColumn}
              onChange={(e) => setOrderColumn(e.target.value)}
              placeholder="column"
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Direction</label>
            <select
              value={orderDirection}
              onChange={(e) => setOrderDirection(e.target.value as "ASC" | "DESC")}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
            >
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Limit</label>
          <input
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="10"
            inputMode="numeric"
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Generated SQL</span>
          <div className="flex items-center gap-3">
            <span>{byteSize(sql).toLocaleString()} bytes</span>
            <button onClick={handleCopy} className="font-medium text-foreground">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={handleDownload} className="font-medium text-foreground">
              Download
            </button>
          </div>
        </div>
        <CodeEditor value={sql} readOnly language="sql" height="24rem" />
      </div>
    </div>
  );
}
