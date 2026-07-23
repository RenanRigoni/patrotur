import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(projectRoot, "public", "images");
const responsiveDirectory = path.join(sourceDirectory, "responsive");
const config = JSON.parse(
  await readFile(path.join(projectRoot, "content", "responsive-images.json"), "utf8"),
);

// Assets referenced via next/image but rendered far below their source
// resolution (logo wordmarks, Lucio, Malu). Unlike destinations/*.jpg these
// live directly in public/images, so they're listed explicitly rather than
// discovered by directory scan.
const brandAssets = [
  "Lucio.png",
  "malu.png",
  "PATROTUR_HOR.png",
  "PATROTUR_HOR_WHITE.png",
  "PATROTU_VERT.png",
];

await mkdir(responsiveDirectory, { recursive: true });

let originalBytes = 0;
let generatedBytes = 0;

for (const filename of brandAssets) {
  const sourcePath = path.join(sourceDirectory, filename);
  const basename = path.basename(filename, path.extname(filename));
  originalBytes += (await stat(sourcePath)).size;

  for (const width of config.brandAssetWidths) {
    const outputPath = path.join(responsiveDirectory, `${basename}-${width}.webp`);

    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: config.quality, effort: 4, smartSubsample: true })
      .toFile(outputPath);

    generatedBytes += (await stat(outputPath)).size;
  }
}

console.log(
  `Generated ${brandAssets.length * config.brandAssetWidths.length} responsive brand asset images.`,
);
console.log(
  `Original payload: ${(originalBytes / 1024 / 1024).toFixed(2)} MB -> all variants on disk: ${(generatedBytes / 1024 / 1024).toFixed(2)} MB.`,
);
