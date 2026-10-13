import type { Metadata } from "next";
import Link from "next/link";

import { education, person, roles } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jacob Wiseman, based in Elkview and Charleston, West Virginia, is seeking IT support, desktop support, and systems and networking work. B.S. Information Technology at CSU Global, expected September 2027.",
};

export default function AboutPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero wrap">
        <p className="eyebrow">About</p>
        <h1>Support work, based in Elkview.</h1>
        <p className="lede">
          {person.name} lives in {person.locationLong}. He is looking for an{" "}
          {person.seeking[0]}, {person.seeking[1].toLowerCase()},{" "}
          {person.seeking[2].toLowerCase()}, or {person.seeking[3].toLowerCase()}{" "}
          role.
        </p>
      </header>

      <div className="wrap about-grid">
        <section className="card prose-card" aria-labelledby="now-heading">
          <p className="eyebrow">Now</p>
          <h2 id="now-heading">Two places the work already lives.</h2>
          <p>
            He owns {roles[0].org}. The business is based in Elkview and works
            in the Charleston area.
          </p>
          <p>
            He is also a {roles[1].title} at {roles[1].org}. Patient registration
            there runs in Epic.
          </p>
          <p>
            The degree in progress is a {education.degree} at {education.school},
            expected {education.expected}.
          </p>
          <Link className="card-go" href="/experience">
            Read the experience
          </Link>
        </section>

        <aside className="card fact-card" aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="sr-only">
            Facts
          </h2>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{person.location}</dd>
            </div>
            <div>
              <dt>School</dt>
              <dd>
                {education.school}
                <span>{education.degree}</span>
                <span>Expected {education.expected}</span>
              </dd>
            </div>
            <div>
              <dt>Business</dt>
              <dd>{person.business}</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>{person.seeking.join(" · ")}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="wrap seek-band" aria-labelledby="seek-heading">
        <h2 id="seek-heading">What he is applying toward</h2>
        <ol>
          {person.seeking.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ol>
        <Link className="text-link" href="/certifications">
          Certifications
        </Link>
      </section>
    </main>
  );
}
