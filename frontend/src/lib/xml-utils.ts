function hasDomParser(): boolean {
  return typeof window !== "undefined" && typeof DOMParser !== "undefined";
}

export interface XmlValidationResult {
  valid: boolean;
  error?: string;
}

export function validateXml(input: string): XmlValidationResult {
  if (!hasDomParser()) {
    return { valid: true };
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) {
    return { valid: false, error: parserError.textContent?.trim() || "Invalid XML" };
  }
  return { valid: true };
}

/**
 * Formats/indents an XML string. Assumes the input is well-formed
 * (validate first with `validateXml`); this is a lightweight string-based
 * pretty-printer, not a full XML parser.
 */
export function formatXml(input: string, indent: string = "  "): string {
  const collapsed = input.replace(/>\s*</g, "><").trim();
  const withBreaks = collapsed.replace(/(>)(<)(\/*)/g, "$1\n$2$3");
  const lines = withBreaks.split("\n");

  let depth = 0;
  const result: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const isDeclaration = /^<\?/.test(line);
    const isComment = /^<!--/.test(line);
    const isClosingTag = /^<\//.test(line);
    const isSelfClosing = /\/>$/.test(line) || /^<[^>]+>[^<]*<\/[^>]+>$/.test(line);
    const isOpeningTag = /^<[^/!?][^>]*>$/.test(line) && !isSelfClosing;

    if (isClosingTag) {
      depth = Math.max(0, depth - 1);
    }

    result.push(indent.repeat(depth) + line);

    if (isOpeningTag && !isDeclaration && !isComment) {
      depth += 1;
    }
  }

  return result.join("\n");
}

export function minifyXml(input: string): string {
  return input.replace(/>\s+</g, "><").trim();
}

function elementToObject(el: Element): unknown {
  const children = Array.from(el.children);
  const attrs = Array.from(el.attributes);

  if (children.length === 0) {
    const text = el.textContent?.trim() ?? "";
    if (attrs.length === 0) return text;
    const obj: Record<string, unknown> = {};
    attrs.forEach((a) => (obj[`@${a.name}`] = a.value));
    if (text) obj["#text"] = text;
    return obj;
  }

  const obj: Record<string, unknown> = {};
  attrs.forEach((a) => (obj[`@${a.name}`] = a.value));

  for (const child of children) {
    const value = elementToObject(child);
    const key = child.tagName;
    if (key in obj) {
      if (Array.isArray(obj[key])) (obj[key] as unknown[]).push(value);
      else obj[key] = [obj[key], value];
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export interface XmlToJsResult {
  data?: unknown;
  rootTag?: string;
  error?: string;
}

/** Parses XML into a plain JS object, following common xml-to-json conventions (@attr for attributes, #text for mixed text content). */
export function xmlToJsObject(input: string): XmlToJsResult {
  if (!hasDomParser()) return { data: {} };

  const validation = validateXml(input);
  if (!validation.valid) return { error: validation.error };

  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "application/xml");
  const root = doc.documentElement;
  if (!root) return { error: "No root element found" };

  return { data: { [root.tagName]: elementToObject(root) }, rootTag: root.tagName };
}

export function countXmlElements(input: string): { elements: number; depth: number } | null {
  if (!hasDomParser()) return null;
  const validation = validateXml(input);
  if (!validation.valid) return null;
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "application/xml");
  const root = doc.documentElement;
  if (!root) return null;

  let count = 0;
  let maxDepth = 1;
  function walk(el: Element, depth: number) {
    count += 1;
    maxDepth = Math.max(maxDepth, depth);
    Array.from(el.children).forEach((child) => walk(child, depth + 1));
  }
  walk(root, 1);
  return { elements: count, depth: maxDepth };
}

/**
 * Picks the most sensible array of "rows" out of a parsed XML structure for
 * tabular export (CSV/Excel): the first repeated child array found, or the
 * object itself as a single row.
 */
export interface XPathEvalResult {
  resultType: "number" | "string" | "boolean" | "node-set" | "";
  values: string[];
  error?: string;
}

export function evaluateXPath(xmlString: string, expression: string): XPathEvalResult {
  if (!expression.trim() || !hasDomParser()) return { resultType: "", values: [] };
  const validation = validateXml(xmlString);
  if (!validation.valid) return { resultType: "", values: [], error: validation.error };

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");

  try {
    const result = doc.evaluate(expression, doc, null, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.NUMBER_TYPE:
        return { resultType: "number", values: [String(result.numberValue)] };
      case XPathResult.STRING_TYPE:
        return { resultType: "string", values: [result.stringValue] };
      case XPathResult.BOOLEAN_TYPE:
        return { resultType: "boolean", values: [String(result.booleanValue)] };
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
      case XPathResult.ORDERED_NODE_ITERATOR_TYPE: {
        const values: string[] = [];
        let node = result.iterateNext();
        while (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            values.push((node as Element).outerHTML || node.textContent || "");
          } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
            const attr = node as unknown as Attr;
            values.push(`${attr.name}="${attr.value}"`);
          } else {
            values.push(node.textContent || "");
          }
          node = result.iterateNext();
        }
        return { resultType: "node-set", values };
      }
      default:
        return { resultType: "", values: [] };
    }
  } catch (e) {
    return { resultType: "", values: [], error: e instanceof Error ? e.message : "Invalid XPath expression" };
  }
}

export function extractRowsFromXml(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data !== null && typeof data === "object") {
    for (const value of Object.values(data as Record<string, unknown>)) {
      if (Array.isArray(value)) return value;
    }
    for (const value of Object.values(data as Record<string, unknown>)) {
      if (value !== null && typeof value === "object") return extractRowsFromXml(value);
    }
  }
  return [data];
}
