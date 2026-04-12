import { describe, it, expect } from "vitest";
import { getRevenueSplit, type GearOwner } from "@/lib/splits";

describe("getRevenueSplit", () => {
  it("returns 70/30 for cherrystim-provided gear", () => {
    const split = getRevenueSplit("cherrystim");
    expect(split.performer).toBe(70);
    expect(split.platform).toBe(30);
    expect(split.label).toBe("70/30");
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

  it("returns a label string for every gear owner", () => {
    const owners: GearOwner[] = ["cherrystim", "lease", "dancer"];
    for (const owner of owners) {
      expect(typeof getRevenueSplit(owner).label).toBe("string");
      expect(getRevenueSplit(owner).label.length).toBeGreaterThan(0);
    }
  });
});
