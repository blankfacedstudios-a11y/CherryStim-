"use client";

import { create } from "zustand";
import type { DancerTier } from "@/lib/tiers";
import type { CardTier } from "@/lib/fincard";
import type { GearOwner } from "@/lib/splits";
import type { OnboardingStepId, ShoeSize, ApparelSize, WelcomeOrderTracking, OrderTrackingStatus } from "@/lib/onboarding";
import { getStepsForTier, createMockTracking } from "@/lib/onboarding";

interface OnboardingSelections {
  tier: DancerTier | null;
  gearPlan: GearOwner | null;
  cardTier: CardTier | null;
  shoeSize: ShoeSize | null;
  fragranceId: string | null;
  lingerieSize: ApparelSize | null;
  swimwearSize: ApparelSize | null;
  robeSize: ApparelSize | null;
  ceilingHeight: string | null;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

interface OnboardingStore {
  currentStep: number;
  completedSteps: Set<OnboardingStepId>;
  selections: OnboardingSelections;
  orderTracking: WelcomeOrderTracking | null;

  setCurrentStep: (step: number) => void;
  markStepComplete: (stepId: OnboardingStepId) => void;
  updateSelection: <K extends keyof OnboardingSelections>(key: K, value: OnboardingSelections[K]) => void;
  getApplicableSteps: () => ReturnType<typeof getStepsForTier>;
  isStepComplete: (stepId: OnboardingStepId) => boolean;
  getCompletionPercent: () => number;
  placeOrder: () => string;
  updateTrackingStatus: (status: OrderTrackingStatus) => void;
  resetOnboarding: () => void;
}

const initialSelections: OnboardingSelections = {
  tier: null,
  gearPlan: null,
  cardTier: null,
  shoeSize: null,
  fragranceId: null,
  lingerieSize: null,
  swimwearSize: null,
  robeSize: null,
  ceilingHeight: null,
  shippingAddress: "",
  shippingCity: "",
  shippingState: "",
  shippingZip: "",
  shippingCountry: "United States"
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  currentStep: 0,
  completedSteps: new Set<OnboardingStepId>(),
  selections: { ...initialSelections },
  orderTracking: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  markStepComplete: (stepId) =>
    set((s) => {
      const completed = new Set(s.completedSteps);
      completed.add(stepId);
      return { completedSteps: completed };
    }),

  updateSelection: (key, value) =>
    set((s) => ({
      selections: { ...s.selections, [key]: value }
    })),

  getApplicableSteps: () => {
    const tier = get().selections.tier;
    if (!tier) return getStepsForTier("rising");
    return getStepsForTier(tier);
  },

  isStepComplete: (stepId) => get().completedSteps.has(stepId),

  getCompletionPercent: () => {
    const steps = get().getApplicableSteps();
    const completed = get().completedSteps;
    if (steps.length === 0) return 0;
    const count = steps.filter((s) => completed.has(s.id)).length;
    return Math.round((count / steps.length) * 100);
  },

  placeOrder: () => {
    const { selections } = get();
    const tier = selections.tier ?? "rising";
    const gearPlan = selections.gearPlan ?? "cherrystim";
    const tracking = createMockTracking("current-dancer", tier, gearPlan);
    tracking.shippingAddress = `${selections.shippingAddress}, ${selections.shippingCity}, ${selections.shippingState} ${selections.shippingZip}, ${selections.shippingCountry}`;
    set({ orderTracking: tracking });
    return tracking.orderId;
  },

  updateTrackingStatus: (status) =>
    set((s) => {
      if (!s.orderTracking) return {};
      return {
        orderTracking: { ...s.orderTracking, overallStatus: status, updatedAt: Date.now() }
      };
    }),

  resetOnboarding: () =>
    set({
      currentStep: 0,
      completedSteps: new Set(),
      selections: { ...initialSelections },
      orderTracking: null
    })
}));
