import { describe, it, expect } from "vitest";
import { getRevenueSplit, getTierSplit, CASTING_SPLIT, type GearOwner } from "@/lib/splits";
import type { DancerTier } from "@/lib/tiers";

describe("getRevenueSplit", () => {
  it("returns 64/36 for cherrystim-provided gear", () => {
    const split = getRevenueSplit("cherrystim");
    expect(split.performer).toBe(64);
    expect(split.platform).toBe(36);
    expect(split.label).toBe("64/36");
  });

  it("returns 64/36 for leased gear", () => {
    const split = getRevenueSplit("lease");
    expect(split.performer).toBe(64);
    expect(split.platform).toBe(36);
    expect(split.label).toBe("64/36");
  });

  it("returns 55/45 for dancer-owned gear", () => {
    const split = getRevenueSplit("dancer");
    expect(split.performer).toBe(55);
    expect(split.platform).toBe(45);
    expect(split.label).toBe("55/45");
  });

  it("performer + platform always sums to 100 or less", () => {
    const owners: GearOwner[] = ["cherrystim", "lease", "dancer"];
    for (const owner of owners) {
      const split = getRevenueSplit(owner);
      expect(split.performer + split.platform).toBeLessThanOrEqual(100);
    }
  });
});

describe("getTierSplit", () => {
  it("returns 70/30 for rising", () => {
    expect(getTierSplit("rising").performer).toBe(70);
  });

  it("returns 70/30 for pro", () => {
    expect(getTierSplit("pro").performer).toBe(70);
  });

  it("returns 65/35 for elite", () => {
    expect(getTierSplit("elite").performer).toBe(65);
  });

  it("returns 60/40 for premier", () => {
    expect(getTierSplit("premier").performer).toBe(60);
  });

  it("returns 55/45 for virtuoso", () => {
    expect(getTierSplit("virtuoso").performer).toBe(55);
  });

  it("higher tiers give lower performer percentage", () => {
    const tiers: DancerTier[] = ["rising", "pro", "elite", "premier", "virtuoso"];
    for (let i = 1; i < tiers.length; i++) {
      expect(getTierSplit(tiers[i]).performer).toBeLessThanOrEqual(getTierSplit(tiers[i - 1]).performer);
    }
  });
});

describe("CASTING_SPLIT", () => {
  it("is 70/30", () => {
    expect(CASTING_SPLIT.performer).toBe(70);
    expect(CASTING_SPLIT.platform).toBe(30);
    expect(CASTING_SPLIT.label).toBe("70/30");
  });
});
