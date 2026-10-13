import Link from "next/link";

import { contactEmail, contactEmailHref, person } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-section="footer">
      <div className="frame footer-grid">
        <p className="footer-bio">
          Jacob Wiseman — IT support in Elkview and Charleston, West Virginia.
          Owner of {person.business}.
        </p>
        <div>
          <h2>General</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/experience">Experience</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Specifics</h2>
          <ul>
            <li>
              <Link href="/certifications">Certifications</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>More</h2>
          <ul>
            <li>
              <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
                {person.businessUrlLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={contactEmailHref}>{contactEmail}</a>
            </li>
            <li>
              <Link href="/contact">Write</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
