import { reindentCode } from "@/lib/code-format-utils";

export function formatRust(input: string, indentSize = 4): string {
  return reindentCode(input, { indentSize, singleQuoteMode: "char" });
}
