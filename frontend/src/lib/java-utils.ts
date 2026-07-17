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

interface ReindentOptions {
  indentSize?: number;
}

export function reindentCode(input: string, options: ReindentOptions = {}): string {
  const indentSize = options.indentSize ?? 4;
  const indentUnit = " ".repeat(indentSize);
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  let depth = 0;
  let inBlockComment = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      output.push("");
      continue;
    }

    if (inBlockComment) {
      output.push(indentUnit.repeat(depth) + line);
      if (line.includes("*/")) inBlockComment = false;
      continue;
    }

    let i = 0;
    let leadingCloses = 0;
    let sawNonCloseChar = false;
    let netChange = 0;
    let inString: false | '"' | "'" = false;
    let lineBlockComment = false;

    while (i < line.length) {
      const ch = line[i];

      if (lineBlockComment) {
        if (ch === "*" && line[i + 1] === "/") {
          lineBlockComment = false;
          i += 2;
          continue;
        }
        i += 1;
        continue;
      }

      if (inString) {
        if (ch === "\\") { i += 2; continue; }
        if (ch === inString) inString = false;
        i += 1;
        continue;
      }

      if (ch === '"' || ch === "'") {
        inString = ch;
        i += 1;
        continue;
      }

      if (ch === "/" && line[i + 1] === "/") break;

      if (ch === "/" && line[i + 1] === "*") {
        lineBlockComment = true;
        i += 2;
        continue;
      }

      if (ch === "}" || ch === ")" || ch === "]") {
        netChange -= 1;
        if (!sawNonCloseChar) leadingCloses += 1;
        i += 1;
        continue;
      }

      if (ch === "{" || ch === "(" || ch === "[") {
        netChange += 1;
        sawNonCloseChar = true;
        i += 1;
        continue;
      }

      sawNonCloseChar = true;
      i += 1;
    }

    if (lineBlockComment) inBlockComment = true;

    const printDepth = Math.max(0, depth - leadingCloses);
    output.push(indentUnit.repeat(printDepth) + line);
    depth = Math.max(0, depth + netChange);
  }

  return output.join("\n");
}
