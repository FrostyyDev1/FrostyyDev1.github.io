"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LegacyCustomPCsPage() {
  useEffect(() => {
    window.location.replace(
      "/projects/northstar-it/"
    );
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070708] px-6 text-[#F2F0EA]">
      <div className="text-center">
        <p className="font-mono-custom text-[9px] uppercase tracking-[0.24em] text-[#315CFF]">
          Project moved
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">
          Redirecting to NorthStar IT.
        </h1>

        <Link
          href="/projects/northstar-it/"
          className="mt-8 inline-block text-sm text-neutral-500 transition hover:text-white"
        >
          Continue manually
        </Link>
      </div>
    </main>
  );
}
