"use client";

import { Star, AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RatingBadge({ rating, size = "md", showIcon = true, className }: RatingBadgeProps) {
  const isLow = rating < 75;
  const isGreat = rating >= 90;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const colorClasses = isLow
    ? "bg-red-500/20 text-red-400 border-red-500/30"
    : isGreat
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-gold-500/20 text-gold-400 border-gold-500/30";

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full border font-medium", sizeClasses[size], colorClasses, className)}>
      {showIcon && (
        isLow ? <AlertTriangle size={size === "sm" ? 10 : 14} /> :
        isGreat ? <Shield size={size === "sm" ? 10 : 14} /> :
        <Star size={size === "sm" ? 10 : 14} />
      )}
      {rating}%
    </div>
  );
}
