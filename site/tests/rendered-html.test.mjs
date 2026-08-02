import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("home introduces Kuula FOH Pilot and provides support navigation", async () => {
  const html = await htmlFor("/");
  const text = visibleText(html);

  assert.match(html, /<title>Kuula FOH Pilot[^<]*<\/title>/i);
  assert.match(html, /Confidence at front of house\./);
  assert.match(html, /focused companion for live sound professionals/);
  assert.match(html, /ELAVHÕBE OÜ/);
  assert.match(html, /href="\/support"/);
  assert.match(html, /Contact support/);
  assert.match(html, /Coming soon on Google Play/);
  assert.match(
    html,
    /class="release-status"[^>]*>[\s\S]*?Coming soon on Google Play[\s\S]*?<\/span>/,
  );
  assert.match(
    html,
    /href="\/support"[^>]*class="hero-support-link"[^>]*>[\s\S]*?Contact support/,
  );
  assert.match(text, /ELAVHÕBE OÜ in Tallinn, Estonia\./);
  assert.doesNotMatch(text, /ELAVHÕBE OÜin Tallinn/);
  assert.doesNotMatch(
    html,
    /class="button button-primary"[^>]*href="\/support"/,
  );
  for (const id of [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07-balanced",
    "08",
    "09",
  ]) {
    assert.match(html, new RegExp(`/product/kuula-google-play-${id}\\.png`));
  }
  for (const stage of ["Setup", "Measure", "Correction", "Live"]) {
    assert.match(html, new RegExp(`>${stage}<`));
  }
  assert.match(html, /aria-label="Kuula FOH Pilot product screens"/);
  assert.match(html, /data-app-shell="true"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/fohpilot\.com\/"/,
  );
  assert.match(
    html,
    /<link rel="icon" href="https:\/\/fohpilot\.com\/favicon\.svg"/,
  );
  assert.match(
    html,
    /<link rel="apple-touch-icon" href="https:\/\/fohpilot\.com\/apple-touch-icon\.png"/,
  );
  assert.match(html, /<meta property="og:url" content="https:\/\/fohpilot\.com\/"/);
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(
    html,
    /"propertyID":"Estonian registry code"[\s\S]*?"value":"17331669"/,
  );
  assert.match(html, /"streetAddress":"Pae tn 21"/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("home does not render a second app navigation rail above the live screenshot", async () => {
  const html = await htmlFor("/");

  assert.match(html, /data-app-shell="true"/);
  assert.doesNotMatch(html, /class="app-tab-rail"/);
});

test("home uses the final Correction screen as its primary product image", async () => {
  const html = await htmlFor("/");

  assert.match(
    html,
    /data-app-shell="true"><figure class="product-screenshot hero-screen" data-screen="07-balanced"/,
  );
  assert.match(html, /<picture>[\s\S]*?kuula-google-play-07-balanced\.avif/);
  assert.match(
    html,
    /kuula-google-play-07-balanced-768\.avif 768w, \/product\/kuula-google-play-07-balanced-960\.avif 960w, \/product\/kuula-google-play-07-balanced\.avif 1920w/,
  );
  assert.match(html, /type="image\/avif"/);
  assert.match(html, /kuula-google-play-07-balanced\.webp/);
  assert.match(html, /type="image\/webp"/);
  assert.match(
    html,
    /<img[^>]*src="\/product\/kuula-google-play-07-balanced\.png"[^>]*loading="eager"[^>]*fetchPriority="high"/,
  );
  assert.match(
    html,
    /<img[^>]*src="\/product\/kuula-google-play-01\.png"[^>]*loading="lazy"/,
  );
});

test("support route exposes the public support email as a mail link", async () => {
  const html = await htmlFor("/support");

  assert.match(html, /<h1[^>]*>Support<\/h1>/i);
  assert.match(html, /product questions, technical support, or privacy requests/i);
  assert.match(html, /href="mailto:kuula@fohpilot\.com"/);
  assert.match(html, />kuula@fohpilot\.com</);
});

test("privacy route states website and Android app practices with the current effective date", async () => {
  const html = await htmlFor("/privacy");
  const text = visibleText(html);

  assert.match(html, /<h1[^>]*>Privacy Policy<\/h1>/i);
  assert.match(html, /does not use analytics, advertising trackers, or user accounts/i);
  assert.match(html, /do not sell personal information/i);
  assert.match(html, /Kuula FOH Pilot Android app/i);
  assert.match(html, /fohpilot\.com/i);
  assert.match(html, /operated by ELAVHÕBE OÜ/i);
  assert.match(html, /No Kuula servers/i);
  assert.match(html, /analytics, telemetry, ads, advertising, or advertising IDs/i);
  assert.match(html, /does not automatically upload crash reports/i);
  assert.match(html, /microphone for measurement, Live Monitor, Setup meters, audio I\/O diagnostics, real-WING diagnostics, and USB input scanning/i);
  assert.match(html, /App-owned playback and generated test signals stop when the app is paused/i);
  assert.doesNotMatch(html, /Audio capture stops when the app is paused/i);
  assert.match(html, /local Wi-Fi or LAN for WING discovery and OSC communication/i);
  assert.match(html, /connected audio endpoints/i);
  assert.doesNotMatch(html, /USB host enumeration/i);
  assert.doesNotMatch(html, /foreground microphone service|continue while the app is in the background/i);
  assert.match(html, /local app-private storage holds calibration data, reference file references, and local crash reports/i);
  assert.match(html, /PDFs are written only to a destination you select/i);
  assert.doesNotMatch(html, /venue profiles[^<]*app-private|exported PDFs[^<]*app-private/i);
  assert.match(html, /Captures stay in RAM unless you export them/i);
  assert.match(html, /only shared if you choose to send them/i);
  assert.match(html, /UDP port 2222 for WING discovery and OSC port 2223 for control/i);
  assert.match(html, /microphone permission and, when applicable, notification permission/i);
  assert.match(html, /can be revoked at any time in Android settings/i);
  assert.doesNotMatch(html, /local WING discovery, or USB equipment detection/i);
  assert.match(html, /not directed to children under 13[^<]*do not knowingly collect personal information from children under 13/i);
  assert.match(html, /2 August 2026/);
  assert.match(text, /Registry code: 17331669/);
  assert.match(text, /Pae tn 21, 11415 Tallinn, Estonia/);
  assert.match(html, /Tallinn, Estonia/);
  assert.match(html, /mailto:kuula@fohpilot\.com/);
});

test("robots and sitemap advertise only the canonical Kuula site", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/fohpilot\.com\/sitemap\.xml/i);
  assert.doesNotMatch(robots, /squarespace/i);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const url of [
    "https://fohpilot.com/",
    "https://fohpilot.com/support/",
    "https://fohpilot.com/privacy/",
  ]) {
    assert.match(sitemap, new RegExp(`<loc>${url}</loc>`));
  }
  assert.doesNotMatch(sitemap, /squarespace/i);
});

test("every route exposes consistent navigation and legal footer", async () => {
  for (const pathname of ["/", "/support", "/privacy"]) {
    const html = await htmlFor(pathname);

    assert.match(html, /<nav[^>]*aria-label="Primary"/i);
    assert.match(html, /href="\/"/);
    assert.match(html, /href="\/support"/);
    assert.match(html, /href="\/privacy"/);
    assert.match(html, /© 2026 ELAVHÕBE OÜ/);
    assert.match(html, /Tallinn, Estonia/);
    assert.match(html, /mailto:kuula@fohpilot\.com/);
  }
});
