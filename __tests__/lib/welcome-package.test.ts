import { describe, it, expect } from "vitest";
import { WELCOME_PACKAGE_ITEMS, getPackageForTier, estimatePackageCost, LUXURY_PARTNERS } from "@/lib/welcome-package";

describe("WELCOME_PACKAGE_ITEMS", () => {
  it("has at least 18 items", () => {
    expect(WELCOME_PACKAGE_ITEMS.length).toBeGreaterThanOrEqual(18);
  });

  it("includes the dance pole", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "dance-pole")).toBe(true);
  });

  it("includes platform heels", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "platform-heels")).toBe(true);
  });

  it("includes perfume", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "perfume")).toBe(true);
  });

  it("includes neon sign", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "neon-sign")).toBe(true);
  });

  it("includes debit card", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "debit-card")).toBe(true);
  });

  it("includes fridge magnets", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "fridge-magnets")).toBe(true);
  });

  it("includes tanning lotion", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "tanning-lotion")).toBe(true);
  });

  it("includes welcome magazine", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "welcome-magazine")).toBe(true);
  });

  it("includes Star Bright Lights magazine", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "star-bright-magazine")).toBe(true);
  });

  it("includes equipment guide", () => {
    expect(WELCOME_PACKAGE_ITEMS.some((i) => i.id === "equipment-guide")).toBe(true);
  });
});

describe("getPackageForTier", () => {
  it("rising tier gets minimal items", () => {
    const items = getPackageForTier("rising", "none");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("virtuoso tier gets the most items", () => {
    const virtuoso = getPackageForTier("virtuoso", "own");
    const rising = getPackageForTier("rising", "none");
    expect(virtuoso.length).toBeGreaterThan(rising.length);
  });

  it("lease gear type includes lease items", () => {
    const lease = getPackageForTier("pro", "lease");
    expect(lease.some((i) => i.leaseUpgrade)).toBe(true);
  });

  it("own gear type includes own items", () => {
    const own = getPackageForTier("pro", "own");
    expect(own.some((i) => i.ownUpgrade)).toBe(true);
  });

  it("all tiers include the welcome box", () => {
    const tiers = ["rising", "pro", "elite", "premier", "virtuoso"] as const;
    tiers.forEach((tier) => {
      const items = getPackageForTier(tier, "none");
      expect(items.some((i) => i.id === "welcome-box")).toBe(true);
    });
  });
});

describe("estimatePackageCost", () => {
  it("returns positive min and max", () => {
    const cost = estimatePackageCost("pro", "lease");
    expect(cost.min).toBeGreaterThan(0);
    expect(cost.max).toBeGreaterThan(0);
  });

  it("max is >= min", () => {
    const cost = estimatePackageCost("virtuoso", "own");
    expect(cost.max).toBeGreaterThanOrEqual(cost.min);
  });

  it("virtuoso costs more than rising", () => {
    const virtuoso = estimatePackageCost("virtuoso", "own");
    const rising = estimatePackageCost("rising", "none");
    expect(virtuoso.max).toBeGreaterThan(rising.max);
  });
});

describe("LUXURY_PARTNERS", () => {
  it("has at least 7 partners", () => {
    expect(LUXURY_PARTNERS.length).toBeGreaterThanOrEqual(7);
  });

  it("includes Galimard (Grasse perfumer)", () => {
    expect(LUXURY_PARTNERS.some((p) => p.name === "Galimard")).toBe(true);
  });

  it("includes Lupit Pole", () => {
    expect(LUXURY_PARTNERS.some((p) => p.name === "Lupit Pole")).toBe(true);
  });

  it("includes Marqeta", () => {
    expect(LUXURY_PARTNERS.some((p) => p.name === "Marqeta")).toBe(true);
  });

  it("each partner has website and partnership description", () => {
    LUXURY_PARTNERS.forEach((p) => {
      expect(p.website).toMatch(/^https?:\/\//);
      expect(p.partnership).toBeTruthy();
    });
  });
});
