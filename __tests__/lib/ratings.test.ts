import { describe, it, expect } from "vitest";
import {
  computeWeightedRating,
  hasLowRating,
  detectBadRatingPattern,
  getClientAccessLevel,
  getDancerVisibility,
  RATING_CONFIG,
  type RatingEntry
} from "@/lib/ratings";

function makeRating(overrides: Partial<RatingEntry> = {}): RatingEntry {
  return {
    id: "r1",
    fromUserId: "user-1",
    toUserId: "user-2",
    fromRole: "client",
    toRole: "dancer",
    score: 80,
    createdAt: Date.now(),
    ...overrides
  };
}

describe("computeWeightedRating", () => {
  it("returns 100 for no ratings", () => {
    expect(computeWeightedRating([], "dancer")).toBe(100);
  });

  it("applies 0.25 weight to client-rating-dancer", () => {
    const ratings = [makeRating({ fromRole: "client", score: 40 })];
    const result = computeWeightedRating(ratings, "dancer");
    expect(result).toBe(40);
  });

  it("applies full weight to dancer-rating-client", () => {
    const ratings = [makeRating({ fromRole: "dancer", toRole: "client", score: 60 })];
    const result = computeWeightedRating(ratings, "client");
    expect(result).toBe(60);
  });

  it("mixes weights for multiple ratings on a dancer", () => {
    const ratings = [
      makeRating({ fromRole: "client", score: 20 }),
      makeRating({ fromRole: "dancer", toRole: "dancer", score: 100 })
    ];
    const result = computeWeightedRating(ratings, "dancer");
    expect(result).toBeGreaterThan(20);
    expect(result).toBeLessThan(100);
  });
});

describe("hasLowRating", () => {
  it("returns true below threshold", () => {
    expect(hasLowRating(74)).toBe(true);
  });

  it("returns false at threshold", () => {
    expect(hasLowRating(75)).toBe(false);
  });

  it("returns false above threshold", () => {
    expect(hasLowRating(90)).toBe(false);
  });
});

describe("detectBadRatingPattern", () => {
  it("returns false with fewer than 5 ratings", () => {
    const ratings = Array.from({ length: 4 }, (_, i) =>
      makeRating({ score: 10, createdAt: Date.now() })
    );
    expect(detectBadRatingPattern(ratings)).toBe(false);
  });

  it("returns true with 5+ very low ratings in window", () => {
    const ratings = Array.from({ length: 6 }, () =>
      makeRating({ score: 10, createdAt: Date.now() })
    );
    expect(detectBadRatingPattern(ratings)).toBe(true);
  });

  it("returns false with 5+ moderate ratings", () => {
    const ratings = Array.from({ length: 6 }, () =>
      makeRating({ score: 60, createdAt: Date.now() })
    );
    expect(detectBadRatingPattern(ratings)).toBe(false);
  });
});

describe("getClientAccessLevel", () => {
  it("returns full for good rating", () => {
    expect(getClientAccessLevel(85, false)).toBe("full");
  });

  it("returns limited for low rating without premium", () => {
    expect(getClientAccessLevel(50, false)).toBe("limited");
  });

  it("returns full for low rating with premium paid", () => {
    expect(getClientAccessLevel(50, true)).toBe("full");
  });
});

describe("getDancerVisibility", () => {
  it("returns full for good rating", () => {
    expect(getDancerVisibility(80)).toBe("full");
  });

  it("returns reduced for low rating", () => {
    expect(getDancerVisibility(60)).toBe("reduced");
  });
});
