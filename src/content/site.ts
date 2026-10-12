/**
 * Public facts for the portfolio.
 * TODO: replace contactEmailLabel / contactEmailHref with Jacob's real email.
 * Do not publish a phone number.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://frostyydev1.github.io";

export const person = {
  name: "Jacob Wiseman",
  location: "Elkview, WV (Charleston area)",
  locationShort: "Elkview, WV",
  seeking:
    "Full-time IT support, help desk, desktop support, or networking",
  availability: "Open to on-site and hybrid roles in the Charleston area",
  linkedin: "https://www.linkedin.com/in/jacob20",
  linkedinLabel: "linkedin.com/in/jacob20",
  resumeHref: "/resume-public.pdf",
  business: "NorthStar IT Services LLC",
  businessUrl: "https://northstarwv.com",
  businessUrlLabel: "northstarwv.com",
};

/** TODO: replace with Jacob's real email address. */
export const contactEmailLabel = "TODO: add email";
export const contactEmailHref = "mailto:TODO";

export const certifications = [
  {
    id: "aplus",
    name: "CompTIA A+",
    issuer: "CompTIA",
    logo: "/certs/comptia-logo.svg",
    logoAlt: "CompTIA",
    earned: "October 2025",
    expires: "October 2028",
    description:
      "Hardware, operating systems, troubleshooting, security, networking, and day-to-day IT support.",
    focus: ["Hardware", "Windows", "Troubleshooting", "Support"],
  },
  {
    id: "netplus",
    name: "CompTIA Network+",
    issuer: "CompTIA",
    logo: "/certs/comptia-logo.svg",
    logoAlt: "CompTIA",
    earned: "October 2025",
    expires: null,
    description:
      "Network infrastructure, operations, wired and wireless troubleshooting, and security concepts.",
    focus: ["TCP/IP", "Wi-Fi", "Infrastructure", "Troubleshooting"],
  },
  {
    id: "itil",
    name: "ITIL 4 Foundation",
    issuer: "PeopleCert",
    logo: "/certs/itil-logo.svg",
    logoAlt: "ITIL",
    earned: "August 2025",
    expires: null,
    description:
      "IT service management: the service value system, guiding principles, practices, and continual improvement.",
    focus: ["ITSM", "Practices", "Service value", "Improvement"],
  },
] as const;

export type Role = {
  period: string;
  company: string;
  role: string;
  place: string;
  eyebrow: string;
  line: string;
  summary: string;
  handled: string[];
  environment: string[];
  sharpened: string[];
};

export const roles: Role[] = [
  {
    period: "2026 – Present",
    company: "NorthStar IT Services LLC",
    role: "Owner",
    place: "Elkview, WV",
    eyebrow: "Residential and small-business IT",
    line: "Residential and small-business IT support and PC repair.",
    summary:
      "I take a problem from the first symptom through the handoff: diagnose hardware and software, plan the repair, talk with the client, and check that the fix holds.",
    handled: [
      "Desktop and laptop diagnostics",
      "Hardware repair and component upgrades",
      "Custom PC builds",
      "Remote and on-site technical support",
      "Client estimates and repair communication",
      "Router and Wi-Fi setup",
      "Microsoft 365 and Windows support",
    ],
    environment: [
      "Windows 10/11",
      "macOS",
      "PC hardware",
      "Microsoft 365",
      "Home networking",
    ],
    sharpened: [
      "End-to-end problem ownership",
      "Hardware diagnostics",
      "Technical communication",
      "Independent decision making",
    ],
  },
  {
    period: "2026",
    company: "Startek",
    role: "Technical Support Representative I",
    place: "Remote",
    eyebrow: "Remote technical support",
    line: "Remote support for Optimum internet, modem, router, and Wi-Fi issues.",
    summary:
      "Supporting Optimum customers meant troubleshooting connectivity in real time: narrowing modem, router, Wi-Fi, and service issues while keeping the person on the line moving forward.",
    handled: [
      "Internet and connectivity troubleshooting",
      "Modem, router, and Wi-Fi isolation",
      "Guided customer troubleshooting",
      "Notes on each issue, and escalation when another team had to take it",
      "Remote customer support",
    ],
    environment: [
      "Network troubleshooting",
      "Modem and router diagnostics",
      "Wi-Fi",
      "Remote support",
      "Documentation",
    ],
    sharpened: [
      "Structured troubleshooting",
      "Remote diagnostics",
      "Communication under pressure",
      "Knowing when to escalate",
    ],
  },
  {
    period: "Aug 2025 – Aug 2026",
    company: "WVU Medicine",
    role: "Registration Specialist, Imaging",
    place: "Thomas Imaging Center, South Charleston",
    eyebrow: "Healthcare operations",
    line: "Registered patients in Epic and helped coworkers with basic computer problems.",
    summary:
      "A patient-facing role at Thomas Imaging Center where accuracy, privacy, and a live schedule all mattered at once. I registered patients in Epic and helped coworkers with basic computer problems.",
    handled: [
      "Patient registration in Epic",
      "Demographic and insurance information, checked for accuracy",
      "Insurance verification before appointments",
      "Questions from patients, families, and staff",
      "Protected health information under HIPAA",
      "Basic computer troubleshooting for coworkers",
    ],
    environment: [
      "Epic",
      "Patient registration",
      "HIPAA",
      "Data accuracy",
      "Front desk",
    ],
    sharpened: [
      "Attention to detail",
      "Professional communication",
      "Handling sensitive information",
      "Prioritization in a live environment",
    ],
  },
  {
    period: "Jun 2024 – Feb 2025",
    company: "Target",
    role: "Barista",
    place: "South Charleston, WV",
    eyebrow: "Customer service",
    line: "Customer questions, busy periods, and accurate transactions.",
    summary:
      "Prepared orders, answered product questions, and kept service moving with the team during busy periods. Cash and card transactions had to be accurate.",
    handled: [
      "Customer questions and product choices",
      "Service during busy periods",
      "Accurate cash and card transactions",
      "A clean, organized station",
    ],
    environment: ["Customer service", "Point of sale", "Team workflow"],
    sharpened: [
      "Staying calm when the line is long",
      "Clear answers for non-technical questions",
      "Accurate transactions",
    ],
  },
  {
    period: "Mar 2022 – Apr 2024",
    company: "Taco Bell",
    role: "Training Manager",
    place: "Elkview, WV",
    eyebrow: "Training and procedures",
    line: "Trained new team members and wrote the steps they had to follow.",
    summary:
      "Found skill gaps on the crew, built training plans, and taught new team members the procedures, food-safety standards, and service expectations.",
    handled: [
      "Training plans for new team members",
      "Procedures, food safety, and service expectations",
      "Customer concerns during peak hours",
      "Inventory tracking and stock replenishment",
    ],
    environment: ["Training", "Procedures", "Customer service", "Inventory"],
    sharpened: [
      "Teaching a process to someone new",
      "Writing steps people can follow",
      "De-escalating a busy service problem",
    ],
  },
];

export const principles = [
  {
    title: "Find the cause.",
    text: "I would rather isolate the actual failure than stack temporary fixes on top of the symptom.",
  },
  {
    title: "Explain the fix.",
    text: "Good technical work still needs clear communication, especially when the person affected is not technical.",
  },
  {
    title: "Own the outcome.",
    text: "Ending the conversation is not the same thing as a problem staying fixed. I care about the result.",
  },
];

export const education = [
  {
    period: "Expected September 2027",
    title: "B.S. Information Technology",
    org: "CSU Global",
    detail: "In progress.",
  },
  {
    period: "May 2024",
    title: "High school diploma",
    org: "Herbert Hoover High School",
    detail: "Elkview, WV.",
  },
];

export const skillGroups = [
  {
    name: "Support",
    items: [
      { name: "Windows 10/11 troubleshooting", evidence: "A+ · NorthStar · Startek" },
      { name: "Hardware diagnostics and repair", evidence: "A+ · NorthStar" },
      { name: "macOS support", evidence: "NorthStar" },
      { name: "Microsoft 365", evidence: "NorthStar" },
      { name: "Remote support", evidence: "Startek · NorthStar" },
      { name: "Explaining a fix in plain language", evidence: "Startek · WVU · NorthStar" },
    ],
  },
  {
    name: "Networking",
    items: [
      { name: "TCP/IP, LAN/WAN fundamentals", evidence: "Network+" },
      { name: "Router and Wi-Fi setup", evidence: "Startek · NorthStar" },
      { name: "DNS filtering", evidence: "HomeLab · Pi-hole" },
      { name: "Remote access with Tailscale", evidence: "HomeLab" },
      { name: "Reverse proxy", evidence: "HomeLab · Nginx Proxy Manager" },
    ],
  },
  {
    name: "Systems",
    items: [
      { name: "Linux on a Raspberry Pi", evidence: "HomeLab" },
      { name: "Docker containers", evidence: "HomeLab" },
      { name: "Service monitoring", evidence: "HomeLab · Uptime Kuma · Glances" },
      { name: "Custom PC builds", evidence: "NorthStar" },
    ],
  },
  {
    name: "Service and data",
    items: [
      { name: "ITIL 4 practices", evidence: "ITIL 4 Foundation" },
      { name: "HIPAA and protected health information", evidence: "WVU Medicine" },
      { name: "Epic registration workflows", evidence: "WVU Medicine" },
      { name: "Documentation", evidence: "WVU · Startek · Taco Bell" },
      { name: "Training other people", evidence: "Taco Bell" },
    ],
  },
];

export const projects = [
  {
    href: "/projects/homelab",
    kicker: "Infrastructure",
    title: "HomeLab",
    summary:
      "A Raspberry Pi 5 running Pi-hole, Tailscale, Uptime Kuma, and Nginx Proxy Manager in Docker. This is where I practice DNS, remote access, and monitoring.",
    meta: [
      ["Stack", "Linux · Docker"],
      ["Focus", "DNS · VPN · Monitoring"],
    ],
    art: "lab" as const,
  },
  {
    href: "/projects/northstar-it",
    kicker: "IT support",
    title: "NorthStar IT",
    summary:
      "NorthStar IT Services LLC: residential and small-business IT support and PC repair in the Charleston area. Diagnose first, then repair, then verify.",
    meta: [
      ["Role", "Owner"],
      ["Since", "2026"],
    ],
    art: "northstar" as const,
  },
  {
    href: "/projects/custom-pcs",
    kicker: "Hardware",
    title: "Custom PCs",
    summary:
      "Custom desktops built through NorthStar IT Services: compatibility, assembly, firmware, a Windows install, and a stability check before handoff.",
    meta: [
      ["Part of", "NorthStar IT"],
      ["Focus", "Compatibility · Testing"],
    ],
    art: "pcs" as const,
  },
];

export const labServices = [
  {
    service: "Pi-hole",
    role: "DNS filtering",
    why: "Network-wide DNS so devices on the LAN are filtered in one place.",
    learned: "How a client query is answered, filtered, or forwarded.",
  },
  {
    service: "Tailscale",
    role: "Remote access",
    why: "Reach the lab away from home without opening services to the public internet.",
    learned: "How a WireGuard-based VPN ties devices together.",
  },
  {
    service: "Uptime Kuma",
    role: "Monitoring",
    why: "Check whether services and endpoints respond.",
    learned: "How an outage shows up before a person reports it.",
  },
  {
    service: "Nginx Proxy Manager",
    role: "Reverse proxy",
    why: "Give each app a hostname instead of remembering ports.",
    learned: "How a reverse proxy routes a name to a container.",
  },
  {
    service: "Docker",
    role: "Runtime",
    why: "Run each service in its own container on the Pi.",
    learned: "Images, containers, and restarting one service without touching the others.",
  },
  {
    service: "Glances",
    role: "Host monitoring",
    why: "See CPU, memory, and storage on the Pi.",
    learned: "How to read host pressure while something else is failing.",
  },
  {
    service: "Watchtower",
    role: "Image updates",
    why: "Notice when container images have updates.",
    learned: "An update can take a service down, so I treat it as a change to check.",
  },
  {
    service: "Homarr",
    role: "Dashboard",
    why: "One page that links to the services I actually open.",
    learned: "A lab is easier to operate when the front door is obvious.",
  },
  {
    service: "File Browser",
    role: "Files",
    why: "A web view of files on the Pi.",
    learned: "Linux paths and permissions, from a browser instead of only a shell.",
  },
];

export const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
