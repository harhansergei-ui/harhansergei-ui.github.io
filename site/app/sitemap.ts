import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-03T00:00:00.000Z");

  return [
    {
      url: "https://fohpilot.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://fohpilot.com/support/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://fohpilot.com/privacy/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
