import { describe, it, expect } from "vitest";
import { EQUIPMENT_PROVIDERS, CATEGORY_LABELS } from "@/lib/equipment";

describe("EQUIPMENT_PROVIDERS", () => {
  it("has at least 10 providers", () => {
    expect(EQUIPMENT_PROVIDERS.length).toBeGreaterThanOrEqual(10);
  });

  it("every provider has required fields", () => {
    EQUIPMENT_PROVIDERS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.website).toMatch(/^https?:\/\//);
      expect(p.contactEmail).toContain("@");
      expect(p.flagshipProducts.length).toBeGreaterThan(0);
    });
  });

  it("includes volumetric capture providers", () => {
    const vol = EQUIPMENT_PROVIDERS.filter((p) => p.category === "volumetric_capture");
    expect(vol.length).toBeGreaterThanOrEqual(3);
  });

  it("includes haptic device providers", () => {
    const hap = EQUIPMENT_PROVIDERS.filter((p) => p.category === "haptic_device");
    expect(hap.length).toBeGreaterThanOrEqual(2);
  });

  it("includes VR camera providers", () => {
    const vr = EQUIPMENT_PROVIDERS.filter((p) => p.category === "vr_camera");
    expect(vr.length).toBeGreaterThanOrEqual(2);
  });

  it("has at least one strategic partner", () => {
    expect(EQUIPMENT_PROVIDERS.some((p) => p.partnershipTier === "strategic")).toBe(true);
  });

  it("has providers with SDK available", () => {
    expect(EQUIPMENT_PROVIDERS.filter((p) => p.sdkAvailable).length).toBeGreaterThan(5);
  });
});

describe("CATEGORY_LABELS", () => {
  it("has labels for all categories", () => {
    expect(Object.keys(CATEGORY_LABELS).length).toBeGreaterThanOrEqual(6);
  });
});
