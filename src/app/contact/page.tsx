import type { Metadata } from "next";

import {
  contactEmail,
  contactEmailHref,
  person,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email Jacob Wiseman at jacob.wiseman345@gmail.com about IT support, desktop support, and systems and networking roles in the Charleston, West Virginia area.",
};

export default function ContactPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero wrap">
        <p className="eyebrow">Contact</p>
        <h1>Email is the direct line.</h1>
        <p className="lede">
          {person.name} is in {person.locationLong}. A phone number is not
          published.
        </p>
      </header>

      <section className="wrap contact-sheet" aria-labelledby="mail-heading">
        <h2 id="mail-heading" className="sr-only">
          Email
        </h2>
        <a className="email-link" href={contactEmailHref}>
          {contactEmail}
        </a>
        <ul className="contact-sheet-list">
          <li>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <strong>
                {person.linkedinLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </strong>
            </a>
          </li>
          <li>
            <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
              <span>Business</span>
              <strong>
                {person.business}
                <span className="sr-only"> (opens in a new tab)</span>
              </strong>
            </a>
          </li>
          <li>
            <div>
              <span>Location</span>
              <strong>{person.location}</strong>
            </div>
          </li>
          <li>
            <div>
              <span>Open to</span>
              <strong>{person.seeking.join(" · ")}</strong>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
