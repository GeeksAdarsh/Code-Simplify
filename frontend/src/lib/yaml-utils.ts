import { load, YAMLException } from "js-yaml";

export interface YamlParseError {
  message: string;
  line?: number;
  column?: number;
}

export interface YamlParseResult {
  data?: unknown;
  error?: YamlParseError;
}

export function parseYaml(input: string): YamlParseResult {
  try {
    const data = load(input);
    return { data };
  } catch (e) {
    if (e instanceof YAMLException) {
      const mark = e.mark;
      return {
        error: {
          message: e.reason || e.message,
          line: mark ? mark.line + 1 : undefined,
          column: mark ? mark.column + 1 : undefined,
        },
      };
    }
    return { error: { message: e instanceof Error ? e.message : "Invalid YAML" } };
  }
}
