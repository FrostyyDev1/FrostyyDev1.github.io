"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  Menu,
  X,
} from "lucide-react";

const links = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function active(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="relative z-[100] border-b border-white/[0.08]">
      <div className="flex h-[84px] items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Jacob Wiseman home"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono-custom text-[9px] tracking-[-0.02em] text-[#F2F0EA] transition duration-300 group-hover:border-[#315CFF] group-hover:bg-[#315CFF]">
            JW
          </span>

          <span className="hidden text-sm font-medium tracking-[-0.025em] text-[#F2F0EA] sm:block">
            Jacob Wiseman
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm transition duration-200 ${
                active(link.href)
                  ? "text-[#F2F0EA]"
                  : "text-neutral-500 hover:text-[#F2F0EA]"
              }`}
            >
              {link.label}

              {active(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-[31px] left-0 h-px w-full bg-[#315CFF]"
                />
              )}
            </Link>
          ))}

          <a
            href="/resume-public.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-l border-white/[0.08] pl-8 text-sm text-[#D8D0C0] transition hover:text-white"
          >
            Resume ↗
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
          className="flex h-11 w-11 touch-manipulation items-center justify-center border border-white/[0.1] text-[#F2F0EA] transition hover:border-[#315CFF] lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[84px] z-[120] border-b border-white/[0.08] bg-[#070708]/95 px-1 py-4 shadow-[0_30px_70px_rgba(0,0,0,.5)] backdrop-blur-xl lg:hidden"
          >
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex min-h-14 items-center justify-between border-b border-white/[0.07] px-3"
              >
                <span
                  className={`text-lg tracking-[-0.035em] ${
                    active(link.href)
                      ? "text-[#F2F0EA]"
                      : "text-neutral-500 group-hover:text-[#F2F0EA]"
                  }`}
                >
                  {link.label}
                </span>

                <span className="font-mono-custom text-[8px] tracking-[0.16em] text-neutral-700">
                  0{index + 1}
                </span>
              </Link>
            ))}

            <a
              href="/resume-public.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-12 items-center justify-between px-3 text-sm text-[#D8D0C0]"
            >
              Resume
              <span>↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
