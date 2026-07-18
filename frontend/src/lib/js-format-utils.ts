import * as prettier from "prettier/standalone";
import * as babelPlugin from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import { minify } from "terser";

export interface CodeResult {
  output: string;
  error?: string;
}

export async function formatJavaScript(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "babel",
    plugins: [babelPlugin, estreePlugin],
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });
}

export async function minifyJavaScript(code: string): Promise<CodeResult> {
  try {
    const result = await minify(code, { compress: true, mangle: true });
    return { output: result.code ?? "" };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Minification failed. Check your JavaScript syntax." };
  }
}

function decodeSimpleEscapes(raw: string): string {
  let result = "";
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === "\\" && i + 1 < raw.length) {
      const next = raw[i + 1];
      if (next === "n") { result += "\n"; i += 2; continue; }
      if (next === "r") { result += "\r"; i += 2; continue; }
      if (next === "t") { result += "\t"; i += 2; continue; }
      if (next === "b") { result += "\b"; i += 2; continue; }
      if (next === "f") { result += "\f"; i += 2; continue; }
      if (next === "v") { result += "\v"; i += 2; continue; }
      if (next === "0") { result += "\0"; i += 2; continue; }
      if (next === "\\") { result += "\\"; i += 2; continue; }
      if (next === "'") { result += "'"; i += 2; continue; }
      if (next === '"') { result += '"'; i += 2; continue; }
      if (next === "x") {
        const hex = raw.slice(i + 2, i + 4);
        if (/^[0-9a-fA-F]{2}$/.test(hex)) {
          result += String.fromCharCode(Number.parseInt(hex, 16));
          i += 4;
          continue;
        }
      }
      if (next === "u") {
        const hex = raw.slice(i + 2, i + 6);
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
    result += raw[i];
    i += 1;
  }
  return result;
}

function hexEncodeChar(ch: string): string {
  const code = ch.codePointAt(0) ?? 0;
  if (code > 0xffff) return `\\u{${code.toString(16)}}`;
  if (code > 0xff) return `\\u${code.toString(16).padStart(4, "0")}`;
  return `\\x${code.toString(16).padStart(2, "0")}`;
}

function mapStringLiterals(code: string, transform: (decoded: string) => string): string {
  let result = "";
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];

    if (ch === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? len : end;
      result += code.slice(i, stop);
      i = stop;
      continue;
    }

    if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? len : end + 2;
      result += code.slice(i, stop);
      i = stop;
      continue;
    }

    if (ch === "`") {
      let j = i + 1;
      while (j < len && code[j] !== "`") {
        if (code[j] === "\\") { j += 2; continue; }
        j += 1;
      }
      const stop = Math.min(j + 1, len);
      result += code.slice(i, stop);
      i = stop;
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      let raw = "";
      while (j < len && code[j] !== quote) {
        if (code[j] === "\\") {
          raw += code[j] + (code[j + 1] ?? "");
          j += 2;
          continue;
        }
        raw += code[j];
        j += 1;
      }
      const decoded = decodeSimpleEscapes(raw);
      result += transform(decoded);
      i = Math.min(j + 1, len);
      continue;
    }

    result += ch;
    i += 1;
  }

  return result;
}

export async function obfuscateJavaScript(code: string): Promise<CodeResult> {
  try {
    const minified = await minify(code, {
      compress: true,
      mangle: { toplevel: true },
    });
    const withEncodedStrings = mapStringLiterals(
      minified.code ?? "",
      (decoded) => `"${Array.from(decoded).map(hexEncodeChar).join("")}"`,
    );
    return { output: withEncodedStrings };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Obfuscation failed. Check your JavaScript syntax." };
  }
}

export async function deobfuscateJavaScript(code: string): Promise<CodeResult> {
  try {
    const readableStrings = mapStringLiterals(code, (decoded) => JSON.stringify(decoded));
    const formatted = await formatJavaScript(readableStrings);
    return { output: formatted };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Deobfuscation failed. Check your JavaScript syntax." };
  }
}
