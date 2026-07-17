export function formatCss(input: string, indentSize = 2): string {
  if (!input.trim()) return "";
  const indentUnit = " ".repeat(indentSize);
  let result = "";
  let depth = 0;
  let buffer = "";
  let i = 0;
  const len = input.length;

  const flushDeclaration = () => {
    const trimmed = buffer.trim();
    if (trimmed) {
      result += indentUnit.repeat(depth) + trimmed + ";\n";
    }
    buffer = "";
  };

  while (i < len) {
    const ch = input[i];

    if (ch === "/" && input[i + 1] === "*") {
      const end = input.indexOf("*/", i + 2);
      const commentEnd = end === -1 ? len : end + 2;
      if (buffer.trim()) {
        result += indentUnit.repeat(depth) + buffer.trim() + "\n";
        buffer = "";
      }
      result += indentUnit.repeat(depth) + input.slice(i, commentEnd) + "\n";
      i = commentEnd;
      continue;
    }

    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < len && input[j] !== ch) {
        if (input[j] === "\\") j += 1;
        j += 1;
      }
      buffer += input.slice(i, j + 1);
      i = j + 1;
      continue;
    }

    if (ch === "{") {
      const selector = buffer.trim();
      result += indentUnit.repeat(depth) + selector + " {\n";
      buffer = "";
      depth += 1;
      i += 1;
      continue;
    }

    if (ch === "}") {
      flushDeclaration();
      depth = Math.max(0, depth - 1);
      result += indentUnit.repeat(depth) + "}\n";
      i += 1;
      continue;
    }

    if (ch === ";") {
      flushDeclaration();
      i += 1;
      continue;
    }

    buffer += ch;
    i += 1;
  }

  if (buffer.trim()) {
    result += indentUnit.repeat(depth) + buffer.trim() + "\n";
  }

  return result.trim();
}

export function minifyCss(input: string): string {
  let result = input;
  const placeholders: string[] = [];

  result = result.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `\u0000${idx}\u0000`;
  });

  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  result = result.replace(/\s+/g, " ");
  result = result.replace(/\s*([{}:;,])\s*/g, "$1");
  result = result.replace(/;}/g, "}");
  result = result.trim();

  result = result.replace(/\u0000(\d+)\u0000/g, (_match, idx) => placeholders[Number(idx)]);

  return result;
}
