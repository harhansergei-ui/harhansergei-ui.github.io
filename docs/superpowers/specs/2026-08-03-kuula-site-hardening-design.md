# Kuula FOH Pilot Site Hardening Design

## Purpose

Harden the existing app-inspired website at `fohpilot.com` for Google Play developer verification, mobile visitors, social sharing, search indexing, and production performance without changing its static GitHub Pages architecture or introducing data collection.

## Selected Approach

Keep the current Next.js static export, GitHub Pages deployment, visual system, product workflow, and screenshot gallery. Apply targeted corrections and production hardening rather than adding an image CDN, server runtime, form backend, or redesigning the site.

The site remains fully static. It does not add cookies, analytics, a database, user accounts, or a notification form.

## Content and CTA

- Correct the publisher sentence so generated HTML contains `ELAVHÕBE OÜ in Tallinn` with an explicit JSX space between the bold company name and the following word.
- Replace the hero's primary `Contact support` button with a visually prominent, non-interactive `Coming soon on Google Play` status.
- Keep `Contact support` as a secondary text link to `/support`.
- Do not use an official Google Play download badge before a public store listing exists.

## Brand and Social Metadata

- Add a lightweight SVG favicon based on the existing three-bar circular brand mark.
- Add PNG favicon and Apple Touch Icon fallbacks generated from the same mark.
- Replace the current oversized and dimension-mismatched Open Graph asset with a 1200 × 630 social image.
- Declare matching Open Graph and Twitter dimensions, MIME type, title, description, absolute URL, and alt text.
- Add a canonical URL for each public page.
- Add `robots.txt` and `sitemap.xml` covering `/`, `/support/`, and `/privacy/`.
- Add JSON-LD for the publisher and the Android software application without claiming that the app is already available in Google Play.

## Mobile Navigation and Gallery

- At tablet widths, hide only the in-page `Workflow` and `Screens` links.
- At phone widths, retain `Home`, `Support`, and `Privacy`; do not collapse the header to a single Support link.
- Keep the phone gallery as an intentional horizontal carousel with scroll snapping.
- Constrain the gallery to the content viewport so `document.documentElement.scrollWidth` never exceeds `clientWidth` at 320, 360, 390, and 430 CSS pixels.
- Preserve keyboard focus visibility and accessible navigation labels.

## Image Delivery

- Preserve the original PNG screenshots as fallback source assets.
- Generate AVIF and WebP variants for all nine product screenshots.
- Render each screenshot through a `<picture>` element ordered AVIF, WebP, then PNG.
- Keep the hero screenshot eager/high-priority and give it accurate intrinsic dimensions.
- Keep workflow, analysis, and lower gallery screenshots lazy-loaded with asynchronous decoding.
- Avoid loading more than one encoding of the same image in supported browsers.

## Legal Information

Update the Privacy Policy contact section with the public company details from the Estonian e-Business Register:

- Legal name: `ELAVHÕBE OÜ`
- Registry code: `17331669`
- Registered office: `Pae tn 21, 11415 Tallinn, Estonia`
- Contact email: `kuula@fohpilot.com`

The policy's effective date remains `2 August 2026` because the current app-specific privacy text was published on that date. The update does not add new processing activities.

## DNS, Caching, and Search

- Verify authoritative and public DNS contain only the four GitHub Pages apex A records, the `www` CNAME, mail records, DKIM/SPF, Domain Connect, and the Search Console verification TXT record expected for the current setup.
- Verify neither apex nor `www` serves Squarespace HTML, Squarespace response headers, or the phrase `Under construction`.
- Verify HTTPS enforcement and the GitHub Pages certificate for both hostnames.
- Publish `robots.txt`, `sitemap.xml`, canonical metadata, and updated page content.
- Use the existing verified Search Console property to inspect the home URL and request re-indexing after deployment so stale search snippets are replaced.

## Testing and Quality Gates

- Add rendered-HTML regression tests for the company-name spacing, primary CTA, legal details, canonical/social metadata, JSON-LD, robots, sitemap, and image format fallbacks.
- Run lint, rendered-HTML tests, and the static export.
- Run browser checks at 320, 360, 390, 430, 768, 1024, and desktop widths for menu visibility, page overflow, gallery containment, and image loading.
- Run Lighthouse against the deployed production URL with mobile settings.
- Targets: Performance at least 90; Accessibility, Best Practices, and SEO at least 95.
- Verify every public route and asset returns successfully over strict HTTPS, and verify `www` resolves or redirects to the apex domain.

## Failure Handling

- If an image encoder cannot produce a valid AVIF or WebP file, keep the PNG fallback and fail the build-time asset verification rather than publishing broken references.
- If Lighthouse misses a target, inspect the category diagnostics, make one focused correction, and rerun the full audit.
- If Search Console does not refresh immediately, leave the verified DNS TXT record and sitemap in place; indexing latency does not block the deployed site from being correct.

## Out of Scope

- Email subscription or notification form
- Analytics, advertising pixels, or consent banner
- Google Play Store download badge before the listing is public
- Application backend or image CDN
- Changes to mail delivery, nameservers, or Search Console ownership
