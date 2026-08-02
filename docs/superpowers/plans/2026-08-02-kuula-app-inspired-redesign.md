# Kuula App-Inspired Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Kuula FOH Pilot marketing site around the nine real Android screenshots and the app's dark orange/cyan/green interface language.

**Architecture:** Keep the existing Next.js/vinext three-route structure and server-rendered route tests. Add a typed screenshot manifest and a reusable screenshot-frame component, rebuild the Home page from server components, share all visual tokens through `globals.css`, and preserve Support/Privacy content. Store all product assets in `public/product/`, including one corrected Correction screen and one bespoke social card.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, vinext/Vite, Cloudflare Sites, GitHub Pages static export.

## Global Constraints

- Public language remains English.
- Product name remains exactly `Kuula FOH Pilot`.
- Organization remains exactly `ELAVHÕBE OÜ` in `Tallinn, Estonia`.
- Public support email remains exactly `kuula@fohpilot.com`.
- Pre-release copy remains factual and does not imply Google Play availability.
- Support and Privacy content and URLs remain unchanged.
- All nine supplied screenshots appear on Home with descriptive alt text.
- The corrected screenshot changes only the low-frequency Left/Right curve separation.
- No new analytics, forms, accounts, persistence, or client-side application state.
- The site remains keyboard accessible, responsive, and reduced-motion safe.

---

### Task 1: Add and Correct Product Screenshot Assets

**Files:**
- Create: `site/public/product/kuula-google-play-01.png`
- Create: `site/public/product/kuula-google-play-02.png`
- Create: `site/public/product/kuula-google-play-03.png`
- Create: `site/public/product/kuula-google-play-04.png`
- Create: `site/public/product/kuula-google-play-05.png`
- Create: `site/public/product/kuula-google-play-06.png`
- Create: `site/public/product/kuula-google-play-07-balanced.png`
- Create: `site/public/product/kuula-google-play-08.png`
- Create: `site/public/product/kuula-google-play-09.png`

**Interfaces:**
- Consumes: `/tmp/kuula_google_play_screenshots/kuula_google_play_01.png` through `09.png`.
- Produces: stable public URLs under `/product/` for the screenshot manifest.

- [ ] **Step 1: Copy the eight unchanged images into `site/public/product/`**

Use deterministic names `kuula-google-play-01.png` through `09.png`, reserving
`07-balanced.png` for the edited Correction screen.

- [ ] **Step 2: Edit the Correction screen with the built-in image editor**

Use `kuula_google_play_07.png` as the edit target with this invariant-focused
prompt:

```text
Use case: precise-object-edit
Asset type: Kuula FOH Pilot website product screenshot
Primary request: redraw only the Left (blue) and Right (red) response curves below roughly 160 Hz so both channels remain distinct but track much closer together, with a realistic modest separation and no extreme bass divergence.
Constraints: preserve the green Target curve; preserve the Left and Right curves from roughly 160 Hz upward; preserve the graph grid, axes, labels, legend, controls, typography, colors, spacing, dimensions, and every other UI element exactly; do not add or remove text; no watermark.
```

- [ ] **Step 3: Inspect the edited output at original resolution**

Verify the asset is 1920×1200, the blue/red curves are close but not identical
below 160 Hz, and all UI text and controls remain unchanged.

- [ ] **Step 4: Save the selected edit as `site/public/product/kuula-google-play-07-balanced.png`**

- [ ] **Step 5: Verify all asset dimensions and file sizes**

Run:

```bash
file site/public/product/*.png
du -h site/public/product/*.png
```

Expected: nine 1920×1200 PNGs and no zero-byte files.

### Task 2: Define Screenshot Data and Failing Route Tests

**Files:**
- Create: `site/app/_data/productScreens.ts`
- Create: `site/app/_components/ProductScreenshot.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `ProductScreen` type, `productScreens` array, and `ProductScreenshot` component.
- `ProductScreenshot` consumes `{ screen: ProductScreen; priority?: boolean; className?: string }`.

- [ ] **Step 1: Add failing homepage assertions**

Extend the existing Home test with exact requirements:

```js
for (const id of ["01", "02", "03", "04", "05", "06", "07-balanced", "08", "09"]) {
  assert.match(html, new RegExp(`/product/kuula-google-play-${id}\\.png`));
}
for (const stage of ["Setup", "Measure", "Correction", "Live"]) {
  assert.match(html, new RegExp(`>${stage}<`));
}
assert.match(html, /aria-label="Kuula FOH Pilot product screens"/);
assert.match(html, /data-app-shell="true"/);
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --test-name-pattern="home introduces"`

Expected: FAIL because the screenshot URLs and app-shell markers do not exist.

- [ ] **Step 3: Create the typed screenshot manifest**

Define:

```ts
export type ProductScreen = {
  id: string;
  stage: "Setup" | "Measure" | "Correction" | "Live";
  src: string;
  alt: string;
  caption: string;
};

export const productScreens: ProductScreen[] = [
  { id: "01", stage: "Setup", src: "/product/kuula-google-play-01.png", alt: "Assign Measurement Mic dialog with WING and physical input routing", caption: "Assign the measurement microphone to the correct WING and physical input channels." },
  { id: "02", stage: "Setup", src: "/product/kuula-google-play-02.png", alt: "Kuula routing overview for microphone, reference playback, PA outputs, and matrix correction", caption: "See the full routing chain before measurement starts." },
  { id: "03", stage: "Measure", src: "/product/kuula-google-play-03.png", alt: "Measurement preparation screen for setting PA volume and microphone placement", caption: "Prepare SPL and microphone placement in a guided sequence." },
  { id: "04", stage: "Measure", src: "/product/kuula-google-play-04.png", alt: "Six-position microphone point plan in front of the PA", caption: "Choose a practical measurement plan for the room." },
  { id: "05", stage: "Measure", src: "/product/kuula-google-play-05.png", alt: "Active capture plan showing completed and current microphone positions", caption: "Track every capture position while measurement is in progress." },
  { id: "06", stage: "Measure", src: "/product/kuula-google-play-06.png", alt: "Review captures graph with six room response traces", caption: "Review and compare captures before analysis." },
  { id: "07-balanced", stage: "Correction", src: "/product/kuula-google-play-07-balanced.png", alt: "Correction graph comparing target, left, and right response curves", caption: "Compare the target and channel responses before applying correction." },
  { id: "08", stage: "Live", src: "/product/kuula-google-play-08.png", alt: "Live analyzer waterfall with SPL and microphone health panels", caption: "Watch SPL, analyzer health, and the live waterfall." },
  { id: "09", stage: "Live", src: "/product/kuula-google-play-09.png", alt: "Live RTA and transfer-function overlay with SPL readout", caption: "Switch to the RTA and transfer-function overlay for live decisions." },
];
```

Each `alt` must name the visible function rather than say “screenshot.”

- [ ] **Step 4: Create `ProductScreenshot`**

Use `next/image` with fixed source dimensions, `unoptimized`, responsive
`sizes`, and semantic figure markup:

```tsx
<figure className={className} data-screen={screen.id}>
  <div className="product-screen-frame">
    <Image src={screen.src} alt={screen.alt} width={1920} height={1200} priority={priority} unoptimized sizes="(max-width: 760px) 92vw, 60vw" />
  </div>
  <figcaption><span>{screen.stage}</span>{screen.caption}</figcaption>
</figure>
```

- [ ] **Step 5: Run TypeScript through the build**

Run: `npm run build`

Expected: PASS with the new data/component files compiling.

### Task 3: Rebuild the Homepage Around the Real Product

**Files:**
- Modify: `site/app/page.tsx`
- Modify: `site/app/_components/SiteHeader.tsx`
- Modify: `site/app/_components/SiteFooter.tsx`

**Interfaces:**
- Consumes: `productScreens` and `ProductScreenshot`.
- Produces: semantic sections with ids `workflow`, `analysis`, and `screens`.

- [ ] **Step 1: Replace the decorative console with the app-inspired hero**

Keep the approved headline and summary. Add a `data-app-shell="true"` product
frame using screen `09`, an orange Support CTA, a muted `Built for Android`
note, and a status eyebrow containing `Android release in preparation`.

- [ ] **Step 2: Add the signal-status strip**

Render three factual tiles:

```tsx
[
  ["Workflow", "Setup → Measure → Correct → Live"],
  ["Analysis", "RTA · transfer function · waterfall"],
  ["Console", "WING discovery and OSC control"],
]
```

Use cyan and green only as secondary status colors.

- [ ] **Step 3: Add the four-stage workflow**

Use these image mappings and restrained copy:

```text
Setup      → 02 → Route the measurement mic, reference playback, PA outputs, and matrix correction.
Measure    → 06 → Review captures across listening positions before analysis.
Correction → 07-balanced → Compare the target, left, and right response before applying correction.
Live       → 08 → Monitor SPL, analyzer health, RTA, transfer function, and waterfall views.
```

- [ ] **Step 4: Add the wide analysis showcase**

Pair screen `06` with screen `07-balanced` under the heading
`See the room. Shape the response.` and keep all claims grounded in visible
UI and the existing Privacy description.

- [ ] **Step 5: Add the complete nine-screen gallery**

Render `productScreens.map(...)` in a section with
`aria-label="Kuula FOH Pilot product screens"`. Keep native horizontal
overflow on narrow screens and a two-column grid on wide screens.

- [ ] **Step 6: Update header and footer navigation**

Header order:

```text
Home | Workflow | Screens | Support | Privacy
```

Workflow and Screens use same-page anchors on Home. Footer keeps the legal
identity, Privacy, and mail link and adds a Home link only if needed for
orientation.

- [ ] **Step 7: Run the focused route test**

Run: `npm test -- --test-name-pattern="home introduces"`

Expected: PASS.

### Task 4: Apply the App Visual System Across Every Route

**Files:**
- Modify: `site/app/globals.css`
- Modify: `site/app/layout.tsx`
- Modify: `site/app/support/page.tsx` only if extra structural classes are needed
- Modify: `site/app/privacy/page.tsx` only if extra structural classes are needed

**Interfaces:**
- Produces: shared tokens and responsive classes consumed by all three routes.

- [ ] **Step 1: Replace warm editorial tokens with app tokens**

Define exact custom properties:

```css
:root {
  --app-bg: #0b0e11;
  --app-surface: #151a20;
  --app-raised: #20262d;
  --app-border: #2a323c;
  --app-orange: #ff8518;
  --app-orange-wash: #4a2f1e;
  --app-cyan: #4bc3f4;
  --app-green: #60cd73;
  --app-text: #e7e9ed;
  --app-muted: #9ca3ad;
}
```

- [ ] **Step 2: Restyle shared chrome**

Make the site header resemble the app's top tab rail, use a compact orange
active/focus treatment, rounded raised panels, pill buttons, blue-gray borders,
and app-like section labels. Avoid gradients that are not present in the app.

- [ ] **Step 3: Style hero, status strip, workflow, analysis, and gallery**

Provide large screenshot frames with 16–22 px radii, subtle borders, no fake
device bezel, and no warm drop shadow. Use CSS grid for desktop and stacked
layouts below 900 px.

- [ ] **Step 4: Style Support and Privacy with the same panel language**

Retain all copy. Use raised page-heading surfaces, orange section labels,
blue-gray dividers, and pill/outlined contact controls consistent with Home.

- [ ] **Step 5: Add mobile rail behavior and reduced-motion rules**

Below 720 px, make `.screen-gallery` a horizontal scroll-snap rail with
`overscroll-behavior-inline: contain`; keep each card between 86–92 vw and
prevent body-level horizontal overflow.

- [ ] **Step 6: Update metadata colors**

Set `viewport.themeColor` to `#0b0e11` and preserve the current canonical
metadata and route titles.

- [ ] **Step 7: Run lint and route tests**

Run:

```bash
npm run lint
npm test
```

Expected: lint exit 0 and all route tests pass.

### Task 5: Create and Wire the Finished Social Preview

**Files:**
- Modify: `site/public/og.png`
- Modify: `site/app/layout.tsx`

**Interfaces:**
- Consumes: stable headline, app palette, and corrected product-screen motif.
- Produces: one validated 1728×896 social card referenced by Open Graph and X metadata.

- [ ] **Step 1: Generate exactly one cohesive social card**

Use the built-in image generator with this brief:

```text
Use case: ads-marketing
Asset type: 1728×896 social preview for fohpilot.com
Primary request: create a polished Kuula FOH Pilot social card matching the finished website and Android app.
Composition: near-black background, headline on the left, authentic dark analyzer-panel motif on the right, restrained orange/cyan/green signal accents.
Text (verbatim): "KUULA FOH PILOT" and "Confidence at front of house."
Constraints: highly legible at link-preview size; no invented feature text; no logos beyond the text brand; no watermark.
```

- [ ] **Step 2: Inspect text and palette**

Reject the image if either required string is misspelled, clipped, duplicated,
or replaced. Retry once only if unusable.

- [ ] **Step 3: Save the accepted image to `site/public/og.png`**

- [ ] **Step 4: Confirm metadata still references `/og.png` at 1728×896**

### Task 6: Full Validation, Visual QA, and Publication

**Files:**
- Modify: `site/tests/rendered-html.test.mjs` only for validated final expectations
- Modify: `docs/superpowers/plans/2026-08-02-kuula-app-inspired-redesign.md` to mark completed checkboxes

**Interfaces:**
- Produces: verified deployable source, pushed branch, saved Sites version, and public deployment.

- [ ] **Step 1: Run the complete local release gate**

Run:

```bash
npm run lint
npm test
npm run build:static
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 2: Start the development preview**

Run `npm run dev`, retain the process, and use the exact printed local URL.

- [ ] **Step 3: Inspect desktop Home, Support, and Privacy**

At a desktop viewport, verify the app palette, hero image, four workflow
stages, corrected curve asset, nine-image gallery, navigation, Support, and
Privacy rendering.

- [ ] **Step 4: Inspect mobile Home, Support, and Privacy**

At a phone viewport, verify no body overflow, readable copy, touch-friendly
navigation, stacked workflow sections, and horizontal gallery scrolling.

- [ ] **Step 5: Commit implementation and push the branch**

Use intentional commits for assets/tests, homepage/theme, and final metadata,
then push `codex/app-inspired-redesign`.

- [ ] **Step 6: Save and deploy through Sites**

Read `.openai/hosting.json`, reuse any existing opaque project id, push the
exact source commit, save a version from that commit, deploy the saved version,
and poll deployment status only when non-terminal.

- [ ] **Step 7: Verify the deployed public routes**

Confirm `/`, `/support`, and `/privacy` return 200 over HTTPS and that the Home
HTML references all nine product assets.
