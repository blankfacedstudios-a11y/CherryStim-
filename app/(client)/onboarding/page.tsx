"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CLIENT_TIERS, type ClientTier } from "@/lib/tiers";
import { CARD_PROGRAMS, type CardTier } from "@/lib/fincard";
import { getClientPackageItems, estimateClientPackageCost, type ClientGender } from "@/lib/client-package";
import { FRAGRANCE_OPTIONS, APPAREL_SIZES, type ApparelSize } from "@/lib/onboarding";
import { Gift, CreditCard, CheckCircle, Circle, ChevronRight, Package, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ClientStep = "gender" | "tier" | "card" | "shipping" | "fragrance" | "robe_size" | "review" | "confirm";

const ALL_STEPS: { id: ClientStep; label: string; minTier: ClientTier | null }[] = [
  { id: "gender", label: "About You", minTier: null },
  { id: "tier", label: "Select Tier", minTier: null },
  { id: "card", label: "CherryStim Card", minTier: null },
  { id: "shipping", label: "Shipping Address", minTier: null },
  { id: "fragrance", label: "Fragrance", minTier: "sprung" },
  { id: "robe_size", label: "Robe Size", minTier: "platinum" },
  { id: "review", label: "Review", minTier: null },
  { id: "confirm", label: "Confirm Order", minTier: null }
];

export default function ClientOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Set<ClientStep>>(new Set());

  const [gender, setGender] = useState<ClientGender | null>(null);
  const [tier, setTier] = useState<ClientTier | null>(null);
  const [cardTier, setCardTier] = useState<CardTier | null>(null);
  const [fragranceId, setFragranceId] = useState<string | null>(null);
  const [robeSize, setRobeSize] = useState<ApparelSize | null>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const tierOrder: ClientTier[] = ["basic", "crush", "sprung", "vip", "platinum"];
  const steps = ALL_STEPS.filter((s) => {
    if (!s.minTier) return true;
    if (!tier) return false;
    return tierOrder.indexOf(tier) >= tierOrder.indexOf(s.minTier);
  });

  const current = steps[currentStep];
  const progress = steps.length > 0 ? Math.round((completed.size / steps.length) * 100) : 0;

  function goNext() {
    if (current) setCompleted((prev) => new Set([...prev, current.id]));
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  }

  function handleOrder() {
    if (current) setCompleted((prev) => new Set([...prev, current.id]));
    toast.success("Welcome package order placed! Check your order tracking.");
    router.push("/order-tracking");
  }

  const packageItems = tier && gender ? getClientPackageItems(tier, gender) : [];
  const cost = tier && gender ? estimateClientPackageCost(tier, gender) : { min: 0, max: 0 };

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Gift className="text-cherry-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Client Welcome Setup</h1>
          </div>
          <p className="text-white/60">Customize your CherryStim welcome package and card.</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-3 flex-1 rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-medium text-gold-400">{progress}%</span>
          </div>
        </header>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const done = completed.has(step.id);
            const active = i === currentStep;
            return (
              <button key={step.id} onClick={() => setCurrentStep(i)} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${active ? "bg-cherry-500/20 text-cherry-400" : done ? "bg-emerald-500/10 text-emerald-400" : "text-white/30"}`}>
                {done ? <CheckCircle size={14} /> : <Circle size={14} />}
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </div>

        {current && (
          <Card className="glass p-6 md:p-8">
            <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/40">Step {currentStep + 1} of {steps.length}</p>
            <h2 className="mb-6 text-2xl font-semibold">{current.label}</h2>

            {current.id === "gender" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {([{ v: "female" as ClientGender, l: "Female", icon: "👩" }, { v: "male" as ClientGender, l: "Male", icon: "👨" }, { v: "non_binary" as ClientGender, l: "Non-Binary", icon: "🧑" }]).map((opt) => (
                  <button key={opt.v} onClick={() => setGender(opt.v)} className={`rounded-2xl border-2 p-6 text-center transition ${gender === opt.v ? "border-cherry-500 bg-cherry-500/10" : "border-white/10"}`}>
                    <p className="mb-2 text-3xl">{opt.icon}</p>
                    <p className="font-semibold">{opt.l}</p>
                  </button>
                ))}
              </div>
            )}

            {current.id === "tier" && (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {(Object.keys(CLIENT_TIERS) as ClientTier[]).map((t) => (
                  <button key={t} onClick={() => setTier(t)} className={`rounded-2xl border-2 p-4 text-left transition ${tier === t ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    <p className="font-semibold">{CLIENT_TIERS[t].label}</p>
                    <p className="text-xs text-white/40">Rank {CLIENT_TIERS[t].rank}</p>
                  </button>
                ))}
              </div>
            )}

            {current.id === "card" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(CARD_PROGRAMS) as CardTier[]).map((ct) => {
                  const card = CARD_PROGRAMS[ct];
                  return (
                    <button key={ct} onClick={() => setCardTier(ct)} className={`rounded-2xl border-2 p-4 text-left transition ${cardTier === ct ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                      <div className="flex items-center gap-2"><CreditCard size={16} className="text-gold-500" /><p className="font-semibold">{card.name}</p></div>
                      <p className="mt-1 text-xs text-white/40">{card.weight} • {card.monthlyFee === 0 ? "Free" : `$${card.monthlyFee}/mo`} • {card.cashbackPercent}% back</p>
                    </button>
                  );
                })}
              </div>
            )}

            {current.id === "shipping" && (
              <div className="space-y-3">
                <input type="text" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                  <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                </div>
                <input type="text" placeholder="ZIP code" value={zip} onChange={(e) => setZip(e.target.value)} className="w-1/2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
              </div>
            )}

            {current.id === "fragrance" && (
              <div className="grid gap-3">
                {FRAGRANCE_OPTIONS.map((frag) => (
                  <button key={frag.id} onClick={() => setFragranceId(frag.id)} className={`rounded-2xl border-2 p-4 text-left transition ${fragranceId === frag.id ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    <p className="font-semibold">{frag.name}</p>
                    <p className="text-xs text-gold-400">{frag.house}</p>
                    <p className="mt-1 text-xs text-white/40">Notes: {frag.notes}</p>
                  </button>
                ))}
              </div>
            )}

            {current.id === "robe_size" && (
              <div className="flex flex-wrap gap-2">
                {APPAREL_SIZES.map((size) => (
                  <button key={size} onClick={() => setRobeSize(size)} className={`rounded-xl border-2 px-6 py-3 text-sm transition ${robeSize === size ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>{size}</button>
                ))}
              </div>
            )}

            {current.id === "review" && (
              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
                  <p className="text-white/40">Gender: <span className="text-white/80">{gender ?? "—"}</span></p>
                  <p className="text-white/40">Tier: <span className="text-white/80">{tier ? CLIENT_TIERS[tier].label : "—"}</span></p>
                  <p className="text-white/40">Card: <span className="text-white/80">{cardTier ? CARD_PROGRAMS[cardTier].name : "—"}</span></p>
                  {fragranceId && <p className="text-white/40">Fragrance: <span className="text-white/80">{FRAGRANCE_OPTIONS.find((f) => f.id === fragranceId)?.name}</span></p>}
                  {robeSize && <p className="text-white/40">Robe Size: <span className="text-white/80">{robeSize}</span></p>}
                  <p className="text-white/40">Ship To: <span className="text-white/80">{address ? `${address}, ${city}` : "—"}</span></p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-sm font-semibold text-emerald-400">{packageItems.length} items • Est. ${cost.min}-${cost.max}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {currentStep > 0 && <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
              {current.id === "confirm" ? (
                <Button className="flex-1" onClick={handleOrder}><Package size={16} className="mr-2" /> Place Order & Track</Button>
              ) : (
                <Button className="flex-1" onClick={goNext}>Continue <ChevronRight size={16} className="ml-1" /></Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
