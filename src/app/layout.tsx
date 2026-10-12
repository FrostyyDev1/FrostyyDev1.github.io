import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { person, siteUrl } from "@/content/site";

import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Jacob Wiseman — IT Support";
const description =
  "Jacob Wiseman, IT support in Elkview, West Virginia. CompTIA A+, Network+, and ITIL 4 Foundation. Desktop support, homelab, and PC repair.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Jacob Wiseman",
  },
  description,
  applicationName: "Jacob Wiseman",
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Jacob Wiseman",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jacob Wiseman — IT support, desktop support, and networking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteNav />
        <div id="top">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
