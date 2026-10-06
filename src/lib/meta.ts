import type { Metadata } from "next";

import { site } from "@/content/site";

export function pageMeta(options: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = options.absoluteTitle
    ? options.title
    : `${options.title} — ${site.name}`;

  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description: options.description,
    alternates: { canonical: options.path },
    openGraph: {
      title: fullTitle,
      description: options.description,
      url: options.path,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: site.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: options.description,
      images: ["/og-image.png"],
    },
  };
}
