import type { ImageLoaderProps } from "next/image";

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
  const hasBasePath =
    basePath.length > 0 && (src === basePath || src.startsWith(`${basePath}/`));
  const imagePath = hasBasePath ? src : `${basePath}${src}`;
  const separator = imagePath.includes("?") ? "&" : "?";

  return `${imagePath}${separator}w=${width}&q=${quality ?? 75}`;
}
