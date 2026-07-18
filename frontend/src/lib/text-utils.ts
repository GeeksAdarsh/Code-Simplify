export interface TextStats {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function getTextStats(text: string): TextStats {
  const words = countWords(text);
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+|\S+$/g)?.filter((s) => s.trim()).length ?? 0) : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;

  return {
    words,
    charactersWithSpaces: text.length,
    charactersWithoutSpaces: text.replace(/\s/g, "").length,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes: words / 200,
    speakingTimeMinutes: words / 130,
  };
}

export interface CharacterBreakdown {
  letters: number;
  digits: number;
  spaces: number;
  punctuation: number;
  other: number;
  uppercase: number;
  lowercase: number;
}

export function getCharacterBreakdown(text: string): CharacterBreakdown {
  const breakdown: CharacterBreakdown = {
    letters: 0,
    digits: 0,
    spaces: 0,
    punctuation: 0,
    other: 0,
    uppercase: 0,
    lowercase: 0,
  };

  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      breakdown.letters++;
      if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) breakdown.uppercase++;
      if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) breakdown.lowercase++;
    } else if (/[0-9]/.test(ch)) {
      breakdown.digits++;
    } else if (/\s/.test(ch)) {
      breakdown.spaces++;
    } else if (/[.,!?;:'"()[\]{}\-_/\\@#$%^&*+=<>~`|]/.test(ch)) {
      breakdown.punctuation++;
    } else {
      breakdown.other++;
    }
  }

  return breakdown;
}

export interface LineStats {
  totalLines: number;
  nonEmptyLines: number;
  emptyLines: number;
  longestLineLength: number;
  longestLineNumber: number;
  averageLineLength: number;
}

export function getLineStats(text: string): LineStats {
  const lines = text.length ? text.split("\n") : [];
  let longestLineLength = 0;
  let longestLineNumber = 0;
  let nonEmptyLines = 0;
  let totalLength = 0;

  lines.forEach((line, i) => {
    if (line.trim()) nonEmptyLines++;
    totalLength += line.length;
    if (line.length > longestLineLength) {
      longestLineLength = line.length;
      longestLineNumber = i + 1;
    }
  });

  return {
    totalLines: lines.length,
    nonEmptyLines,
    emptyLines: lines.length - nonEmptyLines,
    longestLineLength,
    longestLineNumber,
    averageLineLength: lines.length ? totalLength / lines.length : 0,
  };
}

export interface DuplicateLineOptions {
  caseSensitive: boolean;
  trimLines: boolean;
  ignoreBlank: boolean;
}

export function removeDuplicateLines(text: string, options: DuplicateLineOptions): { output: string; removedCount: number } {
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];
  let removedCount = 0;

  for (const rawLine of lines) {
    const line = options.trimLines ? rawLine.trim() : rawLine;
    if (options.ignoreBlank && !line.trim()) {
      result.push(rawLine);
      continue;
    }
    const key = options.caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) {
      removedCount++;
      continue;
    }
    seen.add(key);
    result.push(options.trimLines ? line : rawLine);
  }

  return { output: result.join("\n"), removedCount };
}

function splitWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

export function convertCase(text: string, caseType: CaseType): string {
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(/\S+/g, (word) => capitalize(word.toLowerCase()));
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
    case "camel": {
      const words = splitWords(text);
      return words.map((w, i) => (i === 0 ? w : capitalize(w))).join("");
    }
    case "pascal":
      return splitWords(text).map(capitalize).join("");
    case "snake":
      return splitWords(text).join("_");
    case "kebab":
      return splitWords(text).join("-");
    case "constant":
      return splitWords(text).join("_").toUpperCase();
  }
}

export type ReverseMode = "characters" | "words" | "lines";

export function reverseText(text: string, mode: ReverseMode): string {
  switch (mode) {
    case "characters":
      return [...text].reverse().join("");
    case "words":
      return text.split(/(\s+)/).reverse().join("");
    case "lines":
      return text.split("\n").reverse().join("\n");
  }
}

export function slugify(text: string, separator: "-" | "_" = "-"): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");
}

export interface RemoveSpacesOptions {
  collapseSpaces: boolean;
  trimLines: boolean;
  removeBlankLines: boolean;
}

export function removeExtraSpaces(text: string, options: RemoveSpacesOptions): string {
  let lines = text.split("\n");

  lines = lines.map((line) => {
    let result = line;
    if (options.collapseSpaces) result = result.replace(/[ \t]+/g, " ");
    if (options.trimLines) result = result.trim();
    return result;
  });

  if (options.removeBlankLines) lines = lines.filter((line) => line.trim().length > 0);

  return lines.join("\n");
}

export type SortMode = "alphabetical" | "numeric" | "length";
export type SortOrder = "asc" | "desc";

export interface SortLinesOptions {
  mode: SortMode;
  order: SortOrder;
  caseSensitive: boolean;
  removeDuplicates: boolean;
  removeEmpty: boolean;
}

export function sortLines(text: string, options: SortLinesOptions): string {
  let lines = text.split("\n");

  if (options.removeEmpty) lines = lines.filter((l) => l.trim().length > 0);

  if (options.mode === "alphabetical") {
    lines.sort((a, b) => {
      const av = options.caseSensitive ? a : a.toLowerCase();
      const bv = options.caseSensitive ? b : b.toLowerCase();
      return av.localeCompare(bv);
    });
  } else if (options.mode === "numeric") {
    lines.sort((a, b) => {
      const an = parseFloat(a) || 0;
      const bn = parseFloat(b) || 0;
      return an - bn;
    });
  } else {
    lines.sort((a, b) => a.length - b.length);
  }

  if (options.order === "desc") lines.reverse();

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    lines = lines.filter((line) => {
      const key = options.caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return lines.join("\n");
}

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim",
  "id", "est", "laborum", "at", "vero", "eos", "accusamus", "iusto", "odio", "dignissimos",
];

function randomLoremWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(wordCount: number): string {
  const words = Array.from({ length: wordCount }, () => randomLoremWord());
  const sentence = words.join(" ");
  return capitalize(sentence) + ".";
}

export type LoremUnit = "words" | "sentences" | "paragraphs";

export function generateLoremIpsum(count: number, unit: LoremUnit, startWithLorem: boolean): string {
  if (unit === "words") {
    const words = Array.from({ length: count }, () => randomLoremWord());
    if (startWithLorem) {
      words[0] = "lorem";
      if (words.length > 1) words[1] = "ipsum";
    }
    return capitalize(words.join(" "));
  }

  if (unit === "sentences") {
    const sentences = Array.from({ length: count }, () => generateSentence(6 + Math.floor(Math.random() * 10)));
    if (startWithLorem) {
      sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    }
    return sentences.join(" ");
  }

  const paragraphs = Array.from({ length: count }, () => {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    return Array.from({ length: sentenceCount }, () => generateSentence(6 + Math.floor(Math.random() * 10))).join(" ");
  });
  if (startWithLorem) {
    paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraphs[0].split(". ").slice(1).join(". ");
  }
  return paragraphs.join("\n\n");
}
