export interface ReindentOptions {
  indentSize?: number;
  /**
   * How to treat single-quote (') characters:
   * - "char": Java/C/Rust-style char literals ('a', '\n') AND lifetimes ('a) \u2014
   *   only treated as a literal if a closing quote is found within a short lookahead,
   *   so lifetime annotations are left alone.
   * - "string": PHP/Python-style single-quoted strings of any length.
   */
  singleQuoteMode?: "char" | "string";
}

function findCharLiteralClose(line: string, openIdx: number): number {
  let j = openIdx + 1;
  if (j >= line.length) return -1;

  if (line[j] === "\\") {
    j += 1;
    if (line[j] === "u" && line[j + 1] === "{") {
      const closeBrace = line.indexOf("}", j);
      if (closeBrace === -1) return -1;
      j = closeBrace + 1;
    } else {
      j += 1;
    }
  } else {
    j += 1;
  }

  return line[j] === "'" ? j : -1;
}

/**
 * Re-indents source code based on brace/bracket/paren nesting depth, respecting
 * string/char literals and comments. This is a lightweight indentation fixer \u2014
 * not a full AST-based pretty-printer \u2014 so it preserves existing line breaks
 * and statement layout rather than reflowing every statement.
 */
export function reindentCode(input: string, options: ReindentOptions = {}): string {
  const indentSize = options.indentSize ?? 4;
  const singleQuoteMode = options.singleQuoteMode ?? "char";
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
    let inDoubleString = false;
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

      if (inDoubleString) {
        if (ch === "\\") { i += 2; continue; }
        if (ch === '"') inDoubleString = false;
        i += 1;
        continue;
      }

      if (ch === "`") {
        let j = i + 1;
        while (j < line.length && line[j] !== "`") j += 1;
        i = Math.min(j + 1, line.length);
        continue;
      }

      if (ch === '"') {
        inDoubleString = true;
        i += 1;
        continue;
      }

      if (ch === "'") {
        if (singleQuoteMode === "string") {
          let j = i + 1;
          while (j < line.length && line[j] !== "'") {
            if (line[j] === "\\") { j += 2; continue; }
            j += 1;
          }
          i = Math.min(j + 1, line.length);
          continue;
        }
        const closeIdx = findCharLiteralClose(line, i);
        if (closeIdx !== -1) {
          i = closeIdx + 1;
          continue;
        }
        sawNonCloseChar = true;
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
