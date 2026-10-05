"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  Cpu,
  HardDrive,
  Laptop,
  MonitorCog,
  Network,
  Search,
  Wrench,
} from "lucide-react";

import Navbar from "@/components/Navbar";

type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  skills: string[];
  icon: React.ElementType;
};

const services: Service[] = [
  {
    id: "diagnostics",
    title: "Diagnostics",
    category: "Troubleshooting",
    description:
      "Finding the actual cause of hardware, software, performance, and reliability problems before replacing parts or making unnecessary changes.",
    details:
      "The goal is to isolate the problem logically — checking symptoms, hardware health, software behavior, configuration, and system performance before deciding on a repair.",
    skills: [
      "Troubleshooting",
      "Hardware Testing",
      "Windows",
      "Root Cause Analysis",
    ],
    icon: Search,
  },
  {
    id: "repair",
    title: "PC Repair",
    category: "Hardware",
    description:
      "Repairing and restoring desktop systems with hardware failures, configuration problems, damaged components, or software-related issues.",
    details:
      "This work combines hands-on hardware knowledge with systematic troubleshooting to get systems stable and usable again.",
    skills: ["PC Hardware", "Repair", "Windows", "Diagnostics"],
    icon: Wrench,
  },
  {
    id: "custom",
    title: "Custom PC Builds",
    category: "Systems",
    description:
      "Planning and assembling desktop systems around a customer's budget, workload, performance needs, and upgrade path.",
    details:
      "Every build requires selecting compatible components, assembling the system, configuring firmware, installing software, testing stability, and verifying temperatures and performance.",
    skills: ["PC Building", "Compatibility", "BIOS", "Testing"],
    icon: Cpu,
  },
  {
    id: "upgrades",
    title: "Hardware Upgrades",
    category: "Hardware",
    description:
      "Improving existing systems through memory, storage, graphics, cooling, and other component upgrades.",
    details:
      "The important part isn't just installing a component — it's making sure the upgrade is compatible, useful, stable, and appropriate for the rest of the system.",
    skills: ["RAM", "Storage", "GPU", "Cooling"],
    icon: HardDrive,
  },
  {
    id: "optimization",
    title: "PC Optimization",
    category: "Performance",
    description:
      "Improving system responsiveness and reliability by identifying software, startup, storage, thermal, and configuration problems.",
    details:
      "Optimization work focuses on measurable causes of poor performance rather than blindly disabling services or applying generic tweaks.",
    skills: ["Windows", "Performance", "Startup", "System Health"],
    icon: MonitorCog,
  },
  {
    id: "malware",
    title: "Malware Removal",
    category: "Security",
    description:
      "Identifying and removing unwanted or malicious software while checking the system for related damage or configuration changes.",
    details:
      "The process also includes helping ensure the system is updated, stable, and less likely to immediately end up in the same situation again.",
    skills: ["Security", "Windows", "Malware", "System Recovery"],
    icon: Bug,
  },
  {
    id: "remote",
    title: "Remote Support",
    category: "Support",
    description:
      "Helping users troubleshoot software, connectivity, configuration, and system issues without requiring an on-site visit.",
    details:
      "Remote support depends heavily on communication — understanding what the user is experiencing, explaining technical steps clearly, and solving the problem efficiently.",
    skills: ["Remote Support", "Communication", "Windows", "Troubleshooting"],
    icon: Laptop,
  },
  {
    id: "business",
    title: "Small Business IT",
    category: "IT Support",
    description:
      "Supporting smaller organizations with day-to-day computer, network, device, and technical support needs.",
    details:
      "The focus is practical IT support: keeping systems usable, helping users, solving recurring issues, and improving reliability without unnecessary complexity.",
    skills: ["IT Support", "Networking", "Devices", "Troubleshooting"],
    icon: Network,
  },
];

export default function NorthStarITPage() {
  const [selectedId, setSelectedId] = useState("diagnostics");

  const selectedService =
    services.find((service) => service.id === selectedId) ?? services[0];

  const selectedIndex = services.findIndex(
    (service) => service.id === selectedId,
  );

  const SelectedIcon = selectedService.icon;

  function nextService() {
    const index = (selectedIndex + 1) % services.length;
    setSelectedId(services[index].id);
  }

  function previousService() {
    const index =
      selectedIndex === 0 ? services.length - 1 : selectedIndex - 1;

    setSelectedId(services[index].id);
  }

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-14 xl:px-16">
        <Navbar />

        {/* BACK */}
        <div className="pt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />

            All Projects
          </Link>
        </div>

        {/* HERO */}
        <section className="pb-20 pt-16 md:pb-28 md:pt-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 text-sm uppercase tracking-[0.2em] text-neutral-500"
          >
            IT Services / Hardware / Technical Support
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-[clamp(4rem,9vw,10rem)] font-medium uppercase leading-[0.8] tracking-[-0.065em]"
          >
            NorthStar
            <br />
            IT
          </motion.h1>

          <div className="mt-12 grid gap-12 border-t border-neutral-800 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <p className="max-w-3xl text-xl leading-8 text-neutral-300 md:text-2xl">
              An independent IT services project focused on computer repair,
              diagnostics, custom systems, upgrades, optimization, and
              practical technical support.
            </p>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Role
                </p>

                <p className="text-neutral-300">
                  Founder / Technician
                </p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Focus
                </p>

                <p className="text-neutral-300">
                  IT Services
                </p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Customers
                </p>

                <p className="text-neutral-300">
                  Consumers / Small Business
                </p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Type
                </p>

                <p className="text-neutral-300">
                  Independent Business
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="border-t border-neutral-800 py-20 md:py-28">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">
                What I Work On
              </p>

              <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                Services
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-neutral-500 md:text-right">
              Select a service to explore the kind of technical work involved.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            {/* SERVICE GRID */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                const selected = selectedId === service.id;

                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedId(service.id)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative min-h-[170px] overflow-hidden border border-neutral-800 bg-[#0c0c0c] p-6 text-left"
                  >
                    {selected && (
                      <motion.div
                        layoutId="northstar-selected-service"
                        className="absolute inset-0 bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <p
                          className={`text-xs uppercase tracking-[0.18em] ${
                            selected
                              ? "text-neutral-500"
                              : "text-neutral-600"
                          }`}
                        >
                          {service.category}
                        </p>

                        <Icon
                          size={21}
                          className={
                            selected
                              ? "text-black"
                              : "text-neutral-600 transition duration-200 group-hover:text-white"
                          }
                        />
                      </div>

                      <div>
                        <h3
                          className={`text-xl font-medium tracking-[-0.02em] md:text-2xl ${
                            selected ? "text-black" : "text-white"
                          }`}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={`mt-2 text-xs uppercase tracking-[0.15em] ${
                            selected
                              ? "text-neutral-500"
                              : "text-neutral-700"
                          }`}
                        >
                          Explore service →
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* DETAILS */}
            <div className="border border-neutral-800 bg-[#0c0c0c]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.22 }}
                  className="flex min-h-[540px] flex-col p-7 md:p-9"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-neutral-700">
                      <SelectedIcon size={21} />
                    </div>

                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                      {selectedService.category}
                    </p>
                  </div>

                  <h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
                    {selectedService.title}
                  </h3>

                  <p className="mt-6 text-base leading-7 text-neutral-400">
                    {selectedService.description}
                  </p>

                  <div className="mt-10 border-t border-neutral-800 pt-8">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-neutral-600">
                      The Work
                    </p>

                    <p className="leading-7 text-neutral-400">
                      {selectedService.details}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {selectedService.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-neutral-800 px-3 py-2 text-xs uppercase tracking-[0.12em] text-neutral-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-8">
                    <button
                      type="button"
                      onClick={previousService}
                      className="group flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
                    >
                      <ArrowLeft
                        size={16}
                        className="transition-transform group-hover:-translate-x-1"
                      />
                      Previous
                    </button>

                    <p className="text-xs text-neutral-700">
                      {selectedIndex + 1} / {services.length}
                    </p>

                    <button
                      type="button"
                      onClick={nextService}
                      className="group flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
                    >
                      Next
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-t border-neutral-800 py-20 md:py-28">
          <div className="mb-16">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">
              How I Approach Problems
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-6xl">
              Diagnose first.
              <br />
              Fix second.
            </h2>
          </div>

          <div className="grid border-t border-neutral-800 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Understand",
                text: "Listen to the problem and understand what the user is actually experiencing.",
              },
              {
                number: "02",
                title: "Diagnose",
                text: "Isolate the likely cause using testing, observation, and logical troubleshooting.",
              },
              {
                number: "03",
                title: "Resolve",
                text: "Apply the repair, configuration change, upgrade, or solution that addresses the cause.",
              },
              {
                number: "04",
                title: "Verify",
                text: "Test the system afterward to make sure the issue is actually resolved.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="border-b border-neutral-800 py-8 md:border-r md:px-7 md:last:border-r-0"
              >
                <p className="mb-12 text-xs text-neutral-700">
                  {step.number}
                </p>

                <h3 className="text-2xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-neutral-500">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHAT THIS DEMONSTRATES */}
        <section className="border-t border-neutral-800 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Beyond the Business
              </p>

              <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] md:text-6xl">
                Real technical work with real problems.
              </h2>
            </div>

            <div className="max-w-2xl space-y-7 text-lg leading-8 text-neutral-500">
              <p>
                NorthStar IT gives me experience beyond labs and coursework.
                Every system can have a different combination of hardware,
                software, configuration, and user problems.
              </p>

              <p>
                That means troubleshooting has to be adaptable instead of
                relying on one checklist for every issue.
              </p>

              <p>
                It also develops the customer-facing side of IT — explaining
                technical problems clearly, setting expectations, and finding
                solutions that actually make sense for the person using the
                technology.
              </p>
            </div>
          </div>
        </section>

        {/* NEXT PROJECT */}
        <section className="border-t border-neutral-800 py-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <Link
              href="/projects/homelab"
              className="group flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />

              HomeLab
            </Link>

            <Link
              href="/projects/custom-pcs"
              className="group flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
            >
              Custom PCs

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}