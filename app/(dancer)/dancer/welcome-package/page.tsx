"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WELCOME_PACKAGE_ITEMS, getPackageForTier, estimatePackageCost, LUXURY_PARTNERS, type PackageItemCategory } from "@/lib/welcome-package";
import type { DancerTier } from "@/lib/tiers";
import { DANCER_TIERS } from "@/lib/tiers";
import { Gift, Package, Sparkles, DollarSign, ExternalLink, Crown } from "lucide-react";

const CATEGORY_ICONS: Record<PackageItemCategory, string> = {
  equipment: "🔩",
  apparel: "👗",
  beauty: "💄",
  branding: "✨",
  print: "📖",
  financial: "💳",
  tech: "📱",
  accessories: "🎁"
};

export default function WelcomePackagePage() {
  const [selectedTier, setSelectedTier] = useState<DancerTier>("pro");
  const [gearType, setGearType] = useState<"lease" | "own" | "none">("lease");

  const items = getPackageForTier(selectedTier, gearType);
  const cost = estimatePackageCost(selectedTier, gearType);

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Gift className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Welcome Package</h1>
          </div>
          <p className="max-w-2xl text-white/60">
            Every dancer receives a premium welcome package shipped to their door. Contents vary by tier and equipment plan.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DANCER_TIERS) as DancerTier[]).map((tier) => (
              <Button
                key={tier}
                size="sm"
                variant={selectedTier === tier ? "default" : "outline"}
                onClick={() => setSelectedTier(tier)}
              >
                {DANCER_TIERS[tier].label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {([
              { value: "lease" as const, label: "Lease Gear" },
              { value: "own" as const, label: "Own Gear" },
              { value: "none" as const, label: "No Gear" }
            ]).map((opt) => (
              <Button
                key={opt.value}
                size="sm"
                variant={gearType === opt.value ? "default" : "outline"}
                onClick={() => setGearType(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="glass mb-8 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Package className="text-gold-500" size={32} />
            <div>
              <p className="text-2xl font-semibold">{items.length} items</p>
              <p className="text-sm text-white/50">
                {DANCER_TIERS[selectedTier].label} tier • {gearType === "lease" ? "Leased" : gearType === "own" ? "Owned" : "No"} equipment
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/40">Est. package value</p>
            <p className="text-2xl font-semibold text-emerald-400">
              ${cost.min.toLocaleString()} — ${cost.max.toLocaleString()}
            </p>
          </div>
        </Card>

        {categories.map((category) => {
          const catItems = items.filter((i) => i.category === category);
          return (
            <div key={category} className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold capitalize">
                <span>{CATEGORY_ICONS[category]}</span>
                {category.replace("_", " ")}
                <span className="text-sm font-normal text-white/40">({catItems.length})</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {catItems.map((item) => (
                  <Card key={item.id} className="glass p-5">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className="text-sm font-medium text-emerald-400">{item.estimatedCost}</span>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-white/60">{item.description}</p>
                    <p className="text-[10px] text-white/30">Supplier: {item.supplier}</p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        <Card className="glass p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Crown className="text-gold-500" size={20} />
            Luxury Partners
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {LUXURY_PARTNERS.map((partner) => (
              <div key={partner.name} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-sm font-semibold">{partner.name}</p>
                <p className="text-[10px] text-white/40">{partner.location}</p>
                <p className="mt-1 text-[10px] text-gold-400">{partner.partnership}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
