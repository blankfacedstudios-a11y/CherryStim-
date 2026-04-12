"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";

interface MiniChartProps {
  title: string;
  data: number[];
  labels?: string[];
  color?: string;
  className?: string;
}

export function MiniChart({ title, data, labels, color = "#ff0033", className }: MiniChartProps) {
  const { path, area, max, min } = useMemo(() => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const w = 300;
    const h = 80;
    const padding = 4;

    const points = data.map((v, i) => ({
      x: padding + (i / (data.length - 1)) * (w - padding * 2),
      y: padding + (1 - (v - minVal) / range) * (h - padding * 2)
    }));

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

    return { path: pathD, area: areaD, max: maxVal, min: minVal };
  }, [data]);

  const latest = data[data.length - 1];
  const prev = data[data.length - 2] || latest;
  const change = prev > 0 ? ((latest - prev) / prev) * 100 : 0;

  return (
    <Card className={`glass p-4 ${className || ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-white/50">{title}</span>
        <span className={`text-xs font-medium ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(1)}%
        </span>
      </div>
      <svg viewBox="0 0 300 80" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${title.replace(/\s/g, "")})`} />
        <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {labels && (
        <div className="mt-1 flex justify-between text-[9px] text-white/30">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </Card>
  );
}
