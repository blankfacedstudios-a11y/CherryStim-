"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useStreamMode } from "@/hooks/useStreamMode";
import { Camera, Settings, Zap, Award } from "lucide-react";
import { getRevenueSplit, type GearOwner } from "@/lib/splits";

export default function StreamSetup() {
  const { mode, setMode } = useStreamMode();
  const [gearOwner, setGearOwner] = useState<GearOwner>("cherrystim");
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const split = getRevenueSplit(gearOwner);

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="cherry-text mb-3 font-display text-6xl">Stream Setup</h1>
        <p className="mb-12 text-xl text-white/70">Configure your professional immersive broadcast</p>

        <div className="space-y-8">
          <Card className="glass p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl">
              <Zap className="text-gold-500" /> Streaming Mode
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {(["2D", "3D", "VR", "IMMERSIVE"] as const).map((candidateMode) => (
                <button
                  key={candidateMode}
                  onClick={() => setMode(candidateMode)}
                  className={`rounded-2xl border-2 p-6 transition-all ${
                    mode === candidateMode ? "border-gold-500 bg-gold-500/10" : "border-white/10"
                  }`}
                >
                  <div className="text-xl font-semibold">{candidateMode}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="glass p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl">
              <Settings className="text-gold-500" /> Revenue Split
            </h2>
            <div className="flex flex-col gap-4 md:flex-row">
              {[
                { value: "cherrystim" as const, label: "Cherrystim Provided", desc: "Platform gear" },
                { value: "lease" as const, label: "Leased Gear", desc: "Rented equipment" },
                { value: "dancer" as const, label: "My Own Gear", desc: "Your equipment" }
              ].map((option) => {
                const optSplit = getRevenueSplit(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => setGearOwner(option.value)}
                    className={`flex-1 rounded-2xl p-6 text-left ${
                      gearOwner === option.value ? "border-2 border-gold-400 bg-cherry-600/80" : "glass"
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-white/50">{option.desc}</div>
                    <div className="mt-2 font-bold text-emerald-400">{optSplit.label}</div>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-white/65">
              Performer keeps {split.performer}% • Platform keeps {split.platform}%
            </p>
          </Card>

          <Card className="glass p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl">
              <Camera className="text-gold-500" /> Haptics + Capture
            </h2>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4">
              <div>
                <p className="font-medium">Enable immersive touch feedback</p>
                <p className="text-sm text-white/65">Activates simulated pulses for supported clients.</p>
              </div>
              <Switch checked={hapticsEnabled} onCheckedChange={setHapticsEnabled} />
            </div>
          </Card>

          <div className="flex flex-col gap-4 md:flex-row">
            <Button size="lg" className="flex-1 py-8 text-xl">
              Save & Go Live
            </Button>
            <Button size="lg" variant="outline" className="flex-1 py-8 text-xl">
              <Award className="mr-2" /> Preview Stream
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
