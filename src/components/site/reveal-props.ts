import type { CSSProperties } from "react";

export function revealProps(delay?: string): {
  "data-reveal": string;
  style?: CSSProperties;
} {
  if (!delay) return { "data-reveal": "" };
  return { "data-reveal": "", style: { ["--d" as string]: delay } };
}
