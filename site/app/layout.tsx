import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { StructuredData } from "./_components/StructuredData";
import { socialMetadata } from "./_data/socialMetadata";
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
  authors: [{ name: "ELAVHÕBE OÜ", url: "https://fohpilot.com/" }],
  creator: "ELAVHÕBE OÜ",
  publisher: "ELAVHÕBE OÜ",
  category: "Professional audio",
  keywords: [
    "live sound",
    "FOH",
    "audio measurement",
    "system correction",
    "Android",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  ...socialMetadata({
    url: "/",
    title: "Kuula FOH Pilot",
    description: "Confidence at front of house.",
  }),
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
        <StructuredData />
        <div className="site-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
