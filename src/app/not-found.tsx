import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container miss">
      <div className="term miss-term">
        <div className="term-bar">
          <div className="term-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="term-title">jacob@northstar: ~</p>
          <div className="term-bar-slot" />
        </div>
        <div className="term-log">
          <p className="term-cmd">
            <span className="term-prompt" aria-hidden="true">
              <span className="term-user">jacob</span>
              <span className="term-at">@</span>
              <span className="term-host">northstar</span>
              <span className="term-path">:~$</span>
            </span>
            <span className="term-typed">cd /the/page/you/wanted</span>
          </p>
          <div className="term-out">
            <p className="is-error">
              bash: cd: that path is not on this machine
            </p>
            <h1 className="miss-title">404. Nothing there.</h1>
            <p className="is-dim">
              The homelab is up. This URL is not one of its services.
            </p>
          </div>
          <p className="term-cmd" style={{ marginTop: 18 }}>
            <span className="term-prompt" aria-hidden="true">
              <span className="term-user">jacob</span>
              <span className="term-at">@</span>
              <span className="term-host">northstar</span>
              <span className="term-path">:~$</span>
            </span>
            <span className="term-typed">ls /</span>
          </p>
          <p className="term-links">
            <Link href="/">home/</Link>
            <Link href="/projects/">projects/</Link>
            <Link href="/projects/homelab/">homelab/</Link>
            <Link href="/certifications/">certifications/</Link>
            <Link href="/contact/">contact/</Link>
          </p>
          <p className="term-form" style={{ borderTop: 0, paddingInline: 0 }}>
            <span className="term-prompt" aria-hidden="true">
              <span className="term-user">jacob</span>
              <span className="term-at">@</span>
              <span className="term-host">northstar</span>
              <span className="term-path">:~$</span>
            </span>
            <span className="term-caret" />
            <span className="is-dim">try the home terminal. help is a real command.</span>
          </p>
        </div>
      </div>
    </main>
  );
}
