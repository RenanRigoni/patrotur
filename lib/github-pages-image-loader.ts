import type { ImageLoaderProps } from "next/image";
import responsiveImages from "@/content/responsive-images.json";

const destinationPattern = /^\/images\/destinations\/([^/?]+)\.jpe?g$/i;

function normalizeBasePath(value: string | undefined) {
  const basePath = value?.trim();

  if (!basePath || basePath === "/") {
    return "";
  }

  return `/${basePath.replace(/^\/+|\/+$/g, "")}`;
}

export default function githubPagesImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith("/")) {
    return src;
  }

  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const sourcePath =
    basePath.length > 0 && (src === basePath || src.startsWith(`${basePath}/`))
      ? src.slice(basePath.length) || "/"
      : src;
  const destinationMatch = sourcePath.match(destinationPattern);

  if (destinationMatch) {
    const variantWidth =
      responsiveImages.destinationWidths.find((candidate) => candidate >= width) ??
      responsiveImages.destinationWidths.at(-1);

    return `${basePath}/images/destinations/responsive/${destinationMatch[1]}-${variantWidth}.webp`;
  }

  const imagePath = `${basePath}${sourcePath}`;
  const separator = imagePath.includes("?") ? "&" : "?";

  return `${imagePath}${separator}w=${width}&q=${quality ?? 75}`;
}
