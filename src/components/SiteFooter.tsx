import Link from "next/link";

import { navLinks, person } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p className="t-small" style={{ margin: 0 }}>
          © {new Date().getFullYear()} {person.name}
        </p>
        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href={person.resumeHref}>Résumé PDF</a>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
