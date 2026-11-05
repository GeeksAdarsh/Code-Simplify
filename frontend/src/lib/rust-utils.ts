import { breakBraceLines, findCharLiteralClose, reindentCode } from "@/lib/code-format-utils";

const OPERATOR_CHARS = "=!<>+-*/%&|^";

/**
 * Normalizes spacing around tokens whose spacing is unambiguous in Rust
 * (`,` `:` `;` `{` `}` `=` `==` `->` `=>` ...). `<`, `>`, `&`, `*` and `-` are
 * left alone because they double as generics, references and unary operators.
 */
function spaceRustLine(line: string): string {
  let out = "";
  let i = 0;
  const pad = () => { if (out !== "" && !out.endsWith(" ")) out += " "; };
  const trimEnd = () => { out = out.replace(/ +$/, ""); };

  while (i < line.length) {
    const ch = line[i];
    const next = line[i + 1];

    if (ch === "/" && (next === "/" || next === "*")) {
      const end = next === "/" ? line.length : line.indexOf("*/", i + 2);
      const stop = end === -1 ? line.length : next === "/" ? end : end + 2;
      if (out !== "" && !out.endsWith(" ")) out += " ";
      out += line.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') j += line[j] === "\\" ? 2 : 1;
      out += line.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === "'") {
      const closeIdx = findCharLiteralClose(line, i);
      const stop = closeIdx === -1 ? i + 1 : closeIdx + 1;
      out += line.slice(i, stop);
      i = stop;
      continue;
    }

    if (line.startsWith("..=", i)) {
      out += "..=";
      i += 3;
      continue;
    }
    const two = line.slice(i, i + 2);
    if (two === "::" || two === "..") {
      out += two;
      i += 2;
      continue;
    }
    if (["->", "=>", "==", "!=", "<=", ">=", "&&", "||", "+=", "-=", "*=", "/=", "%="].includes(two)) {
      trimEnd();
      pad();
      out += two + " ";
      i += 2;
      while (line[i] === " ") i += 1;
      continue;
    }
    if (ch === "=" && !OPERATOR_CHARS.includes(out.slice(-1))) {
      trimEnd();
      pad();
      out += "= ";
      i += 1;
      while (line[i] === " ") i += 1;
      continue;
    }
    if (ch === "," || ch === ";" || (ch === ":" && !/\$\w+$/.test(out))) {
      trimEnd();
      out += ch;
      i += 1;
      while (line[i] === " ") i += 1;
      if (i < line.length && !")]>|".includes(line[i])) out += " ";
      continue;
    }
    if (ch === "{") {
      if (out !== "" && !/[ ([]$/.test(out)) out += " ";
      out += ch;
      i += 1;
      while (line[i] === " ") i += 1;
      if (i < line.length && line[i] !== "}") out += " ";
      continue;
    }
    if (ch === "}") {
      if (out !== "" && !/[ {]$/.test(out)) out += " ";
      out += ch;
      i += 1;
      continue;
    }

    out += ch;
    i += 1;
  }
  return out.replace(/ +$/, "");
}

/** Puts each statement and block on its own line, tidies spacing, then re-indents by nesting depth. */
export function formatRust(input: string, indentSize = 4): string {
  let inBlockComment = false;
  const broken = breakBraceLines(input, "char")
    .split("\n")
    .map((raw) => {
      const line = raw.trim();
      if (inBlockComment) {
        if (line.includes("*/")) inBlockComment = false;
        return line;
      }
      const opened = line.lastIndexOf("/*");
      if (opened !== -1 && line.indexOf("*/", opened) === -1) inBlockComment = true;
      return spaceRustLine(line);
    })
    .join("\n");
  return reindentCode(broken, { indentSize, singleQuoteMode: "char" });
}
