# Kuula FOH Pilot Site Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct and harden `fohpilot.com` for mobile visitors, social previews, search indexing, Google Play verification, and production performance while preserving the existing app-inspired static site.

**Architecture:** Keep the existing Next.js static export deployed by GitHub Actions to GitHub Pages. Add deterministic static brand/media generation, native `<picture>` delivery, static metadata routes, JSON-LD, focused responsive CSS, and rendered-output regression tests; no server runtime or user-data flow is introduced.

**Tech Stack:** Next.js 16.2.6, React 19.2.6, TypeScript 5.9.3, Node.js 22+, Sharp 0.34.5, Node test runner, GitHub Pages, Lighthouse 13.4.1.

## Global Constraints

- The site remains fully static and must not add forms, cookies, analytics, accounts, a database, or a notification backend.
- The primary hero status text is exactly `Coming soon on Google Play`; it is non-interactive and does not use an official Play Store badge.
- `Contact support` remains a secondary link to `/support`.
- The rendered publisher sentence must contain `ELAVHÕBE OÜ in Tallinn` with a real whitespace text node.
- Legal details are exactly: `ELAVHÕBE OÜ`, registry code `17331669`, `Pae tn 21, 11415 Tallinn, Estonia`, and `kuula@fohpilot.com`.
- Preserve all original PNG product screenshots while adding AVIF and WebP alternatives.
- Hero media loads eagerly with high priority; workflow, analysis, and gallery media remain lazy-loaded.
- Mobile navigation exposes `Home`, `Support`, and `Privacy`; the page has zero horizontal document overflow at 320, 360, 390, and 430 CSS pixels.
- Lighthouse targets on the deployed mobile audit are Performance ≥ 90 and Accessibility, Best Practices, and SEO ≥ 95.
- Do not change mail DNS records, nameservers, Search Console ownership, or the current GitHub Pages custom domain.

## File Structure

- Create `site/scripts/generate-assets.mjs`: deterministic AVIF/WebP, Open Graph, favicon, and Apple icon generator.
- Create `site/assets/og-source.png`: non-public source artwork moved from the current `site/public/og.png`.
- Create `site/public/favicon.svg`, `site/public/favicon-32.png`, and `site/public/apple-touch-icon.png`: browser and device icons.
- Create `site/public/product/*.avif` and `site/public/product/*.webp`: modern screenshot encodings.
- Create `site/app/_components/StructuredData.tsx`: Organization and SoftwareApplication JSON-LD.
- Create `site/app/robots.ts` and `site/app/sitemap.ts`: static crawler endpoints.
- Create `site/tests/assets.test.mjs`: media dimensions, encodings, and size regression tests.
- Create `site/tests/responsive-css.test.mjs`: source-level mobile navigation and gallery containment regression tests.
- Modify `site/package.json` and `site/package-lock.json`: add Sharp and run the complete test suite.
- Modify `site/app/_components/ProductScreenshot.tsx`: render AVIF/WebP/PNG `<picture>` markup with explicit loading priority.
- Modify `site/app/layout.tsx`: favicon, Open Graph, Twitter, and default metadata.
- Modify `site/app/page.tsx`: CTA, spacing correction, canonical metadata, and structured data.
- Modify `site/app/support/page.tsx` and `site/app/privacy/page.tsx`: canonical metadata and official legal details.
- Modify `site/app/globals.css`: CTA hierarchy, mobile navigation, and contained gallery behavior.
- Modify `site/tests/rendered-html.test.mjs`: rendered-content, metadata, structured-data, and crawler-route coverage.

---

### Task 1: Correct the publisher text and establish the release CTA

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`
- Modify: `site/app/page.tsx`
- Modify: `site/app/globals.css`

**Interfaces:**
- Consumes: existing `Home` server component and `.hero-actions` styling.
- Produces: `.release-status` non-interactive primary status and `.hero-support-link` secondary navigation link.

- [ ] **Step 1: Add failing rendered-output assertions**

Append these assertions to the existing home-page test:

```js
assert.match(html, /Coming soon on Google Play/);
assert.match(html, /class="release-status"[^>]*>[^<]*Coming soon on Google Play/s);
assert.match(html, /class="hero-support-link"[^>]*href="\/support"/);
assert.match(html, /ELAVHÕBE OÜ<\/b> in Tallinn, Estonia\./);
assert.doesNotMatch(html, /ELAVHÕBE OÜ<\/b>in Tallinn/);
assert.doesNotMatch(
  html,
  /class="button button-primary"[^>]*href="\/support"/,
);
```

- [ ] **Step 2: Run the test and verify the current output fails**

Run: `npm test`

Expected: the home test fails because the current hero still uses the primary Support button and rendered HTML contains `</b>in Tallinn`.

- [ ] **Step 3: Implement the approved CTA and explicit whitespace**

Replace the current hero action block in `site/app/page.tsx` with:

```tsx
<div className="hero-actions">
  <span className="release-status" aria-label="Release status">
    <span className="release-status-mark" aria-hidden="true">▶</span>
    Coming soon on Google Play
  </span>
  <Link className="hero-support-link" href="/support">
    Contact support
    <span aria-hidden="true">↗</span>
  </Link>
</div>
```

Change the publisher sentence to use an explicit JSX space:

```tsx
Kuula FOH Pilot is developed and published by <b>ELAVHÕBE OÜ</b>{" "}
in Tallinn, Estonia.
```

Add styles that preserve the existing orange visual language:

```css
.release-status {
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border: 1px solid var(--orange);
  border-radius: 9px;
  background: var(--orange);
  color: #16100a;
  font-size: 13px;
  font-weight: 760;
  box-shadow: 0 12px 34px rgba(255, 133, 24, 0.18);
}

.release-status-mark {
  font-size: 10px;
}

.hero-support-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--text-soft);
  font-size: 13px;
  font-weight: 650;
  text-underline-offset: 5px;
}
```

Include `.hero-support-link:focus-visible` in the existing focus-outline selector.

- [ ] **Step 4: Run tests and lint**

Run: `npm test && npm run lint`

Expected: all existing and new rendered-output assertions pass; lint exits 0.

- [ ] **Step 5: Commit the content correction**

```bash
git add site/app/page.tsx site/app/globals.css site/tests/rendered-html.test.mjs
git commit -m "fix: clarify Kuula release status"
```

---

### Task 2: Generate modern media and render responsive pictures

**Files:**
- Create: `site/scripts/generate-assets.mjs`
- Create: `site/tests/assets.test.mjs`
- Create: `site/assets/og-source.png`
- Create: `site/public/favicon.svg`
- Create: `site/public/favicon-32.png`
- Create: `site/public/apple-touch-icon.png`
- Create: `site/public/product/*.avif`
- Create: `site/public/product/*.webp`
- Modify: `site/public/og.png`
- Modify: `site/package.json`
- Modify: `site/package-lock.json`
- Modify: `site/app/_components/ProductScreenshot.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: each `ProductScreen.src` PNG path and the existing 1920 × 1200 intrinsic dimensions.
- Produces: `formatSrc(src, extension)` paths, AVIF/WebP `<source>` elements, optimized public assets, and a 1200 × 630 `og.png`.

- [ ] **Step 1: Add Sharp as an explicit build dependency**

Run: `npm install --save-dev --save-exact sharp@0.34.5`

Expected: `site/package.json` contains `"sharp": "0.34.5"` in `devDependencies`, and the lockfile records the same version.

- [ ] **Step 2: Add failing media tests**

Create `site/tests/assets.test.mjs` with:

```js
import assert from "node:assert/strict";
import { access, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(siteRoot, "public");
const productRoot = path.join(publicRoot, "product");

test("product screenshots provide valid AVIF and WebP alternatives", async () => {
  const pngFiles = (await readdir(productRoot)).filter((name) => name.endsWith(".png"));
  assert.equal(pngFiles.length, 9);

  for (const pngName of pngFiles) {
    const stem = pngName.slice(0, -4);
    const pngPath = path.join(productRoot, pngName);
    const pngSize = (await stat(pngPath)).size;

    for (const extension of ["avif", "webp"]) {
      const candidate = path.join(productRoot, `${stem}.${extension}`);
      await access(candidate);
      const metadata = await sharp(candidate).metadata();
      assert.equal(metadata.width, 1920);
      assert.equal(metadata.height, 1200);
      assert.ok((await stat(candidate)).size < pngSize);
    }
  }
});

test("brand and Open Graph assets have production dimensions", async () => {
  await access(path.join(publicRoot, "favicon.svg"));
  assert.deepEqual(
    await sharp(path.join(publicRoot, "favicon-32.png")).metadata().then(({ width, height }) => [width, height]),
    [32, 32],
  );
  assert.deepEqual(
    await sharp(path.join(publicRoot, "apple-touch-icon.png")).metadata().then(({ width, height }) => [width, height]),
    [180, 180],
  );
  assert.deepEqual(
    await sharp(path.join(publicRoot, "og.png")).metadata().then(({ width, height }) => [width, height]),
    [1200, 630],
  );
});
```

Add rendered-picture assertions to the home test:

```js
assert.match(html, /<source srcSet="\/product\/kuula-google-play-07-balanced\.avif" type="image\/avif"/);
assert.match(html, /<source srcSet="\/product\/kuula-google-play-07-balanced\.webp" type="image\/webp"/);
assert.match(html, /<img[^>]*src="\/product\/kuula-google-play-07-balanced\.png"/);
assert.match(html, /<img[^>]*fetchPriority="high"[^>]*loading="eager"/);
assert.match(html, /<img[^>]*loading="lazy"/);
```

- [ ] **Step 3: Run the media tests and verify missing assets fail**

Run: `node --test tests/assets.test.mjs`

Expected: failure on the first missing `.avif`, `.webp`, or favicon path.

- [ ] **Step 4: Add the deterministic source assets and generator**

Move the current Open Graph artwork out of the public directory:

```bash
mkdir -p assets
mv public/og.png assets/og-source.png
```

Create `site/public/favicon.svg` with the existing brand colors and mark:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0e11"/>
  <circle cx="32" cy="32" r="22" fill="#151a20" stroke="#ff8518" stroke-width="3"/>
  <rect x="22" y="31" width="5" height="12" rx="2" fill="#ff8518"/>
  <rect x="30" y="19" width="5" height="24" rx="2" fill="#ff8518"/>
  <rect x="38" y="25" width="5" height="18" rx="2" fill="#ff8518"/>
</svg>
```

Create `site/scripts/generate-assets.mjs`:

```js
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(siteRoot, "public");
const productRoot = path.join(publicRoot, "product");
const pngFiles = (await readdir(productRoot)).filter((name) => name.endsWith(".png"));

for (const pngName of pngFiles) {
  const source = path.join(productRoot, pngName);
  const stem = pngName.slice(0, -4);
  await sharp(source).avif({ quality: 55, effort: 6 }).toFile(path.join(productRoot, `${stem}.avif`));
  await sharp(source).webp({ quality: 78, effort: 6 }).toFile(path.join(productRoot, `${stem}.webp`));
}

const faviconSvg = await readFile(path.join(publicRoot, "favicon.svg"));
await sharp(faviconSvg).resize(32, 32).png({ compressionLevel: 9 }).toFile(path.join(publicRoot, "favicon-32.png"));
await sharp(faviconSvg).resize(180, 180).png({ compressionLevel: 9 }).toFile(path.join(publicRoot, "apple-touch-icon.png"));
await sharp(path.join(siteRoot, "assets", "og-source.png"))
  .resize(1200, 630, { fit: "cover" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(publicRoot, "og.png"));
```

Add `"assets:generate": "node scripts/generate-assets.mjs"` to `scripts` and change the test script to `npm run build && node --test tests/*.test.mjs`.

- [ ] **Step 5: Generate assets and verify their dimensions**

Run: `npm run assets:generate && node --test tests/assets.test.mjs`

Expected: both media tests pass, and each AVIF/WebP is smaller than its PNG source.

- [ ] **Step 6: Replace unoptimized Next images with native picture selection**

In `ProductScreenshot.tsx`, remove the `next/image` import, add `/* eslint-disable @next/next/no-img-element */`, and use:

```tsx
function formatSrc(src: string, extension: "avif" | "webp") {
  return src.replace(/\.png$/, `.${extension}`);
}

<picture>
  <source srcSet={formatSrc(screen.src, "avif")} type="image/avif" />
  <source srcSet={formatSrc(screen.src, "webp")} type="image/webp" />
  <img
    src={screen.src}
    alt={screen.alt}
    width={1920}
    height={1200}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
  />
</picture>
```

Do not add JavaScript format detection; browser `<picture>` negotiation chooses one source.

- [ ] **Step 7: Run the complete tests, static build, and lint**

Run: `npm test && npm run build:static && npm run lint`

Expected: all tests pass, the export completes, and lint exits 0.

- [ ] **Step 8: Commit media optimization**

```bash
git add site/package.json site/package-lock.json site/scripts site/assets site/public site/app/_components/ProductScreenshot.tsx site/tests
git commit -m "perf: add modern Kuula media assets"
```

---

### Task 3: Add production metadata, crawler routes, structured data, and legal details

**Files:**
- Create: `site/app/_components/StructuredData.tsx`
- Create: `site/app/robots.ts`
- Create: `site/app/sitemap.ts`
- Modify: `site/app/layout.tsx`
- Modify: `site/app/page.tsx`
- Modify: `site/app/support/page.tsx`
- Modify: `site/app/privacy/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: brand assets from Task 2 and `metadataBase` at `https://fohpilot.com`.
- Produces: canonical metadata, 1200 × 630 social metadata, `StructuredData`, `/robots.txt`, `/sitemap.xml`, and official company contact markup.

- [ ] **Step 1: Add failing metadata and legal assertions**

Add these checks to `rendered-html.test.mjs`:

```js
assert.match(html, /<link rel="canonical" href="https:\/\/fohpilot\.com\/"/);
assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml"/);
assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
assert.match(html, /property="og:image" content="https:\/\/fohpilot\.com\/og\.png"/);
assert.match(html, /property="og:image:width" content="1200"/);
assert.match(html, /property="og:image:height" content="630"/);
assert.match(html, /type="application\/ld\+json"/);
assert.match(html, /"@type":"SoftwareApplication"/);
assert.match(html, /"@type":"Organization"/);
```

In the Privacy test, assert:

```js
assert.match(html, /Registry code: 17331669/);
assert.match(html, /Pae tn 21, 11415 Tallinn, Estonia/);
```

Add raw route tests that fetch `/robots.txt` and `/sitemap.xml`:

```js
test("crawler routes expose the production host and every public page", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robotsText = await robotsResponse.text();
  assert.match(robotsText, /Allow: \//);
  assert.match(robotsText, /Sitemap: https:\/\/fohpilot\.com\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/i);
  const sitemapText = await sitemapResponse.text();
  for (const url of [
    "https://fohpilot.com/",
    "https://fohpilot.com/support/",
    "https://fohpilot.com/privacy/",
  ]) {
    assert.match(sitemapText, new RegExp(`<loc>${url}</loc>`));
  }
});
```

- [ ] **Step 2: Run tests and confirm the metadata routes and legal details fail**

Run: `npm test`

Expected: failures for old OG dimensions, missing canonical/favicon/JSON-LD tags, missing company details, and missing crawler routes.

- [ ] **Step 3: Implement canonical and icon metadata**

Update root metadata in `layout.tsx`:

```tsx
icons: {
  icon: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
},
openGraph: {
  type: "website",
  url: "/",
  siteName: "Kuula FOH Pilot",
  title: "Kuula FOH Pilot",
  description: "Confidence at front of house.",
  images: [{
    url: "/og.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Kuula FOH Pilot — Confidence at front of house.",
  }],
},
```

Add `alternates: { canonical: "/" }` to home metadata, `/support/` to Support metadata, and `/privacy/` to Privacy metadata.

- [ ] **Step 4: Add static JSON-LD**

Create `StructuredData.tsx` with a single `@graph` containing:

```tsx
const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fohpilot.com/#organization",
      name: "ELAVHÕBE OÜ",
      identifier: "17331669",
      url: "https://fohpilot.com/",
      email: "mailto:kuula@fohpilot.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pae tn 21",
        postalCode: "11415",
        addressLocality: "Tallinn",
        addressCountry: "EE",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://fohpilot.com/#app",
      name: "Kuula FOH Pilot",
      operatingSystem: "Android",
      applicationCategory: "MultimediaApplication",
      url: "https://fohpilot.com/",
      publisher: { "@id": "https://fohpilot.com/#organization" },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

Render `<StructuredData />` once in the home page.

- [ ] **Step 5: Add robots and sitemap metadata routes**

Create `robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://fohpilot.com/sitemap.xml",
    host: "https://fohpilot.com",
  };
}
```

Create `sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-03T00:00:00.000Z");

  return [
    {
      url: "https://fohpilot.com/",
      lastModified,
      changeFrequency: "monthly",
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
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
```

- [ ] **Step 6: Add official legal details to Privacy**

Replace the Privacy contact address with:

```tsx
<address>
  <strong>ELAVHÕBE OÜ</strong>
  <br />
  Registry code: 17331669
  <br />
  Pae tn 21, 11415 Tallinn, Estonia
  <br />
  <a href="mailto:kuula@fohpilot.com">kuula@fohpilot.com</a>
</address>
```

- [ ] **Step 7: Run tests, export, and inspect generated routes**

Run: `npm test && npm run build:static && test -f out/robots.txt && test -f out/sitemap.xml && rg -n "1200|630|canonical|application/ld\+json|17331669" out/index.html out/privacy/index.html`

Expected: tests pass; crawler files exist; exported HTML contains the new metadata and legal details.

- [ ] **Step 8: Commit metadata and legal information**

```bash
git add site/app site/tests/rendered-html.test.mjs
git commit -m "feat: add production metadata and legal details"
```

---

### Task 4: Contain the mobile gallery and preserve useful navigation

**Files:**
- Create: `site/tests/responsive-css.test.mjs`
- Modify: `site/app/globals.css`

**Interfaces:**
- Consumes: the existing five-link desktop navigation and `.screen-gallery` markup.
- Produces: phone navigation with Home/Support/Privacy and a gallery that scrolls internally without widening the document.

- [ ] **Step 1: Add failing CSS regression tests**

Create `responsive-css.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const phoneStart = css.indexOf("@media (max-width: 560px)");
const reducedMotionStart = css.indexOf("@media (prefers-reduced-motion: reduce)");
const phoneCss = css.slice(phoneStart, reducedMotionStart);

test("phone navigation keeps Home, Support, and Privacy visible", () => {
  assert.ok(phoneStart >= 0);
  assert.doesNotMatch(phoneCss, /nav a:first-child/);
  assert.doesNotMatch(phoneCss, /nav a:nth-child\(5\)/);
});

test("phone gallery is contained by its shell", () => {
  assert.match(phoneCss, /\.screen-gallery\s*{[^}]*width:\s*100%;/s);
  assert.match(phoneCss, /\.screen-gallery\s*{[^}]*max-width:\s*100%;/s);
  assert.doesNotMatch(phoneCss, /width:\s*calc\(100vw\s*-\s*14px\)/);
});
```

- [ ] **Step 2: Run the source test and verify both current regressions fail**

Run: `node --test tests/responsive-css.test.mjs`

Expected: failure because Home and Privacy are hidden at 560px and gallery width is tied to `100vw`.

- [ ] **Step 3: Implement contained mobile behavior**

Keep the existing tablet rule that hides navigation items 2 and 3. Remove the phone rule that hides items 1 and 5. Replace the phone gallery block with:

```css
.screens-section {
  min-width: 0;
}

.screen-gallery {
  display: flex;
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  gap: 14px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: 0 0 18px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}

.screen-gallery .product-screenshot {
  flex: 0 0 min(86vw, 520px);
  max-width: 100%;
  scroll-snap-align: start;
}
```

Add the picture containment rule:

```css
.product-screen-frame picture {
  min-width: 0;
  display: block;
}
```

- [ ] **Step 4: Run all tests and lint**

Run: `npm test && npm run lint`

Expected: responsive source tests and all existing tests pass.

- [ ] **Step 5: Commit responsive corrections**

```bash
git add site/app/globals.css site/tests/responsive-css.test.mjs
git commit -m "fix: contain Kuula mobile navigation and gallery"
```

---

### Task 5: Verify the complete site locally at target viewports

**Files:**
- Inspect: `site/out/**`
- Produce outside git: `/tmp/kuula-lighthouse-local.json`

**Interfaces:**
- Consumes: the completed static export from Tasks 1–4.
- Produces: viewport measurements and a local Lighthouse report; no repository interface changes.

- [ ] **Step 1: Run the full local quality gate from a clean build**

Run: `npm run lint && npm test && npm run build:static && git diff --check`

Expected: every command exits 0 and the static export lists `/`, `/support`, `/privacy`, `/robots.txt`, and `/sitemap.xml`.

- [ ] **Step 2: Serve the static export**

Run in a persistent terminal: `python3 -m http.server 4173 --directory out --bind 127.0.0.1`

Expected: `curl -I http://127.0.0.1:4173/` returns 200.

- [ ] **Step 3: Measure mobile navigation and overflow in the browser**

At widths 320, 360, 390, and 430, evaluate:

```js
({
  viewport: window.innerWidth,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  visibleNav: [...document.querySelectorAll("nav a")]
    .filter((element) => getComputedStyle(element).display !== "none")
    .map((element) => element.textContent?.trim()),
  galleryContained:
    document.querySelector(".screen-gallery").getBoundingClientRect().right <=
    document.documentElement.clientWidth,
})
```

Expected at every phone width: `overflow: 0`, `visibleNav: ["Home", "Support", "Privacy"]`, and `galleryContained: true`.

- [ ] **Step 4: Inspect tablet and desktop layouts**

At widths 768, 1024, and 1440 verify Home/Support/Privacy remain available, hero and workflow media preserve aspect ratio, the gallery is one column at tablet and two columns at desktop, and no image exceeds its container.

- [ ] **Step 5: Run a local mobile Lighthouse audit**

Run:

```bash
npx --yes lighthouse@13.4.1 http://127.0.0.1:4173/ \
  --output=json \
  --output-path=/tmp/kuula-lighthouse-local.json \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --chrome-flags="--headless --no-sandbox"
```

Read scores with:

```bash
node -e 'const r=require("/tmp/kuula-lighthouse-local.json"); for (const [k,v] of Object.entries(r.categories)) console.log(k, Math.round(v.score*100))'
```

Expected: Performance ≥ 90 and Accessibility, Best Practices, SEO ≥ 95. If a target fails, use the report's failed audits to return to the specific media, metadata, or responsive task that owns the cause, apply one focused change, and rerun Steps 1–5.

---

### Task 6: Publish and verify DNS, cache replacement, Search Console, and production Lighthouse

**Files:**
- Inspect: `.github/workflows/pages.yml`
- Produce outside git: `/tmp/kuula-lighthouse-production.json`

**Interfaces:**
- Consumes: a clean branch whose commits include the approved design and Tasks 1–4.
- Produces: updated `origin/main`, a successful GitHub Pages deployment, Search Console re-indexing request, and production audit evidence.

- [ ] **Step 1: Re-run pre-publish verification**

Run: `npm run lint && npm test && npm run build:static && git diff --check && git status --short --branch`

Expected: all verification exits 0 and the worktree has no uncommitted source changes.

- [ ] **Step 2: Publish the completed commit range**

Run from the repository root: `git push origin HEAD:main`

Expected: `origin/main` advances from `9bd8144` through the design and implementation commits without force-pushing.

- [ ] **Step 3: Wait for the existing Pages workflow**

Run:

```bash
latest_run_id=$(gh run list --workflow "Publish website" --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$latest_run_id" --json status,conclusion,url,headSha
gh run watch "$latest_run_id" --exit-status
```

Expected: the run for the pushed HEAD completes with conclusion `success`.

- [ ] **Step 4: Verify strict HTTPS routes and assets**

Run:

```bash
for site_route in / /support/ /privacy/ /robots.txt /sitemap.xml /og.png /favicon.svg; do
  curl -sS -o /dev/null -w "$site_route %{http_code} %{content_type}\n" --max-time 20 "https://fohpilot.com$site_route"
done
for image_format in avif webp; do
  for image_id in 01 02 03 04 05 06 07-balanced 08 09; do
    curl -sS -o /dev/null -w "$image_format/$image_id %{http_code} %{content_type}\n" --max-time 20 "https://fohpilot.com/product/kuula-google-play-$image_id.$image_format"
  done
done
curl -sS -I --max-time 20 https://www.fohpilot.com/
openssl s_client -servername fohpilot.com -connect fohpilot.com:443 </dev/null 2>/dev/null | openssl x509 -noout -ext subjectAltName
```

Expected: every apex URL returns 200 over strict HTTPS; `https://www.fohpilot.com/` returns a permanent redirect to `https://fohpilot.com/`; the served certificate covers both hostnames.

- [ ] **Step 5: Verify DNS and absence of Squarespace content**

Run:

```bash
authoritative_ns=$(dig +short NS fohpilot.com | head -1)
dig +short A fohpilot.com "@$authoritative_ns" | sort
dig +short CNAME www.fohpilot.com "@$authoritative_ns"
dig +short A fohpilot.com @1.1.1.1 | sort
dig +short AAAA fohpilot.com @1.1.1.1
dig +short CNAME www.fohpilot.com @1.1.1.1
dig +short MX fohpilot.com @1.1.1.1
dig +short TXT fohpilot.com @1.1.1.1
dig +short TXT google._domainkey.fohpilot.com @1.1.1.1
dig +short CNAME _domainconnect.fohpilot.com @1.1.1.1
if curl -sS https://fohpilot.com/ | rg -qi "Under construction|Squarespace"; then exit 1; fi
if curl -sS https://www.fohpilot.com/ -L | rg -qi "Under construction|Squarespace"; then exit 1; fi
```

Expected authoritative and public apex A values: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`; apex AAAA is empty; `www` CNAME is `harhansergei-ui.github.io.`; MX, SPF, DKIM, Domain Connect, and Search Console verification records remain; neither HTTP response contains Squarespace or Under construction.

- [ ] **Step 6: Verify social metadata and request search re-indexing**

Fetch production HTML and confirm the canonical URL, favicon links, 1200 × 630 Open Graph tags, and JSON-LD. Open the verified Search Console property `sc-domain:fohpilot.com`, inspect `https://fohpilot.com/`, submit `sitemap.xml` if it is not already present, and request indexing for the updated home page.

Expected: Search Console accepts the inspection/indexing request. A public search for `site:fohpilot.com "Under construction"` returns no matching current page; search-result refresh latency is recorded as external and does not alter the verified deployment state.

- [ ] **Step 7: Run production Lighthouse and verify the thresholds**

Run:

```bash
npx --yes lighthouse@13.4.1 https://fohpilot.com/ \
  --output=json \
  --output-path=/tmp/kuula-lighthouse-production.json \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --chrome-flags="--headless --no-sandbox"
node -e 'const r=require("/tmp/kuula-lighthouse-production.json"); for (const [k,v] of Object.entries(r.categories)) console.log(k, Math.round(v.score*100))'
```

Expected: Performance ≥ 90 and Accessibility, Best Practices, SEO ≥ 95.

- [ ] **Step 8: Record final evidence and finish the branch**

Record the deployed commit SHA, successful workflow URL, Lighthouse scores, Search Console request result, DNS answers, strict HTTPS status, and mobile overflow measurements. Invoke `superpowers:verification-before-completion`, then `superpowers:finishing-a-development-branch` before reporting completion.
