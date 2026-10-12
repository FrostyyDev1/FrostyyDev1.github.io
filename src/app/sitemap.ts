import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

const paths = [
  "/",
  "/about/",
  "/experience/",
  "/certifications/",
  "/contact/",
  "/projects/",
  "/projects/homelab/",
  "/projects/northstar-it/",
  "/projects/custom-pcs/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-12");

  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
