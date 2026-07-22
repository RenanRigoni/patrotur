import { mkdir, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(projectRoot, "public", "images", "destinations");
const responsiveDirectory = path.join(sourceDirectory, "responsive");
const cardDirectory = path.join(sourceDirectory, "cards");
const config = JSON.parse(
  await readFile(path.join(projectRoot, "content", "responsive-images.json"), "utf8"),
);

const sourceFiles = (await readdir(sourceDirectory))
  .filter((filename) => /\.jpe?g$/i.test(filename))
  .sort();

await Promise.all([
  mkdir(responsiveDirectory, { recursive: true }),
  mkdir(cardDirectory, { recursive: true }),
]);

let originalBytes = 0;
let generatedBytes = 0;

for (const filename of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, filename);
  const basename = path.basename(filename, path.extname(filename));
  originalBytes += (await stat(sourcePath)).size;

  for (const width of config.destinationWidths) {
    const outputPath = path.join(responsiveDirectory, `${basename}-${width}.webp`);

    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: config.quality, effort: 4, smartSubsample: true })
      .toFile(outputPath);

    generatedBytes += (await stat(outputPath)).size;
  }

  for (const width of config.destinationCardWidths) {
    const height = Math.round((width * 480) / 340);
    const outputPath = path.join(cardDirectory, `${basename}-${width}.webp`);

    await sharp(sourcePath)
      .resize({ width, height, fit: "cover", position: "centre" })
      .webp({ quality: config.quality, effort: 4, smartSubsample: true })
      .toFile(outputPath);

    generatedBytes += (await stat(outputPath)).size;
  }
}

const mobileBytes = (
  await Promise.all(
    sourceFiles.map(async (filename) => {
      const basename = path.basename(filename, path.extname(filename));
      return (await stat(path.join(cardDirectory, `${basename}-640.webp`))).size;
    }),
  )
).reduce((total, bytes) => total + bytes, 0);

const reduction = 1 - mobileBytes / originalBytes;

console.log(
  `Generated ${
    sourceFiles.length *
    (config.destinationWidths.length + config.destinationCardWidths.length)
  } responsive destination images.`,
);
console.log(
  `Mobile card payload: ${(mobileBytes / 1024 / 1024).toFixed(2)} MB (${(reduction * 100).toFixed(1)}% smaller).`,
);
console.log(`All variants on disk: ${(generatedBytes / 1024 / 1024).toFixed(2)} MB.`);
