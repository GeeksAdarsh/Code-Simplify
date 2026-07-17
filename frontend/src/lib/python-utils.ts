interface LineScanResult {
  /** Line content with any inline comment stripped (only when not inside a string). */
  contentBeforeComment: string;
  /** Set when the line opens a triple-quoted string that isn't closed on the same line. */
  entersMultilineString: false | "'''" | '"""';
}

function scanLine(line: string): LineScanResult {
  let i = 0;
  const len = line.length;
  let result = "";

  while (i < len) {
    const ch = line[i];

    if ((ch === "'" || ch === '"') && line[i + 1] === ch && line[i + 2] === ch) {
      const marker = ch.repeat(3) as "'''" | '"""';
      const closeIdx = line.indexOf(marker, i + 3);
      if (closeIdx === -1) {
        result += line.slice(i);
        return { contentBeforeComment: result, entersMultilineString: marker };
      }
      result += line.slice(i, closeIdx + 3);
      i = closeIdx + 3;
      continue;
    }

    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      while (j < len && line[j] !== quote) {
        if (line[j] === "\\") { j += 2; continue; }
        j += 1;
      }
      const end = Math.min(j + 1, len);
      result += line.slice(i, end);
      i = end;
      continue;
    }

    if (ch === "#") {
      return { contentBeforeComment: result, entersMultilineString: false };
    }

    result += ch;
    i += 1;
  }

  return { contentBeforeComment: result, entersMultilineString: false };
}

function expandTabsWidth(leading: string, tabSize = 8): number {
  let width = 0;
  for (const ch of leading) {
    width += ch === "\t" ? tabSize - (width % tabSize) : 1;
  }
  return width;
}

function collapseBlankRuns(lines: string[], maxConsecutive: number): string[] {
  const result: string[] = [];
  let blankRun = 0;
  for (const line of lines) {
    if (line.trim() === "") {
      blankRun += 1;
      if (blankRun <= maxConsecutive) result.push("");
    } else {
      blankRun = 0;
      result.push(line);
    }
  }
  while (result.length > 0 && result[result.length - 1].trim() === "") result.pop();
  return result;
}

/**
 * Re-indents Python source to a consistent indent width, based on the same
 * indentation-stack logic Python's own tokenizer uses to determine nesting
 * depth. Content inside triple-quoted strings is left completely untouched.
 * This does not reflow statements, wrap long lines, or normalize spacing
 * around operators \u2014 it focuses on fixing tabs/spaces and inconsistent
 * indent widths, which are the most common real-world Python formatting issues.
 */
export function formatPython(input: string, indentSize = 4): string {
  const indentUnit = " ".repeat(indentSize);
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  const indentStack = [0];
  let depth = 0;
  let multilineMarker: false | "'''" | '"""' = false;

  for (const rawLine of lines) {
    if (multilineMarker) {
      output.push(rawLine);
      if (rawLine.includes(multilineMarker)) multilineMarker = false;
      continue;
    }

    if (rawLine.trim() === "") {
      output.push("");
      continue;
    }

    const leadingMatch = rawLine.match(/^[ \t]*/);
    const leading = leadingMatch ? leadingMatch[0] : "";
    const content = rawLine.slice(leading.length);
    const width = expandTabsWidth(leading);

    while (indentStack.length > 1 && width < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      depth -= 1;
    }
    if (width > indentStack[indentStack.length - 1]) {
      indentStack.push(width);
      depth += 1;
    }

    output.push(indentUnit.repeat(Math.max(depth, 0)) + content.replace(/\s+$/, ""));

    const scan = scanLine(content);
    if (scan.entersMultilineString) multilineMarker = scan.entersMultilineString;
  }

  return collapseBlankRuns(output, 2).join("\n");
}

/**
 * Shrinks Python source by stripping comments and blank lines, and collapsing
 * each indentation level down to a single space. Relative nesting (which is
 * all Python actually requires) is fully preserved, so the result remains
 * valid, runnable Python.
 */
export function minifyPython(input: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  const indentStack = [0];
  let depth = 0;
  let multilineMarker: false | "'''" | '"""' = false;

  for (const rawLine of lines) {
    if (multilineMarker) {
      output.push(rawLine);
      if (rawLine.includes(multilineMarker)) multilineMarker = false;
      continue;
    }

    const leadingMatch = rawLine.match(/^[ \t]*/);
    const leading = leadingMatch ? leadingMatch[0] : "";
    const content = rawLine.slice(leading.length);

    if (content.trim() === "") continue;

    const scan = scanLine(content);
    const trimmedContent = scan.contentBeforeComment.replace(/\s+$/, "");
    if (trimmedContent === "") continue;

    const width = expandTabsWidth(leading);
    while (indentStack.length > 1 && width < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      depth -= 1;
    }
    if (width > indentStack[indentStack.length - 1]) {
      indentStack.push(width);
      depth += 1;
    }

    output.push(" ".repeat(Math.max(depth, 0)) + trimmedContent);

    if (scan.entersMultilineString) multilineMarker = scan.entersMultilineString;
  }

  return output.join("\n");
}
