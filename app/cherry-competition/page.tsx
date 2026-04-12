"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { type GeographicTier, type RankedCherry, SAMPLE_CHERRIES, ELITE_CONFIG } from "@/lib/rankings";
import { Trophy, Globe, MapPin, Crown, Flame, Star, Medal, Award, TrendingUp, Zap, Users, Eye, ChevronRight, Shield, Sparkles } from "lucide-react";

const TIER_CONFIG: Record<GeographicTier, { label: string; icon: React.ReactNode; color: string }> = {
  city: { label: "City", icon: <MapPin size={16} />, color: "text-sky-400" },
  state: { label: "State / Province", icon: <MapPin size={16} />, color: "text-emerald-400" },
  region: { label: "Region", icon: <Globe size={16} />, color: "text-violet-400" },
  country: { label: "Country", icon: <Globe size={16} />, color: "text-gold-400" },
  world: { label: "Worldwide", icon: <Crown size={16} />, color: "text-cherry-500" }
};

const rankMedals = ["🥇", "🥈", "🥉"];

function MetricPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-2.5 py-1">
      <p className="text-[9px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="text-sm font-semibold">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  );
}

export default function CherryCompetitionPage() {
  const [geoTier, setGeoTier] = useState<GeographicTier>("world");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...SAMPLE_CHERRIES].sort((a, b) => a.rank[geoTier] - b.rank[geoTier]);
  }, [geoTier]);

  const topCherry = sorted[0];

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,0,51,0.15),transparent_50%),radial-gradient(circle_at_70%_0%,rgba(255,215,0,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Flame size={24} className="text-cherry-500" />
                <span className="rounded-lg bg-cherry-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cherry-500">Live Competition</span>
              </div>
              <h1 className="cherry-text font-display text-5xl md:text-6xl">Cherry Rankings</h1>
              <p className="mt-2 text-white/50">The global leaderboard. Where legends are made and empires are built.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <HoloWidget title="Total Cherries" value={SAMPLE_CHERRIES.length * 124} icon={<Users size={16} />} color="cherry" className="!p-4" />
              <HoloWidget title="Prize Pool" value="$2.4M" icon={<Trophy size={16} />} color="gold" className="!p-4" />
              <HoloWidget title="Countries" value={52} icon={<Globe size={16} />} color="sky" className="!p-4" />
              <HoloWidget title="Active Now" value={847} icon={<Zap size={16} />} color="emerald" className="!p-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-medium text-white/40">VIEW BY:</span>
          {(Object.entries(TIER_CONFIG) as [GeographicTier, typeof TIER_CONFIG.city][]).map(([key, cfg]) => (
            <button key={key} onClick={() => setGeoTier(key)} className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition ${geoTier === key ? "bg-cherry-500/20 text-cherry-500 shadow-[0_0_15px_rgba(255,0,51,0.15)]" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              {cfg.icon} {cfg.label}
            </button>
          ))}
        </div>

        {topCherry && (
          <Card className="relative mb-8 overflow-hidden rounded-3xl border-gold-500/30 bg-gradient-to-r from-black/80 via-gold-500/[0.06] to-black/80 p-8">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cherry-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-cherry-500 text-4xl font-black text-black">{topCherry.avatar}</div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Crown size={20} className="text-gold-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Reigning #{geoTier === "world" ? "Global" : TIER_CONFIG[geoTier].label} Champion</span>
                </div>
                <h2 className="text-3xl font-bold">{topCherry.name}</h2>
                <p className="text-white/50">{topCherry.city}, {topCherry.country} • {topCherry.eliteStatus} • {topCherry.streakDays}-day streak 🔥</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topCherry.badges.map((b) => <span key={b} className="rounded-lg bg-gold-500/15 px-2 py-0.5 text-[10px] font-medium text-gold-400">{b}</span>)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-gold-400">{topCherry.totalScore.toLocaleString()}</p>
                <p className="text-xs text-white/40">Total Cherry Score</p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {sorted.map((cherry, idx) => {
            const isExpanded = expanded === cherry.id;
            const eliteCfg = ELITE_CONFIG[cherry.eliteStatus];
            const rank = cherry.rank[geoTier];

            return (
              <Card key={cherry.id} className={`glass overflow-hidden transition-all ${rank <= 3 ? "border-gold-500/20 shadow-[0_0_20px_rgba(255,215,0,0.05)]" : ""}`}>
                <button onClick={() => setExpanded(isExpanded ? null : cherry.id)} className="flex w-full items-center gap-4 px-6 py-4 text-left">
                  <div className="flex w-10 items-center justify-center text-lg font-black">
                    {rank <= 3 ? rankMedals[rank - 1] : <span className="text-white/30">#{rank}</span>}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold" style={{ background: `linear-gradient(135deg, ${eliteCfg.color}33, ${eliteCfg.color}11)`, color: eliteCfg.color }}>{cherry.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cherry.name}</span>
                      {cherry.verified && <Shield size={12} className="text-sky-400" />}
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ background: `${eliteCfg.color}20`, color: eliteCfg.color }}>{cherry.eliteStatus}</span>
                    </div>
                    <p className="text-xs text-white/40">{cherry.city}, {cherry.country} • {cherry.tier} • 🔥 {cherry.streakDays}d streak</p>
                  </div>
                  <div className="hidden gap-3 md:flex">
                    <MetricPill label="Cash" value={`$${(cherry.metrics.appCash / 1000).toFixed(1)}K`} />
                    <MetricPill label="Crushes" value={cherry.metrics.crushes} />
                    <MetricPill label="NFTs" value={`$${(cherry.metrics.nftRevenue / 1000).toFixed(1)}K`} />
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{cherry.totalScore.toLocaleString()}</p>
                    <p className="text-[10px] text-white/30">Cherry Score</p>
                  </div>
                  <ChevronRight size={16} className={`text-white/30 transition ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-white/5 bg-white/[0.01] px-6 py-5">
                    <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-5">
                      <div className="text-center"><p className="text-[10px] text-white/30">City Rank</p><p className="text-lg font-bold">#{cherry.rank.city}</p></div>
                      <div className="text-center"><p className="text-[10px] text-white/30">State Rank</p><p className="text-lg font-bold">#{cherry.rank.state}</p></div>
                      <div className="text-center"><p className="text-[10px] text-white/30">Region Rank</p><p className="text-lg font-bold">#{cherry.rank.region}</p></div>
                      <div className="text-center"><p className="text-[10px] text-white/30">Country Rank</p><p className="text-lg font-bold">#{cherry.rank.country}</p></div>
                      <div className="text-center"><p className="text-[10px] text-white/30">World Rank</p><p className="text-lg font-bold text-gold-400">#{cherry.rank.world}</p></div>
                    </div>

                    <h4 className="mb-2 text-xs font-semibold text-white/50">Performance Breakdown</h4>
                    <div className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-6">
                      <MetricPill label="App Cash" value={`$${cherry.metrics.appCash.toLocaleString()}`} />
                      <MetricPill label="NFT Revenue" value={`$${cherry.metrics.nftRevenue.toLocaleString()}`} />
                      <MetricPill label="Wish Campaigns" value={cherry.metrics.wishCampaigns} />
                      <MetricPill label="Acting Gigs" value={cherry.metrics.actingGigs} />
                      <MetricPill label="Modeling Gigs" value={cherry.metrics.modelingGigs} />
                      <MetricPill label="Print Gigs" value={cherry.metrics.printGigs} />
                      <MetricPill label="Crushes" value={cherry.metrics.crushes} />
                      <MetricPill label="Sprungs" value={cherry.metrics.sprungs} />
                      <MetricPill label="Stream Hours" value={cherry.metrics.streamHours} />
                      <MetricPill label="Peak Viewers" value={cherry.metrics.viewerPeak} />
                      <MetricPill label="Gifts" value={cherry.metrics.giftsReceived} />
                      <MetricPill label="Tips Total" value={`$${cherry.metrics.tipsTotal.toLocaleString()}`} />
                      <MetricPill label="Immersive" value={cherry.metrics.immersiveSessions} />
                      <MetricPill label="VR Sessions" value={cherry.metrics.vrSessions} />
                      <MetricPill label="Private" value={cherry.metrics.privateSessions} />
                      <MetricPill label="Repeat Clients" value={cherry.metrics.repeatClients} />
                      <MetricPill label="Academy XP" value={cherry.metrics.academyXP} />
                      <MetricPill label="Engagement" value={`${cherry.metrics.engagementScore}%`} />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cherry.badges.map((b) => <span key={b} className="rounded-lg bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-400">{b}</span>)}
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
