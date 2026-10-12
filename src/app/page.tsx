import Link from "next/link";

import CertGrid from "@/components/CertGrid";
import Portrait from "@/components/Portrait";
import ProjectArt from "@/components/ProjectArt";
import {
  certifications,
  contactEmailHref,
  contactEmailLabel,
  person,
  projects,
  roles,
} from "@/content/site";

export default function HomePage() {
  const featured = projects.slice(0, 2);
  const preview = roles.slice(0, 4);

  return (
    <main id="main">
      <section className="container hero">
        <div className="hero-copy">
          <p className="t-label">
            IT support · Desktop support · Networking — Charleston, WV
          </p>
          <h1 className="t-display">
            Jacob <span className="name-accent">Wiseman</span>
          </h1>
          <p className="t-lead">
            IT support technician with CompTIA A+, Network+, and ITIL 4
            Foundation. I troubleshoot Windows PCs and hardware, run a
            Raspberry Pi homelab, and explain fixes in plain language.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={person.resumeHref}>
              Download résumé (PDF)
            </a>
            <a className="btn btn-ghost" href={contactEmailHref}>
              {contactEmailLabel}
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
          <ul className="proof-row">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <a href="/certifications/">{cert.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <Portrait />
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Selected work</p>
            <h2 id="work-title" className="t-h2">
              Two hands-on projects
            </h2>
            <p className="t-body">
              The homelab is where I practice DNS, remote access, and
              monitoring. NorthStar IT Services is the PC repair and support
              work I do for people around Charleston.
            </p>
          </header>
          <div className="work-list">
            {featured.map((project) => (
              <Link key={project.href} href={project.href} className="project-row">
                <div className="thumb-frame">
                  <ProjectArt kind={project.art} />
                </div>
                <div className="project-copy">
                  <p className="t-label">{project.kicker}</p>
                  <h3 className="t-h3">{project.title}</h3>
                  <p className="t-body">{project.summary}</p>
                  <dl className="meta-row">
                    {project.meta.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="link-quiet" href="/projects/">
              All projects
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Experience</p>
            <h2 id="experience-title" className="t-h2">
              Support, repair, and a front desk
            </h2>
            <p className="t-body">
              Customer-facing work where I learned to stay calm, write things
              down, and protect sensitive information, plus the repair business
              I run.
            </p>
          </header>
          <div className="home-roles">
            {preview.map((role) => (
              <Link key={role.company} href="/experience/" className="home-role">
                <time>{role.period}</time>
                <h3 className="t-h3" style={{ fontSize: 22 }}>
                  {role.role}
                </h3>
                <p>
                  {role.company}. {role.line}
                </p>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="link-quiet" href="/experience/">
              Full experience
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="certifications" aria-labelledby="cert-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Certifications</p>
            <h2 id="cert-title" className="t-h2">
              Verified credentials
            </h2>
            <p className="t-body">
              CompTIA A+, CompTIA Network+, and ITIL 4 Foundation. Credential
              IDs are not listed on this site.
            </p>
          </header>
          <CertGrid />
          <p className="t-small note">
            ITIL is a registered trademark of the PeopleCert group. Used under
            licence from PeopleCert. All rights reserved.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <p className="t-label">Contact</p>
          <h2 id="contact-title" className="t-h2" style={{ marginTop: 20, maxWidth: "12em" }}>
            Hiring for IT support? <span className="t-serif">Let&apos;s talk.</span>
          </h2>
          <a className="contact-mail" href={contactEmailHref}>
            {contactEmailLabel}
            <span aria-hidden="true">→</span>
          </a>
          <p className="t-small note">
            {person.location}. {person.availability}.
          </p>
          <div className="inline-actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-ghost" href="/contact/">
              Contact page
            </Link>
            <a className="btn btn-primary" href={person.resumeHref}>
              Résumé PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
