"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Boxes,
  Circle,
  FileText,
  Gauge,
  Globe2,
  LayoutDashboard,
  Network,
  RefreshCw,
  Server,
  Shield,
  WifiOff,
} from "lucide-react";

import Navbar from "@/components/Navbar";

type FilterType = "all" | "network" | "monitoring" | "system";

type Service = {
  id: string;
  name: string;
  category: string;
  filter: FilterType;
  description: string;
  purpose: string;
  technologies: string[];
  icon: React.ElementType;
};

const services: Service[] = [
  {
    id: "raspberry",
    name: "Raspberry Pi 5",
    category: "Host",
    filter: "system",
    description:
      "The main host behind my homelab environment. It runs Linux and provides the platform for my containerized services and networking experiments.",
    purpose:
      "I use the Raspberry Pi as a low-power environment where I can experiment with Linux, containers, networking, monitoring, and self-hosted applications.",
    technologies: ["Linux", "Docker", "Networking"],
    icon: Server,
  },
  {
    id: "pihole",
    name: "Pi-hole",
    category: "DNS Filtering",
    filter: "network",
    description:
      "Network-wide DNS filtering used to control DNS requests and reduce unwanted advertising and tracking across devices.",
    purpose:
      "Pi-hole gives me hands-on experience with DNS resolution, client requests, filtering, and network troubleshooting.",
    technologies: ["DNS", "Linux", "Networking"],
    icon: Shield,
  },
  {
    id: "tailscale",
    name: "Tailscale",
    category: "Remote Access",
    filter: "network",
    description:
      "Secure remote connectivity for accessing homelab resources while away from my local network.",
    purpose:
      "Tailscale lets me experiment with secure remote access without directly exposing internal services to the public internet.",
    technologies: ["VPN", "WireGuard", "Networking"],
    icon: Network,
  },
  {
    id: "homarr",
    name: "Homarr",
    category: "Dashboard",
    filter: "system",
    description:
      "A central dashboard used to organize and access the applications running throughout my homelab.",
    purpose:
      "Homarr makes the environment easier to navigate and gives me one place to organize frequently used services.",
    technologies: ["Docker", "Dashboard", "Self Hosting"],
    icon: LayoutDashboard,
  },
  {
    id: "uptime",
    name: "Uptime Kuma",
    category: "Monitoring",
    filter: "monitoring",
    description:
      "Service monitoring software used to check whether applications and endpoints are available.",
    purpose:
      "It gives me practical experience with availability monitoring and helps me understand how service outages can be identified.",
    technologies: ["Monitoring", "Docker", "Networking"],
    icon: Activity,
  },
  {
    id: "nginx",
    name: "Nginx Proxy Manager",
    category: "Reverse Proxy",
    filter: "network",
    description:
      "Reverse-proxy management used to organize access to self-hosted applications and experiment with web infrastructure.",
    purpose:
      "It helps me understand reverse proxies, internal routing, hostnames, and how multiple services can be organized behind one system.",
    technologies: ["Nginx", "Reverse Proxy", "Docker"],
    icon: Globe2,
  },
  {
    id: "watchtower",
    name: "Watchtower",
    category: "Automation",
    filter: "system",
    description:
      "Container management tooling used within the Docker environment.",
    purpose:
      "Watchtower introduced me to container lifecycle management and automated maintenance concepts.",
    technologies: ["Docker", "Containers", "Automation"],
    icon: RefreshCw,
  },
  {
    id: "glances",
    name: "Glances",
    category: "System Monitoring",
    filter: "monitoring",
    description:
      "System monitoring used to inspect resource usage and overall host health.",
    purpose:
      "I use it to understand CPU, memory, storage, and performance while troubleshooting the host system.",
    technologies: ["Linux", "Monitoring", "Performance"],
    icon: Gauge,
  },
  {
    id: "files",
    name: "File Browser",
    category: "Storage",
    filter: "system",
    description:
      "A web-based interface for managing files inside my self-hosted environment.",
    purpose:
      "It gives me an easier way to work with files while gaining experience with Linux storage and permissions.",
    technologies: ["Storage", "Linux", "Self Hosting"],
    icon: FileText,
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Network", value: "network" },
  { label: "Monitoring", value: "monitoring" },
  { label: "System", value: "system" },
];

export default function HomelabPage() {
  const [selectedId, setSelectedId] = useState("raspberry");
  const [filter, setFilter] = useState<FilterType>("all");

  const selectedService =
    services.find((service) => service.id === selectedId) ?? services[0];

  const filteredServices =
    filter === "all"
      ? services
      : services.filter((service) => service.filter === filter);

  const selectedIndex = services.findIndex(
    (service) => service.id === selectedId,
  );

  function nextService() {
    const nextIndex = (selectedIndex + 1) % services.length;
    setSelectedId(services[nextIndex].id);
  }

  function previousService() {
    const previousIndex =
      selectedIndex === 0 ? services.length - 1 : selectedIndex - 1;

    setSelectedId(services[previousIndex].id);
  }

  const SelectedIcon = selectedService.icon;

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-14 xl:px-16">
        <Navbar />

        {/* BACK LINK */}
        <div className="pt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            All Projects
          </Link>
        </div>

        {/* HERO */}
        <section className="pb-20 pt-16 md:pb-28 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Infrastructure / Networking / Self Hosting
              </p>

              <span className="hidden h-px w-10 bg-neutral-800 sm:block" />

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                <WifiOff size={14} />
                Lab Offline
              </div>
            </div>

            <h1 className="text-[clamp(4.5rem,10vw,11rem)] font-medium uppercase leading-[0.78] tracking-[-0.065em]">
              HomeLab
            </h1>
          </motion.div>

          <div className="mt-12 grid gap-12 border-t border-neutral-800 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <p className="max-w-3xl text-xl leading-8 text-neutral-300 md:text-2xl">
              My personal environment for experimenting with networking,
              Linux, Docker, monitoring, DNS, remote access, and self-hosted
              infrastructure.
            </p>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Host
                </p>

                <p className="text-neutral-300">Raspberry Pi 5</p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Status
                </p>

                <p className="flex items-center gap-2 text-neutral-400">
                  <Circle
                    size={8}
                    fill="currentColor"
                    className="text-neutral-600"
                  />
                  Offline
                </p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Environment
                </p>

                <p className="text-neutral-300">Linux / Docker</p>
              </div>

              <div>
                <p className="mb-2 uppercase tracking-[0.18em] text-neutral-600">
                  Mode
                </p>

                <p className="text-neutral-300">Portfolio Demo</p>
              </div>
            </div>
          </div>
        </section>

        {/* OFFLINE NOTICE */}
        <section className="border-y border-neutral-800 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <WifiOff size={17} className="text-neutral-500" />

              <p className="text-sm text-neutral-400">
                Live telemetry is currently unavailable.
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.17em] text-neutral-600">
              Architecture shown below is interactive
            </p>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Explore the Lab
              </p>

              <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                Architecture
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-neutral-500 md:text-right">
              Select any service to see what it does and why I use it.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  filter === item.value
                    ? "border-white bg-white text-black"
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
            {/* LEFT SIDE */}
            <div className="border border-neutral-800 bg-[#0c0c0c] p-6 md:p-9">
              <div className="mb-12 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                  Network Topology
                </p>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-neutral-600" />

                  <span className="text-xs uppercase tracking-[0.15em] text-neutral-600">
                    Offline
                  </span>
                </div>
              </div>

              {/* INTERNET */}
              <div className="flex flex-col items-center">
                <div className="flex min-w-[190px] items-center justify-center gap-3 border border-neutral-700 px-6 py-4">
                  <Globe2 size={18} />

                  <span className="text-sm">Internet</span>
                </div>

                <motion.div
                  className="h-10 w-px bg-neutral-700"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* NETWORK */}
                <div className="flex min-w-[220px] items-center justify-center gap-3 border border-neutral-700 px-6 py-4">
                  <Network size={18} />

                  <span className="text-sm">Ubiquiti Network</span>
                </div>

                <motion.div
                  className="h-10 w-px bg-neutral-700"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />

                {/* PI HOST */}
                <button
                  type="button"
                  onClick={() => setSelectedId("raspberry")}
                  className={`relative flex min-w-[230px] items-center justify-center gap-3 border px-6 py-4 transition ${
                    selectedId === "raspberry"
                      ? "border-white bg-white text-black"
                      : "border-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {selectedId === "raspberry" && (
                    <motion.div
                      layoutId="selected-host"
                      className="absolute inset-0 bg-white"
                    />
                  )}

                  <Server size={18} className="relative z-10" />

                  <span className="relative z-10 text-sm">
                    Raspberry Pi 5
                  </span>
                </button>

                <div className="h-10 w-px bg-neutral-700" />

                <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-600">
                  <Boxes size={15} />
                  Services
                </div>

                {/* SERVICES GRID */}
                <motion.div
                  layout
                  className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredServices
                      .filter((service) => service.id !== "raspberry")
                      .map((service) => {
                        const Icon = service.icon;
                        const selected = selectedId === service.id;

                        return (
                          <motion.button
                            layout
                            key={service.id}
                            type="button"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedId(service.id)}
                            className="group relative min-h-[120px] overflow-hidden border border-neutral-800 bg-[#090909] p-5 text-left"
                          >
                            {selected && (
                              <motion.div
                                layoutId="active-service"
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
                                  className={`text-[10px] uppercase tracking-[0.18em] ${
                                    selected
                                      ? "text-neutral-500"
                                      : "text-neutral-600"
                                  }`}
                                >
                                  {service.category}
                                </p>

                                <Icon
                                  size={18}
                                  className={
                                    selected
                                      ? "text-black"
                                      : "text-neutral-600 transition group-hover:text-white"
                                  }
                                />
                              </div>

                              <div>
                                <p
                                  className={`font-medium ${
                                    selected ? "text-black" : "text-white"
                                  }`}
                                >
                                  {service.name}
                                </p>

                                <div
                                  className={`mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] ${
                                    selected
                                      ? "text-neutral-500"
                                      : "text-neutral-700"
                                  }`}
                                >
                                  <Circle
                                    size={6}
                                    fill="currentColor"
                                  />
                                  Offline
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* DETAILS PANEL */}
            <div className="border border-neutral-800 bg-[#0c0c0c]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                  className="flex min-h-[620px] flex-col p-7 md:p-9"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-neutral-700">
                      <SelectedIcon size={21} />
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                        {selectedService.category}
                      </p>

                      <p className="mt-2 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-700">
                        <Circle size={6} fill="currentColor" />
                        Offline
                      </p>
                    </div>
                  </div>

                  <h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
                    {selectedService.name}
                  </h3>

                  <p className="mt-6 text-base leading-7 text-neutral-400">
                    {selectedService.description}
                  </p>

                  <div className="mt-10 border-t border-neutral-800 pt-8">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-neutral-600">
                      Why I use it
                    </p>

                    <p className="leading-7 text-neutral-400">
                      {selectedService.purpose}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {selectedService.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-neutral-800 px-3 py-2 text-xs uppercase tracking-[0.12em] text-neutral-500"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* PREVIOUS / NEXT */}
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

        {/* PROJECT PURPOSE */}
        <section className="border-t border-neutral-800 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Why I built it
              </p>

              <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] md:text-6xl">
                Learning by actually building things.
              </h2>
            </div>

            <div className="max-w-2xl space-y-7 text-lg leading-8 text-neutral-500">
              <p>
                My homelab gives me somewhere to experiment with technologies
                outside of a classroom or production environment.
              </p>

              <p>
                Instead of only reading about networking, DNS, containers,
                monitoring, and remote access, I can configure them, break
                them, troubleshoot them, and understand how the pieces work
                together.
              </p>

              <p>
                The environment continues to evolve as I learn more about IT
                infrastructure, networking, systems administration, and
                self-hosting.
              </p>
            </div>
          </div>
        </section>

        {/* FUTURE LIVE DATA */}
        <section className="border-t border-neutral-800 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Coming Later
              </p>

              <h2 className="text-3xl font-medium tracking-[-0.035em] md:text-5xl">
                Live Lab Status
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-neutral-500">
                This section is designed to eventually display real telemetry
                from the homelab, including service status, host uptime,
                resource utilization, and monitoring data.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER NAV */}
        <section className="border-t border-neutral-800 py-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <Link
              href="/projects"
              className="group flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />

              All Projects
            </Link>

            <Link
              href="/projects/northstar-it"
              className="group flex items-center gap-3 text-sm text-neutral-500 transition hover:text-white"
            >
              NorthStar IT

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