const EXT_TO_LANGUAGE: Record<string, string> = {
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  sql: "sql",
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  less: "less",
  js: "javascript",
  mjs: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  php: "php",
  java: "java",
  rs: "rust",
  go: "go",
  md: "markdown",
  sh: "shell",
  dockerfile: "dockerfile",
  toml: "ini",
  ini: "ini",
};

/** Guesses a Monaco language id from a download filename's extension, e.g. "formatted.sql" -> "sql". */
export function languageFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TO_LANGUAGE[ext] ?? "plaintext";
}

const LABEL_PATTERNS: [RegExp, string][] = [
  [/json/i, "json"],
  [/\bxml\b/i, "xml"],
  [/yaml/i, "yaml"],
  [/\bsql\b/i, "sql"],
  [/\bhtml\b/i, "html"],
  [/\bcss\b/i, "css"],
  [/typescript/i, "typescript"],
  [/javascript/i, "javascript"],
  [/\bpython\b/i, "python"],
  [/\bphp\b/i, "php"],
  [/\bjava\b/i, "java"],
  [/\brust\b/i, "rust"],
  [/\bgo\b input/i, "go"],
  [/markdown/i, "markdown"],
  [/dockerfile/i, "dockerfile"],
  [/\bshell\b|bash/i, "shell"],
];

/** Guesses a Monaco language id from a human-readable label like "SQL input" -> "sql". */
export function languageFromLabel(label: string): string {
  for (const [pattern, language] of LABEL_PATTERNS) {
    if (pattern.test(label)) return language;
  }
  return "plaintext";
}
