"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STUDIO_LOCATIONS, CUBICLE_SPECS } from "@/lib/studios";
import { Building2, MapPin, Wifi, Camera, Headphones, Monitor, Bed, Zap, Sparkles, Globe, ChevronRight, Shield } from "lucide-react";

const statusColors = { "open": "bg-emerald-500/15 text-emerald-400", "coming-2026": "bg-sky-500/15 text-sky-400", "coming-2027": "bg-violet-500/15 text-violet-400", "coming-2028": "bg-gold-500/15 text-gold-400" };
const statusLabels = { "open": "NOW OPEN", "coming-2026": "COMING 2026", "coming-2027": "COMING 2027", "coming-2028": "COMING 2028" };

export default function StudiosPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const openCount = STUDIO_LOCATIONS.filter((s) => s.status === "open").length;
  const totalCubicles = STUDIO_LOCATIONS.reduce((s, l) => s + l.cubicles, 0);

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(139,92,246,0.12),transparent_50%),radial-gradient(circle_at_70%_100%,rgba(255,0,51,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5">
            <Building2 size={16} className="text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Physical Infrastructure</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-6xl">CherryStim Studios</h1>
          <p className="mt-3 max-w-3xl text-white/50">Massive interactive warehouse facilities in select cities worldwide. 300+ soundproof broadcast cubicles per location, each equipped with professional-grade VR, 3D, immersive technology, stripper poles, California King beds, and haptic integration.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-xl bg-white/5 px-4 py-2"><strong className="text-emerald-400">{openCount}</strong> Open Now</span>
            <span className="rounded-xl bg-white/5 px-4 py-2"><strong className="text-violet-400">{STUDIO_LOCATIONS.length}</strong> Total Locations</span>
            <span className="rounded-xl bg-white/5 px-4 py-2"><strong className="text-gold-400">{totalCubicles.toLocaleString()}</strong> Broadcast Cubicles</span>
            <span className="rounded-xl bg-white/5 px-4 py-2"><strong className="text-cherry-500">14</strong> Countries</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <h2 className="mb-6 text-2xl font-bold">Individual Broadcast Cubicle Specifications</h2>
        <Card className="glass mb-10 overflow-hidden">
          <div className="grid grid-cols-1 gap-0 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0">
            {[
              { icon: <Building2 size={16} />, label: "Dimensions", value: CUBICLE_SPECS.dimensions },
              { icon: <Zap size={16} />, label: "Stripper Pole", value: CUBICLE_SPECS.pole },
              { icon: <Monitor size={16} />, label: "Green/Blue Screen", value: CUBICLE_SPECS.screens },
              { icon: <Camera size={16} />, label: "Camera Array", value: CUBICLE_SPECS.cameras },
              { icon: <Sparkles size={16} />, label: "VR & Motion Capture", value: CUBICLE_SPECS.vr },
              { icon: <Shield size={16} />, label: "Haptic Integration", value: CUBICLE_SPECS.immersive },
              { icon: <Headphones size={16} />, label: "Audio & Soundproofing", value: CUBICLE_SPECS.audio },
              { icon: <Sparkles size={16} />, label: "Lighting", value: CUBICLE_SPECS.lighting },
              { icon: <Bed size={16} />, label: "California King Bed", value: CUBICLE_SPECS.bed },
              { icon: <Wifi size={16} />, label: "Streaming Infrastructure", value: CUBICLE_SPECS.streaming },
            ].map((spec) => (
              <div key={spec.label} className="flex gap-3 p-4">
                <div className="mt-0.5 flex-shrink-0 text-violet-400">{spec.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-white/70">{spec.label}</p>
                  <p className="text-xs text-white/40">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <h2 className="mb-6 text-2xl font-bold">Global Studio Network</h2>
        <div className="space-y-4">
          {STUDIO_LOCATIONS.map((studio) => (
            <Card key={studio.id} className={`glass overflow-hidden transition ${studio.status === "open" ? "border-emerald-500/20" : ""}`}>
              <button onClick={() => setExpanded(expanded === studio.id ? null : studio.id)} className="flex w-full items-center gap-4 px-6 py-5 text-left">
                <span className="text-3xl">{studio.flagEmoji}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">{studio.name}</h3>
                    <span className={`rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase ${statusColors[studio.status]}`}>{statusLabels[studio.status]}</span>
                  </div>
                  <p className="text-sm text-white/40">{studio.city}, {studio.country} • {studio.region}</p>
                </div>
                <div className="hidden gap-6 text-center md:flex">
                  <div><p className="text-lg font-bold">{studio.cubicles}</p><p className="text-[10px] text-white/30">Cubicles</p></div>
                  <div><p className="text-lg font-bold">{(studio.sqft / 1000).toFixed(0)}K</p><p className="text-[10px] text-white/30">Sq Ft</p></div>
                </div>
                <ChevronRight size={16} className={`text-white/30 transition ${expanded === studio.id ? "rotate-90" : ""}`} />
              </button>
              {expanded === studio.id && (
                <div className="border-t border-white/5 bg-white/[0.01] px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {studio.features.map((f) => (
                      <span key={f} className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs text-violet-400">{f}</span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
                    <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-[10px] text-white/30">Broadcast Cubicles</p><p className="text-xl font-bold">{studio.cubicles}</p></div>
                    <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-[10px] text-white/30">Total Area</p><p className="text-xl font-bold">{studio.sqft.toLocaleString()} sq ft</p></div>
                    <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-[10px] text-white/30">Status</p><p className="text-xl font-bold">{statusLabels[studio.status]}</p></div>
                    <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-[10px] text-white/30">Region</p><p className="text-xl font-bold">{studio.region}</p></div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
