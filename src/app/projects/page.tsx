"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "HomeLab",
    category: "Infrastructure",
    description:
      "A self-hosted environment built for networking, DNS filtering, monitoring, remote access, containers, and experimenting with infrastructure.",
    technologies: [
      "Raspberry Pi 5",
      "Docker",
      "Pi-hole",
      "Tailscale",
      "Uptime Kuma",
    ],
    href: "/projects/homelab",
  },
  {
    number: "02",
    title: "NorthStar IT",
    category: "IT Services",
    description:
      "An independent IT services business focused on computer repair, diagnostics, custom systems, upgrades, optimization, and technical support.",
    technologies: [
      "PC Repair",
      "Diagnostics",
      "Hardware",
      "Remote Support",
      "Custom PCs",
    ],
    href: "/projects/northstar-it",
  },
  {
    number: "03",
    title: "Custom PCs",
    category: "Hardware",
    description:
      "Custom-built, repaired, upgraded, and tested desktop systems with an emphasis on reliability, performance, compatibility, and troubleshooting.",
    technologies: [
      "CPU",
      "GPU",
      "Cooling",
      "Storage",
      "Troubleshooting",
    ],
    href: "/projects/custom-pcs",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-14 xl:px-16">
        <Navbar />

        {/* PAGE HEADER */}
        <section className="pb-20 pt-20 md:pb-28 md:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-sm uppercase tracking-[0.2em] text-neutral-500"
          >
            02 / Selected Work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-[clamp(4rem,9vw,10rem)] font-medium uppercase leading-[0.8] tracking-[-0.06em]"
          >
            Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-10 max-w-3xl text-xl leading-8 text-neutral-400 md:text-2xl"
          >
            Systems, infrastructure, hardware, and technology projects
            I&apos;ve built, configured, repaired, and experimented with.
          </motion.p>
        </section>

        {/* PROJECT LIST */}
        <section className="border-t border-neutral-800">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="border-b border-neutral-800"
            >
              <Link
                href={project.href}
                className="group block py-10 md:py-14"
              >
                <div className="grid gap-8 md:grid-cols-[90px_1.1fr_1fr_50px] md:items-start">
                  {/* NUMBER */}
                  <div className="text-sm text-neutral-600">
                    {project.number}
                  </div>

                  {/* TITLE */}
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">
                      {project.category}
                    </p>

                    <h2 className="text-4xl font-medium tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                      {project.title}
                    </h2>
                  </div>

                  {/* DESCRIPTION + TAGS */}
                  <div>
                    <p className="max-w-xl text-base leading-7 text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300 md:text-lg">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="border border-neutral-800 px-3 py-2 text-xs uppercase tracking-[0.12em] text-neutral-600 transition-colors duration-300 group-hover:border-neutral-700 group-hover:text-neutral-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ARROW */}
                  <div className="flex justify-end">
                    <ArrowUpRight
                      size={28}
                      className="text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* BOTTOM */}
        <section className="flex items-center justify-between py-12">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-700">
            More projects coming soon.
          </p>

          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            Back Home ↑
          </Link>
        </section>
      </div>
    </main>
  );
}