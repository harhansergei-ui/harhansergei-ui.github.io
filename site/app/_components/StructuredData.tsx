const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fohpilot.com/#organization",
      name: "ELAVHÕBE OÜ",
      legalName: "ELAVHÕBE OÜ",
      url: "https://fohpilot.com/",
      email: "kuula@fohpilot.com",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Estonian registry code",
        value: "17331669",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pae tn 21",
        postalCode: "11415",
        addressLocality: "Tallinn",
        addressCountry: "EE",
      },
      sameAs: [
        "https://ariregister.rik.ee/eng/company/17331669/Elavh%C3%B5be-O%C3%9C",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://fohpilot.com/#website",
      url: "https://fohpilot.com/",
      name: "Kuula FOH Pilot",
      publisher: { "@id": "https://fohpilot.com/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://fohpilot.com/#app",
      name: "Kuula FOH Pilot",
      url: "https://fohpilot.com/",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Android",
      description:
        "A focused Android companion for live sound professionals.",
      publisher: { "@id": "https://fohpilot.com/#organization" },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
