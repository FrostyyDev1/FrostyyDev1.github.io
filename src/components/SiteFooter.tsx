import Link from "next/link";

import { contactEmail, contactEmailHref, nav, person } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <p>
          <span>{person.name}</span>
          <span>{person.location}</span>
        </p>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <a href={contactEmailHref}>{contactEmail}</a>
      </div>
    </footer>
  );
}
