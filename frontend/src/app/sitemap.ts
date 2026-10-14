import type { MetadataRoute } from "next";
import { getLiveCategories, siteConfig, toolHref } from "@/config/tools";
import { guides } from "@/config/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getLiveCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/roadmap`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/support`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
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

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: guide.updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...guideRoutes];
}
