"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks, person } from "@/content/site";

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export default function SiteNav() {
  const pathname = normalize(usePathname() || "/");
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function current(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-nav">
      <div className="container nav-bar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            JW
          </span>
          <span className="brand-name">{person.name}</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a className="nav-resume" href={person.resumeHref}>
            Résumé PDF
          </a>
        </nav>

        <div className="nav-end">
          <a className="nav-resume" href={person.resumeHref}>
            Résumé
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className={open ? "nav-burger is-open" : "nav-burger"} />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="nav-panel" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current(link.href) ? "page" : undefined}
              onClick={() => setOpenPath(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
