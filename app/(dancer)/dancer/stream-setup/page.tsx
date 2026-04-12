"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useStreamMode, type StreamMode } from "@/hooks/useStreamMode";
import { Camera, Settings, Zap, Award, Smartphone, Monitor, CheckCircle } from "lucide-react";
import { getRevenueSplit, type GearOwner } from "@/lib/splits";
import { toast } from "sonner";

type GearCapability = "2D" | "3D" | "VR" | "IMMERSIVE";

export default function StreamSetup() {
  const { mode, setMode } = useStreamMode();
  const [gearOwner, setGearOwner] = useState<GearOwner>("cherrystim");
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [gearCapabilities, setGearCapabilities] = useState<Set<GearCapability>>(new Set(["2D"]));
  const [streamingFrom, setStreamingFrom] = useState<"mobile" | "home">("home");

  const split = getRevenueSplit(gearOwner);

  function toggleCapability(cap: GearCapability) {
    setGearCapabilities((prev) => {
      const next = new Set(prev);
      if (next.has(cap)) {
        if (cap === "2D") return next;
        next.delete(cap);
      } else {
        next.add(cap);
      }
      return next;
    });
  }

  const capabilityDescriptions: Record<GearCapability, { label: string; desc: string; requires: string }> = {
    "2D": { label: "2D Classic", desc: "Standard HD camera stream", requires: "Any camera" },
    "3D": { label: "3D Spatial", desc: "Depth-mapped volumetric feed", requires: "Depth camera or dual-lens setup" },
    "VR": { label: "VR Ready", desc: "Stereoscopic VR output", requires: "VR camera system" },
    "IMMERSIVE": { label: "Full Immersive", desc: "VR + haptic sync + spatial audio", requires: "VR camera + haptic controller" }
  };

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="cherry-text mb-3 font-display text-4xl md:text-6xl">Stream Setup</h1>
        <p className="mb-8 text-lg text-white/70 md:mb-12 md:text-xl">Configure your professional immersive broadcast</p>

        <div className="space-y-6 md:space-y-8">
          <Card className="glass p-5 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 text-xl md:mb-6 md:text-2xl">
              <Smartphone className="text-gold-500" size={22} /> Streaming From
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setStreamingFrom("mobile")}
                className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all md:p-6 ${
                  streamingFrom === "mobile" ? "border-cherry-500 bg-cherry-500/10" : "border-white/10"
                }`}
              >
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="font-semibold">Mobile</div>
                  <div className="text-xs text-white/50">On the go</div>
                </div>
              </button>
              <button
                onClick={() => setStreamingFrom("home")}
                className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all md:p-6 ${
                  streamingFrom === "home" ? "border-gold-500 bg-gold-500/10" : "border-white/10"
                }`}
              >
                <Monitor size={24} />
                <div className="text-left">
                  <div className="font-semibold">Home Setup</div>
                  <div className="text-xs text-white/50">Recommended</div>
                </div>
              </button>
            </div>
            {streamingFrom === "mobile" && (
              <p className="mt-3 text-xs text-white/50">Full streaming capabilities on mobile. 3D/VR/Immersive require compatible gear connected to your device.</p>
            )}
          </Card>

          <Card className="glass p-5 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 text-xl md:mb-6 md:text-2xl">
              <Camera className="text-gold-500" size={22} /> Gear Capabilities
            </h2>
            <p className="mb-4 text-sm text-white/60">Select what your camera and equipment can stream:</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(["2D", "3D", "VR", "IMMERSIVE"] as const).map((cap) => {
                const active = gearCapabilities.has(cap);
                const info = capabilityDescriptions[cap];
                return (
                  <button
                    key={cap}
                    onClick={() => toggleCapability(cap)}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                      active ? "border-emerald-500/50 bg-emerald-500/10" : "border-white/10"
                    }`}
                  >
                    <CheckCircle size={20} className={active ? "mt-0.5 text-emerald-400" : "mt-0.5 text-white/20"} />
                    <div>
                      <div className="font-semibold">{info.label}</div>
                      <div className="text-xs text-white/60">{info.desc}</div>
                      <div className="mt-1 text-[10px] text-white/40">Requires: {info.requires}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="glass p-5 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 text-xl md:mb-6 md:text-2xl">
              <Zap className="text-gold-500" size={22} /> Active Streaming Mode
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {(["2D", "3D", "VR", "IMMERSIVE"] as const).map((candidateMode) => {
                const canUse = gearCapabilities.has(candidateMode as GearCapability);
                return (
                  <button
                    key={candidateMode}
                    onClick={() => canUse && setMode(candidateMode)}
                    disabled={!canUse}
                    className={`rounded-2xl border-2 p-4 transition-all md:p-6 ${
                      !canUse ? "cursor-not-allowed border-white/5 opacity-30" :
                      mode === candidateMode ? "border-gold-500 bg-gold-500/10" : "border-white/10"
                    }`}
                  >
                    <div className="text-lg font-semibold md:text-xl">{candidateMode}</div>
                    {!canUse && <div className="mt-1 text-[10px] text-white/40">Gear not set</div>}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="glass p-5 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 text-xl md:mb-6 md:text-2xl">
              <Settings className="text-gold-500" size={22} /> Revenue Split
            </h2>
            <p className="mb-4 text-sm text-white/50">VR/Immersive/3D has different splits based on who paid for the equipment.</p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              {[
                { value: "cherrystim" as const, label: "Cherrystim Provided", desc: "We supply the gear" },
                { value: "lease" as const, label: "Leased Gear", desc: "You rent from us" },
                { value: "dancer" as const, label: "My Own Gear", desc: "You bought it" }
              ].map((option) => {
                const optSplit = getRevenueSplit(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => setGearOwner(option.value)}
                    className={`flex-1 rounded-2xl p-4 text-left transition-all md:p-6 ${
                      gearOwner === option.value ? "border-2 border-gold-400 bg-cherry-600/80" : "glass"
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-white/50">{option.desc}</div>
                    <div className="mt-2 text-lg font-bold text-emerald-400">{optSplit.label}</div>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-white/65">
              Performer keeps {split.performer}% • Platform keeps {split.platform}%
            </p>
          </Card>

          <Card className="glass p-5 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 text-xl md:mb-6 md:text-2xl">
              <Camera className="text-gold-500" size={22} /> Haptics + Capture
            </h2>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4">
              <div>
                <p className="font-medium">Enable immersive touch feedback</p>
                <p className="text-xs text-white/65 md:text-sm">Activates simulated haptic pulses for supported clients.</p>
              </div>
              <Switch checked={hapticsEnabled} onCheckedChange={setHapticsEnabled} />
            </div>
          </Card>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Button
              size="lg"
              className="flex-1 py-6 text-lg md:py-8 md:text-xl"
              onClick={() => toast.success("Stream configuration saved! Going live...")}
            >
              Save & Go Live
            </Button>
            <Button size="lg" variant="outline" className="flex-1 py-6 text-lg md:py-8 md:text-xl">
              <Award className="mr-2" /> Preview Stream
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
