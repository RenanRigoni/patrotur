import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "@/lib/site-url";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    return;
  }

  process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe("getSiteUrl", () => {
  it("uses the public GitHub Pages URL configured at build time", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://renanrigoni.github.io/patrotur/";

    expect(getSiteUrl()).toBe("https://renanrigoni.github.io/patrotur/");
  });

  it("falls back to the canonical Patrotur domain", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl()).toBe("https://www.patroturturismo.com.br/");
  });
});
