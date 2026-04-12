"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HoloWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: "cherry" | "gold" | "emerald" | "sky" | "violet";
  className?: string;
}

const colorMap = {
  cherry: { border: "border-cherry-500/40", glow: "shadow-[0_0_30px_rgba(255,0,51,0.2)]", bg: "from-cherry-500/15 to-transparent", text: "text-cherry-500" },
  gold: { border: "border-gold-500/40", glow: "shadow-[0_0_30px_rgba(255,215,0,0.2)]", bg: "from-gold-500/15 to-transparent", text: "text-gold-500" },
  emerald: { border: "border-emerald-500/40", glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]", bg: "from-emerald-500/15 to-transparent", text: "text-emerald-400" },
  sky: { border: "border-sky-500/40", glow: "shadow-[0_0_30px_rgba(14,165,233,0.2)]", bg: "from-sky-500/15 to-transparent", text: "text-sky-400" },
  violet: { border: "border-violet-500/40", glow: "shadow-[0_0_30px_rgba(139,92,246,0.2)]", bg: "from-violet-500/15 to-transparent", text: "text-violet-400" }
};

export function HoloWidget({ title, value, subtitle, icon, trend, color = "cherry", className }: HoloWidgetProps) {
  const c = colorMap[color];
  const [animValue, setAnimValue] = useState(0);
  const targetRef = useRef(typeof value === "number" ? value : 0);

  useEffect(() => {
    if (typeof value !== "number") return;
    targetRef.current = value;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const startVal = 0;
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimValue(Math.round(startVal + (targetRef.current - startVal) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <Card className={cn("relative overflow-hidden rounded-2xl border", c.border, c.glow, "bg-black/50 p-6 backdrop-blur-xl transition-all hover:scale-[1.02]", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", c.bg)} />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl" />
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">{title}</span>
          <div className={cn("rounded-xl bg-white/5 p-2", c.text)}>{icon}</div>
        </div>
        <p className="text-4xl font-bold tracking-tight">
          {typeof value === "number" ? animValue.toLocaleString() : value}
        </p>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
        {trend && (
          <div className={cn("mt-3 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium", trend.value >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>
    </Card>
  );
}
