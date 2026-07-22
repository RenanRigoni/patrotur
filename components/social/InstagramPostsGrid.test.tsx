import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { ImgHTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { InstagramPostsGrid } from "@/components/social/InstagramPostsGrid";

vi.mock("next/image", () => ({
  default: ({ fill, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    void fill;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

const previewFiles = ["post-01.jpg", "post-02.jpg", "post-03.jpg"];

describe("InstagramPostsGrid", () => {
  it("renders one profile link with exactly the three local previews and no embeds", () => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(<InstagramPostsGrid />);

    const link = root.querySelector("a");
    const images = [...root.querySelectorAll("img")];

    expect(link?.getAttribute("href")).toBe(site.instagram.url);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(images).toHaveLength(3);
    expect(images.map((image) => path.basename(image.getAttribute("src") ?? ""))).toEqual(
      previewFiles
    );
    expect(images.every((image) => Boolean(image.getAttribute("alt")))).toBe(true);
    expect(images.every((image) => link?.contains(image))).toBe(true);
    expect(root.querySelector("iframe, script, blockquote")).toBeNull();

    for (const file of previewFiles) {
      const filePath = path.join(process.cwd(), "public", "images", "instagram", file);
      expect(existsSync(filePath)).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(0);
    }
  });
});
