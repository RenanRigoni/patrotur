import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/footer/Footer";

vi.mock("next/image", () => ({
  default: () => <span data-next-image />,
}));

describe("Footer", () => {
  it("keeps the agency description on two intentional lines", () => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(<Footer />);
    const description = root.querySelector("footer p");
    const lines = [...(description?.querySelectorAll(":scope > span") ?? [])];

    expect(lines.map((line) => line.textContent)).toEqual([
      "Agência de viagens em Patrocínio/MG.",
      "Roteiros nacionais e internacionais planejados de forma pessoal.",
    ]);
    expect(lines.every((line) => line.classList.contains("block"))).toBe(true);
    expect(lines[0].classList.contains("whitespace-nowrap")).toBe(true);
  });
});
