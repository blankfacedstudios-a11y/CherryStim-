"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NFT_CARDS, CARD_RARITY_CONFIG } from "@/lib/music";
import { toast } from "sonner";
import { Gem, ShoppingCart, Star, Shield, Sparkles, Hash } from "lucide-react";

export default function MusicNFTPage() {
  const [filter, setFilter] = useState("all");
  const rarities = ["all", "common", "uncommon", "rare", "holographic", "gold", "cherry-mythic"];
  const filtered = filter === "all" ? NFT_CARDS : NFT_CARDS.filter((c) => c.rarity === filter);

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(255,215,0,0.12),transparent_50%),radial-gradient(circle_at_60%_100%,rgba(232,121,249,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="mb-2 flex items-center gap-2">
            <Gem size={20} className="text-gold-500" />
            <span className="rounded-lg bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Collectible Cards</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-6xl">Music NFT Cards</h1>
          <p className="mt-2 max-w-2xl text-white/50">Collect, trade, and own pieces of music history. Pokemon-style collectible cards stamped by CherryStim — holographic, gold, and cherry-mythic editions.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {rarities.map((r) => {
            const cfg = r !== "all" ? CARD_RARITY_CONFIG[r] : null;
            return (
              <button key={r} onClick={() => setFilter(r)} className={`rounded-xl px-4 py-2 text-xs font-medium capitalize transition ${filter === r ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/50"}`} style={filter === r && cfg ? { background: `${cfg.color}20`, color: cfg.color } : {}}>
                {r === "all" ? "All Cards" : cfg?.label || r}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => {
            const cfg = CARD_RARITY_CONFIG[card.rarity];
            return (
              <Card key={card.id} className={`glass overflow-hidden transition hover:scale-[1.02] ${cfg.glow}`} style={{ borderColor: `${cfg.color}33` }}>
                <div className="relative flex h-52 items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${cfg.color}15, ${cfg.color}05)` }}>
                  <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 30% 30%, ${cfg.color}40, transparent 60%)` }} />
                  <div className="relative text-center">
                    <p className="text-6xl">🎵</p>
                    <p className="mt-2 text-lg font-bold">{card.artist}</p>
                  </div>
                  <div className="absolute right-3 top-3 rounded-lg px-2 py-0.5 text-[9px] font-bold" style={{ background: `${cfg.color}25`, color: cfg.color }}>{cfg.label}</div>
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-black/40 px-2 py-0.5 text-[9px] text-white/50">
                    <Hash size={8} /> {card.serialNumber}/{card.totalMinted}
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-bold">{card.title}</h3>
                    <Shield size={12} className="text-emerald-400" />
                  </div>
                  <p className="mb-1 text-xs text-white/40">{card.edition}</p>
                  <p className="mb-3 text-xs font-medium" style={{ color: cfg.color }}>{card.artist}</p>
                  <div className="mb-3 space-y-1">
                    {card.features.map((f) => (
                      <div key={f} className="flex items-start gap-1.5 text-[10px] text-white/50">
                        <Sparkles size={9} className="mt-0.5 flex-shrink-0" style={{ color: cfg.color }} /> {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold">${card.price}</p>
                      <p className="text-[10px] text-gold-400">or {card.coinPrice.toLocaleString()} CherryCoins</p>
                    </div>
                    <Button size="sm" onClick={() => toast.success(`🎴 ${card.title} NFT card added to collection!`)}>
                      <ShoppingCart size={12} className="mr-1" /> Collect
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
