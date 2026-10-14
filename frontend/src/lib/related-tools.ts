import { getAllTools, getLiveCategories } from "@/config/tools";

export interface RelatedTool {
  categorySlug: string;
  categoryTitle: string;
  slug: string;
  title: string;
}

const STOP_WORDS = new Set([
  "to", "and", "or", "the", "a", "an", "of", "for", "online", "tool", "generator", "random", "calculator", "converter",
]);

function significantWords(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .split(/[^a-z0-9#+]+/)
      .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
  );
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

/** Tools in other categories whose titles share a meaningful word, e.g. "JSON to YAML" ↔ "YAML Formatter". */
export function getCrossCategoryTools(categorySlug: string, title: string, count = 4): RelatedTool[] {
  const words = significantWords(title);
  if (words.size === 0) return [];
  return getAllTools()
    .filter((t) => t.status === "live" && t.categorySlug !== categorySlug && t.title !== title)
    .map((t) => {
      const shared = [...significantWords(t.title)].filter((word) => words.has(word)).length;
      return { tool: t, shared };
    })
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || a.tool.title.localeCompare(b.tool.title))
    .slice(0, count)
    .map(({ tool }) => ({
      categorySlug: tool.categorySlug,
      categoryTitle: tool.categoryTitle,
      slug: tool.slug,
      title: tool.title,
    }));
}
