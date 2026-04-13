"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createHapticPulse } from "@/lib/webxr";

export function HapticsPanel() {
  const [enabled, setEnabled] = useState(true);
  const [intensity, setIntensity] = useState(70);

  return (
    <div className="glass w-full max-w-md rounded-3xl border border-cherry-500/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide text-white/85">Immersive Touch Feedback</p>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <label className="mb-3 block text-xs text-white/70">Intensity: {intensity}%</label>
      <input
        type="range"
        min={0}
        max={100}
        value={intensity}
        onChange={(event) => setIntensity(Number(event.target.value))}
        className="mb-4 w-full accent-cherry-500"
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          if (!enabled) return;
          createHapticPulse(Math.max(0.1, intensity / 100), 60);
        }}
      >
        Test Pulse
      </Button>
    </div>
  );
}
