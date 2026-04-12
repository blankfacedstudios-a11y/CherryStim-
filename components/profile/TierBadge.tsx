"use client";

import { Crown, Star, Gem, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DancerTier, ClientTier } from "@/lib/tiers";
import { DANCER_TIERS, CLIENT_TIERS } from "@/lib/tiers";

interface TierBadgeProps {
  tier: DancerTier | ClientTier;
  type: "dancer" | "client";
  size?: "sm" | "md";
  className?: string;
}

const dancerIcons: Record<DancerTier, typeof Crown> = {
  rising: TrendingUp,
  pro: Star,
  elite: Award,
  premier: Gem,
  virtuoso: Crown
};

const dancerColors: Record<DancerTier, string> = {
  rising: "bg-white/10 text-white/70 border-white/20",
  pro: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  elite: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  premier: "bg-cherry-500/20 text-cherry-400 border-cherry-500/30",
  virtuoso: "bg-gold-500/20 text-gold-400 border-gold-500/30"
};

export function TierBadge({ tier, type, size = "md", className }: TierBadgeProps) {
  const label = type === "dancer"
    ? DANCER_TIERS[tier as DancerTier]?.label ?? tier
    : CLIENT_TIERS[tier as ClientTier]?.label ?? tier;

  const Icon = type === "dancer" ? dancerIcons[tier as DancerTier] ?? Star : Star;
  const color = type === "dancer" ? dancerColors[tier as DancerTier] ?? "bg-white/10 text-white/70 border-white/20" : "bg-cherry-500/20 text-cherry-400 border-cherry-500/30";

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border font-medium", sizeClass, color, className)}>
      <Icon size={size === "sm" ? 10 : 14} />
      {label}
    </span>
  );
}
