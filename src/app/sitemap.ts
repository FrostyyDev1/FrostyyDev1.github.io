import type { MetadataRoute } from "next";

import { pages, siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}/`,
    lastModified: "2026-10-06",
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
