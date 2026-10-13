import Link from "next/link";

import { Marquee } from "@/components/Marquee";
import { ShellBay } from "@/components/ShellBay";
import { WorkRail } from "@/components/WorkRail";
import {
  contactEmail,
  contactEmailHref,
  education,
  person,
  prompt,
  roles,
} from "@/content/site";

const records = [
  {
    when: "October 2025",
    title: "CompTIA A+ earned",
    href: "/certifications",
    note: "Expires October 2028",
  },
  {
    when: "October 2025",
    title: "CompTIA Network+ earned",
    href: "/certifications",
    note: "Expires October 2028",
  },
  {
    when: "September 2027",
    title: "B.S. Information Technology expected",
    href: "/about",
    note: education.school,
  },
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero" data-section="hero">
        <div className="frame hero-top">
          <h1 className="rise">
            Jacob <span className="hero-surname">Wiseman</span>, IT support
            engineer: Desktops, systems, and networks that stay up.
          </h1>
          <div className="hero-side">
            <article className="hero-card rise" style={{ animationDelay: "80ms" }}>
              <p className="kicker">
                <span className="status-dot" aria-hidden="true" />
                Open to
              </p>
              <ul className="seek-mini">
                {person.seeking.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </article>
            <article className="hero-card hero-profile rise" style={{ animationDelay: "140ms" }}>
              <div className="monogram" aria-hidden="true">
                JW
              </div>
              <div>
                <p className="profile-name">
                  Jacob <span className="hero-surname">Wiseman</span>
                </p>
                <p className="profile-meta">{person.location}</p>
                <p className="profile-prompt">{prompt}</p>
              </div>
            </article>
          </div>
        </div>
        <div className="frame hero-stats">
          <article>
            <p>Now</p>
            <strong>Open to IT support</strong>
          </article>
          <article>
            <p>Based</p>
            <strong>Elkview, WV</strong>
          </article>
          <article>
            <p>Studying</p>
            <strong>{education.school}</strong>
          </article>
          <article>
            <p>Reach out</p>
            <a href={contactEmailHref}>
              <strong>Email</strong>
            </a>
          </article>
        </div>
      </section>

      <section className="band" data-section="method" aria-labelledby="method-heading">
        <div className="frame method-layout">
          <article className="method-track">
            <p className="kicker">The pass</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Listen</strong>
                  <p>Start from the desk, the device, or the network that stopped.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Trace</strong>
                  <p>Hardware, Windows, TCP/IP, or Wi-Fi — follow the actual path.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Restore</strong>
                  <p>Leave the system working, and say what changed.</p>
                </div>
              </li>
            </ol>
          </article>
          <div className="method-side">
            <h2 id="method-heading">How I work</h2>
            <div className="method-cards">
              <article>
                <p className="kicker">Hands on</p>
                <h3>Desks, devices, and the network between them.</h3>
              </article>
              <article>
                <p className="kicker">Local</p>
                <h3>{person.locationLong}.</h3>
              </article>
              <article>
                <p className="kicker">Already in motion</p>
                <h3>Owner at {roles[0].org}. Registration in Epic.</h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="band" data-section="work" aria-labelledby="work-heading">
        <div className="frame">
          <div className="section-head">
            <p className="kicker">Roles and credentials</p>
            <h2 id="work-heading" className="section-title">
              Selected work
            </h2>
          </div>
          <WorkRail />
        </div>
      </section>

      <section className="band" data-section="about" aria-labelledby="about-heading">
        <div className="frame about-home">
          <div>
            <p className="kicker">Know about me</p>
            <h2 id="about-heading" className="section-title">
              IT support, and a little of everything on the desk
            </h2>
            <p className="about-copy">
              {person.name} lives in {person.locationLong}. He is looking for an{" "}
              {person.seeking[0]}, {person.seeking[1].toLowerCase()},{" "}
              {person.seeking[2].toLowerCase()}, or {person.seeking[3]} role.
              He owns {roles[0].org}, and he is a {roles[1].title} at{" "}
              {roles[1].org}.
            </p>
            <Link className="text-link" href="/about">
              About
            </Link>
          </div>
          <div className="about-cards">
            <article>
              <p className="kicker">Open to</p>
              <h3>{person.seeking[0]}</h3>
              <p>{person.seeking.slice(1).join(" · ")}</p>
            </article>
            <article>
              <p className="kicker">Based</p>
              <h3>{person.location}</h3>
              <p>Charleston, West Virginia area.</p>
            </article>
            <article>
              <p className="kicker">Degree</p>
              <h3>{education.degree}</h3>
              <p>
                {education.school}. Expected {education.expected}.
              </p>
            </article>
            <article>
              <p className="kicker">Business</p>
              <h3>{person.business}</h3>
              <p>Owned by Jacob. Based in Elkview.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band" data-section="record" aria-labelledby="record-heading">
        <div className="frame">
          <div className="section-head record-head">
            <div>
              <p className="kicker">On file</p>
              <h2 id="record-heading" className="section-title">
                The record
              </h2>
            </div>
            <Link className="text-link" href="/certifications">
              See certifications
            </Link>
          </div>
          <div className="record-list">
            {records.map((record) => (
              <Link key={record.title} href={record.href} className="record">
                <time>{record.when}</time>
                <span>
                  <strong>{record.title}</strong>
                  <small>{record.note}</small>
                </span>
                <span className="go" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band" data-section="explore" aria-labelledby="explore-heading">
        <div className="frame explore-layout">
          <div>
            <p className="kicker">The shell</p>
            <h2 id="explore-heading" className="section-title">
              Open the shell and say hello
            </h2>
            <p className="about-copy">
              The prompt is {prompt}. Try coffee, fortune, or neofetch. Ctrl K
              opens the same shell from anywhere.
            </p>
          </div>
          <ShellBay />
        </div>
      </section>

      <section className="closer" data-section="cta" aria-labelledby="cta-heading">
        <Marquee />
        <div className="frame closer-copy">
          <h2 id="cta-heading">
            <span>Open to desktop support</span>
            <span>Email is the direct line</span>
          </h2>
          <a className="pill" href={contactEmailHref}>
            Email Jacob
          </a>
          <p className="closer-mail">{contactEmail}</p>
        </div>
      </section>
    </main>
  );
}
