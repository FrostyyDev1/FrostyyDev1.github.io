import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";

import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { RevealController } from "@/components/site/Reveal";
import { site, siteUrl } from "@/content/site";

import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  style: "normal",
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

const description =
  "Jacob Wiseman: entry-level IT support professional with CompTIA A+, Network+, and ITIL 4 Foundation. Homelab and PC repair case studies, experience, and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob Wiseman — IT Support, Desktop Support & Networking",
    template: "%s — Jacob Wiseman",
  },
  description,
  applicationName: "Jacob Wiseman Portfolio",
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: "Jacob Wiseman — IT Support, Desktop Support & Networking",
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
        alt: site.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Wiseman — IT Support, Desktop Support & Networking",
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
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
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <RevealController />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
