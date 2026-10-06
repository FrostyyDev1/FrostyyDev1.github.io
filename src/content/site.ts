/**
 * The only file Jacob needs to edit for facts, links, and images.
 * Anything in [brackets] is unknown. Replace the token, or delete the sentence.
 * Do not invent numbers, dates, client stories, or badge art.
 *
 * Name conflict, left unresolved on purpose:
 * the résumé says "CEO / Founder, HyperFrame Technologies" (Feb 2025–present, Elkview, WV).
 * The previous site called the PC repair work "NorthStar IT".
 * Those names are not treated as the same business here.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://frostyydev1.github.io";

export const gap = {
  email: "[your@email]",
  phone: "[phone]",
  availability: "[open to on-site / hybrid]",
  businessName: "[Business name]",
  repairYear: "[year]",
  repairCount: "[N]",
  buildCount: "[N]",
  clientCity: "[city]",
  commonIssues: "[Add: number of jobs and the most common issues]",
  earned: "[Mon YYYY]",
  expires: "[Mon YYYY]",
  credly: "[Add Credly URL]",
  growInto: "[what you want to grow into, e.g. systems or networking]",
  replyTime: "[how quickly you reply]",
  homelabStart: "[Mon YYYY]",
  ram: "[RAM]",
  storage: "[storage]",
  distro: "[distro]",
  routerModel: "[model]",
  resolver: "[resolver]",
  blocklists: "[which lists]",
  dnsSetup: "[router DHCP setting / per-device config]",
  dnsTransport: "[over DNS-over-HTTPS / plain DNS]",
  tailscaleMode: "[Exit node or subnet router: yes / no]",
  monitorCount: "[N]",
  monitorTargets: "[which services]",
  monitorInterval: "[interval]",
  monitorAlerts: "[email / Discord / ntfy]",
  proxyHost: "[service.home]",
  watchtowerSchedule: "[schedule]",
  watchtowerPins: "[Services excluded or pinned, and why]",
  dockerLearned: "[e.g. compose files, volumes, restart policies]",
  queryDays: "[N]",
  blockRate: "[XX]%",
  blockWindow: "[30]",
  uptimeRate: "[99.X]%",
  uptimeWindow: "[30]",
  monitoredCount: "[N]",
  shotDate: "[date]",
  piholeShot: "[30-day view, IPs redacted]",
  uptimeShot: "[dated, hostnames redacted]",
} as const;

/** Empty string means "show the placeholder slot". Set a public path after the file exists. */
export const assets = {
  portrait: "",
  resume: "/resume-public.pdf",
  badges: {
    aPlus: "",
    networkPlus: "",
    itil: "",
  },
  homelab: {
    pihole: "",
    uptime: "",
  },
  repair: {
    overview: "",
    verification: "",
  },
};

export const site = {
  name: "Jacob Wiseman",
  role: "IT Support",
  url: siteUrl,
  email: gap.email,
  phone: gap.phone,
  linkedinHref: "https://www.linkedin.com/in/jacob20",
  linkedinLabel: "linkedin.com/in/jacob20",
  location: "Elkview, WV",
  locationArea: "Charleston area",
  locationLine: "Elkview, WV (Charleston area)",
  availability: gap.availability,
  resumeHref: assets.resume,
  portrait: assets.portrait,
  businessName: gap.businessName,
  businessNote:
    "Public name not confirmed. The résumé lists this role as CEO / Founder at HyperFrame Technologies. The previous site called the PC repair work NorthStar IT. [Pick one name and use it here, on the résumé, and on LinkedIn.]",
  dateNote:
    "Dates are copied from the résumé, including the overlap between the founder role (Feb 2025–present) and WVU Medicine (Aug 2025–Aug 2026).",
  eyebrow: "IT Support · Desktop Support · Networking — Elkview, WV",
  heroLead:
    "Entry-level IT support professional with CompTIA A+, Network+, and ITIL 4 Foundation. I troubleshoot Windows PCs and hardware, run a Raspberry Pi homelab, and explain fixes in plain language.",
  lookingFor: "Full-time IT support, help desk, or desktop support",
  lookingSub: "Seeking a full-time role",
  educationShort: "B.S. Information Technology",
  educationSub: "Colorado State University · expected Sep 2027",
  workIntro:
    "Two hands-on projects: the homelab where I practice DNS, VPN, and monitoring, and the PC repair work I do for local clients.",
  certIntro:
    "CompTIA A+, CompTIA Network+, and ITIL 4 Foundation. Official badge images and Credly links are [not added yet].",
  certResumeNote:
    "CompTIA A+ and Network+ are on the résumé PDF. ITIL 4 Foundation is not on that PDF yet. [Add it on the next export.]",
  experienceIntro:
    "Customer-facing roles where I learned to stay calm, document carefully, and protect sensitive data, plus my own technical work.",
  aboutStatement:
    "I'm Jacob, an IT student at Colorado State University.",
  aboutDim:
    "I spent a year registering patients at WVU Medicine, where accuracy and HIPAA were the job, and I fix and build PCs on the side.",
  aboutMore: `I'm looking for an IT support, help desk, or desktop support role where I can ${gap.growInto}.`,
  aboutLong:
    "I'm Jacob, an IT student at Colorado State University (B.S. Information Technology, expected Sep 2027) based in Elkview, WV, in the Charleston area. I hold CompTIA A+, Network+, and ITIL 4 Foundation. I spent a year registering patients at WVU Medicine, where accuracy and HIPAA were the job, and I fix and build PCs on the side.",
  offClock:
    "Off the clock: Noah Kahan and Harrison Boe. [Delete this line if you don't want it. It comes from the playlist on the previous site.]",
  contactTitleLead: "Hiring for IT support?",
  contactTitleAccent: "Let's talk.",
  contactLede: "The fastest way to reach me is email.",
  reply: gap.replyTime,
  projectsIntro:
    "Hands-on projects in networking, self-hosting, and hardware support.",
  ogAlt: "Jacob Wiseman — IT support, desktop support, and networking",
};

export const nav = [
  { href: "/projects", label: "Work", num: "01" },
  { href: "/experience", label: "Experience", num: "02" },
  { href: "/certifications", label: "Certifications", num: "03" },
  { href: "/about", label: "About", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
] as const;

export type Cert = {
  id: string;
  num: string;
  issuer: string;
  name: string;
  covers: string;
  earned: string;
  expires: string;
  verifyUrl: string;
  badgeSrc: string;
  badgeAlt: string;
};

export const certifications: Cert[] = [
  {
    id: "a-plus",
    num: "01",
    issuer: "CompTIA",
    name: "CompTIA A+",
    covers:
      "Hardware, Windows and mobile operating systems, troubleshooting, and security fundamentals.",
    earned: gap.earned,
    expires: gap.expires,
    verifyUrl: "",
    badgeSrc: assets.badges.aPlus,
    badgeAlt: "CompTIA A+ certification badge",
  },
  {
    id: "network-plus",
    num: "02",
    issuer: "CompTIA",
    name: "CompTIA Network+",
    covers:
      "TCP/IP, subnetting, routing and switching, wireless, and network troubleshooting.",
    earned: gap.earned,
    expires: gap.expires,
    verifyUrl: "",
    badgeSrc: assets.badges.networkPlus,
    badgeAlt: "CompTIA Network+ certification badge",
  },
  {
    id: "itil",
    num: "03",
    issuer: "PeopleCert",
    name: "ITIL 4 Foundation",
    covers:
      "IT service management: the service value system, incident, problem, and change practices.",
    earned: gap.earned,
    expires: gap.expires,
    verifyUrl: "",
    badgeSrc: assets.badges.itil,
    badgeAlt: "ITIL 4 Foundation certification badge",
  },
];

export type Role = {
  dates: string;
  title: string;
  org: string;
  place: string;
  summary: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    dates: "Feb 2025 – Present",
    title: "Founder (sole operator)",
    org: gap.businessName,
    place: "Elkview, WV",
    summary: `Founded and runs a small technology company as the sole operator: product decisions, budgeting, vendors, and compliance. ${gap.commonIssues}`,
    bullets: [
      "Founded and runs a small technology company, overseeing daily operations.",
      "Guides products from initial concept through launch, testing ideas before rolling them out.",
      "Handles budgeting, vendor coordination, and compliance as the sole operator.",
      "Makes technical decisions and sees how they affect real users.",
    ],
  },
  {
    dates: "Aug 2025 – Aug 2026",
    title: "Registration Specialist",
    org: "WVU Medicine",
    place: "South Charleston, WV",
    summary:
      "Registered patients and verified insurance coverage before appointments, keeping records accurate and complete. Handled protected health information every day under HIPAA.",
    bullets: [
      "Registered new patients and collected demographic and insurance information, keeping records accurate and complete.",
      "Verified insurance coverage and reviewed documentation for accuracy before appointments.",
      "Answered questions from patients, families, and staff about registration, accounts, and payment.",
      "Handled protected health information every day while staying compliant with HIPAA.",
    ],
  },
  {
    dates: "Jun 2024 – Feb 2025",
    title: "Barista",
    org: "Target",
    place: "South Charleston, WV",
    summary:
      "Helped customers choose products, kept service moving with the team during busy periods, and processed cash and card transactions accurately.",
    bullets: [
      "Prepared beverages to order and kept the station organized.",
      "Helped customers choose products and answered questions.",
      "Worked with the team to keep service moving during busy periods.",
      "Processed cash and card transactions accurately.",
    ],
  },
  {
    dates: "Mar 2022 – Apr 2024",
    title: "Training Manager",
    org: "Taco Bell",
    place: "Elkview, WV",
    summary:
      "Identified skill gaps on the crew, built training plans to close them, and trained new team members on procedures, food safety, and customer service.",
    bullets: [
      "Identified skill gaps and built training plans to close them.",
      "Trained new team members on procedures, food safety, and customer service.",
      "Resolved customer concerns during peak hours.",
      "Assisted with inventory tracking and stock replenishment.",
    ],
  },
];

export const education = [
  {
    dates: "Expected Sep 2027",
    title: "B.S. Information Technology",
    org: "Colorado State University",
    detail: "In progress.",
  },
  {
    dates: "May 2024",
    title: "High School Diploma",
    org: "Herbert Hoover High School",
    detail: "Elkview, WV.",
  },
];

export const skillGroups = [
  {
    title: "Support",
    items: [
      ["Windows troubleshooting", "A+"],
      ["Hardware diagnostics & repair", "A+ · Repair"],
      ["Remote support", "Repair"],
      ["Explaining fixes clearly", "WVU · Repair"],
    ],
  },
  {
    title: "Networking",
    items: [
      ["TCP/IP, LAN/WAN", "Network+"],
      ["DNS & filtering", "Homelab"],
      ["VPN (Tailscale / WireGuard)", "Homelab"],
      ["Reverse proxy", "Homelab"],
    ],
  },
  {
    title: "Systems",
    items: [
      ["Windows & macOS", "A+"],
      ["Linux on Raspberry Pi", "Homelab"],
      ["Docker containers", "Homelab"],
      ["Service monitoring", "Homelab"],
    ],
  },
  {
    title: "Service & data",
    items: [
      ["ITIL 4 practices", "ITIL 4"],
      ["HIPAA & PHI handling", "WVU"],
      ["Documentation", "WVU · Training"],
      ["Training others", "Taco Bell"],
    ],
  },
] as const;

export type ProjectCard = {
  href: string;
  media: "homelab" | "repair";
  flip: boolean;
  kicker: string;
  title: string;
  body: string;
  meta: { label: string; value: string }[];
  cta: string;
};

export const projects: ProjectCard[] = [
  {
    href: "/projects/homelab",
    media: "homelab",
    flip: false,
    kicker: "Case study 01 · Infrastructure",
    title: "HomeLab",
    body: "A Raspberry Pi 5 running Pi-hole, Tailscale, Uptime Kuma, and Nginx Proxy Manager in Docker. It's where I practice DNS, remote access, and monitoring.",
    meta: [
      { label: "Stack", value: "Linux · Docker" },
      { label: "Focus", value: "DNS · VPN · Monitoring" },
    ],
    cta: "Read the case study",
  },
  {
    href: "/projects/northstar-it",
    media: "repair",
    flip: true,
    kicker: "Case study 02 · Hardware & support",
    title: "PC repair & builds",
    body: `Freelance PC repair and custom builds as ${gap.businessName}, since ${gap.repairYear}: ${gap.repairCount} repairs and ${gap.buildCount} builds for people in the ${gap.clientCity} area.`,
    meta: [
      { label: "Role", value: "Sole operator" },
      { label: "Process", value: "Understand · Diagnose · Resolve · Verify" },
    ],
    cta: "Read the case study",
  },
];

export const homelab = {
  kicker: "Infrastructure · Self-hosting",
  title: "HomeLab",
  sub: "A small network I run, break, and fix.",
  lead: "A Raspberry Pi 5 running Pi-hole, Tailscale, Uptime Kuma, and Nginx Proxy Manager in Docker. It's where I practice DNS, remote access, and monitoring outside a classroom.",
  meta: [
    { label: "Role", value: "Personal project" },
    { label: "Timeframe", value: `${gap.homelabStart} – present` },
    { label: "Hardware", value: `Raspberry Pi 5 · ${gap.ram} GB · ${gap.storage}` },
    { label: "Stack", value: `Linux (${gap.distro}) · Docker` },
  ],
  shot1: {
    src: assets.homelab.pihole,
    alt: "Screenshot placeholder: Pi-hole dashboard",
    bar: "pi.hole/admin",
    title: "Screenshot: Pi-hole dashboard",
    detail: gap.piholeShot,
    caption: `Fig. 1 — Pi-hole query log over ${gap.queryDays} days.`,
  },
  whyTitle: "Why I built it",
  whyHeading: "Learning by actually building things.",
  why: [
    "My homelab gives me somewhere to experiment with technologies outside of a classroom or production environment.",
    "Instead of only reading about networking, DNS, containers, monitoring, and remote access, I can configure them, break them, troubleshoot them, and understand how the pieces work together.",
  ],
  archIntro:
    "Every DNS query on the home network goes through Pi-hole. Tailscale lets me reach the Pi from outside without opening ports to the internet.",
  archNote:
    "Simplified. Internal IP addresses are intentionally left out. Text in [brackets] is still to be filled in.",
  configIntro:
    "The specific settings, not just the tools. Fill each line with what is actually running.",
  config: [
    {
      n: "01",
      title: "Pi-hole as the network's DNS",
      body: `Clients get Pi-hole as their DNS server via ${gap.dnsSetup}. Blocklists: ${gap.blocklists}.`,
    },
    {
      n: "02",
      title: "Upstream resolver",
      body: `Pi-hole forwards allowed queries to ${gap.resolver} ${gap.dnsTransport}.`,
    },
    {
      n: "03",
      title: "Tailscale remote access",
      body: `The Pi is on my tailnet, so I can reach the lab away from home without exposing services to the public internet. ${gap.tailscaleMode}.`,
    },
    {
      n: "04",
      title: "Uptime Kuma monitors",
      body: `${gap.monitorCount} monitors checking ${gap.monitorTargets} every ${gap.monitorInterval}. Alerts go to ${gap.monitorAlerts}.`,
    },
    {
      n: "05",
      title: "Reverse-proxy hostnames",
      body: `Nginx Proxy Manager routes hostnames like ${gap.proxyHost} to each container, so services sit behind one entry point.`,
    },
    {
      n: "06",
      title: "Automated container updates",
      body: `Watchtower checks for new images ${gap.watchtowerSchedule}. ${gap.watchtowerPins}.`,
    },
  ],
  storiesIntro:
    "Symptom, diagnosis, fix, and how I verified it. This is the part hiring managers read most closely.",
  stories: [
    {
      label: "Story 01 · DNS",
      tag: "[Example, replace with real story]",
      title: "[Every device lost internet at once]",
      steps: [
        ["A", "Symptom", "[Websites stopped loading on every device, but the router showed the WAN connection was up.]"],
        ["B", "Diagnosis", "[nslookup timed out against the Pi; docker ps showed the Pi-hole container had stopped.]"],
        ["C", "Fix", "[Restarted the container, set a restart policy, and added a secondary DNS server.]"],
        ["D", "Verified by", "[Queries resolving again in the Pi-hole log; an Uptime Kuma DNS monitor now alerts on failure.]"],
      ],
    },
    {
      label: "Story 02 · Remote access",
      tag: "[Example, replace with real story]",
      title: "[Tailscale worked on Wi-Fi but not on cellular]",
      steps: [
        ["A", "Symptom", "[I could reach the dashboard at home but not from my phone on mobile data.]"],
        ["B", "Diagnosis", "[What you checked: device status in the admin console, tailscale ping, DNS settings.]"],
        ["C", "Fix", "[The actual change you made.]"],
        ["D", "Verified by", "[How you confirmed it, e.g. loaded the service over cellular.]"],
      ],
    },
    {
      label: "Story 03 · Updates",
      tag: "[Example, replace with real story]",
      title: "[An automatic update broke a service]",
      steps: [
        ["A", "Symptom", "[A service went down overnight; Uptime Kuma flagged it.]"],
        ["B", "Diagnosis", "[docker logs showed a breaking change after Watchtower pulled a new image.]"],
        ["C", "Fix", "[Rolled back to the previous tag and pinned the version.]"],
        ["D", "Verified by", "[Monitor green for N days; release notes checked before unpinning.]"],
      ],
    },
  ],
  resultsIntro:
    "Real numbers only, taken straight from the Pi-hole and Uptime Kuma dashboards.",
  results: [
    { num: gap.blockRate, text: `of DNS queries blocked over ${gap.blockWindow} days (Pi-hole)` },
    { num: gap.uptimeRate, text: `uptime for core services over ${gap.uptimeWindow} days (Uptime Kuma)` },
    { num: gap.monitoredCount, text: "services monitored, with alerts on failure" },
  ],
  shot2: {
    src: assets.homelab.uptime,
    alt: "Screenshot placeholder: Uptime Kuma status page",
    bar: "uptime-kuma",
    title: "Screenshot: Uptime Kuma status page",
    detail: gap.uptimeShot,
    caption: `Fig. 3 — Monitors as of ${gap.shotDate}.`,
  },
  services: [
    ["Pi-hole", "DNS filtering", "Network-wide DNS filtering that cuts ads and tracking on every device.", "DNS resolution, client requests, filtering, and network troubleshooting."],
    ["Tailscale", "Remote access", "Reach the lab away from home without exposing services to the public internet.", "Secure remote access and how a WireGuard-based VPN connects devices."],
    ["Uptime Kuma", "Monitoring", "Checks whether services and endpoints are available.", "Availability monitoring and how outages get noticed."],
    ["Nginx Proxy Manager", "Reverse proxy", "Organizes access to self-hosted apps behind one reverse proxy.", "Reverse proxies, internal routing, and hostnames."],
    ["Docker", "Container runtime", "Runs each service in its own container on the Pi.", gap.dockerLearned],
    ["Glances", "System monitoring", "Shows CPU, memory, storage, and overall host health.", "Reading resource usage while troubleshooting the host."],
    ["Watchtower", "Automation", "Container updates and automated maintenance.", "Container lifecycle management and automated maintenance."],
    ["Homarr", "Dashboard", "One place to organize and open every service in the lab.", "Keeping a growing environment easy to navigate."],
    ["File Browser", "Storage", "A web interface for managing files on the Pi.", "Linux storage and file permissions."],
  ],
  next: [
    "[Put IoT devices on their own VLAN]",
    "[Automated, tested backups of container configs]",
    "[A public status page from Uptime Kuma]",
  ],
};

export const repair = {
  kicker: "Hardware · Support",
  title: "PC repair & builds",
  sub: "Diagnose first. Fix second.",
  lead: `Freelance PC repair, upgrades, and custom builds. The public business name is still ${gap.businessName}. The résumé lists HyperFrame Technologies; the previous site used NorthStar IT.`,
  meta: [
    { label: "Role", value: "Sole operator" },
    { label: "On the résumé", value: "Feb 2025 – present" },
    { label: "Place", value: "Elkview, WV" },
    { label: "Focus", value: "Diagnostics, repair, builds" },
  ],
  shot1: {
    src: assets.repair.overview,
    alt: "Photo placeholder: a repair or finished build",
    bar: "photo",
    title: "Photo: a real repair or build",
    detail: "[bench or finished system, date, no client names]",
    caption: `Fig. 1 — [What the photo shows], ${gap.shotDate}.`,
  },
  overviewHeading: "What this work is",
  overview: [
    "The previous site described diagnostics, PC repair, custom builds, upgrades, optimization, malware removal, and remote support.",
    "Small-business IT is left out until there is a real engagement to describe. Job counts are not on the résumé, so they stay blank.",
  ],
  process: [
    { n: "01", title: "Understand", text: "Listen to the problem and understand what the user is actually experiencing." },
    { n: "02", title: "Diagnose", text: "Isolate the likely cause using testing, observation, and logical troubleshooting." },
    { n: "03", title: "Resolve", text: "Apply the repair, configuration change, upgrade, or solution that addresses the cause." },
    { n: "04", title: "Verify", text: "Test the system afterward to make sure the issue is actually resolved." },
  ],
  includesIntro: "The kinds of work named on the previous site. Specific settings and part lists belong in the job stories below.",
  includes: [
    { n: "01", title: "Diagnostics", body: "Find the cause of a hardware, software, performance, or reliability problem before replacing parts." },
    { n: "02", title: "PC repair", body: "Repair desktops with hardware failures, configuration problems, or software issues, then confirm the system is stable." },
    { n: "03", title: "Custom builds", body: "Plan and assemble a desktop around a budget and workload: compatible parts, assembly, firmware, software, and a stability check." },
    { n: "04", title: "Upgrades", body: "Check that a part fits the rest of the system, then test that the machine is stable afterward." },
    { n: "05", title: "Optimization", body: "Look at startup programs, storage, thermals, and configuration, and fix the measured cause instead of a generic tweak." },
    { n: "06", title: "Malware removal", body: "Identify and remove unwanted software, check for related damage, and confirm the system is updated and stable." },
    { n: "07", title: "Remote support", body: "Troubleshoot software, connectivity, and configuration with the person using the computer, and explain the steps in plain language." },
  ],
  storiesIntro: "Three real jobs belong here. Nothing below is a client story yet.",
  stories: [
    {
      label: "Story 01 · Repair",
      tag: "[Example, replace with a real job]",
      title: "[A machine that would not boot]",
      steps: [
        ["A", "Symptom", "[What the person reported, in their words if you have them.]"],
        ["B", "Diagnosis", "[What you tested, and what the failing part or setting was.]"],
        ["C", "Fix", "[The repair, part, or configuration change.]"],
        ["D", "Verified by", "[How you proved it stayed fixed.]"],
      ],
    },
    {
      label: "Story 02 · Build",
      tag: "[Example, replace with a real job]",
      title: "[A build for a stated budget and use]",
      steps: [
        ["A", "Symptom", "[What they needed the computer to do, and the budget.]"],
        ["B", "Diagnosis", "[The constraint: socket, power, thermals, or storage.]"],
        ["C", "Fix", "[Parts you chose and how you assembled and installed it.]"],
        ["D", "Verified by", "[Temperatures, a stress test, or a week of normal use.]"],
      ],
    },
    {
      label: "Story 03 · Support",
      tag: "[Example, replace with a real job]",
      title: "[Malware cleanup or a problem fixed remotely]",
      steps: [
        ["A", "Symptom", "[What was slow, popping up, or unreachable.]"],
        ["B", "Diagnosis", "[What you found, and what you ruled out.]"],
        ["C", "Fix", "[What you removed or changed.]"],
        ["D", "Verified by", "[The check you ran afterward, with the person watching if it was remote.]"],
      ],
    },
  ],
  resultsIntro: "Only counts you can stand behind. Leave the brackets until you have them.",
  results: [
    { num: gap.repairCount, text: "repairs completed" },
    { num: gap.buildCount, text: "custom builds completed" },
    { num: gap.repairYear, text: "the year this work started" },
  ],
  shot2: {
    src: assets.repair.verification,
    alt: "Photo placeholder: how a repair was verified",
    bar: "photo",
    title: "Photo: verification",
    detail: "[POST screen, temps, or a finished desk, dated]",
    caption: `Fig. 2 — Verification as of ${gap.shotDate}.`,
  },
  services: [
    ["Diagnostics", "Troubleshooting", "Hardware, software, performance, and reliability problems.", "Test before replacing parts."],
    ["PC repair", "Hardware", "Desktops with failed parts, bad configuration, or software issues.", "Repair, then confirm the system is usable."],
    ["Custom builds", "Systems", "A desktop planned around budget, workload, and a later upgrade path.", "Compatibility, assembly, firmware, and a stability check."],
    ["Upgrades", "Hardware", "Memory, storage, graphics, cooling, and other parts.", "Compatibility first, then a test."],
    ["Optimization", "Performance", "Startup, storage, thermals, and configuration.", "Measure the bottleneck, then fix that."],
    ["Malware removal", "Security", "Unwanted software and the settings it changed.", "Remove it, update the system, and recheck."],
    ["Remote support", "Support", "Software, connectivity, and configuration without a visit.", "Explain each step in plain language."],
  ],
  next: [
    "[A photo set from a real job, with the date]",
    "[One written malware or no-boot job, using the steps you actually took]",
    "[The checklist you use before handing a machine back]",
  ],
};

export const pages = [
  { path: "/", title: "Home", priority: 1 },
  { path: "/projects", title: "Projects", priority: 0.8 },
  { path: "/projects/homelab", title: "HomeLab", priority: 0.8 },
  { path: "/projects/northstar-it", title: "PC repair", priority: 0.8 },
  { path: "/experience", title: "Experience", priority: 0.7 },
  { path: "/certifications", title: "Certifications", priority: 0.7 },
  { path: "/about", title: "About", priority: 0.6 },
  { path: "/contact", title: "Contact", priority: 0.6 },
] as const;

/**
 * Every bracket Jacob still has to fill. The README repeats this list.
 * Keep the two in sync if you add a token.
 */
export const placeholders: { token: string; where: string; how: string }[] = [
  { token: gap.email, where: "Hero, contact page", how: "Replace gap.email in src/content/site.ts. The mailto link uses the same value." },
  { token: gap.phone, where: "Contact page", how: "Replace gap.phone, or delete the phone row in src/app/contact/page.tsx if you do not want a number public." },
  { token: "[Add real photo]", where: "Homepage portrait", how: "Save a 4:5 photo as public/portrait.jpg and set assets.portrait to \"/portrait.jpg\"." },
  { token: gap.availability, where: "Contact location line", how: "Replace gap.availability, for example \"open to on-site and hybrid\"." },
  { token: gap.businessName, where: "Home, experience, repair case study, URL label", how: "The résumé says HyperFrame Technologies. The old site said NorthStar IT. Pick one name. The route /projects/northstar-it/ can stay." },
  { token: gap.repairYear, where: "Repair card and results", how: "Year the PC repair work started, only if you know it. Feb 2025 is the résumé date for the founder role, not automatically the repair start." },
  { token: gap.repairCount, where: "Repair card and results", how: "Number of repairs you can account for. Delete the phrase if you will not publish a count." },
  { token: gap.buildCount, where: "Repair card and results", how: "Number of custom builds. Same rule as repairs." },
  { token: gap.clientCity, where: "Repair card", how: "Where the clients are. Elkview and South Charleston are your work history, not automatically the client area." },
  { token: gap.commonIssues, where: "Experience summary", how: "The usual jobs and how many, or delete the sentence." },
  { token: gap.earned, where: "All three certifications", how: "Month and year each cert was earned. One value is shared today; split them in the certifications array if the months differ." },
  { token: gap.expires, where: "Certifications page", how: "Expiry month, or \"does not expire\" for a cert that does not." },
  { token: "Credly URLs", where: "Certification cards", how: "Set verifyUrl on each item in certifications to your own Credly badge share URL. Leave it empty until you have it. Do not link a generic catalog page." },
  { token: "Badge images", where: "Hero proof row and certification cards", how: "Download your badge PNGs from Credly or PeopleCert. Save them as public/badges/comptia-a-plus.png, public/badges/comptia-network-plus.png, and public/badges/itil-4-foundation.png, then set assets.badges. Do not redraw the logos." },
  { token: gap.growInto, where: "About", how: "The kind of work you want next, in your words." },
  { token: gap.replyTime, where: "Contact page", how: "How quickly you actually reply." },
  { token: gap.homelabStart, where: "HomeLab meta", how: "Month and year the lab went into real use." },
  { token: `${gap.ram} / ${gap.storage} / ${gap.distro}`, where: "HomeLab meta", how: "Pi 5 memory, disk, and the Linux image you installed." },
  { token: `${gap.routerModel} / ${gap.resolver}`, where: "HomeLab diagram", how: "These two sit in the diagram SVG in src/components/site/graphics.ts as [model] and [resolver]." },
  { token: "HomeLab configuration lines", where: "HomeLab, What I configured", how: "gap.dnsSetup, blocklists, dnsTransport, tailscaleMode, monitor fields, proxyHost, watchtowerSchedule, watchtowerPins." },
  { token: "Three HomeLab stories", where: "HomeLab, Things that broke", how: "Replace every bracket in homelab.stories. Delete a story rather than leaving the example." },
  { token: `${gap.blockRate} / ${gap.uptimeRate} / ${gap.monitoredCount}`, where: "HomeLab results", how: "Read them off Pi-hole and Uptime Kuma. Do not estimate." },
  { token: "HomeLab screenshots", where: "HomeLab figures", how: "Save images under public/lab/ and set assets.homelab.pihole and assets.homelab.uptime. Redact IPs and set gap.shotDate and gap.queryDays." },
  { token: "HomeLab next", where: "HomeLab, What I'm adding next", how: "Replace homelab.next with plans you actually intend, or delete the section." },
  { token: gap.dockerLearned, where: "HomeLab services table", how: "One concrete thing Docker taught you." },
  { token: "Three repair stories", where: "PC repair case study", how: "Replace repair.stories with real jobs. No client last names." },
  { token: "Repair photos", where: "PC repair figures", how: "Set assets.repair.overview and assets.repair.verification to files in public/repair/." },
  { token: "Repair next", where: "PC repair, What I'm adding next", how: "Replace repair.next or delete the section." },
  { token: "Off the clock", where: "About page", how: "site.offClock. Delete the property usage in src/app/about/page.tsx if you do not want the music line." },
  { token: "ITIL on the PDF", where: "Résumé file", how: "public/resume-public.pdf (and the identical public/resume.pdf) list A+ and Network+ only. Export a new PDF when you add email, phone, and ITIL 4. This site does not rewrite that PDF." },
];
