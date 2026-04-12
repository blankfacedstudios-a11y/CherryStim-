export type GearOwner = "cherrystim" | "lease" | "dancer";

export interface SplitConfig {
  performer: number;
  platform: number;
  label: string;
}

const SPLITS: Record<GearOwner, SplitConfig> = {
  cherrystim: { performer: 70, platform: 30, label: "70/30" },
  lease: { performer: 64, platform: 36, label: "64/36" },
  dancer: { performer: 55, platform: 45, label: "55/45" }
};

export function getRevenueSplit(gearOwner: GearOwner) {
  return SPLITS[gearOwner];
}
