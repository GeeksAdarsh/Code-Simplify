import type { MetadataRoute } from "next";
import { getLiveCategories, siteConfig, toolHref } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getLiveCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/categories`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: `${siteConfig.url}${toolHref(category.slug, tool.slug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
