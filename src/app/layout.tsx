import type { Metadata } from "next";

import {
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

const title =
  "Jacob Wiseman — IT Portfolio";

const description =
  "IT support, networking, infrastructure, systems, homelab projects, and technical work by Jacob Wiseman.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s — Jacob Wiseman",
  },

  description,

  applicationName:
    "Jacob Wiseman Portfolio",

  authors: [
    {
      name: "Jacob Wiseman",
    },
  ],

  creator: "Jacob Wiseman",

  openGraph: {
    title,
    description,
    url: "/",
    siteName:
      "Jacob Wiseman Portfolio",
    type: "website",
    locale: "en_US",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jacob Wiseman — IT Portfolio",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title,
    description,

    images: [
      "/opengraph-image",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
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
      data-scroll-behavior="smooth"
    >
      <body
        className={`
          ${spaceGrotesk.variable}
          ${geistMono.variable}
          ${instrumentSerif.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
