const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr",
]);

const RAW_TEXT_ELEMENTS = new Set(["script", "style", "pre", "textarea"]);

interface HtmlToken {
  type: "open" | "close" | "self-close" | "text" | "comment" | "doctype";
  raw: string;
  tagName?: string;
}

function tokenizeHtml(html: string): HtmlToken[] {
  const tokens: HtmlToken[] = [];
  const tagRegex = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s+[^<>]*?)?\/?>/gi;
  let cursor = 0;

  while (cursor < html.length) {
    tagRegex.lastIndex = cursor;
    const match = tagRegex.exec(html);

    if (!match || match.index !== cursor) {
      const nextTagIndex = html.indexOf("<", cursor);
      if (nextTagIndex === -1) {
        const text = html.slice(cursor);
        if (text.trim()) tokens.push({ type: "text", raw: text.trim() });
        break;
      }
      const text = html.slice(cursor, nextTagIndex);
      if (text.trim()) tokens.push({ type: "text", raw: text.trim() });
      cursor = nextTagIndex;
      continue;
    }

    const raw = match[0];
    cursor = match.index + raw.length;

    if (raw.startsWith("<!--")) {
      tokens.push({ type: "comment", raw });
      continue;
    }
    if (/^<!DOCTYPE/i.test(raw)) {
      tokens.push({ type: "doctype", raw });
      continue;
    }
    if (raw.startsWith("</")) {
      const tagName = raw.match(/^<\/([a-zA-Z0-9-]+)/)?.[1]?.toLowerCase();
      tokens.push({ type: "close", raw, tagName });
      continue;
    }

    const tagName = raw.match(/^<([a-zA-Z0-9-]+)/)?.[1]?.toLowerCase() ?? "";
    const selfClosing = /\/>$/.test(raw) || VOID_ELEMENTS.has(tagName);

    if (!selfClosing && RAW_TEXT_ELEMENTS.has(tagName)) {
      const closeTagRegex = new RegExp(`</${tagName}\\s*>`, "i");
      const remaining = html.slice(cursor);
      const closeMatch = closeTagRegex.exec(remaining);
      const innerEnd = closeMatch ? closeMatch.index : remaining.length;
      const innerRaw = remaining.slice(0, innerEnd);

      tokens.push({ type: "open", raw, tagName });
      if (innerRaw.trim()) tokens.push({ type: "text", raw: innerRaw, tagName: "__raw__" });
      cursor += innerEnd;

      if (closeMatch) {
        tokens.push({ type: "close", raw: closeMatch[0], tagName });
        cursor += closeMatch[0].length;
      }
      continue;
    }

    tokens.push({ type: selfClosing ? "self-close" : "open", raw, tagName });
  }

  return tokens;
}

export function formatHtml(input: string, indentSize = 2): string {
  if (!input.trim()) return "";
  const tokens = tokenizeHtml(input.trim());
  const indentUnit = " ".repeat(indentSize);
  const lines: string[] = [];
  let depth = 0;

  for (const token of tokens) {
    if (token.type === "close") {
      depth = Math.max(0, depth - 1);
      lines.push(indentUnit.repeat(depth) + token.raw);
      continue;
    }
    if (token.tagName === "__raw__") {
      lines.push(indentUnit.repeat(depth) + token.raw.trim());
      continue;
    }

    lines.push(indentUnit.repeat(depth) + token.raw);
    if (token.type === "open") depth += 1;
  }

  return lines.join("\n");
}

export function minifyHtml(input: string): string {
  let result = input;
  const placeholders: string[] = [];

  result = result.replace(/<(script|style|pre|textarea)([^>]*)>([\s\S]*?)<\/\1>/gi, (_match, tag, attrs, content) => {
    const index = placeholders.length;
    placeholders.push(`<${tag}${attrs}>${content}</${tag}>`);
    return `\u0000${index}\u0000`;
  });

  result = result.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");
  result = result.replace(/\s+/g, " ");
  result = result.replace(/>\s+</g, "><");
  result = result.trim();

  result = result.replace(/\u0000(\d+)\u0000/g, (_match, idx) => placeholders[Number(idx)]);

  return result;
}

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

export function encodeHtmlEntities(text: string): string {
  return Array.from(text)
    .map((ch) => {
      if (ESCAPE_MAP[ch]) return ESCAPE_MAP[ch];
      const code = ch.codePointAt(0) ?? 0;
      return code > 127 ? `&#${code};` : ch;
    })
    .join("");
}

export function decodeHtmlEntities(text: string): string {
  if (typeof document === "undefined") return text;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}
