"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CARD_PROGRAMS, LAUNCH_ROADMAP, CARD_ISSUING_PARTNERS, type CardTier } from "@/lib/fincard";
import { CreditCard, Shield, TrendingUp, CheckCircle, Globe, Banknote, ChevronDown, ChevronUp } from "lucide-react";

export default function CardProgramPage() {
  const [expandedRoadmap, setExpandedRoadmap] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardTier>("cherry");

  const cardColors: Record<CardTier, string> = {
    cherry: "from-gray-900 to-gray-800 border-cherry-500/40",
    cherry_gold: "from-amber-900/80 to-gray-900 border-gold-500/40",
    cherry_black: "from-black to-gray-900 border-white/20"
  };

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <CreditCard className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">CherryStim Card</h1>
          </div>
          <p className="max-w-2xl text-white/60">
            Premium metal debit card with credit-building, direct deposit, and cashback. Heavy black-card feel, shipped to your door.
          </p>
        </header>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {(Object.keys(CARD_PROGRAMS) as CardTier[]).map((tier) => {
            const card = CARD_PROGRAMS[tier];
            const active = selectedCard === tier;
            return (
              <div
                key={tier}
                onClick={() => setSelectedCard(tier)}
                className={`cursor-pointer rounded-3xl border-2 bg-gradient-to-br p-6 transition-all hover:-translate-y-1 ${cardColors[tier]} ${active ? "shadow-glow scale-[1.02]" : "opacity-80"}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{card.name}</h3>
                  <span className="text-2xl font-bold text-emerald-400">{card.cashbackPercent}%</span>
                </div>
                <p className="mb-2 text-xs text-white/40">{card.material}</p>
                <p className="mb-4 text-xs text-white/40">Weight: {card.weight}</p>

                <div className="mb-4 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-emerald-400"><Banknote size={14} /> {card.monthlyFee === 0 ? "Free" : `$${card.monthlyFee}/mo`}</span>
                  <span className="flex items-center gap-1 text-gold-400"><TrendingUp size={14} /> Credit Build</span>
                  <span className="flex items-center gap-1 text-sky-400"><Globe size={14} /> Global</span>
                </div>

                <ul className="space-y-1.5">
                  {card.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                  {card.features.length > 5 && (
                    <li className="text-xs text-white/40">+{card.features.length - 5} more features</li>
                  )}
                </ul>

                <Button className="mt-4 w-full" size="sm" variant={active ? "default" : "outline"}>
                  {active ? "Selected" : "Select This Card"}
                </Button>
              </div>
            );
          })}
        </div>

        <Card className="glass mb-8 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-gold-500" size={22} />
              <h2 className="text-2xl font-semibold">Credit Building</h2>
            </div>
          </div>
          <p className="mb-4 text-sm text-white/60">
            Every on-time payment reported to <span className="font-semibold text-white/80">Equifax, Experian, and TransUnion</span>. Build your credit score while earning on CherryStim. Our card program uses Metro 2 format — the industry standard for credit bureau reporting.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {["Equifax", "Experian", "TransUnion"].map((bureau) => (
              <div key={bureau} className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
                <p className="font-semibold">{bureau}</p>
                <p className="text-xs text-emerald-400">Reported monthly</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass mb-8 p-6">
          <button
            onClick={() => setExpandedRoadmap(!expandedRoadmap)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="text-2xl font-semibold">Launch Roadmap ({LAUNCH_ROADMAP.length} Steps)</h2>
            {expandedRoadmap ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedRoadmap && (
            <div className="mt-6 space-y-4">
              {LAUNCH_ROADMAP.map((step) => (
                <div key={step.step} className="flex gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry-500/20 text-sm font-bold text-cherry-400">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mb-2 text-xs text-white/60">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-400">{step.timeline}</span>
                      {step.dependencies.map((d, i) => (
                        <span key={i} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="glass p-6">
          <h2 className="mb-4 text-2xl font-semibold">Issuing Partners</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {CARD_ISSUING_PARTNERS.map((partner) => (
              <div key={partner.name} className={`rounded-xl border p-4 ${partner.recommended ? "border-gold-500/30 bg-gold-500/5" : "border-white/10 bg-black/30"}`}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{partner.name}</h3>
                  {partner.recommended && <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] text-gold-400">Recommended</span>}
                </div>
                <p className="mb-2 text-xs text-white/40">{partner.region} • {partner.type}</p>
                <ul className="space-y-1">
                  {partner.capabilities.slice(0, 3).map((c, i) => (
                    <li key={i} className="text-[11px] text-white/50">• {c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
