import type { ImgHTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FinalCta } from "@/components/cta/FinalCta";

vi.mock("next/image", () => ({
  default: ({ fill, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    void fill;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

vi.mock("@/components/ui/RouteMotif", () => ({
  RouteMotif: () => <svg aria-hidden="true" />,
}));

describe("FinalCta", () => {
  it("keeps Malu fully inside the section so her wheels remain visible", () => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(<FinalCta />);

    const malu = root.querySelector<HTMLImageElement>('img[alt^="Malu"]');

    expect(malu).not.toBeNull();
    expect(malu?.classList.contains("bottom-2")).toBe(true);
    expect([...malu!.classList].some((className) => className.startsWith("-bottom-"))).toBe(false);
  });
});
