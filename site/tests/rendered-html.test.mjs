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

test("home introduces Kuula FOH Pilot and provides support navigation", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>Kuula FOH Pilot[^<]*<\/title>/i);
  assert.match(html, /Confidence at front of house\./);
  assert.match(html, /focused companion for live sound professionals/);
  assert.match(html, /ELAVHÕBE OÜ/);
  assert.match(html, /href="\/support"/);
  assert.match(html, /Contact support/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("support route exposes the public support email as a mail link", async () => {
  const html = await htmlFor("/support");

  assert.match(html, /<h1[^>]*>Support<\/h1>/i);
  assert.match(html, /product questions, technical support, or privacy requests/i);
  assert.match(html, /href="mailto:kuula@fohpilot\.com"/);
  assert.match(html, />kuula@fohpilot\.com</);
});

test("privacy route states the current website practices and effective date", async () => {
  const html = await htmlFor("/privacy");

  assert.match(html, /<h1[^>]*>Privacy Policy<\/h1>/i);
  assert.match(html, /does not use analytics, advertising trackers, or user accounts/i);
  assert.match(html, /do not sell personal information/i);
  assert.match(html, /31 July 2026/);
  assert.match(html, /Tallinn, Estonia/);
  assert.match(html, /mailto:kuula@fohpilot\.com/);
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
