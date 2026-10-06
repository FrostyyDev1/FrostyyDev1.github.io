import Link from "next/link";

import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Page not found",
  description: "This page is not on Jacob Wiseman's portfolio.",
  path: "/404/",
});

export default function NotFound() {
  return (
    <section className="miss">
      <div className="container">
        <p className="t-label">404</p>
        <h1 className="t-display">Page not found</h1>
        <p className="t-lead">
          That address is not on this site. The work and contact pages are.
        </p>
        <div className="hero-ctas">
          <Link className="btn btn-primary" href="/projects">
            View work
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
