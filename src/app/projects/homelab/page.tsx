import type { Metadata } from "next";
import Link from "next/link";

import { labServices } from "@/content/site";

export const metadata: Metadata = {
  title: "HomeLab",
  description:
    "A Raspberry Pi 5 homelab running Pi-hole, Tailscale, Uptime Kuma, Nginx Proxy Manager, and other Docker services.",
};

const configured = [
  {
    title: "Pi-hole as DNS",
    text: "Devices on the network use Pi-hole for DNS, so filtering happens in one place instead of browser by browser.",
  },
  {
    title: "Tailscale for remote access",
    text: "I reach the lab from elsewhere through Tailscale, which uses WireGuard, without publishing the services to the public internet.",
  },
  {
    title: "Uptime Kuma for availability",
    text: "Monitors check whether the services respond, so a failure is visible before I happen to open the app.",
  },
  {
    title: "Nginx Proxy Manager for names",
    text: "The reverse proxy gives the apps hostnames, so I am not keeping a list of ports in my head.",
  },
  {
    title: "Docker on the Pi",
    text: "Each service runs in its own container on a Raspberry Pi 5. Restarting one does not mean rebuilding the host.",
  },
  {
    title: "Glances on the host",
    text: "Glances shows CPU, memory, and storage so I can see whether the Pi itself is the bottleneck.",
  },
];

export default function HomelabPage() {
  return (
    <main id="main">
      <div className="container" style={{ paddingTop: 28 }}>
        <Link className="link-quiet" href="/projects/">
          ← All work
        </Link>
      </div>

      <header className="container page-header">
        <p className="t-label">Case study · Infrastructure</p>
        <h1 className="t-h1">HomeLab</h1>
        <p className="t-lead">
          A Raspberry Pi 5 running Pi-hole, Tailscale, Uptime Kuma, and Nginx
          Proxy Manager in Docker. It is where I practice DNS, remote access,
          and monitoring.
        </p>
        <dl className="cs-meta">
          <div>
            <dt>Role</dt>
            <dd>Personal lab</dd>
          </div>
          <div>
            <dt>Hardware</dt>
            <dd>Raspberry Pi 5</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>Linux, Docker</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>DNS, VPN, monitoring</dd>
          </div>
        </dl>
      </header>

      <section className="section" aria-labelledby="arch-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Architecture</p>
            <h2 id="arch-title" className="t-h2">
              How a query moves
            </h2>
            <p className="t-body">
              Clients ask the router for DNS. The Pi answers through Pi-hole,
              then forwards what it does not block. Tailscale is a separate
              path I use when I am not on that network. No addresses are
              published here.
            </p>
          </header>
          <div className="panel-ivory">
            <p className="t-label">Lab layout</p>
            <ol className="flow" aria-label="DNS path">
              <li>Clients</li>
              <li>Router</li>
              <li>Pi-hole on the Pi 5</li>
              <li>Upstream DNS</li>
            </ol>
            <p className="overlay-note">
              Tailscale reaches that same Raspberry Pi from outside the LAN.
            </p>
            <p className="t-small" style={{ marginTop: 16, color: "#5b574f" }}>
              A map of the lab, not a live status board. Memory size, storage,
              and uptime percentages are not listed because I am not publishing
              numbers I have not measured for this page.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="config-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Configuration</p>
            <h2 id="config-title" className="t-h2">
              What I set up
            </h2>
          </header>
          <ol className="plain-list">
            {configured.map((item) => (
              <li key={item.title}>
                <strong style={{ color: "var(--text-1)", fontWeight: 500 }}>
                  {item.title}.
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="learn-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Practice</p>
            <h2 id="learn-title" className="t-h2">
              What the lab taught me
            </h2>
          </header>
          <div className="principles">
            <article>
              <h3 className="t-h3" style={{ fontSize: 26 }}>
                DNS
              </h3>
              <p className="t-body" style={{ marginTop: 12 }}>
                When every device uses one resolver, a bad answer shows up
                everywhere. I check the container, then a lookup, then whether
                the router is still handing out that DNS server.
              </p>
            </article>
            <article>
              <h3 className="t-h3" style={{ fontSize: 26 }}>
                Remote access
              </h3>
              <p className="t-body" style={{ marginTop: 12 }}>
                Tailscale lets me open the lab away from home. If it fails, I
                look at the device in the admin console before I change
                anything on the Pi.
              </p>
            </article>
            <article>
              <h3 className="t-h3" style={{ fontSize: 26 }}>
                Monitoring
              </h3>
              <p className="t-body" style={{ marginTop: 12 }}>
                Uptime Kuma tells me a check failed. Glances tells me whether
                the host is out of memory or disk. Those are two different
                problems.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Services</p>
            <h2 id="services-title" className="t-h2">
              What runs on it
            </h2>
          </header>
          <table className="service-table">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Role</th>
                <th scope="col">Why</th>
                <th scope="col">What I learned</th>
              </tr>
            </thead>
            <tbody>
              {labServices.map((row) => (
                <tr key={row.service}>
                  <td data-label="Service">{row.service}</td>
                  <td data-label="Role">{row.role}</td>
                  <td data-label="Why">{row.why}</td>
                  <td data-label="What I learned">{row.learned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="container">
          <header className="section-head">
            <p className="t-label">Next</p>
            <h2 id="next-title" className="t-h2">
              What I want to add
            </h2>
          </header>
          <ul className="plain-list">
            <li>A separate network for devices I trust less than my own computers.</li>
            <li>Copies of the compose files stored somewhere other than the Pi.</li>
            <li>A status view I can check without signing into every app.</li>
          </ul>
          <nav className="pager" style={{ marginTop: 48 }} aria-label="Project">
            <Link href="/projects/">← All work</Link>
            <Link href="/projects/northstar-it/">Next: NorthStar IT →</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
