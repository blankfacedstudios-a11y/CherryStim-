"use client";

import { create } from "zustand";
import type { CastingApplication, ApplicationStatus, SagPipelineStep } from "@/lib/casting";
import { SAG_PIPELINE_STEPS } from "@/lib/casting";

interface Notification {
  id: string;
  type: "audition" | "approval" | "dismissal" | "gig_booked";
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
}

interface CastingStore {
  applications: CastingApplication[];
  sagPipeline: SagPipelineStep[];
  notifications: Notification[];
  submitApplication: (app: Omit<CastingApplication, "id" | "status" | "submittedAt">) => string;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  getApplicationsByDancer: (dancerId: string) => CastingApplication[];
  completeSagStep: (stepId: string) => void;
  addNotification: (notif: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markNotificationRead: (notifId: string) => void;
  getUnreadCount: () => number;
}

export const useCastingStore = create<CastingStore>((set, get) => ({
  applications: [],
  sagPipeline: SAG_PIPELINE_STEPS.map((s) => ({ ...s })),
  notifications: [],

  submitApplication: (app) => {
    const id = `app-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const full: CastingApplication = {
      ...app,
      id,
      status: "submitted",
      submittedAt: Date.now()
    };
    set((s) => ({
      applications: [...s.applications, full],
      notifications: [
        ...s.notifications,
        {
          id: `notif-${Date.now()}`,
          type: "audition",
          title: "Application Submitted",
          message: `Your application has been submitted and is under review.`,
          read: false,
          createdAt: Date.now()
        }
      ]
    }));
    return id;
  },

  updateApplicationStatus: (appId, status) =>
    set((s) => {
      const applications = s.applications.map((a) =>
        a.id === appId ? { ...a, status } : a
      );
      const app = applications.find((a) => a.id === appId);
      const notifType = status === "approved" ? "approval" as const
        : status === "dismissed" ? "dismissal" as const
        : status === "booked" ? "gig_booked" as const
        : "audition" as const;
      const notifications: Notification[] = [
        ...s.notifications,
        {
          id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          type: notifType,
          title: status === "approved" ? "Application Approved!" : status === "dismissed" ? "Application Update" : status === "booked" ? "Gig Booked!" : "Status Update",
          message: `Your application status has been updated to: ${status}.`,
          read: false,
          createdAt: Date.now()
        }
      ];
      return { applications, notifications };
    }),

  getApplicationsByDancer: (dancerId) =>
    get().applications.filter((a) => a.dancerId === dancerId),

  completeSagStep: (stepId) =>
    set((s) => ({
      sagPipeline: s.sagPipeline.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    })),

  addNotification: (notif) =>
    set((s) => ({
      notifications: [
        ...s.notifications,
        {
          ...notif,
          id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          read: false,
          createdAt: Date.now()
        }
      ]
    })),

  markNotificationRead: (notifId) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      )
    })),

  getUnreadCount: () => get().notifications.filter((n) => !n.read).length
}));
