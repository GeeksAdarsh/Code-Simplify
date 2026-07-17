import { marked } from "marked";
import TurndownService from "turndown";

marked.setOptions({ gfm: true, breaks: false });

export async function markdownToHtml(markdown: string): Promise<string> {
  return marked.parse(markdown, { async: true });
}

let turndownService: TurndownService | null = null;

function getTurndownService(): TurndownService {
  if (!turndownService) {
    turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "_",
    });
  }
  return turndownService;
}

export function htmlToMarkdown(html: string): string {
  return getTurndownService().turndown(html);
}

/**
 * Cleans up common Markdown style inconsistencies: normalizes bullet markers,
 * ensures a space after ATX heading hashes, strips trailing whitespace, and
 * collapses excess blank lines. Content inside fenced code blocks (``` or ~~~)
 * is left completely untouched.
 */
export function formatMarkdown(input: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  let fenceMarker: string | null = null;

  for (const rawLine of lines) {
    const fenceMatch = rawLine.match(/^(\s*)(```+|~~~+)/);
    if (fenceMarker) {
      output.push(rawLine.replace(/\s+$/, ""));
      if (fenceMatch && rawLine.trim().startsWith(fenceMarker)) fenceMarker = null;
      continue;
    }

    if (fenceMatch) {
      fenceMarker = fenceMatch[2];
      output.push(rawLine.replace(/\s+$/, ""));
      continue;
    }

    let line = rawLine.replace(/[ \t]+$/, "");
    line = line.replace(/^(\s*)[*+](\s+)/, "$1-$2");
    line = line.replace(/^(#{1,6})([^#\s])/, "$1 $2");
    output.push(line);
  }

  const collapsed: string[] = [];
  let blankRun = 0;
  for (const line of output) {
    if (line.trim() === "") {
      blankRun += 1;
      if (blankRun <= 1) collapsed.push("");
    } else {
      blankRun = 0;
      collapsed.push(line);
    }
  }
  while (collapsed.length > 0 && collapsed[collapsed.length - 1].trim() === "") collapsed.pop();

  return collapsed.join("\n") + "\n";
}
