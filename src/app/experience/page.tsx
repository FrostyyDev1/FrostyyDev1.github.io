import Link from "next/link";

import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";
import { certifications, education, roles, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Experience",
  description:
    "Work history for Jacob Wiseman: founder and sole operator, WVU Medicine registration, Target, and Taco Bell training, plus education and certifications.",
  path: "/experience/",
});

export default function ExperiencePage() {
  return (
    <>
      <section className="cs-hero" aria-labelledby="xp-page-title">
        <div className="container">
          <p className="t-label page-kicker" {...revealProps()}>
            Career
          </p>
          <div className="cs-title">
            <h1 id="xp-page-title" className="t-display" {...revealProps(".06s")}>
              Experience
            </h1>
          </div>
          <p className="t-lead cs-lead" {...revealProps(".12s")}>
            {site.experienceIntro}
          </p>
          <p className="callout" {...revealProps()}>
            <Rich text={site.businessNote} /> {site.dateNote}
          </p>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="roles-title">
        <div className="container">
          <header className="section-head" {...revealProps()}>
            <p className="t-label index">
              <b>01</b> Roles
            </p>
            <h2 id="roles-title" className="t-h2">
              Where I&apos;ve worked
            </h2>
          </header>
          <div className="role-list">
            {roles.map((role) => (
              <article className="role" key={role.title} {...revealProps()}>
                <p className="when">{role.dates}</p>
                <div>
                  <h3>{role.title}</h3>
                  <p className="org">
                    <Rich text={role.org} /> · {role.place}
                  </p>
                  <ul className="xp-points">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="edu-title">
        <div className="container">
          <header className="section-head" {...revealProps()}>
            <p className="t-label index">
              <b>02</b> Education
            </p>
            <h2 id="edu-title" className="t-h2">
              Education
            </h2>
          </header>
          <div className="role-list">
            {education.map((item) => (
              <article className="role" key={item.title} {...revealProps()}>
                <p className="when">{item.dates}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="org">{item.org}</p>
                  <p className="lede">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="cert-exp-title">
        <div className="container">
          <header className="section-head" {...revealProps()}>
            <p className="t-label index">
              <b>03</b> Certifications
            </p>
            <h2 id="cert-exp-title" className="t-h2">
              Certifications
            </h2>
            <p className="intro t-body">
              <Rich text={site.certResumeNote} />
            </p>
          </header>
          <div className="role-list">
            {certifications.map((cert) => (
              <article className="role" key={cert.id} {...revealProps()}>
                <p className="when">
                  Earned <Rich text={cert.earned} />
                </p>
                <div>
                  <h3>{cert.name}</h3>
                  <p className="org">{cert.issuer}</p>
                  <p className="lede">{cert.covers}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="stack-links">
            <Link className="link-arrow" href="/certifications">
              Certification details{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a className="link-arrow" href={site.resumeHref}>
              Download résumé (PDF){" "}
              <span className="arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
