import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { person } from "@/content/site";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "CompTIA A+ and CompTIA Network+, earned October 2025 and expiring October 2028, and ITIL 4 Foundation, earned August 2025.",
};

export default function CertificationsPage() {
  return (
    <main id="main" className="cert-page">
      <header className="container page-header">
        <p className="cert-prompt">
          <span>jacob</span>@northstar:~/certs$
        </p>
        <h1 className="t-h1">Certifications</h1>
        <p className="cert-ls" aria-hidden="true">
          ls -l
        </p>
        <p className="t-lead">
          Three certificates. The dates are the ones printed on them. I am not
          putting credential IDs on this site.
        </p>
      </header>

      <div className="container cert-stack">
        <article className="cert-a">
          <div className="cert-badge">
            <Image
              src="/certs/comptia-a-plus.png"
              alt="CompTIA A+ ce certification badge"
              width={320}
              height={320}
            />
          </div>
          <div>
            <p className="cert-verify">
              ok · comptia-a-plus · earned October 2025 · expires October 2028
            </p>
            <h2 className="t-h2">CompTIA A+</h2>
            <p className="t-body cert-covers">
              Desktops and laptops: which part failed, which cable is loose,
              and whether Windows 10 or 11 is the thing that will not boot.
              Enough macOS to set a machine up and find the obvious failure.
              Microsoft 365 when the problem is the account, not the hardware.
            </p>
            <p className="cert-note">
              This is the one I use with the case open. At NorthStar IT
              Services I diagnose the machine, check that a part fits before I
              order it, and build custom PCs. I also set up Windows, macOS, and
              Microsoft 365. At Thomas Imaging Center I registered patients in
              Epic and helped coworkers when a computer got in the way of that.
            </p>
          </div>
        </article>

        <article className="cert-net">
          <div>
            <p className="cert-verify">
              ok · comptia-network-plus · earned October 2025 · expires October
              2028
            </p>
            <h2 className="t-h3">CompTIA Network+</h2>
            <p className="t-body cert-covers">
              How a laptop gets an address, where DNS sits, and what to test
              when Wi-Fi reaches one room and dies in the next. Modem, router,
              and the computer, one at a time, instead of rebooting all three
              and hoping.
            </p>
            <p className="cert-note">
              At Startek I did this on the phone with Optimum customers: modem,
              router, Wi-Fi, then a note if another team had to take it. At
              home the Raspberry Pi 5 runs Pi-hole for DNS and Tailscale so I
              can reach the lab when I am not on that network. NorthStar house
              calls are usually a router in the wrong spot, or a device that
              never joined.
            </p>
          </div>
          <div className="cert-badge cert-badge-net">
            <Image
              src="/certs/comptia-network-plus.png"
              alt="CompTIA Network+ ce certification badge"
              width={320}
              height={320}
            />
          </div>
        </article>

        <article className="cert-itil">
          <div className="cert-badge cert-badge-itil">
            <Image
              src="/certs/itil-4-foundation.png"
              alt="ITIL 4 Foundation certification badge"
              width={320}
              height={320}
            />
          </div>
          <div>
            <p className="cert-verify">
              ok · itil-4-foundation · earned August 2025
            </p>
            <h2 className="t-h3">ITIL 4 Foundation</h2>
            <p className="t-body cert-covers">
              Get the symptom specific before changing anything. Write down
              what you tried. Do not call it done until the original problem
              stays gone.
            </p>
            <p className="cert-note">
              I earned this in August 2025. At NorthStar I listen until I can
              say what broke, I say what the repair will cost before I start,
              and I use the machine the way that person will. At Startek the
              useful habit was the note: what failed, what I tried, and when it
              had to go to someone else.
            </p>
          </div>
        </article>

        <p className="t-small note">
          ITIL is a registered trademark of the PeopleCert group. Used under
          licence from PeopleCert. All rights reserved.
        </p>
        <div className="inline-actions">
          <a className="btn btn-primary" href={person.resumeHref}>
            Résumé PDF
          </a>
          <Link className="btn btn-ghost" href="/experience/">
            See where I used them
          </Link>
        </div>
      </div>
    </main>
  );
}
