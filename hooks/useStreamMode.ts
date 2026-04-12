"use client";

import { create } from "zustand";

export type StreamMode = "2D" | "3D" | "VR" | "IMMERSIVE";

interface StreamModeStore {
  mode: StreamMode;
  setMode: (mode: StreamMode) => void;
}

export const useStreamMode = create<StreamModeStore>((set) => ({
  mode: "2D",
  setMode: (newMode) => set({ mode: newMode })
}));
