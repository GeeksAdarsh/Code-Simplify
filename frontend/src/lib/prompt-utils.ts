export interface PromptFormatOptions {
  trimTrailingWhitespace: boolean;
  collapseBlankLines: boolean;
  normalizeQuotes: boolean;
  collapseSpaces: boolean;
  trimEnds: boolean;
}

export const DEFAULT_PROMPT_FORMAT_OPTIONS: PromptFormatOptions = {
  trimTrailingWhitespace: true,
  collapseBlankLines: true,
  normalizeQuotes: true,
  collapseSpaces: false,
  trimEnds: true,
};

const SMART_QUOTE_MAP: Record<string, string> = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u2013": "-",
  "\u2014": "--",
  "\u2026": "...",
  "\u00a0": " ",
};

export function formatPrompt(input: string, options: PromptFormatOptions): string {
  let text = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (options.normalizeQuotes) {
    text = text.replace(/[\u2018\u2019\u201c\u201d\u2013\u2014\u2026\u00a0]/g, (m) => SMART_QUOTE_MAP[m] ?? m);
  }

  let lines = text.split("\n");

  if (options.trimTrailingWhitespace) {
    lines = lines.map((line) => line.replace(/[ \t]+$/, ""));
  }

  if (options.collapseSpaces) {
    lines = lines.map((line) => {
      const leading = /^[ \t]*/.exec(line)?.[0] ?? "";
      const rest = line.slice(leading.length).replace(/[ \t]{2,}/g, " ");
      return leading + rest;
    });
  }

  text = lines.join("\n");

  if (options.collapseBlankLines) {
    text = text.replace(/\n{3,}/g, "\n\n");
  }

  if (options.trimEnds) {
    text = text.trim();
  }

  return text;
}

export function diffStats(before: string, after: string): { charsBefore: number; charsAfter: number; linesBefore: number; linesAfter: number } {
  return {
    charsBefore: before.length,
    charsAfter: after.length,
    linesBefore: before ? before.split("\n").length : 0,
    linesAfter: after ? after.split("\n").length : 0,
  };
}
