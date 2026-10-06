"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { nav, site } from "@/content/site";

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function SiteHeader() {
  const pathname = normalize(usePathname() || "/");
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    }

    document.body.style.overflow = open ? "hidden" : "";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function current(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-nav" id="top">
      <div className="container nav-inner">
        <Link className="wordmark" href="/">
          <span className="mark" aria-hidden="true" />
          Jacob Wiseman
          <span className="role" aria-hidden="true">
            {site.role}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <a className="pill" href={site.resumeHref}>
            Résumé <span className="ext">PDF</span>
          </a>
          <button
            ref={buttonRef}
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id={menuId} className="mobile-menu" hidden={!open}>
        <div className="container">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpenPath(null)}>
              {item.label} <span>{item.num}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
