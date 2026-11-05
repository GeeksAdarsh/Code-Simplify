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

export function findCharLiteralClose(line: string, openIdx: number): number {
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

function nextNonSpace(text: string, from: number): number {
  let j = from;
  while (j < text.length && (text[j] === " " || text[j] === "\t")) j += 1;
  return j;
}

/**
 * Splits crammed brace-language code onto separate lines: after `{` and `;`,
 * and around `}` (keeping `} else`, `},` and `};` together). Breaks only happen
 * outside strings, comments, parentheses and brackets, so `for (;;)` and
 * `[0; 5]` stay intact.
 */
export function breakBraceLines(input: string, singleQuoteMode: "char" | "string" = "char"): string {
  const text = input.replace(/\r\n/g, "\n");
  let out = "";
  let groupDepth = 0;
  let i = 0;

  const lineBreak = (from: number) => {
    out = out.replace(/[ \t]+$/, "");
    const j = nextNonSpace(text, from);
    if (j < text.length && text[j] !== "\n" && !out.endsWith("\n")) out += "\n";
    return j;
  };

  while (i < text.length) {
    const ch = text[i];

    if (ch === "/" && text[i + 1] === "/") {
      const end = text.indexOf("\n", i);
      const stop = end === -1 ? text.length : end;
      out += text.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === "/" && text[i + 1] === "*") {
      const end = text.indexOf("*/", i + 2);
      const stop = end === -1 ? text.length : end + 2;
      out += text.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "`" || (ch === "'" && singleQuoteMode === "string")) {
      let j = i + 1;
      while (j < text.length && text[j] !== ch) j += ch !== "`" && text[j] === "\\" ? 2 : 1;
      out += text.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === "'") {
      const closeIdx = findCharLiteralClose(text, i);
      const stop = closeIdx === -1 ? i + 1 : closeIdx + 1;
      out += text.slice(i, stop);
      i = stop;
      continue;
    }

    if (ch === "(" || ch === "[") groupDepth += 1;
    if ((ch === ")" || ch === "]") && groupDepth > 0) groupDepth -= 1;

    if (groupDepth === 0 && ch === "{") {
      out += ch;
      const j = nextNonSpace(text, i + 1);
      i = text[j] === "}" ? j : lineBreak(i + 1);
      continue;
    }
    if (groupDepth === 0 && ch === "}") {
      if (out.trim() !== "" && !/\n[ \t]*$/.test(out) && !out.endsWith("{")) {
        out = out.replace(/[ \t]+$/, "") + "\n";
      }
      out += ch;
      const j = nextNonSpace(text, i + 1);
      if (/[,;)\]]/.test(text[j] ?? "") || text.startsWith("else", j) || text.startsWith("while", j)) {
        out += text[j] === "e" || text[j] === "w" ? " " : "";
        i = j;
      } else {
        i = lineBreak(i + 1);
      }
      continue;
    }
    if (groupDepth === 0 && ch === ";") {
      out += ch;
      const j = nextNonSpace(text, i + 1);
      i = text.startsWith("//", j) ? i + 1 : lineBreak(i + 1);
      continue;
    }

    out += ch;
    i += 1;
  }

  return out;
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
