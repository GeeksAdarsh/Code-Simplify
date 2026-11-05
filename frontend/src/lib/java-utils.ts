const SNIPPET_CLASS = "class SnippetWrapper__";
const SNIPPET_METHOD = "void snippetBody__()";

/**
 * Formats Java with Prettier's Java plugin (full reflow, not just re-indent).
 * A bare method or a few statements isn't a valid compilation unit, so if the
 * input doesn't parse as-is it is retried inside a wrapper class (and method),
 * and the wrapper is stripped from the result. Throws the original parse error
 * if none of these parse.
 */
export async function formatJava(input: string, indentSize = 4): Promise<string> {
  const [prettier, javaPlugin] = await Promise.all([import("prettier/standalone"), import("prettier-plugin-java")]);
  const format = (code: string) =>
    prettier.format(code, {
      parser: "java",
      plugins: [javaPlugin.default ?? javaPlugin],
      tabWidth: indentSize,
      printWidth: 100,
    });

  try {
    return await format(input);
  } catch (originalError) {
    const wrappers = [
      { code: `${SNIPPET_CLASS} {\n${input}\n}`, depth: 1 },
      { code: `${SNIPPET_CLASS} {\n${SNIPPET_METHOD} {\n${input}\n}\n}`, depth: 2 },
    ];
    for (const { code, depth } of wrappers) {
      try {
        return unwrapSnippet(await format(code), depth, indentSize);
      } catch {
        // try the next wrapper
      }
    }
    const message = originalError instanceof Error ? originalError.message : String(originalError);
    throw new Error(
      message.startsWith("Failed to parse")
        ? "This doesn't parse as Java. Look for a missing or extra brace, parenthesis, quote or semicolon."
        : message,
    );
  }
}

function unwrapSnippet(formatted: string, depth: number, indentSize: number): string {
  const lines = formatted.trimEnd().split("\n");
  const start = lines.findIndex((line) => line.trim().startsWith(depth === 1 ? SNIPPET_CLASS : SNIPPET_METHOD)) + 1;
  const inner = lines.slice(start, lines.length - depth);
  const indent = " ".repeat(indentSize * depth);
  return inner
    .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line.trimStart()))
    .join("\n")
    .replace(/^\n+|\n+$/g, "") + "\n";
}

export function escapeJavaString(input: string): string {
  let result = "";
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === "\\") { result += "\\\\"; continue; }
    if (ch === '"') { result += '\\"'; continue; }
    if (ch === "\n") { result += "\\n"; continue; }
    if (ch === "\r") { result += "\\r"; continue; }
    if (ch === "\t") { result += "\\t"; continue; }
    if (ch === "\b") { result += "\\b"; continue; }
    if (ch === "\f") { result += "\\f"; continue; }
    if (code < 0x20 || code === 0x7f) {
      result += `\\u${code.toString(16).padStart(4, "0")}`;
      continue;
    }
    result += ch;
  }
  return `"${result}"`;
}

export function unescapeJavaString(input: string): string {
  let trimmed = input.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    trimmed = trimmed.slice(1, -1);
  }

  let result = "";
  let i = 0;
  while (i < trimmed.length) {
    if (trimmed[i] === "\\" && i + 1 < trimmed.length) {
      const next = trimmed[i + 1];
      if (next === "n") { result += "\n"; i += 2; continue; }
      if (next === "r") { result += "\r"; i += 2; continue; }
      if (next === "t") { result += "\t"; i += 2; continue; }
      if (next === "b") { result += "\b"; i += 2; continue; }
      if (next === "f") { result += "\f"; i += 2; continue; }
      if (next === "\\") { result += "\\"; i += 2; continue; }
      if (next === '"') { result += '"'; i += 2; continue; }
      if (next === "'") { result += "'"; i += 2; continue; }
      if (next === "u") {
        const hex = trimmed.slice(i + 2, i + 6);
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          result += String.fromCharCode(Number.parseInt(hex, 16));
          i += 6;
          continue;
        }
      }
      result += next;
      i += 2;
      continue;
    }
    result += trimmed[i];
    i += 1;
  }
  return result;
}

