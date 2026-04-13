"use client";

import { create } from "zustand";
import type { UserProfile } from "@/lib/profile";
import { PROFILE_RULES, validatePhotoCount } from "@/lib/profile";

interface ProfileStore {
  profiles: Map<string, UserProfile>;
  getProfile: (userId: string) => UserProfile | undefined;
  setIcon: (userId: string, iconUrl: string) => void;
  addPhotos: (userId: string, urls: string[]) => { success: boolean; message: string };
  removePhoto: (userId: string, url: string) => void;
  createProfile: (profile: UserProfile) => void;
  updateDisplayName: (userId: string, name: string) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: new Map<string, UserProfile>(),

  getProfile: (userId) => get().profiles.get(userId),

  createProfile: (profile) =>
    set((s) => {
      const profiles = new Map(s.profiles);
      profiles.set(profile.id, {
        ...profile,
        maxPhotos: PROFILE_RULES.maxPhotos,
        requireProfessionalPhotos: profile.role === "dancer"
          ? PROFILE_RULES.dancerRequiresProfessionalPhotos
          : PROFILE_RULES.clientRequiresProfessionalPhotos
      });
      return { profiles };
    }),

  setIcon: (userId, iconUrl) =>
    set((s) => {
      const profiles = new Map(s.profiles);
      const p = profiles.get(userId);
      if (p) profiles.set(userId, { ...p, iconUrl });
      return { profiles };
    }),

  addPhotos: (userId, urls) => {
    const p = get().profiles.get(userId);
    if (!p) return { success: false, message: "Profile not found." };
    const validation = validatePhotoCount(p.photos.length, urls.length);
    if (!validation.success) return validation;
    set((s) => {
      const profiles = new Map(s.profiles);
      const current = profiles.get(userId);
      if (current) {
        profiles.set(userId, { ...current, photos: [...current.photos, ...urls] });
      }
      return { profiles };
    });
    return { success: true, message: "Photos added." };
  },

  removePhoto: (userId, url) =>
    set((s) => {
      const profiles = new Map(s.profiles);
      const p = profiles.get(userId);
      if (p) {
        profiles.set(userId, { ...p, photos: p.photos.filter((u) => u !== url) });
      }
      return { profiles };
    }),

  updateDisplayName: (userId, name) =>
    set((s) => {
      const profiles = new Map(s.profiles);
      const p = profiles.get(userId);
      if (p) profiles.set(userId, { ...p, displayName: name });
      return { profiles };
    })
}));
