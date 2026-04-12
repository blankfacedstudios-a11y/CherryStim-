import { describe, it, expect } from "vitest";
import { ONBOARDING_STEPS, getStepsForTier, FRAGRANCE_OPTIONS, SHOE_SIZES, APPAREL_SIZES, TRACKING_STATUS_LABELS, createMockTracking } from "@/lib/onboarding";

describe("ONBOARDING_STEPS", () => {
  it("has 12 steps total", () => {
    expect(ONBOARDING_STEPS).toHaveLength(12);
  });

  it("all steps are required", () => {
    ONBOARDING_STEPS.forEach((s) => expect(s.required).toBe(true));
  });

  it("select_tier applies to all tiers", () => {
    const step = ONBOARDING_STEPS.find((s) => s.id === "select_tier");
    expect(step?.appliesTo).toHaveLength(5);
  });
});

describe("getStepsForTier", () => {
  it("rising gets fewer steps than virtuoso", () => {
    const rising = getStepsForTier("rising");
    const virtuoso = getStepsForTier("virtuoso");
    expect(rising.length).toBeLessThan(virtuoso.length);
  });

  it("all tiers include select_tier and confirm_order", () => {
    const tiers = ["rising", "pro", "elite", "premier", "virtuoso"] as const;
    tiers.forEach((tier) => {
      const steps = getStepsForTier(tier);
      expect(steps.some((s) => s.id === "select_tier")).toBe(true);
      expect(steps.some((s) => s.id === "confirm_order")).toBe(true);
    });
  });

  it("pro tier includes shoe size and pole install", () => {
    const steps = getStepsForTier("pro");
    expect(steps.some((s) => s.id === "select_shoe_size")).toBe(true);
    expect(steps.some((s) => s.id === "confirm_pole_install")).toBe(true);
  });

  it("elite tier includes fragrance and lingerie", () => {
    const steps = getStepsForTier("elite");
    expect(steps.some((s) => s.id === "select_fragrance")).toBe(true);
    expect(steps.some((s) => s.id === "select_lingerie_size")).toBe(true);
  });

  it("premier tier includes swimwear and robe", () => {
    const steps = getStepsForTier("premier");
    expect(steps.some((s) => s.id === "select_swimwear_size")).toBe(true);
    expect(steps.some((s) => s.id === "select_robe_size")).toBe(true);
  });
});

describe("FRAGRANCE_OPTIONS", () => {
  it("has 3 fragrances", () => {
    expect(FRAGRANCE_OPTIONS).toHaveLength(3);
  });

  it("includes Cherry Noir by Galimard", () => {
    expect(FRAGRANCE_OPTIONS.some((f) => f.name === "Cherry Noir" && f.house.includes("Galimard"))).toBe(true);
  });
});

describe("SHOE_SIZES", () => {
  it("ranges from 5 to 12", () => {
    expect(SHOE_SIZES[0]).toBe("5");
    expect(SHOE_SIZES[SHOE_SIZES.length - 1]).toBe("12");
  });
});

describe("APPAREL_SIZES", () => {
  it("has XS through XXL", () => {
    expect(APPAREL_SIZES).toContain("XS");
    expect(APPAREL_SIZES).toContain("XXL");
  });
});

describe("TRACKING_STATUS_LABELS", () => {
  it("has 11 statuses", () => {
    expect(Object.keys(TRACKING_STATUS_LABELS)).toHaveLength(11);
  });

  it("pending starts at 0%, delivered at 100%", () => {
    expect(TRACKING_STATUS_LABELS.pending.progress).toBe(0);
    expect(TRACKING_STATUS_LABELS.delivered.progress).toBe(100);
  });
});

describe("createMockTracking", () => {
  it("creates tracking for rising tier", () => {
    const tracking = createMockTracking("d1", "rising", "cherrystim");
    expect(tracking.orderId).toBeTruthy();
    expect(tracking.supplierStatuses.length).toBeGreaterThanOrEqual(3);
  });

  it("creates more supplier items for virtuoso", () => {
    const rising = createMockTracking("d1", "rising", "cherrystim");
    const virtuoso = createMockTracking("d1", "virtuoso", "cherrystim");
    expect(virtuoso.supplierStatuses.length).toBeGreaterThan(rising.supplierStatuses.length);
  });

  it("includes Galimard for elite tier", () => {
    const tracking = createMockTracking("d1", "elite", "cherrystim");
    expect(tracking.supplierStatuses.some((s) => s.supplier.includes("Galimard"))).toBe(true);
  });

  it("includes Lupit Pole for pro tier", () => {
    const tracking = createMockTracking("d1", "pro", "lease");
    expect(tracking.supplierStatuses.some((s) => s.supplier.includes("Lupit"))).toBe(true);
  });

  it("includes Pleaser USA for pro tier", () => {
    const tracking = createMockTracking("d1", "pro", "cherrystim");
    expect(tracking.supplierStatuses.some((s) => s.supplier.includes("Pleaser"))).toBe(true);
  });
});
