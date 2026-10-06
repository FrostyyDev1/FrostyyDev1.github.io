import Link from "next/link";

import {
  CertGrid,
  Portrait,
  ProofRow,
  SectionHead,
  SkillGrid,
  WorkList,
} from "@/components/site/blocks";
import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";
import { roles, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Jacob Wiseman — IT Support, Desktop Support & Networking",
  description:
    "Jacob Wiseman: entry-level IT support professional with CompTIA A+, Network+, and ITIL 4 Foundation. Homelab and PC repair case studies, experience, and contact.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container grid-12 hero-grid">
          <div className="hero-copy">
            <p className="t-label hero-eyebrow" {...revealProps()}>
              <span className="sq" aria-hidden="true" />
              {site.eyebrow}
            </p>
            <h1 id="hero-title" className="t-display" {...revealProps(".06s")}>
              Jacob <span className="l2">Wiseman</span>
            </h1>
            <p className="t-lead" {...revealProps(".12s")}>
              {site.heroLead}
            </p>
            <div className="hero-ctas" {...revealProps(".18s")}>
              <a className="btn btn-primary" href={site.resumeHref}>
                Download résumé <span className="tag">PDF</span>
              </a>
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                Email me
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
          <Portrait src={site.portrait} />
        </div>

        <div className="container grid-12 hero-strip" {...revealProps(".24s")}>
          <div className="strip-cell strip-certs">
            <p className="t-label">Certified</p>
            <ProofRow />
          </div>
          <div className="strip-cell strip-look">
            <p className="t-label">Looking for</p>
            <p>
              {site.lookingFor} <span className="sub">{site.lookingSub}</span>
            </p>
          </div>
          <div className="strip-cell strip-edu">
            <p className="t-label">Education</p>
            <p>
              {site.educationShort} <span className="sub">{site.educationSub}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="container">
          <SectionHead
            index="01"
            label="Work"
            title="Selected work"
            titleId="work-title"
            intro={site.workIntro}
          />
          <WorkList />
        </div>
      </section>

      <section className="section band-ivory" id="certifications" aria-labelledby="cert-title">
        <div className="container">
          <SectionHead
            index="02"
            label="Certifications"
            title="Verified credentials"
            titleId="cert-title"
            intro={site.certIntro}
          />
          <CertGrid />
          <p className="cert-note">
            <Rich text={site.certResumeNote} />
          </p>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="xp-title">
        <div className="container">
          <SectionHead
            index="03"
            label="Experience"
            title="Experience"
            titleId="xp-title"
            intro={site.experienceIntro}
          />
          <ol className="xp-list">
            {roles.map((role) => (
              <li className="xp-row grid-12" key={role.dates + role.title} {...revealProps()}>
                <p className="xp-when">{role.dates}</p>
                <div className="xp-role">
                  <h3>{role.title}</h3>
                  <p className="org">
                    <Rich text={role.org} /> · {role.place}
                  </p>
                </div>
                <p className="xp-desc">
                  <Rich text={role.summary} />
                </p>
              </li>
            ))}
            <li className="xp-row grid-12 edu" {...revealProps()}>
              <p className="xp-when">Expected Sep 2027</p>
              <div className="xp-role">
                <h3>B.S. Information Technology</h3>
                <p className="org">Colorado State University</p>
              </div>
              <p className="xp-desc">In progress.</p>
            </li>
          </ol>
          <div className="xp-foot">
            <p className="t-small">The full timeline, with education and certifications, is on its own page.</p>
            <Link className="link-arrow" href="/experience">
              Read experience{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section rule-top" id="about" aria-labelledby="about-title">
        <div className="container">
          <header className="section-head" {...revealProps()}>
            <p className="t-label index">
              <b>04</b> About
            </p>
            <h2 id="about-title" className="sr-only">
              About
            </h2>
          </header>
          <div className="grid-12 about-grid">
            <p className="about-statement" {...revealProps()}>
              {site.aboutStatement} <span className="dim">{site.aboutDim}</span>
            </p>
            <p className="about-more t-body" {...revealProps()}>
              <Rich text={site.aboutMore} />
            </p>
            <SkillGrid />
          </div>
          <div className="xp-foot">
            <p className="t-small">{site.locationLine}</p>
            <Link className="link-arrow" href="/about">
              More about Jacob{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <header className="section-head" {...revealProps()} style={{ marginBottom: "var(--s-7)" }}>
            <p className="t-label index">
              <b>05</b> Contact
            </p>
          </header>
          <h2 id="contact-title" {...revealProps()}>
            {site.contactTitleLead}{" "}
            <span className="t-serif">{site.contactTitleAccent}</span>
          </h2>
          <a className="contact-mail" href={`mailto:${site.email}`} {...revealProps()}>
            <span className="ph">{site.email}</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <dl className="contact-meta" {...revealProps()}>
            <div>
              <dt className="t-label">LinkedIn</dt>
              <dd>
                <a href={site.linkedinHref} target="_blank" rel="noopener noreferrer">
                  {site.linkedinLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-label">Résumé</dt>
              <dd>
                <a href={site.resumeHref}>Download PDF (1 page)</a>
              </dd>
            </div>
            <div>
              <dt className="t-label">Location</dt>
              <dd>
                {site.locationLine} · <Rich text={site.availability} />
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
