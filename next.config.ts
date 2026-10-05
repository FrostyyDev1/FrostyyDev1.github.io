import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages works much more reliably with folder-style URLs.
  trailingSlash: true,

  // Safe for static hosting if next/image is ever used later.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
