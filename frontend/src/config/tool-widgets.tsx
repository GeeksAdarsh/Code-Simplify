import type { ReactNode } from "react";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";

/**
 * Maps "category/tool" slugs to their interactive widget component.
 * Add an entry here each time a tool's functionality is implemented.
 */
export const toolWidgets: Record<string, () => ReactNode> = {
  "json/formatter": () => <JsonFormatterTool />,
};

export function getToolWidget(categorySlug: string, toolSlug: string): ReactNode | undefined {
  const render = toolWidgets[`${categorySlug}/${toolSlug}`];
  return render?.();
}
