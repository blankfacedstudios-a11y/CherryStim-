"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ELITE_CONFIG, type EliteStatus } from "@/lib/rankings";
import { Crown, Tv, BookOpen, Globe, Star, Sparkles, Building2, Gamepad2, Camera, Mic, Trophy, Shield, Gem, Zap, Play, Users, Eye, Lock, ChevronRight } from "lucide-react";

const EMPIRE_PILLARS = [
  {
    id: "magazine",
    title: "CherryStim Magazine",
    icon: <BookOpen size={28} />,
    description: "The premier luxury lifestyle and entertainment publication. Monthly print + digital edition featuring top Cherries, fashion editorials, exclusive interviews, and the Cherry lifestyle.",
    features: ["Monthly cover star (Cherry Crown+ only)", "Editorial features for Cherry Diamond+", "Fashion & lifestyle spreads", "Exclusive interview series", "Digital + print distribution worldwide", "Permanent column for Cherry Immortals"],
    minStatus: "Cherry Diamond" as EliteStatus,
    color: "#ff9ec4",
    stats: { label: "Monthly Readership", value: "2.4M" }
  },
  {
    id: "tv",
    title: "CherryStim Television",
    icon: <Tv size={28} />,
    description: "24/7 streaming television channel showcasing the best of CherryStim entertainment. Reality competitions, behind-the-scenes, dance showcases, and exclusive live events.",
    features: ["Reality competition series — 'Top Cherry'", "Behind-the-scenes documentary series", "Live event broadcasts from global venues", "Cherry Crown+ casting priority", "Executive producer credit for Immortals", "International syndication deals"],
    minStatus: "Cherry Diamond" as EliteStatus,
    color: "#ffd700",
    stats: { label: "24/7 Viewers", value: "890K" }
  },
  {
    id: "youtube",
    title: "CherryStim YouTube & Rumble",
    icon: <Play size={28} />,
    description: "Multi-channel network across YouTube and Rumble. Highlights, tutorials, vlogs, and exclusive behind-the-scenes content. Revenue-shared with featured Cherries.",
    features: ["Featured spotlight videos for Cherry Gold+", "Dedicated channel for Cherry Crown+", "Revenue sharing (60/40 performer/platform)", "Shorts & Reels viral content team", "Co-ownership channel for Cherry Immortals", "Rumble exclusive premium content"],
    minStatus: "Cherry Gold" as EliteStatus,
    color: "#ff0033",
    stats: { label: "Subscribers", value: "4.8M" }
  },
  {
    id: "virtual-club",
    title: "Exclusive Virtual Strip Club",
    icon: <Gamepad2 size={28} />,
    description: "The world's most exclusive virtual entertainment venue. Full 3D immersive environment with VR headset support. Private rooms, bottle service, live performances, and NFT collectibles. Virtuoso clientele only.",
    features: ["3D / 2D / Immersive / VR modes", "Virtuoso-only client access ($500/mo)", "Private champagne rooms with haptic feedback", "Live NFT minting during performances", "Virtual bottle service & gift economy", "Exclusive avatar customization", "High-stakes tip tournaments"],
    minStatus: "Cherry Diamond" as EliteStatus,
    color: "#8b5cf6",
    stats: { label: "Peak Concurrent", value: "12K" }
  },
  {
    id: "clubs",
    title: "Real-Life Gentlemen's Clubs",
    icon: <Building2 size={28} />,
    description: "The CherryStim physical venue empire. Futuristic, luxury gentlemen's clubs in major cities worldwide. Holographic stages, immersive rooms, VIP lounges, and casino integration. Only TOP Cherries from the platform perform here.",
    features: ["Las Vegas flagship — CherryStim Grand (2026)", "Miami Beach — CherryStim Ocean (2026)", "Dubai — CherryStim Gold (2027)", "Tokyo — CherryStim Sakura (2027)", "London — CherryStim Royal (2027)", "Holographic stage technology", "VIP bottle service starting at $2,500", "Casino floor integration with CherryCoin"],
    minStatus: "Cherry Crown" as EliteStatus,
    color: "#10b981",
    stats: { label: "Planned Venues", value: "12" }
  },
  {
    id: "casino",
    title: "CherryStim Casino & Resort",
    icon: <Gem size={28} />,
    description: "The crown jewel. Full-scale casino resort featuring CherryCoin gambling, live Cherry performances, immersive VR gaming floors, luxury suites, and world-class dining. Cherry Immortals get residency headliner status.",
    features: ["CherryCoin-powered gaming tables", "Live Cherry performance stage", "Immersive VR gaming floor", "Luxury penthouse suites", "Michelin-star dining by Cherry chefs", "Cherry Immortal residency program", "Annual Cherry Awards ceremony venue", "World Series of Cherry Poker"],
    minStatus: "Cherry Immortal" as EliteStatus,
    color: "#ffd700",
    stats: { label: "Resort Investment", value: "$180M" }
  }
];

const statusOrder: EliteStatus[] = ["Cherry Blossom", "Cherry Gold", "Cherry Diamond", "Cherry Crown", "Cherry Immortal"];

export default function CherryElitePage() {
  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.12),transparent_50%),radial-gradient(circle_at_20%_100%,rgba(255,0,51,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1.5">
            <Crown size={16} className="text-gold-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">The CherryStim Empire</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-7xl">Cherry Elite</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/50">
            From pixels to penthouses. The CherryStim pipeline transforms top-performing digital artists into real-world entertainment moguls. Every ranking, every metric, every performance builds toward something bigger.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <h2 className="mb-6 text-center text-2xl font-bold">Elite Status Tiers</h2>
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-5">
          {statusOrder.map((status) => {
            const cfg = ELITE_CONFIG[status];
            return (
              <Card key={status} className="glass overflow-hidden text-center transition hover:scale-[1.02]" style={{ borderColor: `${cfg.color}33` }}>
                <div className="p-5">
                  <div className="mb-2 text-3xl">{status === "Cherry Immortal" ? "👑" : status === "Cherry Crown" ? "💎" : status === "Cherry Diamond" ? "💠" : status === "Cherry Gold" ? "🏅" : "🌸"}</div>
                  <h3 className="text-sm font-bold" style={{ color: cfg.color }}>{status}</h3>
                  <p className="mt-1 text-[10px] text-white/40">{status === "Cherry Immortal" ? "Top 1% worldwide" : status === "Cherry Crown" ? "Top 5%" : status === "Cherry Diamond" ? "Top 15%" : status === "Cherry Gold" ? "Top 35%" : "All Cherries"}</p>
                </div>
                <div className="border-t border-white/5 px-4 py-3">
                  <p className="text-[10px] text-white/40">{cfg.perks.length} perks • {cfg.unlocks.length} unlocks</p>
                </div>
              </Card>
            );
          })}
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold">The Empire Pipeline</h2>
        <p className="mb-8 text-center text-sm text-white/40">Where top Cherry rankings unlock real-world opportunities</p>

        <div className="space-y-6">
          {EMPIRE_PILLARS.map((pillar) => {
            const eliteCfg = ELITE_CONFIG[pillar.minStatus];
            return (
              <Card key={pillar.id} className="glass overflow-hidden" style={{ borderColor: `${pillar.color}22` }}>
                <div className="flex flex-col gap-6 p-8 lg:flex-row">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl" style={{ background: `${pillar.color}15`, color: pillar.color }}>
                    {pillar.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">{pillar.title}</h3>
                      <span className="rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{ background: `${eliteCfg.color}20`, color: eliteCfg.color }}>
                        {pillar.minStatus}+ Required
                      </span>
                      <span className="rounded-lg bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{pillar.stats.label}: {pillar.stats.value}</span>
                    </div>
                    <p className="mb-4 text-sm text-white/60">{pillar.description}</p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {pillar.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs">
                          <Sparkles size={12} className="mt-0.5 flex-shrink-0" style={{ color: pillar.color }} />
                          <span className="text-white/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="glass mt-12 overflow-hidden border-gold-500/20">
          <div className="bg-gradient-to-r from-gold-500/10 to-cherry-500/10 p-8 text-center">
            <Crown size={32} className="mx-auto mb-3 text-gold-500" />
            <h2 className="text-2xl font-bold">The CherryStim Vision</h2>
            <p className="mx-auto mt-3 max-w-4xl text-sm text-white/60">
              CherryStim is not just a streaming platform — it is a vertically-integrated entertainment empire. Every view, every tip, every NFT, every private session feeds into a single ranking engine that automatically identifies, elevates, and rewards the best performers on the planet. From their first stream to headlining a Vegas residency, the pipeline is automated, transparent, and merit-based.
            </p>
            <p className="mx-auto mt-4 max-w-4xl text-sm text-white/60">
              Top Cherries do not just earn money — they build empires. Magazine features turn into TV deals. TV deals turn into global brand ambassadorships. Brand deals fund real-life venue appearances. Venue headliners become equity partners. Equity partners shape the future of the platform. The Cherry flywheel never stops spinning.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="px-8"><Trophy className="mr-2" size={16} /> View Rankings</Button>
              <Button size="lg" variant="outline" className="px-8"><Star className="mr-2" size={16} /> Start Competing</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
