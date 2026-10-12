import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container" style={{ paddingBlock: "var(--section)" }}>
      <p className="t-label">404</p>
      <h1 className="t-h1" style={{ marginTop: 16 }}>
        Page not found
      </h1>
      <p className="t-lead" style={{ marginTop: 24 }}>
        That address is not on this site. The work and contact pages are.
      </p>
      <div className="inline-actions" style={{ marginTop: 32 }}>
        <Link className="btn btn-primary" href="/projects/">
          View work
        </Link>
        <Link className="btn btn-ghost" href="/contact/">
          Contact
        </Link>
      </div>
    </main>
  );
}
