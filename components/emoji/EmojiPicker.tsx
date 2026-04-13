"use client";

import { useState } from "react";
import { PLATFORM_EMOJIS, EMOJI_CATEGORIES, getEmojiRenderConfig, type EmojiCategory } from "@/lib/emojis";
import { useStreamMode } from "@/hooks/useStreamMode";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  onEmojiSelect: (emojiId: string) => void;
  className?: string;
}

export function EmojiPicker({ onEmojiSelect, className }: EmojiPickerProps) {
  const { mode } = useStreamMode();
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>("flirty");
  const config = getEmojiRenderConfig(mode);

  const filtered = PLATFORM_EMOJIS.filter((e) => e.category === activeCategory);

  return (
    <div className={cn("glass rounded-2xl border border-white/10 p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
          {config.use3DModels ? "3D" : "Enhanced 2D"} Emojis
        </p>
        {config.enableHaptics && (
          <span className="rounded-full bg-cherry-500/20 px-2 py-0.5 text-[9px] text-cherry-400">Haptic</span>
        )}
      </div>

      <div className="mb-2 flex gap-1 overflow-x-auto">
        {(Object.keys(EMOJI_CATEGORIES) as EmojiCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap rounded-lg px-2 py-1 text-[10px] transition",
              activeCategory === cat ? "bg-cherry-500/20 text-cherry-400" : "text-white/40 hover:text-white/60"
            )}
          >
            {EMOJI_CATEGORIES[cat].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-1">
        {filtered.map((emoji) => (
          <button
            key={emoji.id}
            onClick={() => onEmojiSelect(emoji.id)}
            title={`${emoji.label}${emoji.hapticPulse && config.enableHaptics ? " (haptic)" : ""}`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white/10 hover:scale-110 active:scale-95"
          >
            <span className={cn(
              "text-2xl transition-transform",
              config.enhanced2D && "drop-shadow-[0_2px_4px_rgba(255,0,51,0.3)]"
            )}>
              {emoji.symbol}
            </span>
            {emoji.hasPhysics && config.enablePhysics && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
