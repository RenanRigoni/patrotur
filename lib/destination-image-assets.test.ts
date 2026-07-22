// @vitest-environment node

import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { destinations } from "@/content/destinations";
import responsiveImages from "@/content/responsive-images.json";

const destinationWidths = responsiveImages.destinationWidths;
const cardWidths = responsiveImages.destinationCardWidths;
const responsiveDirectory = path.join(
  process.cwd(),
  "public",
  "images",
  "destinations",
  "responsive",
);
const cardDirectory = path.join(
  process.cwd(),
  "public",
  "images",
  "destinations",
  "cards",
);

const assetCases = destinations.flatMap((destination) =>
  destinationWidths.map(
    (width) =>
      [
        `${destination.slug} at ${width}px`,
        destination.image,
        width,
      ] as const,
  ),
);

const cardAssetCases = destinations.flatMap((destination) =>
  cardWidths.map(
    (width) =>
      [
        `${destination.slug} card at ${width}px`,
        destination.image,
        width,
        Math.round((width * 480) / 340),
      ] as const,
  ),
);

describe("responsive destination image assets", () => {
  it.each(assetCases)("provides %s as a real WebP", async (_, source, width) => {
    const basename = path.basename(source, path.extname(source));
    const originalPath = path.join(process.cwd(), "public", source.replace(/^\//, ""));
    const variantPath = path.join(responsiveDirectory, `${basename}-${width}.webp`);

    const [variantStat, originalStat, metadata] = await Promise.all([
      stat(variantPath),
      stat(originalPath),
      sharp(variantPath).metadata(),
    ]);

    expect(metadata.format).toBe("webp");
    expect(metadata.width).toBe(width);
    expect(metadata.height).toBeGreaterThan(0);
    expect(variantStat.size).toBeLessThan(originalStat.size);
  });

  it.each(cardAssetCases)(
    "provides %s as a portrait WebP",
    async (_, source, width, height) => {
      const basename = path.basename(source, path.extname(source));
      const variantPath = path.join(cardDirectory, `${basename}-${width}.webp`);
      const metadata = await sharp(variantPath).metadata();

      expect(metadata.format).toBe("webp");
      expect(metadata.width).toBe(width);
      expect(metadata.height).toBe(height);
    },
  );

  it("reduces the complete mobile destination payload by at least 80%", async () => {
    const sizes = await Promise.all(
      destinations.map(async (destination) => {
        const basename = path.basename(destination.image, path.extname(destination.image));
        const originalPath = path.join(
          process.cwd(),
          "public",
          destination.image.replace(/^\//, ""),
        );
        const variantPath = path.join(cardDirectory, `${basename}-640.webp`);
        const [original, variant] = await Promise.all([stat(originalPath), stat(variantPath)]);
        return { original: original.size, variant: variant.size };
      }),
    );

    const originalBytes = sizes.reduce((total, size) => total + size.original, 0);
    const variantBytes = sizes.reduce((total, size) => total + size.variant, 0);

    expect(variantBytes).toBeLessThan(originalBytes * 0.2);
  });
});
