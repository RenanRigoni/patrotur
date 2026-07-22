import { describe, expect, it } from "vitest";
import { getCompletedYears } from "@/content/site";

describe("getCompletedYears", () => {
  it("counts only completed anniversaries", () => {
    expect(getCompletedYears("2015-12-11", new Date("2026-07-22T12:00:00Z"))).toBe(10);
    expect(getCompletedYears("2015-12-11", new Date("2026-12-11T02:30:00Z"))).toBe(10);
    expect(getCompletedYears("2015-12-11", new Date("2026-12-11T03:30:00Z"))).toBe(11);
    expect(getCompletedYears("2015-06-11", new Date("2026-07-01T12:00:00Z"))).toBe(11);
  });
});
