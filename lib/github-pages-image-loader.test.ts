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
