"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    name: "Experience",
    href: "/experience",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  function isActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <>
      <nav className="relative z-50 flex h-24 items-center justify-between border-b border-white/[0.1]">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center border border-white/15 text-[11px] font-semibold tracking-[-0.03em] transition group-hover:border-[#315cff] group-hover:bg-[#315cff]">
            JW
          </span>

          <span className="hidden text-[13px] font-medium uppercase tracking-[0.15em] text-neutral-300 sm:block">
            Jacob Wiseman
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[14px] transition ${
                isActive(link.href)
                  ? "text-white"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#315cff]" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[13px] text-neutral-500 transition hover:text-white sm:block"
          >
            Resume ↗
          </a>

          <button
            type="button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            className="flex h-11 w-11 items-center justify-center border border-white/10 text-neutral-300 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="relative z-40 border-b border-white/10 bg-[#0a0a0a] py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.06] py-5 text-2xl tracking-[-0.04em] last:border-b-0"
            >
              {link.name}

              <span className="text-sm text-[#315cff]">
                ↗
              </span>
            </Link>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block py-3 text-sm text-neutral-500"
          >
            Resume ↗
          </a>
        </div>
      )}
    </>
  );
}
