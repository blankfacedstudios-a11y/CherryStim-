"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AR_FILTERS, FILTER_CATEGORIES, TRACKING_LABELS, type FilterCategory } from "@/lib/filters";
import { useStreamMode } from "@/hooks/useStreamMode";
import { Wand2, Cpu, Eye, Layers, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";

export default function DancerFiltersPage() {
  const { mode } = useStreamMode();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory | "all">("all");
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [intensities, setIntensities] = useState<Record<string, number>>({});

  const modeFilters = AR_FILTERS.filter((f) => f.supportedModes.includes(mode));
  const filtered = selectedCategory === "all"
    ? modeFilters
    : modeFilters.filter((f) => f.category === selectedCategory);

  const complexityColors = {
    low: "text-emerald-400",
    medium: "text-sky-400",
    high: "text-amber-400",
    ultra: "text-cherry-400"
  };

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Wand2 className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">AR Filters</h1>
          </div>
          <p className="max-w-2xl text-white/60">
            World-class facial and body filters powered by 240-point face mesh, real-time lip sync, and full body tracking. Currently viewing filters for <span className="font-semibold text-gold-400">{mode}</span> mode.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button size="sm" variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")}>
            All ({modeFilters.length})
          </Button>
          {(Object.keys(FILTER_CATEGORIES) as FilterCategory[]).map((cat) => {
            const count = modeFilters.filter((f) => f.category === cat).length;
            if (count === 0) return null;
            return (
              <Button key={cat} size="sm" variant={selectedCategory === cat ? "default" : "outline"} onClick={() => setSelectedCategory(cat)}>
                {FILTER_CATEGORIES[cat].icon} {FILTER_CATEGORIES[cat].label} ({count})
              </Button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((filter) => {
            const isActive = activeFilterId === filter.id;
            const intensity = intensities[filter.id] ?? filter.intensity.default;
            return (
              <Card
                key={filter.id}
                className={`glass overflow-hidden transition-all ${isActive ? "border-gold-500/50 shadow-glow" : ""}`}
              >
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{filter.previewEmoji}</span>
                      <div>
                        <h3 className="font-semibold">{filter.name}</h3>
                        <p className="text-[10px] text-white/40">{FILTER_CATEGORIES[filter.category].label}</p>
                      </div>
                    </div>
                    {filter.isSignature && (
                      <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-medium text-gold-400">Signature</span>
                    )}
                  </div>

                  <p className="mb-3 text-xs leading-relaxed text-white/60">{filter.description}</p>

                  <div className="mb-3 flex flex-wrap gap-1">
                    {filter.tracking.slice(0, 3).map((t) => (
                      <span key={t} className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">
                        <Cpu size={8} /> {TRACKING_LABELS[t].split(" ").slice(0, 2).join(" ")}
                      </span>
                    ))}
                    {filter.tracking.length > 3 && (
                      <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">
                        +{filter.tracking.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mb-3 flex items-center gap-3 text-[10px] text-white/40">
                    <span className="flex items-center gap-1">
                      <Layers size={10} />
                      <span className={complexityColors[filter.renderComplexity]}>{filter.renderComplexity}</span>
                    </span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {filter.sdkProvider.split(" ")[0]}</span>
                    <span>{filter.supportedModes.join(" • ")}</span>
                  </div>

                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-[10px] text-white/40">
                      <span>Intensity</span>
                      <span>{intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min={filter.intensity.min}
                      max={filter.intensity.max}
                      value={intensity}
                      onChange={(e) => setIntensities((prev) => ({ ...prev, [filter.id]: Number(e.target.value) }))}
                      className="w-full accent-cherry-500"
                    />
                  </div>

                  <Button
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setActiveFilterId(isActive ? null : filter.id);
                      toast.success(isActive ? "Filter removed" : `${filter.name} activated at ${intensity}%`);
                    }}
                  >
                    {isActive ? "Remove Filter" : "Apply Filter"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
