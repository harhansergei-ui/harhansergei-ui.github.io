import type { Metadata } from "next";

const socialImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Kuula FOH Pilot — Confidence at front of house.",
};

type SocialMetadataOptions = {
  url: string;
  title: string;
  description: string;
};

export function socialMetadata({
  url,
  title,
  description,
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      url,
      siteName: "Kuula FOH Pilot",
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
