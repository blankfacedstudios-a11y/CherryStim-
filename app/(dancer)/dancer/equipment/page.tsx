"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EQUIPMENT_PROVIDERS, CATEGORY_LABELS, type EquipmentCategory } from "@/lib/equipment";
import { ExternalLink, ShoppingCart, Handshake, Package, Mail, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | "all">("all");
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  const filtered = selectedCategory === "all"
    ? EQUIPMENT_PROVIDERS
    : EQUIPMENT_PROVIDERS.filter((p) => p.category === selectedCategory);

  const partnershipColors = {
    strategic: "bg-gold-500/20 text-gold-400 border-gold-500/30",
    ambassador: "bg-cherry-500/20 text-cherry-400 border-cherry-500/30",
    prospect: "bg-white/10 text-white/60 border-white/20"
  };

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <Package className="text-gold-500" size={32} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Equipment Partners</h1>
          </div>
          <p className="max-w-3xl text-white/70">
            Deep-researched VR, 3D, immersive camera and haptic providers. Bulk order, lease, or build ambassador partnerships for premium streaming gear.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button size="sm" variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")}>
            All
          </Button>
          {(Object.keys(CATEGORY_LABELS) as EquipmentCategory[]).map((cat) => (
            <Button key={cat} size="sm" variant={selectedCategory === cat ? "default" : "outline"} onClick={() => setSelectedCategory(cat)}>
              {CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        <div className="grid gap-6">
          {filtered.map((provider) => {
            const expanded = expandedProvider === provider.id;
            return (
              <Card key={provider.id} className="glass overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold">{provider.name}</h2>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${partnershipColors[provider.partnershipTier]}`}>
                          {provider.partnershipTier === "strategic" ? "Strategic Partner" : provider.partnershipTier === "ambassador" ? "Ambassador" : "Prospect"}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                          {CATEGORY_LABELS[provider.category]}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-white/70">{provider.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1"><Globe size={12} /> {provider.headquarters}</span>
                        <span>Price range: {provider.priceRange}</span>
                        {provider.sdkAvailable && <span className="text-emerald-400">SDK Available</span>}
                        {provider.bulkOrderAvailable && <span className="text-gold-400">Bulk Orders</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => window.open(provider.website, "_blank")}>
                        <ExternalLink size={14} className="mr-1" /> Website
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(provider.contactEmail); toast.success("Email copied!"); }}>
                        <Mail size={14} className="mr-1" /> Contact
                      </Button>
                      {provider.bulkOrderAvailable && (
                        <Button size="sm" onClick={() => toast.success(`Bulk order inquiry sent to ${provider.name}`)}>
                          <ShoppingCart size={14} className="mr-1" /> Bulk Order
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Ambassador partnership request sent to ${provider.name}`)}>
                        <Handshake size={14} className="mr-1" /> Partner
                      </Button>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedProvider(expanded ? null : provider.id)}
                    className="mt-4 flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"
                  >
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {expanded ? "Hide" : "Show"} {provider.flagshipProducts.length} product{provider.flagshipProducts.length !== 1 ? "s" : ""}
                  </button>
                </div>

                {expanded && (
                  <div className="border-t border-white/10 bg-black/30 p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {provider.flagshipProducts.map((product, i) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                          <h4 className="mb-1 font-semibold">{product.name}</h4>
                          <p className="mb-2 text-sm font-medium text-emerald-400">{product.price}</p>
                          <p className="mb-1 text-xs text-white/60">{product.specs}</p>
                          <p className="text-xs text-gold-400">Best for: {product.bestFor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
