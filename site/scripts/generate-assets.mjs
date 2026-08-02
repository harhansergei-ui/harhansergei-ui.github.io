import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const publicRoot = path.join(siteRoot, "public");
const productRoot = path.join(publicRoot, "product");

const productPngs = (await readdir(productRoot))
  .filter((filename) => /^kuula-google-play-.+\.png$/.test(filename))
  .sort();

await Promise.all(
  productPngs.flatMap((filename) => {
    const source = path.join(productRoot, filename);
    const basename = filename.replace(/\.png$/, "");

    return [
      sharp(source)
        .avif({ quality: 55, effort: 6, chromaSubsampling: "4:4:4" })
        .toFile(path.join(productRoot, `${basename}.avif`)),
      sharp(source)
        .resize({ width: 768 })
        .avif({ quality: 55, effort: 6, chromaSubsampling: "4:4:4" })
        .toFile(path.join(productRoot, `${basename}-768.avif`)),
      sharp(source)
        .resize({ width: 960 })
        .avif({ quality: 55, effort: 6, chromaSubsampling: "4:4:4" })
        .toFile(path.join(productRoot, `${basename}-960.avif`)),
      sharp(source)
        .webp({ quality: 78, effort: 6, smartSubsample: true })
        .toFile(path.join(productRoot, `${basename}.webp`)),
      sharp(source)
        .resize({ width: 768 })
        .webp({ quality: 78, effort: 6, smartSubsample: true })
        .toFile(path.join(productRoot, `${basename}-768.webp`)),
      sharp(source)
        .resize({ width: 960 })
        .webp({ quality: 78, effort: 6, smartSubsample: true })
        .toFile(path.join(productRoot, `${basename}-960.webp`)),
    ];
  }),
);

const favicon = path.join(publicRoot, "favicon.svg");
await Promise.all([
  sharp(favicon)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicRoot, "favicon-32x32.png")),
  sharp(favicon)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicRoot, "apple-touch-icon.png")),
  sharp(path.join(siteRoot, "assets", "og-source.png"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toFile(path.join(publicRoot, "og.png")),
]);

console.log(
  `Generated ${productPngs.length * 6 + 3} optimized Kuula image assets.`,
);
