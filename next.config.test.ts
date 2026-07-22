import { afterEach, describe, expect, it, vi } from "vitest";

const originalPagesBasePath = process.env.PAGES_BASE_PATH;

afterEach(() => {
  vi.resetModules();

  if (originalPagesBasePath === undefined) {
    delete process.env.PAGES_BASE_PATH;
    return;
  }

  process.env.PAGES_BASE_PATH = originalPagesBasePath;
});

describe("Next.js static export configuration", () => {
  it("configures the GitHub Pages repository path", async () => {
    process.env.PAGES_BASE_PATH = "/patrotur";
    vi.resetModules();

    const { default: config } = await import("./next.config");

    expect(config).toMatchObject({
      output: "export",
      basePath: "/patrotur",
      trailingSlash: true,
      images: {
        loader: "custom",
        loaderFile: "./lib/github-pages-image-loader.ts",
        deviceSizes: [640, 960, 1600, 2048],
      },
      env: {
        NEXT_PUBLIC_BASE_PATH: "/patrotur",
      },
    });
  });
});
