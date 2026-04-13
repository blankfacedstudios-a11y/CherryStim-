"use client";

import { create } from "zustand";
import type { RatingEntry } from "@/lib/ratings";
import { computeWeightedRating, detectBadRatingPattern, getClientAccessLevel, getDancerVisibility } from "@/lib/ratings";

interface RatingStore {
  ratings: RatingEntry[];
  blockedClientIds: Set<string>;
  addRating: (entry: Omit<RatingEntry, "id" | "createdAt">) => void;
  getRatingForUser: (userId: string, role: "client" | "dancer") => number;
  isClientBlocked: (clientId: string) => boolean;
  blockClient: (clientId: string) => void;
  unblockClient: (clientId: string) => void;
  getClientAccess: (clientId: string, hasPaidPremium: boolean) => "full" | "limited" | "premium_required";
  getDancerVis: (dancerId: string) => "full" | "reduced";
}

export const useRatingStore = create<RatingStore>((set, get) => ({
  ratings: [],
  blockedClientIds: new Set<string>(),

  addRating: (entry) => {
    const state = get();
    if (entry.fromRole === "client" && state.blockedClientIds.has(entry.fromUserId)) {
      return;
    }
    const full: RatingEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: Date.now()
    };
    set((s) => {
      const newRatings = [...s.ratings, full];
      const givenByThis = newRatings.filter((r) => r.fromUserId === entry.fromUserId);
      if (entry.fromRole === "client" && detectBadRatingPattern(givenByThis)) {
        const blocked = new Set(s.blockedClientIds);
        blocked.add(entry.fromUserId);
        return { ratings: newRatings, blockedClientIds: blocked };
      }
      return { ratings: newRatings };
    });
  },

  getRatingForUser: (userId, role) => {
    const ratings = get().ratings.filter((r) => r.toUserId === userId);
    return computeWeightedRating(ratings, role);
  },

  isClientBlocked: (clientId) => get().blockedClientIds.has(clientId),

  blockClient: (clientId) =>
    set((s) => {
      const blocked = new Set(s.blockedClientIds);
      blocked.add(clientId);
      return { blockedClientIds: blocked };
    }),

  unblockClient: (clientId) =>
    set((s) => {
      const blocked = new Set(s.blockedClientIds);
      blocked.delete(clientId);
      return { blockedClientIds: blocked };
    }),

  getClientAccess: (clientId, hasPaidPremium) => {
    const rating = get().getRatingForUser(clientId, "client");
    return getClientAccessLevel(rating, hasPaidPremium);
  },

  getDancerVis: (dancerId) => {
    const rating = get().getRatingForUser(dancerId, "dancer");
    return getDancerVisibility(rating);
  }
}));
