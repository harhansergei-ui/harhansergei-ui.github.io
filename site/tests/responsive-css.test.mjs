import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = await readFile(path.join(siteRoot, "app", "globals.css"), "utf8");

function mediaBlock(query) {
  const start = css.indexOf(`@media (${query})`);
  assert.notEqual(start, -1, `Missing @media (${query})`);

  const openingBrace = css.indexOf("{", start);
  let depth = 0;

  for (let index = openingBrace; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}") depth -= 1;
    if (depth === 0) return css.slice(openingBrace + 1, index);
  }

  throw new Error(`Unclosed @media (${query}) block`);
}

test("the stylesheet has balanced rule blocks", () => {
  assert.equal(css.split("{").length, css.split("}").length);
});

test("phone navigation keeps Home and Privacy visible", () => {
  const phone = mediaBlock("max-width: 560px");

  assert.doesNotMatch(
    phone,
    /nav a:first-child[\s\S]*?nav a:nth-child\(5\)[\s\S]*?display:\s*none/,
  );
});

test("phone gallery is contained and horizontally scrolls within the shell", () => {
  const phone = mediaBlock("max-width: 560px");

  assert.match(
    phone,
    /\.screen-gallery\s*{[^}]*width:\s*100%[^}]*max-width:\s*100%[^}]*overflow-x:\s*auto/,
  );
  assert.doesNotMatch(phone, /\.screen-gallery\s*{[^}]*100vw/);
  assert.match(
    phone,
    /\.screen-gallery \.product-screenshot\s*{[^}]*flex:\s*0 0 min\(86vw, 520px\)[^}]*max-width:\s*100%/,
  );
  assert.match(
    css,
    /\.product-screen-frame picture\s*{[^}]*display:\s*block[^}]*min-width:\s*0[^}]*max-width:\s*100%/,
  );
});
