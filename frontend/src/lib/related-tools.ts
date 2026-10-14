import { getLiveCategories } from "@/config/tools";

export interface RelatedTool {
  categorySlug: string;
  categoryTitle: string;
  slug: string;
  title: string;
}

/**
 * Tools that follow this one in its category, wrapping around, so every tool is linked from its
 * neighbours instead of every page linking to the same first few.
 */
export function getSameCategoryTools(categorySlug: string, slug: string, count = 6): RelatedTool[] {
  const category = getLiveCategories().find((c) => c.slug === categorySlug);
  if (!category) return [];
  const others = category.tools.filter((t) => t.slug !== slug);
  const index = Math.max(0, category.tools.findIndex((t) => t.slug === slug));
  const rotated = [...others.slice(index), ...others.slice(0, index)];
  return rotated.slice(0, count).map((t) => ({
    categorySlug: category.slug,
    categoryTitle: category.title,
    slug: t.slug,
    title: t.title,
  }));
}
