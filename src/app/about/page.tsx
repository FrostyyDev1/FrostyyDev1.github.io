import Link from "next/link";

import { SkillGrid } from "@/components/site/blocks";
import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";
import { education, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "About",
  description:
    "About Jacob Wiseman, an IT student in Elkview, West Virginia, with CompTIA A+, Network+, and ITIL 4 Foundation, looking for IT support work.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <section className="cs-hero about-page" aria-labelledby="about-page-title">
      <div className="container">
        <header className="section-head" {...revealProps()}>
          <p className="t-label index">
            <b>01</b> About
          </p>
          <h1 id="about-page-title" className="t-display">
            About
          </h1>
        </header>
        <div className="grid-12 about-grid">
          <p className="about-statement" {...revealProps()}>
            {site.aboutLong}
          </p>
          <p className="about-more t-body" {...revealProps()}>
            <Rich text={site.aboutMore} />
          </p>
          <SkillGrid />
        </div>

        <div className="role-list" style={{ marginTop: "var(--s-8)" }}>
          {education.map((item) => (
            <article className="role" key={item.title}>
              <p className="when">{item.dates}</p>
              <div>
                <h2>{item.title}</h2>
                <p className="org">{item.org}</p>
                <p className="lede">{item.detail}</p>
              </div>
            </article>
          ))}
          <article className="role">
            <p className="when">Based</p>
            <div>
              <h2>{site.locationLine}</h2>
              <p className="lede">
                Looking for {site.lookingFor}. {site.lookingSub}.{" "}
                <Rich text={site.availability} />
              </p>
            </div>
          </article>
        </div>

        <p className="callout">
          <Rich text={site.offClock} />
        </p>

        <div className="stack-links">
          <Link className="btn btn-primary" href="/contact">
            Contact
          </Link>
          <a className="btn btn-ghost" href={site.resumeHref}>
            Download résumé
          </a>
          <a
            className="link-arrow"
            href={site.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
