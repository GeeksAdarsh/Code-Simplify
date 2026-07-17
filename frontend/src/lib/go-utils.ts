import { reindentCode } from "@/lib/code-format-utils";

export function formatGo(input: string, indentSize = 4): string {
  return reindentCode(input, { indentSize, singleQuoteMode: "char" });
}
