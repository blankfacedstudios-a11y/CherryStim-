import { describe, it, expect } from "vitest";
import { CLIENT_PACKAGE_ITEMS, getClientPackageItems, estimateClientPackageCost } from "@/lib/client-package";

describe("CLIENT_PACKAGE_ITEMS", () => {
  it("has at least 18 items", () => {
    expect(CLIENT_PACKAGE_ITEMS.length).toBeGreaterThanOrEqual(18);
  });

  it("has no dance pole", () => {
    expect(CLIENT_PACKAGE_ITEMS.some((i) => i.id.includes("pole"))).toBe(false);
  });

  it("includes male-specific items", () => {
    const maleItems = CLIENT_PACKAGE_ITEMS.filter((i) => Array.isArray(i.genderSpecific) && i.genderSpecific.includes("male"));
    expect(maleItems.length).toBeGreaterThanOrEqual(3);
  });

  it("includes female-specific items", () => {
    const femaleItems = CLIENT_PACKAGE_ITEMS.filter((i) => Array.isArray(i.genderSpecific) && i.genderSpecific.includes("female"));
    expect(femaleItems.length).toBeGreaterThanOrEqual(3);
  });

  it("includes unisex items", () => {
    const unisex = CLIENT_PACKAGE_ITEMS.filter((i) => i.genderSpecific === "all");
    expect(unisex.length).toBeGreaterThanOrEqual(4);
  });

  it("includes debit card for all tiers", () => {
    const card = CLIENT_PACKAGE_ITEMS.find((i) => i.id === "client-debit-card");
    expect(card).toBeDefined();
    expect(card?.includedInTiers).toHaveLength(5);
  });

  it("includes cologne for males", () => {
    expect(CLIENT_PACKAGE_ITEMS.some((i) => i.id === "client-m-cologne")).toBe(true);
  });

  it("includes perfume for females", () => {
    expect(CLIENT_PACKAGE_ITEMS.some((i) => i.id === "client-f-perfume")).toBe(true);
  });
});

describe("getClientPackageItems", () => {
  it("basic male gets minimal items", () => {
    const items = getClientPackageItems("basic", "male");
    expect(items.length).toBeGreaterThanOrEqual(4);
  });

  it("platinum female gets the most items", () => {
    const basic = getClientPackageItems("basic", "female");
    const plat = getClientPackageItems("platinum", "female");
    expect(plat.length).toBeGreaterThan(basic.length);
  });

  it("male gets cologne not perfume", () => {
    const items = getClientPackageItems("sprung", "male");
    expect(items.some((i) => i.id === "client-m-cologne")).toBe(true);
    expect(items.some((i) => i.id === "client-f-perfume")).toBe(false);
  });

  it("female gets perfume not cologne", () => {
    const items = getClientPackageItems("sprung", "female");
    expect(items.some((i) => i.id === "client-f-perfume")).toBe(true);
    expect(items.some((i) => i.id === "client-m-cologne")).toBe(false);
  });

  it("platinum male gets grooming kit", () => {
    const items = getClientPackageItems("platinum", "male");
    expect(items.some((i) => i.id === "client-grooming-kit")).toBe(true);
  });

  it("platinum female gets cosmetics kit", () => {
    const items = getClientPackageItems("platinum", "female");
    expect(items.some((i) => i.id === "client-cosmetics-kit")).toBe(true);
  });
});

describe("estimateClientPackageCost", () => {
  it("returns positive values", () => {
    const cost = estimateClientPackageCost("vip", "female");
    expect(cost.min).toBeGreaterThan(0);
    expect(cost.max).toBeGreaterThanOrEqual(cost.min);
  });

  it("platinum costs more than basic", () => {
    const basic = estimateClientPackageCost("basic", "male");
    const plat = estimateClientPackageCost("platinum", "male");
    expect(plat.max).toBeGreaterThan(basic.max);
  });
});
