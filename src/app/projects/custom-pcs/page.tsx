import Link from "next/link";

import { ClientRedirect } from "@/app/projects/custom-pcs/redirect";
import { pageMeta } from "@/lib/meta";

export const metadata = {
  ...pageMeta({
    title: "Project moved",
    description: "Custom PCs now lives on the PC repair and builds case study.",
    path: "/projects/northstar-it/",
  }),
  robots: { index: false, follow: true },
};

export default function CustomPcsRedirectPage() {
  return (
    <section className="redirect-page">
      <div className="container">
        <meta httpEquiv="refresh" content="0; url=/projects/northstar-it/" />
        <ClientRedirect href="/projects/northstar-it/" />
        <p className="t-label">Project moved</p>
        <h1 className="t-h1" style={{ margin: "24px 0" }}>
          Custom PCs is part of PC repair.
        </h1>
        <p className="t-lead">
          That duplicate project page now points at the repair case study.
        </p>
        <div className="hero-ctas">
          <Link className="btn btn-primary" href="/projects/northstar-it">
            Continue to PC repair
          </Link>
        </div>
      </div>
    </section>
  );
}
