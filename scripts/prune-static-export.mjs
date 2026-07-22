import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destinationDirectory = path.join(projectRoot, "out", "images", "destinations");
const originalImages = (await readdir(destinationDirectory)).filter((filename) =>
  /\.jpe?g$/i.test(filename),
);

await Promise.all(
  originalImages.map((filename) =>
    rm(path.join(destinationDirectory, filename), { force: true }),
  ),
);

console.log(`Removed ${originalImages.length} original destination JPGs from the static artifact.`);
