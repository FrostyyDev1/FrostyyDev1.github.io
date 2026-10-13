import type { Metadata } from "next";
import Link from "next/link";

import CertStrip from "@/components/CertStrip";
import {
  education,
  person,
  principles,
  roles,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Jacob Wiseman's experience: NorthStar IT Services, Startek technical support, and WVU Medicine registration, plus earlier customer-service work.",
};

export default function ExperiencePage() {
  return (
    <main id="main">
      <header className="container page-header">
        <p className="t-label">Experience</p>
        <h1 className="t-h1">
          Experience, <span className="t-serif">in order.</span>
        </h1>
        <p className="t-lead">
          Customer-facing roles where I learned to stay calm, document
          carefully, and protect sensitive data, plus my own PC repair work.
        </p>
      </header>

      <section className="section" style={{ borderTop: 0, paddingTop: 0 }} aria-labelledby="roles-title">
        <div className="container">
          <h2 id="roles-title" className="t-h2">
            Where I have worked
          </h2>
          <div className="timeline" style={{ marginTop: 36 }}>
            {roles.map((role) => (
              <article className="role" key={`${role.company}-${role.period}`}>
                <div>
                  <p className="t-label">{role.period}</p>
                  <p className="t-small" style={{ marginTop: 10 }}>
                    {role.place}
                  </p>
                </div>
                <div>
                  <p className="t-label">{role.eyebrow}</p>
                  <h3 className="t-h3">{role.role}</h3>
                  <p className="org">{role.company}</p>
                  <p className="t-body summary">{role.summary}</p>
                  <div className="detail-grid">
                    <div>
                      <p className="t-label">What I handled</p>
                      <ul>
                        {role.handled.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="t-label">Environment</p>
                      <ul className="chips">
                        {role.environment.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="t-label" style={{ marginTop: 22 }}>
                        What it sharpened
                      </p>
                      <ul>
                        {role.sharpened.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="edu-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Education</p>
            <h2 id="edu-title" className="t-h2">
              Still building
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
        </div>
      </section>

      <section className="section" aria-labelledby="certs-on-experience">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Certifications</p>
            <h2 id="certs-on-experience" className="t-h2">
              Fundamentals I can show
            </h2>
            <p className="t-body">
              A+ and Network+ for the machine and the network. ITIL 4
              Foundation for writing down what happened and checking that the
              fix held. Credential IDs are not published here.
            </p>
          </header>
          <CertStrip />
          <p className="t-small note">
            ITIL is a registered trademark of the PeopleCert group. Used under
            licence from PeopleCert. All rights reserved. The résumé PDF lists
            CompTIA A+ and Network+. ITIL 4 Foundation is on this site and
            still needs to be added to the next résumé export.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="link-quiet" href="/certifications/">
              Certification details
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Working principles</p>
            <h2 id="principles-title" className="t-h2">
              How I approach the problem
            </h2>
          </header>
          <div className="principles">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <p className="t-label">0{index + 1}</p>
                <h3 className="t-h3" style={{ marginTop: 18, fontSize: 28 }}>
                  {principle.title}
                </h3>
                <p className="t-body" style={{ marginTop: 12 }}>
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
          <div className="inline-actions" style={{ marginTop: 36 }}>
            <Link className="btn btn-primary" href="/projects/">
              See the projects
            </Link>
            <Link className="btn btn-ghost" href="/contact/">
              Contact
            </Link>
            <a className="link-quiet" href={person.resumeHref}>
              Résumé PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
