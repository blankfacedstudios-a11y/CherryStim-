export interface RatingEntry {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromRole: "client" | "dancer";
  toRole: "client" | "dancer";
  score: number;
  createdAt: number;
}

export interface RatingConfig {
  lowRatingThreshold: number;
  clientRatingDancerWeight: number;
  dancerRatingClientWeight: number;
  clientBadPatternBlockDays: number;
  lowRatingPenalty: "limited_access" | "premium_access_required";
  lowVisibilityThreshold: number;
}

export const RATING_CONFIG: RatingConfig = {
  lowRatingThreshold: 75,
  clientRatingDancerWeight: 0.25,
  dancerRatingClientWeight: 1.0,
  clientBadPatternBlockDays: 14,
  lowRatingPenalty: "limited_access",
  lowVisibilityThreshold: 75
};

export function computeWeightedRating(ratings: RatingEntry[], targetRole: "client" | "dancer"): number {
  if (ratings.length === 0) return 100;

  let totalWeight = 0;
  let weightedSum = 0;

  for (const r of ratings) {
    const weight = r.fromRole === "client" && targetRole === "dancer"
      ? RATING_CONFIG.clientRatingDancerWeight
      : RATING_CONFIG.dancerRatingClientWeight;
    weightedSum += r.score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 100;
}

export function hasLowRating(rating: number): boolean {
  return rating < RATING_CONFIG.lowRatingThreshold;
}

export function detectBadRatingPattern(ratingsGiven: RatingEntry[], windowDays = 30): boolean {
  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  const recent = ratingsGiven.filter((r) => r.createdAt >= cutoff);
  if (recent.length < 5) return false;
  const avgScore = recent.reduce((s, r) => s + r.score, 0) / recent.length;
  return avgScore < 40;
}

export type AccessLevel = "full" | "limited" | "premium_required";

export function getClientAccessLevel(rating: number, hasPaidPremium: boolean): AccessLevel {
  if (!hasLowRating(rating)) return "full";
  if (hasPaidPremium) return "full";
  return "limited";
}

export function getDancerVisibility(rating: number): "full" | "reduced" {
  return rating < RATING_CONFIG.lowVisibilityThreshold ? "reduced" : "full";
}
