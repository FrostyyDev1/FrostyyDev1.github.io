/**
 * Public facts for this site. Do not add employers, tools, or dates
 * beyond what is recorded here. Do not publish a phone number.
 * ITIL 4 Foundation is listed only with the certifications.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://frostyydev1.github.io";

export const person = {
  name: "Jacob Wiseman",
  location: "Elkview / Charleston, WV",
  locationLong: "Elkview, in the Charleston, West Virginia area",
  seeking: [
    "IT Support Engineer",
    "IT technician",
    "Desktop support",
    "Systems and networking",
  ],
  linkedin: "https://www.linkedin.com/in/jacob20",
  linkedinLabel: "linkedin.com/in/jacob20",
  business: "NorthStar IT Services LLC",
  businessUrl: "https://northstarwv.com",
  businessUrlLabel: "northstarwv.com",
} as const;

export const contactEmail = "jacob.wiseman345@gmail.com";
export const contactEmailHref = "mailto:jacob.wiseman345@gmail.com";

export const prompt = "jacob@northstar:~$";

export const education = {
  school: "CSU Global",
  degree: "B.S. Information Technology",
  expected: "September 2027",
} as const;

export const roles = [
  {
    id: "northstar",
    title: "Owner",
    org: "NorthStar IT Services LLC",
    place: "Elkview, WV",
    summary:
      "Jacob owns NorthStar IT Services LLC, an IT services business based in Elkview and working in the Charleston area.",
  },
  {
    id: "wvu",
    title: "Registration Specialist",
    org: "WVU Medicine Thomas Imaging Center",
    place: "Charleston area",
    summary:
      "Registration Specialist at WVU Medicine’s Thomas Imaging Center. Patient registration runs in Epic.",
  },
] as const;

/**
 * Official badge artwork from Credly organization pages.
 * These are the public certification badges, not personal share links.
 */
export const certifications = [
  {
    id: "aplus",
    name: "CompTIA A+",
    issuer: "CompTIA",
    image: "/certs/comptia-a-plus.png",
    width: 600,
    height: 600,
    imageAlt: "CompTIA A+ ce certification badge",
    earned: "October 2025",
    expires: "October 2028",
    credly: "https://www.credly.com/org/comptia/badge/comptia-a-ce-certification",
    summary:
      "The core credential for hardware, operating systems, and the troubleshooting desktop support is built on.",
  },
  {
    id: "netplus",
    name: "CompTIA Network+",
    issuer: "CompTIA",
    image: "/certs/comptia-network-plus.png",
    width: 601,
    height: 601,
    imageAlt: "CompTIA Network+ ce certification badge",
    earned: "October 2025",
    expires: "October 2028",
    credly:
      "https://www.credly.com/org/comptia/badge/comptia-network-ce-certification",
    summary:
      "The core credential for network infrastructure, operations, and troubleshooting.",
  },
  {
    id: "itil",
    name: "ITIL 4 Foundation",
    issuer: "PeopleCert",
    image: "/certs/itil-4-foundation.png",
    width: 640,
    height: 640,
    imageAlt: "ITIL 4 Foundation certification badge",
    earned: "August 2025",
    expires: null,
    credly: "https://www.credly.com/org/peoplecert/badge/itil-4-foundation",
    summary:
      "The foundation credential in IT service management, from PeopleCert.",
  },
] as const;

export const featuredCerts = certifications.filter((cert) => cert.id !== "itil");

export const domains = [
  "Epic",
  "Patient registration",
  "Desktop support",
  "Hardware",
  "Windows",
  "Networking",
  "TCP/IP",
  "Wi-Fi",
  "Systems",
  "Troubleshooting",
] as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
] as const;
