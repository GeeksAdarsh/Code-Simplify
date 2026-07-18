/**
 * Pretty-prints MongoDB shell query syntax (a permissive superset of JSON that
 * allows unquoted keys, single-quoted strings, and constructors like
 * ObjectId(...) / ISODate(...)). This tokenizes and reflows the text rather
 * than calling JSON.parse, so it never executes the input.
 */
export function formatMongoQuery(input: string, indentSize = 2): string {
  const indentUnit = " ".repeat(indentSize);
  let depth = 0;
  let output = "";
  let i = 0;
  const n = input.length;

  function newline() {
    output = output.replace(/[ \t]+$/, "");
    output += "\n" + indentUnit.repeat(depth);
  }

  while (i < n) {
    const ch = input[i];

    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n && input[j] !== quote) {
        if (input[j] === "\\") j += 1;
        j += 1;
      }
      output += input.slice(i, Math.min(j + 1, n));
      i = j + 1;
      continue;
    }

    if (ch === "{" || ch === "[") {
      const closing = ch === "{" ? "}" : "]";
      let k = i + 1;
      while (k < n && (input[k] === " " || input[k] === "\t" || input[k] === "\n" || input[k] === "\r")) k += 1;
      output += ch;
      if (input[k] === closing) {
        output += closing;
        i = k + 1;
      } else {
        depth += 1;
        newline();
        i += 1;
      }
      continue;
    }

    if (ch === "}" || ch === "]") {
      depth = Math.max(0, depth - 1);
      newline();
      output += ch;
      i += 1;
      continue;
    }

    if (ch === ",") {
      output += ",";
      let j = i + 1;
      while (j < n && (input[j] === " " || input[j] === "\t")) j += 1;
      newline();
      i = j;
      continue;
    }

    if (ch === ":") {
      output += ": ";
      let j = i + 1;
      while (j < n && (input[j] === " " || input[j] === "\t")) j += 1;
      i = j;
      continue;
    }

    output += ch;
    i += 1;
  }

  return output
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .trim();
}

function randomHex(length: number): string {
  const bytes = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
}

let objectIdCounter = Math.floor(Math.random() * 0xffffff);

export function generateObjectId(date: Date = new Date()): string {
  const timestamp = Math.floor(date.getTime() / 1000)
    .toString(16)
    .padStart(8, "0");
  const random = randomHex(10);
  objectIdCounter = (objectIdCounter + 1) & 0xffffff;
  const counter = objectIdCounter.toString(16).padStart(6, "0");
  return `${timestamp}${random}${counter}`;
}

export function decodeObjectId(id: string): { timestamp: Date; randomValue: string; counter: string } | { error: string } {
  const clean = id.trim().toLowerCase();
  if (!/^[0-9a-f]{24}$/.test(clean)) {
    return { error: "An ObjectId must be exactly 24 hexadecimal characters." };
  }
  const timestampHex = clean.slice(0, 8);
  const randomValue = clean.slice(8, 18);
  const counter = clean.slice(18, 24);
  const timestamp = new Date(parseInt(timestampHex, 16) * 1000);
  return { timestamp, randomValue, counter };
}
