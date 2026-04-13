import type { DancerTier } from "./tiers";

export type GearOwner = "cherrystim" | "lease" | "dancer";

export interface SplitConfig {
  performer: number;
  platform: number;
  label: string;
}

const BASE_SPLITS: Record<GearOwner, SplitConfig> = {
  cherrystim: { performer: 64, platform: 36, label: "64/36" },
  lease: { performer: 64, platform: 36, label: "64/36" },
  dancer: { performer: 55, platform: 45, label: "55/45" }
};

const TIER_SPLITS: Record<DancerTier, SplitConfig> = {
  rising: { performer: 70, platform: 30, label: "70/30" },
  pro: { performer: 70, platform: 30, label: "70/30" },
  elite: { performer: 65, platform: 35, label: "65/35" },
  premier: { performer: 60, platform: 40, label: "60/40" },
  virtuoso: { performer: 55, platform: 45, label: "55/45" }
};

export function getRevenueSplit(gearOwner: GearOwner): SplitConfig {
  return BASE_SPLITS[gearOwner];
}

export function getTierSplit(tier: DancerTier): SplitConfig {
  return TIER_SPLITS[tier];
}

export const CASTING_SPLIT: SplitConfig = { performer: 64, platform: 36, label: "64/36" };
