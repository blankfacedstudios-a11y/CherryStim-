"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AR_FILTERS, FILTER_CATEGORIES, canClientAccessFilter, type FilterCategory } from "@/lib/filters";
import type { ClientTier } from "@/lib/tiers";
import { CLIENT_TIERS } from "@/lib/tiers";
import { useStreamMode } from "@/hooks/useStreamMode";
import { Wand2, Lock, Crown } from "lucide-react";
import { toast } from "sonner";

export default function ClientFiltersPage() {
  const { mode } = useStreamMode();
  const [clientTier] = useState<ClientTier>("sprung");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory | "all">("all");
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  const modeFilters = AR_FILTERS.filter((f) => f.supportedModes.includes(mode) && !f.dancerOnly);
  const filtered = selectedCategory === "all"
    ? modeFilters
    : modeFilters.filter((f) => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Wand2 className="text-cherry-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">AR Filters</h1>
          </div>
          <p className="text-white/60">
            Apply filters during live streams, FaceTime, and private shows.
            Your tier: <span className="font-semibold text-gold-400">{CLIENT_TIERS[clientTier].label}</span> •
            Mode: <span className="font-semibold text-gold-400">{mode}</span>
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button size="sm" variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")}>
            All
          </Button>
          {(Object.keys(FILTER_CATEGORIES) as FilterCategory[]).map((cat) => {
            const count = modeFilters.filter((f) => f.category === cat).length;
            if (count === 0) return null;
            return (
              <Button key={cat} size="sm" variant={selectedCategory === cat ? "default" : "outline"} onClick={() => setSelectedCategory(cat)}>
                {FILTER_CATEGORIES[cat].icon} {FILTER_CATEGORIES[cat].label}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((filter) => {
            const accessible = canClientAccessFilter(filter, clientTier);
            const isActive = activeFilterId === filter.id;
            return (
              <Card
                key={filter.id}
                className={`glass overflow-hidden transition-all ${!accessible ? "opacity-50" : ""} ${isActive ? "border-gold-500/50 shadow-glow" : ""}`}
              >
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{filter.previewEmoji}</span>
                      <h3 className="text-sm font-semibold">{filter.name}</h3>
                    </div>
                    {!accessible && <Lock size={14} className="text-white/30" />}
                    {filter.isSignature && <Crown size={14} className="text-gold-500" />}
                  </div>

                  <p className="mb-3 text-[11px] leading-relaxed text-white/50">{filter.description}</p>

                  {accessible ? (
                    <Button
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className="w-full"
                      onClick={() => {
                        setActiveFilterId(isActive ? null : filter.id);
                        toast.success(isActive ? "Filter removed" : `${filter.name} applied`);
                      }}
                    >
                      {isActive ? "Remove" : "Apply"}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full opacity-60" disabled>
                      <Lock size={12} className="mr-1" />
                      {filter.minTier ? `Requires ${CLIENT_TIERS[filter.minTier].label}+` : "Upgrade Tier"}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
