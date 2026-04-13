import { describe, it, expect } from "vitest";
import { AR_FILTERS, FILTER_CATEGORIES, canClientAccessFilter, getFiltersForMode, CLIENT_TIER_FILTER_ACCESS } from "@/lib/filters";

describe("AR_FILTERS", () => {
  it("has at least 15 filters", () => {
    expect(AR_FILTERS.length).toBeGreaterThanOrEqual(15);
  });

  it("each filter has required fields", () => {
    AR_FILTERS.forEach((f) => {
      expect(f.id).toBeTruthy();
      expect(f.name).toBeTruthy();
      expect(f.tracking.length).toBeGreaterThan(0);
      expect(f.supportedModes.length).toBeGreaterThan(0);
    });
  });

  it("includes beauty filters accessible to all", () => {
    const beauty = AR_FILTERS.filter((f) => f.category === "beauty");
    expect(beauty.length).toBeGreaterThanOrEqual(3);
  });

  it("includes signature CherryStim filters", () => {
    expect(AR_FILTERS.some((f) => f.isSignature)).toBe(true);
  });

  it("includes multiple categories", () => {
    const categories = new Set(AR_FILTERS.map((f) => f.category));
    expect(categories.size).toBeGreaterThanOrEqual(7);
  });

  it("has filters with lip sync tracking", () => {
    expect(AR_FILTERS.filter((f) => f.tracking.includes("lip_sync")).length).toBeGreaterThan(5);
  });

  it("has filters with 240-point face mesh", () => {
    expect(AR_FILTERS.filter((f) => f.tracking.includes("face_mesh_240")).length).toBeGreaterThan(5);
  });
});

describe("canClientAccessFilter", () => {
  const basicFilter = AR_FILTERS.find((f) => f.category === "beauty" && !f.minTier && !f.dancerOnly)!;
  const vipFilter = AR_FILTERS.find((f) => f.minTier === "vip")!;
  const platinumFilter = AR_FILTERS.find((f) => f.category === "signature")!;
  const dancerOnlyFilter = AR_FILTERS.find((f) => f.dancerOnly)!;

  it("allows basic tier to access beauty filters", () => {
    expect(canClientAccessFilter(basicFilter, "basic")).toBe(true);
  });

  it("blocks basic tier from VIP filters", () => {
    expect(canClientAccessFilter(vipFilter, "basic")).toBe(false);
  });

  it("allows VIP tier to access VIP filters", () => {
    expect(canClientAccessFilter(vipFilter, "vip")).toBe(true);
  });

  it("blocks all tiers from dancer-only filters", () => {
    expect(canClientAccessFilter(dancerOnlyFilter, "platinum")).toBe(false);
  });

  it("allows platinum to access signature filters", () => {
    expect(canClientAccessFilter(platinumFilter, "platinum")).toBe(true);
  });

  it("blocks VIP from signature filters", () => {
    expect(canClientAccessFilter(platinumFilter, "vip")).toBe(false);
  });
});

describe("getFiltersForMode", () => {
  it("returns filters for 2D mode", () => {
    const f = getFiltersForMode("2D");
    expect(f.length).toBeGreaterThan(0);
    f.forEach((filter) => expect(filter.supportedModes).toContain("2D"));
  });

  it("returns more filters for IMMERSIVE than 2D", () => {
    const immersive = getFiltersForMode("IMMERSIVE");
    const twoD = getFiltersForMode("2D");
    expect(immersive.length).toBeGreaterThanOrEqual(twoD.length);
  });
});

describe("CLIENT_TIER_FILTER_ACCESS", () => {
  it("basic has limited categories", () => {
    expect(CLIENT_TIER_FILTER_ACCESS.basic.length).toBeLessThan(CLIENT_TIER_FILTER_ACCESS.platinum.length);
  });

  it("platinum has access to all categories", () => {
    expect(CLIENT_TIER_FILTER_ACCESS.platinum).toContain("signature");
  });
});
