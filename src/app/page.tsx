import Link from "next/link";
import Image from "next/image";

import { Marquee } from "@/components/Marquee";
import { Shell } from "@/components/Shell";
import {
  contactEmail,
  contactEmailHref,
  education,
  featuredCerts,
  person,
  roles,
} from "@/content/site";

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-grid">
          <div className="rise hero-title">
            <p className="eyebrow">Elkview / Charleston, WV</p>
            <h1>
              Jacob <span className="hero-surname">Wiseman</span>
            </h1>
          </div>
          <div className="hero-aside rise" style={{ animationDelay: "80ms" }}>
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              Open to IT support roles
            </p>
            <p>
              Desktop support, systems, and networking — from {person.locationLong}.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap bento" aria-label="Overview">
        <article className="card slot-intro rise">
          <p className="eyebrow">Looking for</p>
          <h2>A desk, a device, and a network that has to keep working.</h2>
          <p>
            I want the next role to be hands-on: IT Support Engineer, IT
            technician, desktop support, or systems and networking. I live in
            Elkview, in the Charleston, West Virginia area.
          </p>
        </article>

        <article className="card card-shell slot-shell rise" style={{ animationDelay: "70ms" }}>
          <div className="shell-top">
            <span className="status-dot" aria-hidden="true" />
            <p>NorthStar shell</p>
            <p className="shell-hint">Tab completes</p>
          </div>
          <Shell />
        </article>

        <article className="card slot-seek rise" style={{ animationDelay: "120ms" }}>
          <p className="eyebrow">Roles</p>
          <ol className="role-list">
            {person.seeking.map((role, index) => (
              <li key={role}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {role}
              </li>
            ))}
          </ol>
        </article>

        <Link href="/experience#northstar" className="card slot-north rise" style={{ animationDelay: "40ms" }}>
          <p className="eyebrow">Owner</p>
          <h2>{roles[0].org}</h2>
          <p>{roles[0].summary}</p>
          <span className="card-go">Experience</span>
        </Link>

        <Link href="/experience#wvu" className="card slot-wvu rise" style={{ animationDelay: "90ms" }}>
          <p className="eyebrow">Registration Specialist</p>
          <h2>Thomas Imaging Center</h2>
          <p>{roles[1].summary}</p>
          <span className="card-go">Experience</span>
        </Link>

        <Link href="/about" className="card slot-edu rise" style={{ animationDelay: "130ms" }}>
          <p className="eyebrow">Expected {education.expected}</p>
          <h2>{education.degree}</h2>
          <p>{education.school}</p>
          <span className="card-go">About</span>
        </Link>

        {featuredCerts.map((cert) => (
          <Link key={cert.id} href="/certifications" className={`card slot-${cert.id} cert-mini rise`}>
            <Image
              src={cert.image}
              alt=""
              width={cert.width}
              height={cert.height}
            />
            <div>
              <h2>{cert.name}</h2>
              <p>
                Earned {cert.earned}
                <br />
                Expires {cert.expires}
              </p>
            </div>
          </Link>
        ))}

        <Link href="/contact" className="card slot-mail rise">
          <p className="eyebrow">Contact</p>
          <h2>Email is the direct line.</h2>
          <p>{contactEmail}</p>
          <span className="card-go">Write</span>
        </Link>
      </section>

      <Marquee />

      <section className="contact-band" id="contact" aria-labelledby="home-contact">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h2 id="home-contact">Say hello.</h2>
          <a className="email-link" href={contactEmailHref}>
            {contactEmail}
          </a>
          <div className="contact-row">
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
              {person.business}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/contact">Contact page</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
