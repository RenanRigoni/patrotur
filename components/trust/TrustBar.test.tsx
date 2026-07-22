import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { foundedYear, yearsInBusiness } from "@/content/site";
import { TrustBar } from "@/components/trust/TrustBar";

vi.mock("@/components/ui/Reveal", () => ({
  Reveal: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("TrustBar", () => {
  it("uses a compact four-item mobile grid while preserving all five desktop items", () => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(<TrustBar />);

    const lists = [...root.querySelectorAll("ul")];
    const [mobileList, desktopList] = lists;
    const mobileItems = [...mobileList.querySelectorAll("li")];
    const desktopItems = [...desktopList.querySelectorAll("li")];

    expect(lists).toHaveLength(2);
    expect(mobileItems.map((item) => item.textContent)).toEqual([
      `Desde ${foundedYear} em Patrocínio`,
      "Atendimento humano",
      "Nacional e internacional",
      "Parcelamento facilitado",
    ]);
    expect(desktopItems.map((item) => item.textContent)).toEqual([
      `${yearsInBusiness}+ anos em Patrocínio`,
      "Atendimento humano e personalizado",
      "Viagens nacionais e internacionais",
      "Parcelamento facilitado",
      "Agência física no Centro",
    ]);

    for (const className of ["mx-auto", "grid", "max-w-sm", "grid-cols-2", "sm:hidden"]) {
      expect(mobileList.classList.contains(className)).toBe(true);
    }
    expect(
      mobileItems.every(
        (item) => item.classList.contains("text-center") && item.classList.contains("justify-center")
      )
    ).toBe(true);
    expect(desktopList.classList.contains("hidden")).toBe(true);
    expect(desktopList.classList.contains("sm:flex")).toBe(true);
  });
});
