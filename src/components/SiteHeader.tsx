"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { CommandMenu } from "@/components/CommandMenu";
import { contactEmailHref, nav } from "@/content/site";

const links = [{ href: "/", label: "Home" }, ...nav];

function Star() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.5 18.7 12.2 28.5 16 18.7 19.8 16 29.5 13.3 19.8 3.5 16 13.3 12.2 16 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader() {
  const path = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  function isCurrent(href: string) {
    const current = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
    return current === href;
  }

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-bar">
        <Link href="/" className="brand" onClick={closeMenu}>
          <Star />
          <span className="brand-name">jacob</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <CommandMenu />
          <a className="nav-cta" href={contactEmailHref}>
            Email
          </a>
          <details ref={menuRef} className="nav-mobile">
            <summary>
              <span className="sr-only">Menu</span>
              <span className="burger" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile">
              <ul>
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
