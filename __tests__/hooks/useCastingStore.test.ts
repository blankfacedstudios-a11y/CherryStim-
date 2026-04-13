import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useCastingStore } from "@/hooks/useCastingStore";

describe("useCastingStore", () => {
  beforeEach(() => {
    act(() => {
      useCastingStore.setState({
        applications: [],
        notifications: [],
        sagPipeline: useCastingStore.getState().sagPipeline.map((s) => ({ ...s, completed: false }))
      });
    });
  });

  it("starts with no applications", () => {
    expect(useCastingStore.getState().applications).toHaveLength(0);
  });

  it("submits an application", () => {
    const id = useCastingStore.getState().submitApplication({
      opportunityId: "opp-1",
      dancerId: "d1",
      headshots: [],
      resume: "",
      coverLetter: "I am interested"
    });
    expect(typeof id).toBe("string");
    const apps = useCastingStore.getState().applications;
    expect(apps).toHaveLength(1);
    expect(apps[0].status).toBe("submitted");
  });

  it("creates notification on submit", () => {
    useCastingStore.getState().submitApplication({
      opportunityId: "opp-1",
      dancerId: "d1",
      headshots: [],
      resume: "",
      coverLetter: ""
    });
    expect(useCastingStore.getState().notifications).toHaveLength(1);
    expect(useCastingStore.getState().getUnreadCount()).toBe(1);
  });

  it("updates application status", () => {
    const id = useCastingStore.getState().submitApplication({
      opportunityId: "opp-1",
      dancerId: "d1",
      headshots: [],
      resume: "",
      coverLetter: ""
    });
    useCastingStore.getState().updateApplicationStatus(id, "approved");
    expect(useCastingStore.getState().applications[0].status).toBe("approved");
  });

  it("creates notification on status change", () => {
    const id = useCastingStore.getState().submitApplication({
      opportunityId: "opp-1",
      dancerId: "d1",
      headshots: [],
      resume: "",
      coverLetter: ""
    });
    useCastingStore.getState().updateApplicationStatus(id, "dismissed");
    expect(useCastingStore.getState().notifications.length).toBeGreaterThan(1);
  });

  it("filters applications by dancer", () => {
    useCastingStore.getState().submitApplication({ opportunityId: "opp-1", dancerId: "d1", headshots: [], resume: "", coverLetter: "" });
    useCastingStore.getState().submitApplication({ opportunityId: "opp-2", dancerId: "d2", headshots: [], resume: "", coverLetter: "" });
    expect(useCastingStore.getState().getApplicationsByDancer("d1")).toHaveLength(1);
  });

  it("completes SAG pipeline step", () => {
    useCastingStore.getState().completeSagStep("eligibility");
    const step = useCastingStore.getState().sagPipeline.find((s) => s.id === "eligibility");
    expect(step?.completed).toBe(true);
  });

  it("marks notification as read", () => {
    useCastingStore.getState().submitApplication({ opportunityId: "opp-1", dancerId: "d1", headshots: [], resume: "", coverLetter: "" });
    const notifId = useCastingStore.getState().notifications[0].id;
    useCastingStore.getState().markNotificationRead(notifId);
    expect(useCastingStore.getState().notifications[0].read).toBe(true);
    expect(useCastingStore.getState().getUnreadCount()).toBe(0);
  });
});
