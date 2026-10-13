import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { certifications } from "@/content/site";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "CompTIA A+ and CompTIA Network+, earned October 2025 and expiring October 2028, and ITIL 4 Foundation, earned August 2025.",
};

const [aplus, netplus, itil] = certifications;

export default function CertificationsPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero wrap">
        <p className="eyebrow">Certifications</p>
        <h1>Three credentials, with the dates printed on them.</h1>
        <p className="lede">
          CompTIA A+ and Network+ were earned in October 2025 and expire in
          October 2028. ITIL 4 Foundation was earned in August 2025. The images
          are the issuing organizations’ public Credly badges, not personal
          certificate links.
        </p>
      </header>

      <div className="wrap cert-stack">
        <article className="cert-panel cert-a">
          <a
            className="badge-link"
            href={aplus.credly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={aplus.image}
              alt={aplus.imageAlt}
              width={aplus.width}
              height={aplus.height}
            />
            <span className="sr-only">Official CompTIA badge on Credly (opens in a new tab)</span>
          </a>
          <div className="cert-copy">
            <p className="eyebrow">CompTIA · {aplus.earned}</p>
            <h2>{aplus.name}</h2>
            <p>{aplus.summary}</p>
            <p className="cert-dates">
              Earned {aplus.earned}. Expires {aplus.expires}.
            </p>
            <a href={aplus.credly} target="_blank" rel="noopener noreferrer">
              Official badge on Credly
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </article>

        <article className="cert-panel cert-net">
          <div className="cert-copy">
            <p className="eyebrow">CompTIA · {netplus.earned}</p>
            <h2>{netplus.name}</h2>
            <p>{netplus.summary}</p>
            <p className="cert-dates">
              Earned {netplus.earned}. Expires {netplus.expires}.
            </p>
            <div className="net-art" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <a href={netplus.credly} target="_blank" rel="noopener noreferrer">
              Official badge on Credly
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <a
            className="badge-link badge-link-net"
            href={netplus.credly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={netplus.image}
              alt={netplus.imageAlt}
              width={netplus.width}
              height={netplus.height}
            />
            <span className="sr-only">Official CompTIA badge on Credly (opens in a new tab)</span>
          </a>
        </article>

        <article className="cert-panel cert-itil">
          <a
            className="badge-link badge-link-itil"
            href={itil.credly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={itil.image}
              alt={itil.imageAlt}
              width={itil.width}
              height={itil.height}
            />
            <span className="sr-only">Official PeopleCert badge on Credly (opens in a new tab)</span>
          </a>
          <div className="cert-copy">
            <p className="eyebrow">PeopleCert · {itil.earned}</p>
            <h2>{itil.name}</h2>
            <p>{itil.summary}</p>
            <p className="cert-dates">Earned {itil.earned}.</p>
            <a href={itil.credly} target="_blank" rel="noopener noreferrer">
              Official badge on Credly
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </article>

        <p className="fine-print">
          ITIL is a registered trademark of the PeopleCert group. Used under
          licence from PeopleCert. All rights reserved. CompTIA and the CompTIA
          badges are trademarks of CompTIA.
        </p>

        <div className="contact-row">
          <Link href="/experience">Experience</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </main>
  );
}
