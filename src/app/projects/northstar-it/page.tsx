import type { Metadata } from "next";
import Link from "next/link";

import { person } from "@/content/site";

export const metadata: Metadata = {
  title: "NorthStar IT",
  description:
    "NorthStar IT Services LLC: residential and small-business IT support and PC repair, owned by Jacob Wiseman in Elkview, West Virginia.",
};

const steps = [
  {
    title: "Understand",
    text: "Listen until the symptom is specific: what changed, what still works, and what the person needs the computer to do.",
  },
  {
    title: "Diagnose",
    text: "Test before replacing parts. Hardware, Windows, the network, and recent changes get ruled in or out one at a time.",
  },
  {
    title: "Resolve",
    text: "Make the repair, upgrade, or configuration change that matches the cause, and say what it will cost before the work starts.",
  },
  {
    title: "Verify",
    text: "Use the machine the way the person will use it. A repair is done when the original problem stays gone.",
  },
];

const scope = [
  ["Diagnostics", "Find the cause of a hardware, Windows, performance, or reliability problem before ordering parts."],
  ["PC repair", "Desktops and laptops with failed parts, bad configuration, or software that will not start."],
  ["Custom builds", "A desktop planned around a budget and a workload, then assembled and tested. See the custom PC page."],
  ["Upgrades", "Memory, storage, graphics, and cooling, after checking that the part fits the rest of the machine."],
  ["Windows and macOS", "Setup, slow machines, startup items, and the Microsoft 365 apps people actually use."],
  ["Home networks", "Router placement, Wi-Fi that does not reach, and devices that cannot get online."],
  ["Remote support", "The same troubleshooting over a screen share when a visit is not required."],
];

export default function NorthStarPage() {
  return (
    <main id="main">
      <div className="container" style={{ paddingTop: 28 }}>
        <Link className="link-quiet" href="/projects/">
          ← All work
        </Link>
      </div>

      <header className="container page-header">
        <p className="t-label">Case study · IT support</p>
        <h1 className="t-h1">NorthStar IT</h1>
        <p className="t-lead">
          NorthStar IT Services LLC is my company for residential and
          small-business IT support and PC repair around Charleston, West
          Virginia. I am the owner and the person who does the work.
        </p>
        <dl className="cs-meta">
          <div>
            <dt>Role</dt>
            <dd>Owner</dd>
          </div>
          <div>
            <dt>Since</dt>
            <dd>2026</dd>
          </div>
          <div>
            <dt>Place</dt>
            <dd>Elkview, WV</dd>
          </div>
          <div>
            <dt>Site</dt>
            <dd>
              <a href={person.businessUrl} target="_blank" rel="noopener noreferrer">
                {person.businessUrlLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Method</p>
            <h2 id="process-title" className="t-h2">
              Diagnose. Repair. Verify.
            </h2>
            <p className="t-body">
              The same four steps on every machine. I do not publish client
              counts or photos of other people&apos;s computers.
            </p>
          </header>
          <div className="panel-ivory">
            <p className="art-words" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
              Diagnose.
              <br />
              <em>Repair.</em>
              <br />
              Verify.
            </p>
          </div>
          <div className="steps" style={{ marginTop: 8 }}>
            {steps.map((step, index) => (
              <article key={step.title}>
                <p className="num">0{index + 1}</p>
                <h3 className="t-h3" style={{ marginTop: 18, fontSize: 28 }}>
                  {step.title}
                </h3>
                <p className="t-body" style={{ marginTop: 12 }}>
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Scope</p>
            <h2 id="scope-title" className="t-h2">
              What the work includes
            </h2>
          </header>
          <table className="service-table">
            <thead>
              <tr>
                <th scope="col">Work</th>
                <th scope="col">What it covers</th>
              </tr>
            </thead>
            <tbody>
              {scope.map(([name, detail]) => (
                <tr key={name}>
                  <td data-label="Work">{name}</td>
                  <td data-label="What it covers">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="t-body" style={{ marginTop: 28 }}>
            Before I order a part, I check that it fits: socket, power-supply
            headroom, and the BIOS the board is running. After it is in, I
            watch temperatures and use the machine for the job it was meant to
            do. On a slow PC I look at Task Manager, startup impact, drive
            health, and temps before I change a pile of settings.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="taught-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">What client work taught me</p>
            <h2 id="taught-title" className="t-h2">
              Every machine is a different mix
            </h2>
          </header>
          <p className="t-body">
            Hardware, Windows, the network, and the person using it do not fail
            the same way twice. The useful habit is to name the symptom, test
            one cause, and explain the result without a lecture.
          </p>
          <div className="inline-actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/projects/custom-pcs/">
              Custom PC builds
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
            <Link href="/projects/homelab/">← HomeLab</Link>
            <Link href="/projects/custom-pcs/">Next: Custom PCs →</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
