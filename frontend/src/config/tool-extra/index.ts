import type { ToolExtraContent } from "./types";
import { group1 } from "./group-1";
import { group2 } from "./group-2";
import { group3 } from "./group-3";
import { group4 } from "./group-4";
import { group5 } from "./group-5";
import { group6 } from "./group-6";
import { group7 } from "./group-7";
import { group8 } from "./group-8";
import { group9 } from "./group-9";
import { group10 } from "./group-10";
import { group11 } from "./group-11";
import { group12 } from "./group-12";

const toolExtraContent: Record<string, ToolExtraContent> = {
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...group5,
  ...group6,
  ...group7,
  ...group8,
  ...group9,
  ...group10,
  ...group11,
  ...group12,
};

export function getToolExtraContent(categorySlug: string, toolSlug: string): ToolExtraContent | undefined {
  return toolExtraContent[`${categorySlug}/${toolSlug}`];
}
