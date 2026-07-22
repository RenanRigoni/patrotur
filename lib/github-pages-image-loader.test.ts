import { afterEach, describe, expect, it } from "vitest";
import imageLoader from "@/lib/github-pages-image-loader";

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
  if (originalBasePath === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    return;
  }

  process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
});

describe("GitHub Pages image loader", () => {
  it.each([
    [320, 640],
    [640, 640],
    [641, 960],
    [960, 960],
    [961, 1600],
    [1600, 1600],
    [1601, 2048],
    [3000, 2048],
  ])("maps a %ipx destination request to the %ipx WebP variant", (width, assetWidth) => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";

    expect(
      imageLoader({ src: "/images/destinations/gramado.jpg", width }),
    ).toBe(`/patrotur/images/destinations/responsive/gramado-${assetWidth}.webp`);
  });

  it("does not duplicate the base path for responsive destination images", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";

    expect(
      imageLoader({ src: "/patrotur/images/destinations/gramado.jpg", width: 640 }),
    ).toBe("/patrotur/images/destinations/responsive/gramado-640.webp");
  });

  it("prefixes local images with the repository base path", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";

    expect(imageLoader({ src: "/images/logo.png", width: 640 })).toBe(
      "/patrotur/images/logo.png?w=640&q=75",
    );
  });

  it("does not duplicate an existing base path", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";

    expect(imageLoader({ src: "/patrotur/images/logo.png", width: 320, quality: 90 })).toBe(
      "/patrotur/images/logo.png?w=320&q=90",
    );
  });

  it("leaves external images unchanged", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";

    expect(imageLoader({ src: "https://example.com/photo.jpg", width: 640 })).toBe(
      "https://example.com/photo.jpg",
    );
  });
});
