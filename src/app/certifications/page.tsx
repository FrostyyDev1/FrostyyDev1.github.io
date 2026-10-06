import Link from "next/link";

import { CertGrid, SectionHead } from "@/components/site/blocks";
import { Rich } from "@/components/site/RichText";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Certifications",
  description:
    "CompTIA A+, CompTIA Network+, and ITIL 4 Foundation. Badge images and Credly verification links are ready to be added from Jacob's own accounts.",
  path: "/certifications/",
});

export default function CertificationsPage() {
  return (
    <>
      <section className="cs-hero" aria-labelledby="certs-page-title">
        <div className="container">
          <SectionHead
            index="01"
            label="Credentials"
            title="Certifications"
            titleId="certs-page-title"
            titleClass="t-display"
            heading="h1"
            intro={site.certIntro}
          />
        </div>
      </section>
      <section className="section band-ivory" aria-labelledby="certs-band-title" style={{ borderTop: 0 }}>
        <div className="container">
          <h2 id="certs-band-title" className="t-h2" style={{ marginBottom: "var(--s-8)" }}>
            Verified credentials
          </h2>
          <CertGrid showExpiry />
          <p className="cert-note">
            <Rich text={site.certResumeNote} /> Badge files belong in{" "}
            <span className="ph">public/badges/</span>. The slots stay empty until those
            official images are added. This site does not redraw CompTIA or ITIL logos.
          </p>
          <div className="stack-links">
            <Link className="link-arrow" href="/experience">
              See experience{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a className="link-arrow" href={site.resumeHref}>
              Download résumé (PDF){" "}
              <span className="arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
