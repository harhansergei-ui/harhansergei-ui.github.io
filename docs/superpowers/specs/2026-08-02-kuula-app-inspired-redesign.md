# Kuula App-Inspired Website Redesign

## Goal

Refresh the existing Kuula FOH Pilot website so it presents the real Android
product through the supplied Google Play screenshots and uses the same visual
language as the application. Preserve the existing public English content,
Support route, Privacy route, organization identity, and pre-release status.

## Approved Direction

Use a product-first landing page. The opening viewport pairs the existing
`Confidence at front of house.` message with a large real application screen.
The page then explains the workflow as Setup, Measure, Correction, and Live,
followed by an accessible gallery containing all nine supplied screenshots.

The website must feel like the app without reproducing a tablet interface
literally. Navigation, information panels, screenshot frames, buttons, status
chips, graph treatments, and section labels should reuse the app's shapes,
spacing, hierarchy, and state language.

## Image Assets

- Preserve all nine supplied 1920×1200 screenshots as product evidence.
- Use the Live analyzer screen as the primary hero image.
- Use Setup, Review captures, Correction, and Live screens to illustrate the
  four-step workflow.
- Show all nine screens in the gallery with specific, meaningful alt text.
- Optimize delivery through Next.js image handling and responsive `sizes`.

### Correction Screenshot Edit

The Correction screenshot is approved with one requested visual correction:
redraw only the low-frequency section of the Left and Right response curves so
they remain distinct but track much closer together below roughly 160 Hz. The
current extreme bass divergence must be removed. Preserve the target curve,
mid/high-frequency curves, graph grid, labels, controls, typography, spacing,
colors, dimensions, and every other UI element exactly.

## Visual System

- Page background: near-black `#0b0e11`.
- Main surfaces: deep charcoal `#151a20` and raised slate `#20262d`.
- Primary action and active state: orange `#ff8518`.
- Active-tab wash: warm brown around `#4a2f1e`.
- Measurement highlight: cyan `#4bc3f4`.
- Healthy/complete state: green `#60cd73`.
- Main text: cool off-white around `#e7e9ed`.
- Secondary text: cool gray around `#9ca3ad`.
- Borders: subtle blue-gray, not warm beige.
- UI elements use rounded rectangular panels, pill actions, compact labels,
  restrained grid lines, and generous horizontal spacing like the tablet app.
- Motion is limited to subtle hover transitions and respects reduced-motion
  preferences.

## Homepage Structure

1. App-inspired header with Kuula identity, product navigation, Support, and
   Privacy.
2. Hero with pre-release status, existing headline and summary, Support CTA,
   Android note, and the Live analyzer screenshot.
3. Compact signal/status strip echoing the app's live information panels.
4. Workflow section covering Setup, Measure, Correction, and Live with real
   screenshots and concise, factual copy derived from the visible UI.
5. Wide measurement/correction showcase emphasizing real graphs and controls.
6. Nine-image product gallery with responsive horizontal scrolling on narrow
   screens.
7. Existing ELAVHÕBE OÜ publisher statement and global footer.

## Support and Privacy

Keep their current content and URLs. Reskin headings, cards, section dividers,
links, and footer using the shared app-derived tokens. Do not change privacy
claims or introduce forms, analytics, accounts, or new backend behavior.

## Accessibility and Responsive Behavior

- Preserve semantic landmarks and keyboard-visible focus states.
- Use descriptive alt text for every screenshot.
- Ensure screenshots remain legible without causing horizontal page overflow.
- Stack hero and workflow compositions on tablet and mobile.
- Present the gallery as a touch-friendly horizontal rail on mobile.
- Maintain readable contrast and a minimum 44 px target for primary actions.

## Metadata and Social Preview

Create one bespoke social card after the page design is stable. It should use
the finished palette, headline, and product-screen motif. Validate all rendered
text before replacing `public/og.png` and keep the existing metadata URLs.

## Verification

- Existing route-content tests remain green after focused expectation updates.
- New tests prove that the homepage references all nine screenshots, exposes
  the four workflow stages, and retains Support/Privacy navigation.
- `npm run lint`, `npm test`, and `npm run build:static` pass.
- Desktop and mobile visual checks confirm that screenshot framing, colors,
  layout, navigation, and horizontal gallery behavior match the design.
- The deployed public site exposes Home, Support, and Privacy without auth or
  certificate errors.
