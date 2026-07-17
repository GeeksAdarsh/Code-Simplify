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
import { JsonToExcelTool } from "@/components/tools/json-to-excel-tool";
import { JsonToJavaTool } from "@/components/tools/json-to-java-tool";
import { JsonToCSharpTool } from "@/components/tools/json-to-csharp-tool";
import { JsonToPhpTool } from "@/components/tools/json-to-php-tool";
import { JsonToTypeScriptTool } from "@/components/tools/json-to-typescript-tool";
import { JsonToKotlinTool } from "@/components/tools/json-to-kotlin-tool";
import { JsonToDartTool } from "@/components/tools/json-to-dart-tool";
import { JsonEscapeUnescapeTool } from "@/components/tools/json-escape-unescape-tool";
import { XmlFormatterTool } from "@/components/tools/xml-formatter-tool";
import { XmlValidatorTool } from "@/components/tools/xml-validator-tool";
import { XmlMinifierTool } from "@/components/tools/xml-minifier-tool";
import { XmlToJsonTool } from "@/components/tools/xml-to-json-tool";
import { XmlToCsvTool } from "@/components/tools/xml-to-csv-tool";
import { XmlViewerTool } from "@/components/tools/xml-viewer-tool";
import { XmlCompareTool } from "@/components/tools/xml-compare-tool";
import { XPathTesterTool } from "@/components/tools/xpath-tester-tool";
import { YamlFormatterTool } from "@/components/tools/yaml-formatter-tool";
import { YamlValidatorTool } from "@/components/tools/yaml-validator-tool";
import { YamlToJsonTool } from "@/components/tools/yaml-to-json-tool";

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
  "json/to-excel": () => <JsonToExcelTool />,
  "json/to-java": () => <JsonToJavaTool />,
  "json/to-csharp": () => <JsonToCSharpTool />,
  "json/to-php": () => <JsonToPhpTool />,
  "json/to-typescript": () => <JsonToTypeScriptTool />,
  "json/to-kotlin": () => <JsonToKotlinTool />,
  "json/to-dart": () => <JsonToDartTool />,
  "json/escape-unescape": () => <JsonEscapeUnescapeTool />,
  "xml/formatter": () => <XmlFormatterTool />,
  "xml/validator": () => <XmlValidatorTool />,
  "xml/minifier": () => <XmlMinifierTool />,
  "xml/to-json": () => <XmlToJsonTool />,
  "xml/to-csv": () => <XmlToCsvTool />,
  "xml/viewer": () => <XmlViewerTool />,
  "xml/compare": () => <XmlCompareTool />,
  "xml/xpath-tester": () => <XPathTesterTool />,
  "yaml/formatter": () => <YamlFormatterTool />,
  "yaml/validator": () => <YamlValidatorTool />,
  "yaml/to-json": () => <YamlToJsonTool />,
  "yaml/from-json": () => <JsonToYamlTool />,
};

export function getToolWidget(categorySlug: string, toolSlug: string): ReactNode | undefined {
  const render = toolWidgets[`${categorySlug}/${toolSlug}`];
  return render?.();
}
