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

export const metadata: Metadata = {
  title: "Jacob Wiseman — IT Portfolio",
  description:
    "IT support, networking, infrastructure, systems, and technical projects by Jacob Wiseman.",
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
