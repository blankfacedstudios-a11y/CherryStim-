"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Sparkles } from "lucide-react";
import { useStreamMode, type StreamMode } from "@/hooks/useStreamMode";
import { Logo } from "@/components/core/Logo";
import { Button } from "@/components/ui/button";

const modes: { id: StreamMode; label: string; description: string }[] = [
  { id: "2D", label: "2D Classic", description: "Ultra-smooth cinema stream" },
  { id: "3D", label: "3D Experience", description: "Spatial depth + dynamic camera" },
  { id: "VR", label: "VR Mode", description: "Headset-ready session room" },
  { id: "IMMERSIVE", label: "Full Immersive", description: "VR + touch feedback + live gifts" }
];

export default function Home() {
  const { mode, setMode } = useStreamMode();
  const [selected, setSelected] = useState(false);
  const router = useRouter();

  return (
    <main className="hero-bg relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,51,0.2),transparent_40%),radial-gradient(circle_at_80%_5%,rgba(255,215,0,0.2),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <Logo className="mb-8" />
        <h1 className="cherry-text mb-6 font-display text-6xl md:text-8xl">CHERRYSTIM</h1>
        <p className="mx-auto mb-3 max-w-3xl font-serif text-2xl text-white/90 md:text-4xl">Invitation-only immersive luxury streaming.</p>
        <p className="mx-auto mb-12 max-w-2xl text-white/60">
          Select your mode and enter a premium visual environment designed with live 2D, 3D, VR and interactive collectibles.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
          {modes.map((candidate) => {
            const active = mode === candidate.id;
            return (
              <button
                key={candidate.id}
                onClick={() => {
                  setMode(candidate.id);
                  setSelected(true);
                }}
                className={`glass rounded-3xl p-6 text-left transition-all hover:-translate-y-1 hover:border-gold-500/50 ${
                  active ? "border-gold-500 bg-gold-500/10 shadow-glow" : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-2 text-gold-400">
                  <Sparkles size={16} />
                  <span className="text-xs tracking-[0.18em]">MODE</span>
                </div>
                <h3 className="mb-2 text-2xl font-semibold">{candidate.label}</h3>
                <p className="text-sm text-white/70">{candidate.description}</p>
              </button>
            );
          })}
        </div>

        {selected && (
          <Button size="lg" onClick={() => router.push("/browse")} className="px-16 py-8 text-xl">
            <Crown className="mr-3" /> Enter Cherrystim
          </Button>
        )}

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          <button onClick={() => router.push("/cherry-competition")} className="glass rounded-3xl p-6 text-left transition hover:-translate-y-1 hover:border-cherry-500/50">
            <div className="mb-3 text-2xl">🏆</div>
            <h3 className="mb-1 text-lg font-semibold">Cherry Rankings</h3>
            <p className="text-sm text-white/50">Watch top performers compete city-wide, country-wide, and worldwide.</p>
          </button>
          <button onClick={() => router.push("/sponsor")} className="glass rounded-3xl p-6 text-left transition hover:-translate-y-1 hover:border-gold-500/50">
            <div className="mb-3 text-2xl">👑</div>
            <h3 className="mb-1 text-lg font-semibold">The Cherry Ecosystem</h3>
            <p className="text-sm text-white/50">Discover the engine behind the world&apos;s premier entertainment platform.</p>
          </button>
          <button onClick={() => router.push("/studios")} className="glass rounded-3xl p-6 text-left transition hover:-translate-y-1 hover:border-violet-500/50">
            <div className="mb-3 text-2xl">🏢</div>
            <h3 className="mb-1 text-lg font-semibold">CherryStim Studios</h3>
            <p className="text-sm text-white/50">World-class broadcast facilities in 14 cities across 8 countries.</p>
          </button>
        </div>
      </div>
    </main>
  );
}
