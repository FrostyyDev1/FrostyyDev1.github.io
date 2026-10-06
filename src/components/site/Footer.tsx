import Link from "next/link";

import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <p className="footer-note">© 2026 {site.name}</p>
        <nav aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="to-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
