import Link from "next/link";

import { prompt } from "@/content/site";

const paths = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/experience", label: "experience" },
  { href: "/certifications", label: "certifications" },
  { href: "/contact", label: "contact" },
];

export default function NotFound() {
  return (
    <main id="main" className="page not-found-page">
      <div className="wrap">
        <div className="term-404">
          <div className="shell-top">
            <span className="status-dot" aria-hidden="true" />
            <p>northstar</p>
            <p className="shell-hint">404</p>
          </div>
          <div className="term-404-body">
            <h1>This page is not on the site.</h1>
            <p className="term-line">
              <span className="prompt">{prompt}</span> cd /the-page-you-asked-for
            </p>
            <p className="shell-error">
              bash: cd: /the-page-you-asked-for: No such file or directory
            </p>
            <p className="term-line">
              <span className="prompt">{prompt}</span> ls ~/
            </p>
            <ul className="term-ls">
              {paths.map((path) => (
                <li key={path.href}>
                  <Link href={path.href}>{path.label}</Link>
                </li>
              ))}
            </ul>
            <p className="term-line">
              <span className="prompt">{prompt}</span>
              <span className="fake-caret" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
