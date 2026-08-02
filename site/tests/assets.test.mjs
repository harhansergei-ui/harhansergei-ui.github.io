import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(siteRoot, "public");
const screenIds = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07-balanced",
  "08",
  "09",
];

async function imageMetadata(relativePath) {
  return sharp(path.join(publicRoot, relativePath)).metadata();
}

test("each product screen has smaller AVIF and WebP alternatives", async () => {
  for (const id of screenIds) {
    const base = `product/kuula-google-play-${id}`;
    const png = await stat(path.join(publicRoot, `${base}.png`));

    for (const extension of ["avif", "webp"]) {
      const relativePath = `${base}.${extension}`;
      const alternative = await stat(path.join(publicRoot, relativePath));
      const metadata = await imageMetadata(relativePath);

      assert.equal(metadata.width, 1920, relativePath);
      assert.equal(metadata.height, 1200, relativePath);
      assert.ok(
        alternative.size < png.size,
        `${relativePath} should be smaller than its PNG fallback`,
      );

      for (const responsiveWidth of [768, 960]) {
        const responsivePath = `${base}-${responsiveWidth}.${extension}`;
        const responsive = await stat(path.join(publicRoot, responsivePath));
        const responsiveMetadata = await imageMetadata(responsivePath);

        assert.equal(responsiveMetadata.width, responsiveWidth, responsivePath);
        assert.equal(
          responsiveMetadata.height,
          responsiveWidth * 0.625,
          responsivePath,
        );
        assert.ok(
          responsive.size < alternative.size,
          `${responsivePath} should be smaller than its 1920px alternative`,
        );
      }
    }
  }
});

test("brand and social images use the expected dimensions", async () => {
  const expected = new Map([
    ["favicon-32x32.png", [32, 32]],
    ["apple-touch-icon.png", [180, 180]],
    ["og.png", [1200, 630]],
  ]);

  for (const [relativePath, [width, height]] of expected) {
    const metadata = await imageMetadata(relativePath);
    assert.equal(metadata.width, width, relativePath);
    assert.equal(metadata.height, height, relativePath);
  }
});
