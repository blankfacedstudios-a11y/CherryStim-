"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingStore } from "@/hooks/useOnboardingStore";
import { DANCER_TIERS, type DancerTier } from "@/lib/tiers";
import { CARD_PROGRAMS, type CardTier } from "@/lib/fincard";
import { FRAGRANCE_OPTIONS, SHOE_SIZES, APPAREL_SIZES, CEILING_HEIGHTS } from "@/lib/onboarding";
import type { GearOwner } from "@/lib/splits";
import { getRevenueSplit } from "@/lib/splits";
import { CheckCircle, Circle, Package, CreditCard, Truck, Gift, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    currentStep, setCurrentStep, completedSteps, markStepComplete,
    selections, updateSelection, getApplicableSteps, getCompletionPercent, placeOrder
  } = useOnboardingStore();

  const steps = getApplicableSteps();
  const progress = getCompletionPercent();
  const current = steps[currentStep];

  function goNext() {
    if (current) markStepComplete(current.id);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePlaceOrder() {
    if (current) markStepComplete(current.id);
    const orderId = placeOrder();
    toast.success(`Order ${orderId} placed! Your welcome package is being assembled.`);
    router.push("/dancer/order-tracking");
  }

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Gift className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Welcome Setup</h1>
          </div>
          <p className="text-white/60">Complete each step to customize your welcome package before it ships.</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-3 flex-1 rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-medium text-gold-400">{progress}%</span>
          </div>
        </header>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const done = completedSteps.has(step.id);
            const active = i === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(i)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${active ? "bg-cherry-500/20 text-cherry-400" : done ? "bg-emerald-500/10 text-emerald-400" : "text-white/30"}`}
              >
                {done ? <CheckCircle size={14} /> : <Circle size={14} />}
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </div>

        {current && (
          <Card className="glass p-6 md:p-8">
            <div className="mb-6">
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/40">Step {currentStep + 1} of {steps.length}</p>
              <h2 className="mb-2 text-2xl font-semibold">{current.label}</h2>
              <p className="text-sm text-white/60">{current.description}</p>
            </div>

            {current.id === "select_tier" && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(Object.keys(DANCER_TIERS) as DancerTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => updateSelection("tier", tier)}
                    className={`rounded-2xl border-2 p-4 text-left transition ${selections.tier === tier ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}
                  >
                    <p className="font-semibold">{DANCER_TIERS[tier].label}</p>
                    <p className="text-xs text-white/40">Rank {DANCER_TIERS[tier].rank}</p>
                  </button>
                ))}
              </div>
            )}

            {current.id === "select_gear_plan" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {([
                  { value: "cherrystim" as GearOwner, label: "CherryStim Provides", desc: "We supply the gear" },
                  { value: "lease" as GearOwner, label: "Lease Gear", desc: "Rent from us" },
                  { value: "dancer" as GearOwner, label: "Own My Gear", desc: "I bring my own" }
                ]).map((opt) => {
                  const split = getRevenueSplit(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => updateSelection("gearPlan", opt.value)}
                      className={`rounded-2xl border-2 p-4 text-left transition ${selections.gearPlan === opt.value ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}
                    >
                      <p className="font-semibold">{opt.label}</p>
                      <p className="text-xs text-white/40">{opt.desc}</p>
                      <p className="mt-2 text-sm font-bold text-emerald-400">{split.label} split</p>
                    </button>
                  );
                })}
              </div>
            )}

            {current.id === "select_card" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(CARD_PROGRAMS) as CardTier[]).map((tier) => {
                  const card = CARD_PROGRAMS[tier];
                  return (
                    <button
                      key={tier}
                      onClick={() => updateSelection("cardTier", tier)}
                      className={`rounded-2xl border-2 p-4 text-left transition ${selections.cardTier === tier ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-gold-500" />
                        <p className="font-semibold">{card.name}</p>
                      </div>
                      <p className="mt-1 text-xs text-white/40">{card.material.split(",")[0]}, {card.weight}</p>
                      <p className="text-xs text-white/40">{card.monthlyFee === 0 ? "Free" : `$${card.monthlyFee}/mo`} • {card.cashbackPercent}% cashback</p>
                    </button>
                  );
                })}
              </div>
            )}

            {current.id === "enter_shipping" && (
              <div className="space-y-3">
                <input type="text" placeholder="Street address" value={selections.shippingAddress} onChange={(e) => updateSelection("shippingAddress", e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={selections.shippingCity} onChange={(e) => updateSelection("shippingCity", e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                  <input type="text" placeholder="State" value={selections.shippingState} onChange={(e) => updateSelection("shippingState", e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="ZIP code" value={selections.shippingZip} onChange={(e) => updateSelection("shippingZip", e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                  <input type="text" placeholder="Country" value={selections.shippingCountry} onChange={(e) => updateSelection("shippingCountry", e.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
                </div>
              </div>
            )}

            {current.id === "select_shoe_size" && (
              <div className="flex flex-wrap gap-2">
                {SHOE_SIZES.map((size) => (
                  <button key={size} onClick={() => updateSelection("shoeSize", size)} className={`rounded-xl border-2 px-4 py-3 text-sm transition ${selections.shoeSize === size ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    {size}
                  </button>
                ))}
              </div>
            )}

            {current.id === "select_fragrance" && (
              <div className="grid gap-3">
                {FRAGRANCE_OPTIONS.map((frag) => (
                  <button key={frag.id} onClick={() => updateSelection("fragranceId", frag.id)} className={`rounded-2xl border-2 p-4 text-left transition ${selections.fragranceId === frag.id ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    <p className="font-semibold">{frag.name}</p>
                    <p className="text-xs text-gold-400">{frag.house}</p>
                    <p className="mt-1 text-xs text-white/40">Notes: {frag.notes}</p>
                  </button>
                ))}
              </div>
            )}

            {current.id === "select_lingerie_size" && (
              <div className="flex flex-wrap gap-2">
                {APPAREL_SIZES.map((size) => (
                  <button key={size} onClick={() => updateSelection("lingerieSize", size)} className={`rounded-xl border-2 px-6 py-3 text-sm transition ${selections.lingerieSize === size ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    {size}
                  </button>
                ))}
              </div>
            )}

            {current.id === "select_swimwear_size" && (
              <div className="flex flex-wrap gap-2">
                {APPAREL_SIZES.map((size) => (
                  <button key={size} onClick={() => updateSelection("swimwearSize", size)} className={`rounded-xl border-2 px-6 py-3 text-sm transition ${selections.swimwearSize === size ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    {size}
                  </button>
                ))}
              </div>
            )}

            {current.id === "select_robe_size" && (
              <div className="flex flex-wrap gap-2">
                {APPAREL_SIZES.map((size) => (
                  <button key={size} onClick={() => updateSelection("robeSize", size)} className={`rounded-xl border-2 px-6 py-3 text-sm transition ${selections.robeSize === size ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                    {size}
                  </button>
                ))}
              </div>
            )}

            {current.id === "confirm_pole_install" && (
              <div>
                <p className="mb-3 text-sm text-white/60">Select your ceiling height for the Lupit LED dance pole:</p>
                <div className="flex flex-wrap gap-2">
                  {CEILING_HEIGHTS.map((h) => (
                    <button key={h} onClick={() => updateSelection("ceilingHeight", h)} className={`rounded-xl border-2 px-4 py-3 text-sm transition ${selections.ceilingHeight === h ? "border-gold-500 bg-gold-500/10" : "border-white/10"}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current.id === "review_package" && (
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-white/40">Tier: <span className="text-white/80">{selections.tier ? DANCER_TIERS[selections.tier].label : "—"}</span></p>
                  <p className="text-white/40">Card: <span className="text-white/80">{selections.cardTier ? CARD_PROGRAMS[selections.cardTier].name : "—"}</span></p>
                  <p className="text-white/40">Gear Plan: <span className="text-white/80">{selections.gearPlan ?? "—"}</span></p>
                  {selections.shoeSize && <p className="text-white/40">Shoe Size: <span className="text-white/80">{selections.shoeSize}</span></p>}
                  {selections.fragranceId && <p className="text-white/40">Fragrance: <span className="text-white/80">{FRAGRANCE_OPTIONS.find((f) => f.id === selections.fragranceId)?.name}</span></p>}
                  {selections.lingerieSize && <p className="text-white/40">Lingerie: <span className="text-white/80">{selections.lingerieSize}</span></p>}
                  {selections.swimwearSize && <p className="text-white/40">Swimwear: <span className="text-white/80">{selections.swimwearSize}</span></p>}
                  {selections.robeSize && <p className="text-white/40">Robe: <span className="text-white/80">{selections.robeSize}</span></p>}
                  {selections.ceilingHeight && <p className="text-white/40">Ceiling Height: <span className="text-white/80">{selections.ceilingHeight}</span></p>}
                  <p className="text-white/40">Ship To: <span className="text-white/80">{selections.shippingAddress ? `${selections.shippingAddress}, ${selections.shippingCity}` : "—"}</span></p>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
              )}
              {current.id === "confirm_order" ? (
                <Button className="flex-1" onClick={handlePlaceOrder}>
                  <Package size={16} className="mr-2" /> Place Order & Track
                </Button>
              ) : (
                <Button className="flex-1" onClick={goNext}>
                  Continue <ChevronRight size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
