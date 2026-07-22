import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { YearsInBusiness } from "@/components/trust/YearsInBusiness";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

afterEach(() => {
  vi.useRealTimers();
});

describe("YearsInBusiness", () => {
  it("updates after the anniversary without requiring a new deploy", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-11T02:30:00Z"));
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<YearsInBusiness foundedAt="2015-12-11" initialYears={10} />);
    });
    expect(container.textContent).toBe("10");

    await act(async () => {
      vi.setSystemTime(new Date("2026-12-11T03:30:00Z"));
      vi.advanceTimersByTime(60 * 60 * 1000);
    });
    expect(container.textContent).toBe("11");

    await act(async () => root.unmount());
    container.remove();
  });
});
