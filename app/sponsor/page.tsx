"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { COMPETITION_FUNDING } from "@/lib/studios";
import { Crown, Heart, Star, Sparkles, Trophy, Gift, Zap, Globe, Users, Shield, ChevronRight, DollarSign } from "lucide-react";

const sponsorTiers = [
  { name: "Cherry Supporter", emoji: "🌸", price: "$99/month", color: "#ff9ec4", perks: ["Name on supporter wall", "Exclusive supporter badge", "Monthly competition newsletter", "Vote on 1 competition category"] },
  { name: "Cherry Patron", emoji: "🏅", price: "$499/month", color: "#ffd700", perks: ["All Supporter perks", "Sponsor a specific Cherry's competition entry", "VIP access to monthly award streams", "Name on competition leaderboard sidebar", "Direct message with 3 Cherries/month"] },
  { name: "Cherry Benefactor", emoji: "💎", price: "$2,499/month", color: "#b9f2ff", perks: ["All Patron perks", "Present a competition award on-stream", "Exclusive virtual meet-and-greet (monthly)", "Front-row seat at Cherry Awards ceremony", "Custom branded competition segment", "Choose 1 Cherry for Magazine feature nomination"] },
  { name: "Cherry Titan", emoji: "👑", price: "$9,999/month", color: "#ff0033", perks: ["All Benefactor perks", "Named competition tier (e.g., 'The [Your Name] Cup')", "Private dinner with Top 10 World Cherries (annual)", "CherryStim Gentlemen's Club VIP lifetime membership", "Executive box at all CherryStim live events", "Brand integration in Cherry TV programming", "Equity co-investment opportunity access"] },
];

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1.5">
            <Crown size={16} className="text-gold-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Exclusive Invitation</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-7xl">The Cherry Ecosystem</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/50">
            Behind the streams, behind the stages, behind the glamour — there is an engine. A merit-based ecosystem that identifies, elevates, and rewards the most exceptional performers on the planet. And you can be part of making it happen.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HoloWidget title="Active Competitors" value={1240} icon={<Users size={20} />} color="cherry" />
          <HoloWidget title="Monthly Prize Pool" value="$248K" icon={<Trophy size={20} />} color="gold" />
          <HoloWidget title="Countries Represented" value={52} icon={<Globe size={20} />} color="sky" />
          <HoloWidget title="Lives Changed" value={847} icon={<Heart size={20} />} color="emerald" />
        </div>

        <Card className="glass mb-12 overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="mb-6 text-center text-3xl font-bold">What Is the Cherry Ecosystem?</h2>
            <div className="mx-auto max-w-4xl space-y-4 text-sm text-white/60">
              <p>The Cherry Competition Ecosystem is CherryStim&apos;s proprietary engine for discovering and developing world-class entertainment talent. Think of it as the farm system that professional sports leagues use — but for the digital entertainment era.</p>
              <p>Performers compete across <strong className="text-white">multiple performance categories</strong> — from live streaming excellence to creative content, audience engagement, business development, and financial literacy. Rankings are calculated in real-time across five geographic tiers: city, state, region, country, and worldwide.</p>
              <p>Top performers don&apos;t just win bragging rights. The ecosystem funds <strong className="text-white">real, life-changing rewards</strong>: professional development, career opportunities, financial support, and pathways to CherryStim&apos;s expanding portfolio of physical venues, media properties, and entertainment brands.</p>
              <p className="text-white/40">The specifics of how performers are ranked, what metrics drive the algorithm, and what the highest tiers unlock — that&apos;s proprietary. What we can tell you: <strong className="text-white/70">the system is transparent to performers, merit-based, and designed to create generational wealth for those who earn it.</strong></p>
            </div>
          </div>
        </Card>

        <h2 className="mb-2 text-center text-2xl font-bold">How the Ecosystem Is Funded</h2>
        <p className="mb-8 text-center text-sm text-white/40">Every transaction on CherryStim contributes to the ecosystem that elevates performers</p>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(COMPETITION_FUNDING).map((fund) => (
            <Card key={fund.label} className="glass p-5">
              <div className="mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-400" />
                <span className="text-sm font-semibold">{fund.label}</span>
              </div>
              <p className="text-xs text-white/50">{fund.description}</p>
              {fund.rate && (
                <div className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-center">
                  <span className="text-lg font-bold text-emerald-400">{(fund.rate * 100).toFixed(1)}%</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold">Become a Sponsor</h2>
        <p className="mb-8 text-center text-sm text-white/40">Fuel the ecosystem. Elevate talent. Get unparalleled access.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sponsorTiers.map((tier) => (
            <Card key={tier.name} className="glass overflow-hidden transition hover:scale-[1.01]" style={{ borderColor: `${tier.color}22` }}>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{tier.emoji}</span>
                    <div>
                      <h3 className="font-bold" style={{ color: tier.color }}>{tier.name}</h3>
                      <p className="text-xs text-white/40">{tier.price}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {tier.perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-2 text-xs">
                      <Sparkles size={11} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      <span className="text-white/60">{perk}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" style={{ background: `${tier.color}33`, color: tier.color }}>Become a {tier.name}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
