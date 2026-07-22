import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { destinations } from "@/content/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

afterEach(() => {
  delete process.env.NEXT_PUBLIC_BASE_PATH;
});

describe("DestinationCard", () => {
  it("serves compact portrait variants for mobile and high-density screens", async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/patrotur";
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const destination = { ...destinations[0], slug: "different-route-slug" };

    await act(async () => {
      root.render(<DestinationCard destination={destination} />);
    });

    const image = container.querySelector<HTMLImageElement>("img");
    expect(image?.getAttribute("src")).toBe(
      "/patrotur/images/destinations/cards/fernando-de-noronha-640.webp",
    );
    expect(image?.getAttribute("srcset")).toBe(
      "/patrotur/images/destinations/cards/fernando-de-noronha-640.webp 640w, /patrotur/images/destinations/cards/fernando-de-noronha-960.webp 960w",
    );
    expect(image?.getAttribute("sizes")).toBe("(min-width: 640px) 340px, 78vw");
    expect(image?.getAttribute("loading")).toBe("lazy");
    expect(image?.getAttribute("decoding")).toBe("async");
    expect(image?.alt).toContain(destination.name);

    await act(async () => root.unmount());
    container.remove();
  });
});
