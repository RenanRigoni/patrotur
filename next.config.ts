import type { NextConfig } from "next";
import responsiveImages from "./content/responsive-images.json";

const configuredBasePath = process.env.PAGES_BASE_PATH?.trim() ?? "";
const basePath =
  configuredBasePath === "/"
    ? ""
    : configuredBasePath
      ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
      : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/github-pages-image-loader.ts",
    deviceSizes: responsiveImages.destinationWidths,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
