"use client";

import { useRouter } from "next/navigation";
import { useStreamMode, type StreamMode } from "@/hooks/useStreamMode";
import { Monitor, Box, Glasses, Zap, Smartphone, Laptop, ArrowRight } from "lucide-react";
import { useState } from "react";

const modes: { id: StreamMode; icon: typeof Monitor; label: string; tagline: string; color: string; description: string }[] = [
  { id: "2D", icon: Monitor, label: "2D Classic", tagline: "Cinema Quality", color: "from-sky-500 to-blue-600", description: "Ultra-smooth HD streaming. Works on any device — phone, tablet, or laptop. Perfect for casual viewing." },
  { id: "3D", icon: Box, label: "3D Experience", tagline: "Spatial Depth", color: "from-purple-500 to-indigo-600", description: "Dynamic depth and spatial audio. Volumetric avatars respond to the scene. Phone or desktop." },
  { id: "VR", icon: Glasses, label: "VR Mode", tagline: "Headset Ready", color: "from-cherry-500 to-rose-600", description: "Full stereoscopic VR with head tracking. Requires a VR headset. Private session rooms." },
  { id: "IMMERSIVE", icon: Zap, label: "Full Immersive", tagline: "Total Sensation", color: "from-gold-400 to-amber-600", description: "VR + haptic touch feedback + live 3D gift throws. The ultimate premium experience. Requires VR headset + haptic gear." }
];

export default function GatePage() {
  const { setMode } = useStreamMode();
  const router = useRouter();
  const [hoveredMode, setHoveredMode] = useState<StreamMode | null>(null);
  const [selectedRole, setSelectedRole] = useState<"viewer" | "dancer" | null>(null);

  function handleSelect(mode: StreamMode) {
    setMode(mode);
    if (selectedRole === "dancer") {
      router.push("/dancer/dashboard");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020001] px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,215,0,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-400/70">Invitation Only</p>
        <h1 className="cherry-text mb-4 font-display text-5xl md:text-7xl">CHERRYSTIM</h1>
        <p className="mx-auto mb-12 max-w-xl text-lg text-white/50">
          Choose your experience. Every mode is fully accessible from your phone.
        </p>

        {!selectedRole ? (
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setSelectedRole("viewer")}
              className="glass group flex w-full items-center gap-4 rounded-2xl p-6 text-left transition-all hover:border-cherry-500/50 hover:shadow-glow sm:w-64"
            >
              <Smartphone className="text-cherry-500" size={28} />
              <div>
                <p className="font-semibold">I&apos;m a Viewer</p>
                <p className="text-xs text-white/50">Watch and interact</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-white/30 transition group-hover:text-cherry-500" />
            </button>
            <button
              onClick={() => setSelectedRole("dancer")}
              className="glass group flex w-full items-center gap-4 rounded-2xl p-6 text-left transition-all hover:border-gold-500/50 hover:shadow-glow sm:w-64"
            >
              <Laptop className="text-gold-500" size={28} />
              <div>
                <p className="font-semibold">I&apos;m a Dancer</p>
                <p className="text-xs text-white/50">Stream and earn</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-white/30 transition group-hover:text-gold-500" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setSelectedRole(null)}
              className="mb-8 text-xs text-white/40 underline decoration-white/20 transition hover:text-white/60"
            >
              ← Change role ({selectedRole === "viewer" ? "Viewer" : "Dancer"})
            </button>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modes.map((m) => {
                const Icon = m.icon;
                const hovered = hoveredMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m.id)}
                    onMouseEnter={() => setHoveredMode(m.id)}
                    onMouseLeave={() => setHoveredMode(null)}
                    className={`group relative flex flex-col items-center rounded-3xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 ${hovered ? "shadow-glow" : ""}`}
                  >
                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">{m.tagline}</p>
                    <h3 className="mb-3 text-xl font-semibold">{m.label}</h3>
                    <p className="mb-4 text-xs leading-relaxed text-white/50">{m.description}</p>
                    <div className="mt-auto flex items-center gap-1 text-xs text-gold-400 opacity-0 transition group-hover:opacity-100">
                      Enter <ArrowRight size={12} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/30">
              <Smartphone size={12} /> All modes work on mobile
            </div>
          </>
        )}
      </div>
    </div>
  );
}
