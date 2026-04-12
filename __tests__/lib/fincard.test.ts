import { describe, it, expect } from "vitest";
import { CARD_PROGRAMS, LAUNCH_ROADMAP, CARD_ISSUING_PARTNERS, METAL_CARD_MANUFACTURERS } from "@/lib/fincard";

describe("CARD_PROGRAMS", () => {
  it("has 3 card tiers", () => {
    expect(Object.keys(CARD_PROGRAMS)).toHaveLength(3);
  });

  it("cherry card has no monthly fee", () => {
    expect(CARD_PROGRAMS.cherry.monthlyFee).toBe(0);
  });

  it("all cards support credit building", () => {
    Object.values(CARD_PROGRAMS).forEach((card) => {
      expect(card.creditBuilding).toBe(true);
    });
  });

  it("all cards support direct deposit", () => {
    Object.values(CARD_PROGRAMS).forEach((card) => {
      expect(card.directDepositEnabled).toBe(true);
    });
  });

  it("black card has highest cashback", () => {
    expect(CARD_PROGRAMS.cherry_black.cashbackPercent).toBeGreaterThan(CARD_PROGRAMS.cherry_gold.cashbackPercent);
    expect(CARD_PROGRAMS.cherry_gold.cashbackPercent).toBeGreaterThan(CARD_PROGRAMS.cherry.cashbackPercent);
  });

  it("each card has material description with weight", () => {
    Object.values(CARD_PROGRAMS).forEach((card) => {
      expect(card.material).toBeTruthy();
      expect(card.weight).toContain("gram");
    });
  });
});

describe("LAUNCH_ROADMAP", () => {
  it("has 10 steps", () => {
    expect(LAUNCH_ROADMAP).toHaveLength(10);
  });

  it("steps are in order", () => {
    for (let i = 1; i < LAUNCH_ROADMAP.length; i++) {
      expect(LAUNCH_ROADMAP[i].step).toBeGreaterThan(LAUNCH_ROADMAP[i - 1].step);
    }
  });

  it("each step has timeline and dependencies", () => {
    LAUNCH_ROADMAP.forEach((step) => {
      expect(step.timeline).toBeTruthy();
      expect(step.dependencies.length).toBeGreaterThan(0);
    });
  });
});

describe("CARD_ISSUING_PARTNERS", () => {
  it("has at least 4 partners", () => {
    expect(CARD_ISSUING_PARTNERS.length).toBeGreaterThanOrEqual(4);
  });

  it("includes US and UAE partners", () => {
    expect(CARD_ISSUING_PARTNERS.some((p) => p.region.includes("United States"))).toBe(true);
    expect(CARD_ISSUING_PARTNERS.some((p) => p.region.includes("UAE"))).toBe(true);
  });

  it("has at least 2 recommended partners", () => {
    expect(CARD_ISSUING_PARTNERS.filter((p) => p.recommended).length).toBeGreaterThanOrEqual(2);
  });
});

describe("METAL_CARD_MANUFACTURERS", () => {
  it("has at least 3 manufacturers", () => {
    expect(METAL_CARD_MANUFACTURERS.length).toBeGreaterThanOrEqual(3);
  });

  it("each has website and pricing", () => {
    METAL_CARD_MANUFACTURERS.forEach((m) => {
      expect(m.website).toMatch(/^https?:\/\//);
      expect(m.priceRange).toBeTruthy();
    });
  });
});
