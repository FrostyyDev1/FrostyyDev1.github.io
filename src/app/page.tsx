import Link from "next/link";

import CertStrip from "@/components/CertStrip";
import HomeTerminal from "@/components/HomeTerminal";
import ProjectArt from "@/components/ProjectArt";
import {
  contactEmailHref,
  contactEmailLabel,
  person,
  projects,
  roles,
} from "@/content/site";

const drivers = [
  "Windows 10/11",
  "macOS",
  "Microsoft 365",
  "Router and Wi-Fi",
  "Pi-hole",
  "Tailscale",
  "Docker",
  "Uptime Kuma",
];

export default function HomePage() {
  const preview = roles.slice(0, 4);

  return (
    <main id="main">
      <HomeTerminal />

      <section className="section" aria-label="Right now">
        <div className="container">
          <ul className="status-row">
            <li>
              <Link href="/projects/northstar-it/">
                <span className="t-label">Now</span>
                <strong>NorthStar IT</strong>
                <span>Owner, Elkview</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </li>
            <li>
              <Link href="/projects/homelab/">
                <span className="t-label">Lab</span>
                <strong>Raspberry Pi 5</strong>
                <span>Pi-hole, Tailscale</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </li>
            <li>
              <Link href="/about/">
                <span className="t-label">Study</span>
                <strong>CSU Global</strong>
                <span>B.S. IT, Sept 2027</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </li>
            <li>
              <a href={contactEmailHref}>
                <span className="t-label">Reach</span>
                <strong>Email</strong>
                <span>{contactEmailLabel}</span>
                <i aria-hidden="true">↗</i>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="bench-title">
        <div className="container">
          <div className="bench">
            <article className="bench-lead">
              <p className="t-label">How the work goes</p>
              <h2 id="bench-title" className="t-h2">
                Find the cause. <span className="t-serif">Then prove it.</span>
              </h2>
              <ul>
                <li>Isolate the failure before stacking fixes on the symptom.</li>
                <li>Say what a repair will cost before the work starts.</li>
                <li>
                  Use the machine the way that person will. If the original
                  problem comes back, it is not done.
                </li>
              </ul>
              <Link className="link-quiet" href="/experience/">
                Full experience
              </Link>
            </article>
            <article className="bench-stack">
              <p className="t-label">On the bench</p>
              <ul className="driver-list">
                {drivers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="t-small">Tools I actually use. Not a wishlist.</p>
            </article>
            <article className="bench-place">
              <p className="t-label">Based</p>
              <h3 className="t-h3">Elkview, WV</h3>
              <p className="t-body">{person.availability}.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Selected work</p>
            <h2 id="work-title" className="t-h2">
              Three things <span className="t-serif">I can open.</span>
            </h2>
          </header>
          <div className="work-list">
            {projects.map((project, index) => (
              <Link key={project.href} href={project.href} className="project-row">
                <span className="work-num" aria-hidden="true">
                  0{index + 1}
                </span>
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
        </div>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Experience</p>
            <h2 id="experience-title" className="t-h2">
              Support, repair, <span className="t-serif">and a front desk</span>
            </h2>
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
          <p style={{ marginTop: 20 }}>
            <Link className="link-quiet" href="/experience/">
              Full experience
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="certifications" aria-labelledby="cert-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">~/certs</p>
            <h2 id="cert-title" className="t-h2">
              Three files, <span className="t-serif">with dates.</span>
            </h2>
          </header>
          <CertStrip />
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
