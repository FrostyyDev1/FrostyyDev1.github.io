import type { Metadata } from "next";
import Link from "next/link";

import { person } from "@/content/site";

export const metadata: Metadata = {
  title: "Custom PCs",
  description:
    "Custom PC builds from NorthStar IT Services: compatibility, assembly, firmware, Windows, and a stability check.",
};

const checks = [
  {
    title: "Use and budget",
    text: "What the computer has to do, and what it is allowed to cost, come before a parts list.",
  },
  {
    title: "Compatibility",
    text: "Socket, chipset, cooler height, case clearance, power-supply headroom, and the BIOS version the board needs for that CPU.",
  },
  {
    title: "Assembly",
    text: "Seat the CPU and memory, route power, and install storage. A cable that blocks a fan is a thermal problem later.",
  },
  {
    title: "Firmware and Windows",
    text: "Update firmware when the board needs it, install Windows 10 or 11, then the drivers the hardware actually requires.",
  },
  {
    title: "Stability",
    text: "Watch temperatures and let the machine do the work it was built for before it goes home.",
  },
];

export default function CustomPCsPage() {
  return (
    <main id="main">
      <div className="container" style={{ paddingTop: 28 }}>
        <Link className="link-quiet" href="/projects/">
          ← All work
        </Link>
      </div>

      <header className="container page-header">
        <p className="t-label">Hardware · NorthStar IT Services</p>
        <h1 className="t-h1">Custom PCs</h1>
        <p className="t-lead">
          Custom desktops are part of NorthStar IT Services LLC, not a separate
          company. I plan the build, assemble it, and test it before handoff.
        </p>
        <dl className="cs-meta">
          <div>
            <dt>Part of</dt>
            <dd>{person.business}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Owner and builder</dd>
          </div>
          <div>
            <dt>Systems</dt>
            <dd>Windows 10/11</dd>
          </div>
          <div>
            <dt>Place</dt>
            <dd>Charleston, WV area</dd>
          </div>
        </dl>
      </header>

      <section className="section" aria-labelledby="build-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">A build</p>
            <h2 id="build-title" className="t-h2">
              Compatibility first, then the screws
            </h2>
            <p className="t-body">
              I do not publish a count of builds. The useful part is the
              sequence, because a cheap part that does not fit costs more than
              the one that does.
            </p>
          </header>
          <div className="timeline">
            {checks.map((check, index) => (
              <article className="role" key={check.title}>
                <p className="t-label">0{index + 1}</p>
                <div>
                  <h3 className="t-h3" style={{ fontSize: 28 }}>
                    {check.title}
                  </h3>
                  <p className="t-body summary">{check.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="repair-link-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Same business</p>
            <h2 id="repair-link-title" className="t-h2">
              Builds sit next to repairs
            </h2>
          </header>
          <p className="t-body">
            A custom PC and a repair use the same checks: what failed or what
            is missing, whether the part belongs in that system, and a test
            after the case is closed. Upgrades on a machine someone already
            owns follow that same path.
          </p>
          <div className="inline-actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/projects/northstar-it/">
              NorthStar IT
            </Link>
            <a
              className="btn btn-ghost"
              href={person.businessUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {person.businessUrlLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <nav className="pager" style={{ marginTop: 48 }} aria-label="Project">
            <Link href="/projects/northstar-it/">← NorthStar IT</Link>
            <Link href="/projects/homelab/">HomeLab →</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
