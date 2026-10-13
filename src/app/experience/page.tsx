import type { Metadata } from "next";
import Link from "next/link";

import { person, roles } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Jacob Wiseman owns NorthStar IT Services LLC and is a Registration Specialist at WVU Medicine Thomas Imaging Center, working in Epic.",
};

export default function ExperiencePage() {
  return (
    <main id="main" className="page">
      <header className="page-hero wrap">
        <p className="eyebrow">Experience</p>
        <h1>Owner, and registration in Epic.</h1>
        <p className="lede">
          Two current roles. {person.name} owns {person.business}, and he
          registers patients at WVU Medicine’s Thomas Imaging Center.
        </p>
      </header>

      <div className="wrap experience-list">
        <article id="northstar" className="role-article">
          <p className="eyebrow">01</p>
          <h2>{roles[0].title}</h2>
          <p className="role-org">{roles[0].org}</p>
          <p className="role-place">{roles[0].place}</p>
          <p>{roles[0].summary}</p>
          <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
            {person.businessUrlLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>

        <article id="wvu" className="role-article">
          <p className="eyebrow">02</p>
          <h2>{roles[1].title}</h2>
          <p className="role-org">{roles[1].org}</p>
          <p className="role-place">{roles[1].place}</p>
          <p>{roles[1].summary}</p>
          <p className="role-note">The registration system is Epic.</p>
        </article>
      </div>

      <section className="wrap next-band" aria-labelledby="next-heading">
        <h2 id="next-heading">Where this points</h2>
        <p>
          He is looking for {person.seeking.join(", ")} roles in the{" "}
          {person.location} area.
        </p>
        <div className="contact-row">
          <Link href="/about">About</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </section>
    </main>
  );
}
