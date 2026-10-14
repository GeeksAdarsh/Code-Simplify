import { guides } from "./guides";
import type { Guide } from "./guide-types";

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesForTool(categorySlug: string, slug: string): Guide[] {
  return guides.filter((guide) =>
    guide.tools.some((ref) => ref.categorySlug === categorySlug && ref.slug === slug)
  );
}
