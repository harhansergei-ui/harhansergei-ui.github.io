# Kuula FOH Pilot website

Public website for Kuula FOH Pilot, an Android companion for live sound professionals. The site contains the product landing page, support contact, and privacy policy for ELAVHÕBE OÜ.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

## Validation and publishing

```bash
npm test
npm run build:static
```

The static build is published from `out/` by the repository's GitHub Pages workflow.
