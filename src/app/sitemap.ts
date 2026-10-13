import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/experience", "/certifications", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}/`,
      lastModified: "2026-10-13",
    }),
  );
}
