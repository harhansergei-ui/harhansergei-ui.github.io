import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fohpilot.com"),
  title: {
    default: "Kuula FOH Pilot",
    template: "%s",
  },
  description:
    "A focused Android companion for live sound professionals, developed by ELAVHÕBE OÜ.",
  applicationName: "Kuula FOH Pilot",
  openGraph: {
    type: "website",
    siteName: "Kuula FOH Pilot",
    title: "Kuula FOH Pilot",
    description: "Confidence at front of house.",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 896,
        alt: "Kuula FOH Pilot — Confidence at front of house.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuula FOH Pilot",
    description: "Confidence at front of house.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e11",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="site-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
