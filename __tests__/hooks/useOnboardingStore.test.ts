import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useOnboardingStore } from "@/hooks/useOnboardingStore";

describe("useOnboardingStore", () => {
  beforeEach(() => {
    act(() => {
      useOnboardingStore.getState().resetOnboarding();
    });
  });

  it("starts at step 0 with no completions", () => {
    expect(useOnboardingStore.getState().currentStep).toBe(0);
    expect(useOnboardingStore.getState().completedSteps.size).toBe(0);
  });

  it("updates selections", () => {
    useOnboardingStore.getState().updateSelection("tier", "pro");
    expect(useOnboardingStore.getState().selections.tier).toBe("pro");
  });

  it("marks steps complete", () => {
    useOnboardingStore.getState().markStepComplete("select_tier");
    expect(useOnboardingStore.getState().isStepComplete("select_tier")).toBe(true);
  });

  it("advances current step", () => {
    useOnboardingStore.getState().setCurrentStep(3);
    expect(useOnboardingStore.getState().currentStep).toBe(3);
  });

  it("calculates completion percent", () => {
    useOnboardingStore.getState().updateSelection("tier", "rising");
    const steps = useOnboardingStore.getState().getApplicableSteps();
    steps.forEach((s) => useOnboardingStore.getState().markStepComplete(s.id));
    expect(useOnboardingStore.getState().getCompletionPercent()).toBe(100);
  });

  it("places order and creates tracking", () => {
    useOnboardingStore.getState().updateSelection("tier", "pro");
    useOnboardingStore.getState().updateSelection("gearPlan", "lease");
    useOnboardingStore.getState().updateSelection("shippingAddress", "123 Main St");
    useOnboardingStore.getState().updateSelection("shippingCity", "Miami");
    useOnboardingStore.getState().updateSelection("shippingState", "FL");
    useOnboardingStore.getState().updateSelection("shippingZip", "33101");

    const orderId = useOnboardingStore.getState().placeOrder();
    expect(orderId).toMatch(/^WP-/);
    expect(useOnboardingStore.getState().orderTracking).not.toBeNull();
    expect(useOnboardingStore.getState().orderTracking?.supplierStatuses.length).toBeGreaterThan(3);
  });

  it("updates tracking status", () => {
    useOnboardingStore.getState().updateSelection("tier", "rising");
    useOnboardingStore.getState().placeOrder();
    useOnboardingStore.getState().updateTrackingStatus("shipped_to_dancer");
    expect(useOnboardingStore.getState().orderTracking?.overallStatus).toBe("shipped_to_dancer");
  });

  it("resets onboarding", () => {
    useOnboardingStore.getState().updateSelection("tier", "virtuoso");
    useOnboardingStore.getState().markStepComplete("select_tier");
    useOnboardingStore.getState().placeOrder();
    useOnboardingStore.getState().resetOnboarding();
    expect(useOnboardingStore.getState().selections.tier).toBeNull();
    expect(useOnboardingStore.getState().completedSteps.size).toBe(0);
    expect(useOnboardingStore.getState().orderTracking).toBeNull();
  });
});
