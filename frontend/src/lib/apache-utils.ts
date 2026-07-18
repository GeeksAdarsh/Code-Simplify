export function formatApacheConfig(text: string, indentSize = 4): string {
  const indentUnit = " ".repeat(indentSize);
  const lines = text.split(/\r?\n/);
  const output: string[] = [];
  let depth = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      output.push("");
      continue;
    }

    const isCloseTag = /^<\/\w+/.test(line);
    if (isCloseTag) depth = Math.max(0, depth - 1);

    output.push(indentUnit.repeat(depth) + line);

    const isOpenTag = /^<\w+(?!\/)[^>]*>$/.test(line) && !line.startsWith("</") && !line.endsWith("/>");
    if (isOpenTag) depth++;
  }

  return output.join("\n");
}
