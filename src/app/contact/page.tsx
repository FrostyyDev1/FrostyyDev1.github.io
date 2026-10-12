import type { Metadata } from "next";

import {
  contactEmailHref,
  contactEmailLabel,
  person,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jacob Wiseman for IT support, help desk, desktop support, and networking roles in the Charleston, West Virginia area.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="section" style={{ borderTop: 0 }}>
        <div className="container">
          <p className="t-label">Contact</p>
          <h1 className="t-h1" style={{ marginTop: 20, maxWidth: "10em" }}>
            Contact
          </h1>
          <p className="t-lead" style={{ marginTop: 28 }}>
            The fastest way to reach me is email. I am based in {person.location}.{" "}
            {person.availability}.
          </p>
          <a className="contact-mail" href={contactEmailHref}>
            {contactEmailLabel}
            <span aria-hidden="true"> →</span>
          </a>
          <p className="t-small note">
            TODO: this mailto is a placeholder. Jacob still needs to put his
            real email address here. A phone number is not published.
          </p>

          <div className="contact-grid">
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <dl>
                <dt>LinkedIn</dt>
                <dd>
                  {person.linkedinLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </dd>
              </dl>
            </a>
            <a href={person.resumeHref}>
              <dl>
                <dt>Résumé</dt>
                <dd>Download PDF</dd>
              </dl>
            </a>
            <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
              <dl>
                <dt>Business</dt>
                <dd>
                  {person.business}
                  <span className="sr-only"> (opens in a new tab)</span>
                </dd>
              </dl>
            </a>
            <div>
              <dl>
                <dt>Location</dt>
                <dd>{person.location}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
