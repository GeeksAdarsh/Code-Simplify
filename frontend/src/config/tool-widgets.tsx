import type { ReactNode } from "react";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";
import { JsonValidatorTool } from "@/components/tools/json-validator-tool";
import { JsonMinifierTool } from "@/components/tools/json-minifier-tool";
import { JsonDiffTool } from "@/components/tools/json-diff-tool";
import { JsonCompareTool } from "@/components/tools/json-compare-tool";
import { JsonViewerTool } from "@/components/tools/json-viewer-tool";
import { JsonTreeViewerTool } from "@/components/tools/json-tree-viewer-tool";
import { JsonToXmlTool } from "@/components/tools/json-to-xml-tool";
import { JsonToYamlTool } from "@/components/tools/json-to-yaml-tool";
import { JsonToCsvTool } from "@/components/tools/json-to-csv-tool";

/**
 * Maps "category/tool" slugs to their interactive widget component.
 * Add an entry here each time a tool's functionality is implemented.
 */
export const toolWidgets: Record<string, () => ReactNode> = {
  "json/formatter": () => <JsonFormatterTool />,
  "json/beautifier": () => <JsonFormatterTool />,
  "json/validator": () => <JsonValidatorTool />,
  "json/minifier": () => <JsonMinifierTool />,
  "json/diff": () => <JsonDiffTool />,
  "json/compare": () => <JsonCompareTool />,
  "json/viewer": () => <JsonViewerTool />,
  "json/tree-viewer": () => <JsonTreeViewerTool />,
  "json/to-xml": () => <JsonToXmlTool />,
  "json/to-yaml": () => <JsonToYamlTool />,
  "json/to-csv": () => <JsonToCsvTool />,
};

export function getToolWidget(categorySlug: string, toolSlug: string): ReactNode | undefined {
  const render = toolWidgets[`${categorySlug}/${toolSlug}`];
  return render?.();
}
