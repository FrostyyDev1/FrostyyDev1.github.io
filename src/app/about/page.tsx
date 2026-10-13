import type { Metadata } from "next";
import Link from "next/link";

import Portrait from "@/components/Portrait";
import { education, person, skillGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jacob Wiseman, an IT student in Elkview, West Virginia, seeking IT support, help desk, and desktop support work.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <header className="container page-header">
        <p className="t-label">About</p>
        <h1 className="t-h1">
          Jacob Wiseman, <span className="t-serif">IT support.</span>
        </h1>
      </header>

      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="hero" style={{ minHeight: 0, paddingBlock: 0, alignItems: "start" }}>
          <div>
            <p className="t-body">
              I am Jacob Wiseman, an IT student at CSU Global working toward a
              B.S. in Information Technology, expected September 2027. I live in
              Elkview, West Virginia, in the Charleston area.
            </p>
            <p className="t-body" style={{ marginTop: 18 }}>
              I hold CompTIA A+, CompTIA Network+, and ITIL 4 Foundation. I own
              NorthStar IT Services LLC, which does residential and
              small-business IT support and PC repair. In 2026 I worked remote
              technical support at Startek, helping Optimum customers with
              modem, router, and Wi-Fi problems. Before that I registered
              patients at WVU Medicine, Thomas Imaging Center in South
              Charleston. I used Epic, handled protected health information,
              and helped coworkers with basic computer troubleshooting.
            </p>
            <p className="t-body" style={{ marginTop: 18 }}>
              I am looking for a full-time IT support, help desk, desktop
              support, or networking role. I want to get better at systems and
              networks while staying close to the person who has the problem.
            </p>
            <p className="t-small" style={{ marginTop: 22 }}>
              Off the clock: Noah Kahan and Harrison Boe.
            </p>
            <div className="inline-actions" style={{ marginTop: 28 }}>
              <Link className="btn btn-primary" href="/contact/">
                Contact
              </Link>
              <a className="btn btn-ghost" href={person.resumeHref}>
                Résumé PDF
              </a>
              <a
                className="link-quiet"
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <Portrait />
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Skills</p>
            <h2 id="skills-title" className="t-h2">
              What I can do, and where I learned it
            </h2>
          </header>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.name}>
                <h3 className="t-h3" style={{ fontSize: 26 }}>
                  {group.name}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <strong style={{ fontWeight: 500, color: "var(--text-1)" }}>
                        {item.name}
                      </strong>
                      <span>{item.evidence}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="study-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Education</p>
            <h2 id="study-title" className="t-h2">
              Still in school
            </h2>
          </header>
          <div className="timeline">
            {education.map((item) => (
              <article className="role" key={item.title}>
                <p className="t-label">{item.period}</p>
                <div>
                  <h3 className="t-h3" style={{ fontSize: 28 }}>
                    {item.title}
                  </h3>
                  <p className="org">{item.org}</p>
                  <p className="t-body summary">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <dl className="cs-meta">
            <div>
              <dt>Based</dt>
              <dd>{person.location}</dd>
            </div>
            <div>
              <dt>Looking for</dt>
              <dd>{person.seeking}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{person.availability}</dd>
            </div>
            <div>
              <dt>Business</dt>
              <dd>
                <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
                  {person.businessUrlLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
