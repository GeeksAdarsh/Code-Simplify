import type { ToolExtraContent } from "./types";
import { group1 } from "./group-1";
import { group2 } from "./group-2";
import { group3 } from "./group-3";
import { group4 } from "./group-4";
import { group5 } from "./group-5";
import { group6 } from "./group-6";

const toolExtraContent: Record<string, ToolExtraContent> = {
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...group5,
  ...group6,
};

export function getToolExtraContent(categorySlug: string, toolSlug: string): ToolExtraContent | undefined {
  return toolExtraContent[`${categorySlug}/${toolSlug}`];
}
