export interface JsonParseError {
  message: string;
  line?: number;
  column?: number;
}

export interface JsonParseResult {
  data?: unknown;
  error?: JsonParseError;
}

export function locateJsonError(input: string, message: string): { line: number; column: number } | null {
  const match = message.match(/position (\d+)/i);
  if (!match) return null;
  const position = Number(match[1]);
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === "\n") {
      line++;
      lastNewline = i;
    }
  }
  return { line, column: position - lastNewline };
}

export function parseJson(input: string): JsonParseResult {
  try {
    return { data: JSON.parse(input) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    const location = locateJsonError(input, message);
    return { error: { message, line: location?.line, column: location?.column } };
  }
}

export function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function jsonTypeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

export function countNodes(value: unknown): { keys: number; items: number; depth: number } {
  let keys = 0;
  let items = 0;
  let maxDepth = 1;

  function walk(v: unknown, depth: number) {
    maxDepth = Math.max(maxDepth, depth);
    if (Array.isArray(v)) {
      items += v.length;
      v.forEach((item) => walk(item, depth + 1));
    } else if (v !== null && typeof v === "object") {
      const entries = Object.entries(v as Record<string, unknown>);
      keys += entries.length;
      entries.forEach(([, val]) => walk(val, depth + 1));
    }
  }

  walk(value, 1);
  return { keys, items, depth: maxDepth };
}
