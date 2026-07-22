import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { destinations } from "@/content/destinations";
import { DestinationCarousel } from "@/components/destinations/DestinationCarousel";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

vi.mock("@/components/destinations/DestinationCard", () => ({
  DestinationCard: ({ destination }: { destination: { name: string } }) => (
    <a href="#destino">{destination.name}</a>
  ),
}));

describe("DestinationCarousel", () => {
  it("keeps mobile arrows hidden and supports mouse dragging in responsive previews", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<DestinationCarousel destinations={destinations.slice(0, 2)} />);
    });

    const track = container.querySelector<HTMLDivElement>("[aria-label='Destinos em destaque']");
    expect(track).not.toBeNull();
    expect(track?.classList.contains("snap-x")).toBe(true);
    expect(track?.classList.contains("cursor-grab")).toBe(true);

    const buttons = [...container.querySelectorAll<HTMLButtonElement>("button")];
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button.classList.contains("hidden")).toBe(true);
      expect(button.classList.contains("sm:flex")).toBe(true);
    }

    const edges = [...container.querySelectorAll<HTMLElement>("[data-carousel-edge]")];
    expect(edges).toHaveLength(2);
    for (const edge of edges) {
      expect(edge.classList.contains("hidden")).toBe(true);
      expect(edge.classList.contains("sm:block")).toBe(true);
    }

    const dragHint = container.querySelector<HTMLElement>("[data-carousel-drag-hint]");
    expect(dragHint?.textContent).toContain("Arraste para ver mais destinos");
    expect(dragHint?.classList.contains("sm:hidden")).toBe(true);
    expect(dragHint?.classList.contains("pointer-events-none")).toBe(true);
    expect(dragHint?.matches("button, a, [role='button']")).toBe(false);

    if (!track) throw new Error("Destination track was not rendered");
    const link = track.querySelector<HTMLAnchorElement>("a");
    if (!link) throw new Error("Destination link was not rendered");

    const regularClick = new MouseEvent("click", { bubbles: true, cancelable: true });
    act(() => link.dispatchEvent(regularClick));
    expect(regularClick.defaultPrevented).toBe(false);

    track.scrollLeft = 500;
    const setPointerCapture = vi.fn();
    Object.defineProperty(track, "setPointerCapture", { value: setPointerCapture });
    Object.defineProperty(track, "hasPointerCapture", { value: vi.fn(() => true) });
    Object.defineProperty(track, "releasePointerCapture", { value: vi.fn() });

    const dispatchPointer = (type: string, clientX: number, pointerType = "mouse") => {
      const event = new MouseEvent(type, {
        bubbles: true,
        button: 0,
        cancelable: true,
        clientX,
      });
      Object.defineProperties(event, {
        pointerId: { value: 1 },
        pointerType: { value: pointerType },
      });
      track.dispatchEvent(event);
    };

    act(() => dispatchPointer("pointerdown", 260, "touch"));
    act(() => dispatchPointer("pointermove", 110, "touch"));
    expect(track.scrollLeft).toBe(500);
    expect(setPointerCapture).not.toHaveBeenCalled();

    act(() => dispatchPointer("pointerdown", 260));
    act(() => dispatchPointer("pointermove", 110));
    act(() => dispatchPointer("pointerup", 110));

    expect(track.scrollLeft).toBe(650);

    const clickAfterDrag = new MouseEvent("click", { bubbles: true, cancelable: true });
    act(() => link.dispatchEvent(clickAfterDrag));
    expect(clickAfterDrag.defaultPrevented).toBe(true);

    await act(async () => root.unmount());
    container.remove();
  });
});
