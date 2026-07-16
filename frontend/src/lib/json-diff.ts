export type DiffType = "added" | "removed" | "changed";

export interface DiffEntry {
  path: string;
  type: DiffType;
  oldValue?: unknown;
  newValue?: unknown;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function stringifyValue(v: unknown): string {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

export function diffJson(a: unknown, b: unknown, path = "$"): DiffEntry[] {
  const entries: DiffEntry[] = [];

  const bothArrays = Array.isArray(a) && Array.isArray(b);
  const bothObjects = isObject(a) && isObject(b);

  if (bothArrays) {
    const arrA = a as unknown[];
    const arrB = b as unknown[];
    const maxLen = Math.max(arrA.length, arrB.length);
    for (let i = 0; i < maxLen; i++) {
      const itemPath = `${path}[${i}]`;
      if (i >= arrA.length) {
        entries.push({ path: itemPath, type: "added", newValue: arrB[i] });
      } else if (i >= arrB.length) {
        entries.push({ path: itemPath, type: "removed", oldValue: arrA[i] });
      } else {
        entries.push(...diffJson(arrA[i], arrB[i], itemPath));
      }
    }
    return entries;
  }

  if (bothObjects) {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keys = new Set([...Object.keys(objA), ...Object.keys(objB)]);
    for (const key of keys) {
      const keyPath = `${path}.${key}`;
      const hasA = key in objA;
      const hasB = key in objB;
      if (hasA && !hasB) {
        entries.push({ path: keyPath, type: "removed", oldValue: objA[key] });
      } else if (!hasA && hasB) {
        entries.push({ path: keyPath, type: "added", newValue: objB[key] });
      } else {
        entries.push(...diffJson(objA[key], objB[key], keyPath));
      }
    }
    return entries;
  }

  const equal =
    a === b || (Number.isNaN(a as number) && Number.isNaN(b as number)) || JSON.stringify(a) === JSON.stringify(b);

  if (!equal) {
    entries.push({ path, type: "changed", oldValue: a, newValue: b });
  }

  return entries;
}

export { stringifyValue };
