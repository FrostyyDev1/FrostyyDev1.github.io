import type { Metadata } from "next";
import Link from "next/link";

import CertGrid from "@/components/CertGrid";
import { person } from "@/content/site";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "CompTIA A+ (October 2025, expires October 2028), CompTIA Network+ (October 2025), and ITIL 4 Foundation (August 2025).",
};

export default function CertificationsPage() {
  return (
    <main id="main">
      <header className="container page-header">
        <p className="t-label">Certifications</p>
        <h1 className="t-h1">Certifications</h1>
        <p className="t-lead">
          CompTIA A+, CompTIA Network+, and ITIL 4 Foundation. These are the
          credentials I would put in front of a help desk or desktop support
          hiring manager.
        </p>
      </header>

      <section className="section" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="container">
          <CertGrid />
          <p className="t-small note">
            ITIL is a registered trademark of the PeopleCert group. Used under
            licence from PeopleCert. All rights reserved.
          </p>
          <div className="inline-actions" style={{ marginTop: 28 }}>
            <a className="btn btn-primary" href={person.resumeHref}>
              Résumé PDF
            </a>
            <Link className="btn btn-ghost" href="/experience/">
              See experience
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
