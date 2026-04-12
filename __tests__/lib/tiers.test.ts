import { describe, it, expect } from "vitest";
import { computeDancerTier, DANCER_TIERS, CLIENT_TIERS, type UserMetrics } from "@/lib/tiers";

describe("computeDancerTier", () => {
  it("returns rising for zero metrics", () => {
    const metrics: UserMetrics = { hoursOnApp: 0, earnings: 0, giftsReceived: 0, campaignsCompleted: 0, modulesPassed: 0, rating: 0 };
    expect(computeDancerTier(metrics)).toBe("rising");
  });

  it("returns pro when all pro thresholds are met", () => {
    const metrics: UserMetrics = { hoursOnApp: 50, earnings: 1000, giftsReceived: 50, campaignsCompleted: 1, modulesPassed: 2, rating: 70 };
    expect(computeDancerTier(metrics)).toBe("pro");
  });

  it("returns elite when all elite thresholds are met", () => {
    const metrics: UserMetrics = { hoursOnApp: 200, earnings: 5000, giftsReceived: 200, campaignsCompleted: 3, modulesPassed: 5, rating: 80 };
    expect(computeDancerTier(metrics)).toBe("elite");
  });

  it("returns premier when all premier thresholds are met", () => {
    const metrics: UserMetrics = { hoursOnApp: 500, earnings: 15000, giftsReceived: 500, campaignsCompleted: 5, modulesPassed: 8, rating: 85 };
    expect(computeDancerTier(metrics)).toBe("premier");
  });

  it("returns virtuoso when all virtuoso thresholds are met", () => {
    const metrics: UserMetrics = { hoursOnApp: 1000, earnings: 50000, giftsReceived: 1000, campaignsCompleted: 10, modulesPassed: 12, rating: 90 };
    expect(computeDancerTier(metrics)).toBe("virtuoso");
  });

  it("falls back to lower tier when one metric is insufficient", () => {
    const metrics: UserMetrics = { hoursOnApp: 1000, earnings: 50000, giftsReceived: 1000, campaignsCompleted: 10, modulesPassed: 12, rating: 50 };
    expect(computeDancerTier(metrics)).not.toBe("virtuoso");
  });
});

describe("DANCER_TIERS", () => {
  it("has 5 tiers with ascending ranks", () => {
    const tiers = Object.values(DANCER_TIERS);
    expect(tiers).toHaveLength(5);
    for (let i = 1; i < tiers.length; i++) {
      expect(tiers[i].rank).toBeGreaterThan(tiers[i - 1].rank);
    }
  });
});

describe("CLIENT_TIERS", () => {
  it("has 5 tiers all upgradable via payment", () => {
    const tiers = Object.values(CLIENT_TIERS);
    expect(tiers).toHaveLength(5);
    tiers.forEach((t) => expect(t.canPayToUpgrade).toBe(true));
  });
});
