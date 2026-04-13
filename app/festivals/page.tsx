"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FESTIVALS } from "@/lib/music";
import { Music, MapPin, Calendar, Users, Star, Ticket, Crown, Sparkles } from "lucide-react";

const seasonEmoji = { "spring-break": "🌴", "summer": "☀️", "winter-break": "❄️", "nye": "🎆" };
const seasonLabel = { "spring-break": "Spring Break", "summer": "Summer", "winter-break": "Winter Break", "nye": "New Year's Eve" };
const statusStyle = { "announced": "bg-sky-500/15 text-sky-400", "on-sale": "bg-emerald-500/15 text-emerald-400", "sold-out": "bg-cherry-500/15 text-cherry-500", "coming-soon": "bg-gold-500/15 text-gold-400" };

export default function FestivalsPage() {
  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,0,51,0.15),transparent_50%),radial-gradient(circle_at_70%_0%,rgba(255,215,0,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cherry-500/10 px-4 py-1.5">
            <Music size={16} className="text-cherry-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cherry-500">Live Events</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-7xl">CherryStim Festivals</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/50">Where music meets immersive entertainment. Spring Break, Summer, Winter, and New Year&apos;s Eve — CherryStim-themed festivals featuring the world&apos;s biggest artists and top Cherry performers.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FESTIVALS.map((fest) => (
            <Card key={fest.id} className="glass overflow-hidden transition hover:scale-[1.01]">
              <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,0,51,0.15), rgba(255,215,0,0.1), rgba(139,92,246,0.1))" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">{seasonEmoji[fest.season]}</span>
                </div>
                <div className="absolute left-4 top-4">
                  <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase ${statusStyle[fest.status]}`}>{fest.status.replace("-", " ")}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold">{fest.name}</h2>
                  <p className="text-sm text-white/60">{seasonLabel[fest.season]} • {fest.city}, {fest.country}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-white/[0.03] p-2"><Calendar size={14} className="mx-auto mb-1 text-white/40" /><p className="text-[10px] text-white/40">Date</p><p className="text-xs font-medium">{fest.date}</p></div>
                  <div className="rounded-xl bg-white/[0.03] p-2"><Users size={14} className="mx-auto mb-1 text-white/40" /><p className="text-[10px] text-white/40">Capacity</p><p className="text-xs font-medium">{fest.capacity.toLocaleString()}</p></div>
                  <div className="rounded-xl bg-white/[0.03] p-2"><Ticket size={14} className="mx-auto mb-1 text-white/40" /><p className="text-[10px] text-white/40">From</p><p className="text-xs font-medium">${fest.ticketPrice}</p></div>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">Headliners</p>
                  <div className="flex flex-wrap gap-1.5">{fest.headliners.map((h) => <span key={h} className="rounded-lg bg-cherry-500/10 px-2 py-0.5 text-xs text-cherry-500">{h}</span>)}</div>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">Sponsors</p>
                  <div className="flex flex-wrap gap-1.5">{fest.sponsors.map((s) => <span key={s} className="rounded-lg bg-gold-500/10 px-2 py-0.5 text-xs text-gold-400">{s}</span>)}</div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" disabled={fest.status === "coming-soon" || fest.status === "sold-out"}><Ticket size={14} className="mr-1" /> GA ${fest.ticketPrice}</Button>
                  <Button variant="outline" className="flex-1 border-gold-500/30 text-gold-400" disabled={fest.status === "coming-soon" || fest.status === "sold-out"}><Crown size={14} className="mr-1" /> VIP ${fest.vipPrice}</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
