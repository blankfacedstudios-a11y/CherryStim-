export type DancerTier = "rising" | "pro" | "elite" | "premier" | "virtuoso";
export type ClientTier = "basic" | "crush" | "sprung" | "vip" | "platinum";

export interface TierThresholds {
  minHoursOnApp: number;
  minEarnings: number;
  minGiftsReceived: number;
  minCampaignsCompleted: number;
  minModulesPassed: number;
  minRating: number;
}

export const DANCER_TIERS: Record<DancerTier, { label: string; rank: number; thresholds: TierThresholds }> = {
  rising: {
    label: "Rising",
    rank: 1,
    thresholds: { minHoursOnApp: 0, minEarnings: 0, minGiftsReceived: 0, minCampaignsCompleted: 0, minModulesPassed: 0, minRating: 0 }
  },
  pro: {
    label: "Pro",
    rank: 2,
    thresholds: { minHoursOnApp: 50, minEarnings: 1000, minGiftsReceived: 50, minCampaignsCompleted: 1, minModulesPassed: 2, minRating: 70 }
  },
  elite: {
    label: "Elite",
    rank: 3,
    thresholds: { minHoursOnApp: 200, minEarnings: 5000, minGiftsReceived: 200, minCampaignsCompleted: 3, minModulesPassed: 5, minRating: 80 }
  },
  premier: {
    label: "Premier",
    rank: 4,
    thresholds: { minHoursOnApp: 500, minEarnings: 15000, minGiftsReceived: 500, minCampaignsCompleted: 5, minModulesPassed: 8, minRating: 85 }
  },
  virtuoso: {
    label: "Virtuoso",
    rank: 5,
    thresholds: { minHoursOnApp: 1000, minEarnings: 50000, minGiftsReceived: 1000, minCampaignsCompleted: 10, minModulesPassed: 12, minRating: 90 }
  }
};

export const CLIENT_TIERS: Record<ClientTier, { label: string; rank: number; canPayToUpgrade: boolean }> = {
  basic: { label: "Basic", rank: 1, canPayToUpgrade: true },
  crush: { label: "Crush", rank: 2, canPayToUpgrade: true },
  sprung: { label: "Sprung", rank: 3, canPayToUpgrade: true },
  vip: { label: "VIP", rank: 4, canPayToUpgrade: true },
  platinum: { label: "Platinum", rank: 5, canPayToUpgrade: true }
};

export interface UserMetrics {
  hoursOnApp: number;
  earnings: number;
  giftsReceived: number;
  campaignsCompleted: number;
  modulesPassed: number;
  rating: number;
}

export function computeDancerTier(metrics: UserMetrics): DancerTier {
  const tiers: DancerTier[] = ["virtuoso", "premier", "elite", "pro", "rising"];
  for (const tier of tiers) {
    const t = DANCER_TIERS[tier].thresholds;
    if (
      metrics.hoursOnApp >= t.minHoursOnApp &&
      metrics.earnings >= t.minEarnings &&
      metrics.giftsReceived >= t.minGiftsReceived &&
      metrics.campaignsCompleted >= t.minCampaignsCompleted &&
      metrics.modulesPassed >= t.minModulesPassed &&
      metrics.rating >= t.minRating
    ) {
      return tier;
    }
  }
  return "rising";
}
