import type { StreamMode } from "@/hooks/useStreamMode";

export type EmojiCategory = "flirty" | "reactions" | "gifts_emote" | "vibe" | "premium" | "interactive";

export interface PlatformEmoji {
  id: string;
  symbol: string;
  label: string;
  category: EmojiCategory;
  animation2D: string;
  animation3D: string;
  hasPhysics: boolean;
  interactiveInVR: boolean;
  soundEffect: string | null;
  hapticPulse: boolean;
}

export const EMOJI_CATEGORIES: Record<EmojiCategory, { label: string }> = {
  flirty: { label: "Flirty" },
  reactions: { label: "Reactions" },
  gifts_emote: { label: "Gift Emotes" },
  vibe: { label: "Vibe" },
  premium: { label: "Premium" },
  interactive: { label: "Interactive" }
};

export const PLATFORM_EMOJIS: PlatformEmoji[] = [
  // FLIRTY
  { id: "cherry-lips", symbol: "💋", label: "Cherry Kiss", category: "flirty", animation2D: "float-spin", animation3D: "projectile-arc", hasPhysics: true, interactiveInVR: true, soundEffect: "kiss-pop", hapticPulse: true },
  { id: "wink-heart", symbol: "😘", label: "Wink & Blow", category: "flirty", animation2D: "bounce-grow", animation3D: "heart-burst-3d", hasPhysics: true, interactiveInVR: true, soundEffect: "sparkle", hapticPulse: true },
  { id: "cherry-bomb", symbol: "🍒", label: "Cherry Bomb", category: "flirty", animation2D: "explode-petals", animation3D: "shatter-burst", hasPhysics: true, interactiveInVR: true, soundEffect: "boom-soft", hapticPulse: true },
  { id: "rose-throw", symbol: "🌹", label: "Rose Toss", category: "flirty", animation2D: "float-down", animation3D: "rose-arc-physics", hasPhysics: true, interactiveInVR: true, soundEffect: "whoosh", hapticPulse: false },
  { id: "spicy-pepper", symbol: "🌶️", label: "Spicy", category: "flirty", animation2D: "shake-glow", animation3D: "fire-trail", hasPhysics: true, interactiveInVR: true, soundEffect: "sizzle", hapticPulse: true },
  { id: "tongue-out", symbol: "😜", label: "Playful", category: "flirty", animation2D: "wiggle", animation3D: "bounce-spin", hasPhysics: false, interactiveInVR: false, soundEffect: null, hapticPulse: false },
  { id: "peach", symbol: "🍑", label: "Peach", category: "flirty", animation2D: "bounce-jiggle", animation3D: "bounce-physics", hasPhysics: true, interactiveInVR: true, soundEffect: "boing", hapticPulse: true },
  { id: "flame-heart", symbol: "❤️‍🔥", label: "Burning Love", category: "flirty", animation2D: "pulse-fire", animation3D: "fire-heart-orbit", hasPhysics: true, interactiveInVR: true, soundEffect: "flame-crackle", hapticPulse: true },

  // REACTIONS
  { id: "mind-blown", symbol: "🤯", label: "Mind Blown", category: "reactions", animation2D: "explode-out", animation3D: "shockwave-sphere", hasPhysics: true, interactiveInVR: true, soundEffect: "boom", hapticPulse: true },
  { id: "star-eyes", symbol: "🤩", label: "Starstruck", category: "reactions", animation2D: "star-burst", animation3D: "star-orbit", hasPhysics: true, interactiveInVR: false, soundEffect: "twinkle", hapticPulse: false },
  { id: "drool", symbol: "🤤", label: "Mesmerized", category: "reactions", animation2D: "melt-down", animation3D: "melt-puddle", hasPhysics: true, interactiveInVR: false, soundEffect: null, hapticPulse: false },
  { id: "fire", symbol: "🔥", label: "Fire", category: "reactions", animation2D: "flame-rise", animation3D: "fire-column", hasPhysics: true, interactiveInVR: true, soundEffect: "flame-crackle", hapticPulse: true },
  { id: "clap", symbol: "👏", label: "Applause", category: "reactions", animation2D: "rapid-clap", animation3D: "crowd-clap-wave", hasPhysics: false, interactiveInVR: false, soundEffect: "applause", hapticPulse: false },

  // GIFT EMOTES
  { id: "diamond-rain", symbol: "💎", label: "Diamond Rain", category: "gifts_emote", animation2D: "cascade-down", animation3D: "diamond-shower", hasPhysics: true, interactiveInVR: true, soundEffect: "crystal-chime", hapticPulse: true },
  { id: "gold-shower", symbol: "🪙", label: "Gold Shower", category: "gifts_emote", animation2D: "coin-cascade", animation3D: "coin-fountain", hasPhysics: true, interactiveInVR: true, soundEffect: "coins-clink", hapticPulse: true },
  { id: "crown-drop", symbol: "👑", label: "Crown Drop", category: "gifts_emote", animation2D: "drop-bounce", animation3D: "crown-descend", hasPhysics: true, interactiveInVR: true, soundEffect: "royal-fanfare", hapticPulse: true },

  // VIBE
  { id: "disco-ball", symbol: "🪩", label: "Disco", category: "vibe", animation2D: "rotate-shimmer", animation3D: "disco-sphere-lights", hasPhysics: true, interactiveInVR: true, soundEffect: "disco-beat", hapticPulse: true },
  { id: "moon-glow", symbol: "🌙", label: "Moonlit", category: "vibe", animation2D: "soft-pulse", animation3D: "moon-orbit", hasPhysics: false, interactiveInVR: false, soundEffect: "ambient-night", hapticPulse: false },
  { id: "champagne", symbol: "🍾", label: "Celebrate", category: "vibe", animation2D: "pop-fizz", animation3D: "champagne-burst", hasPhysics: true, interactiveInVR: true, soundEffect: "cork-pop", hapticPulse: true },

  // PREMIUM
  { id: "nft-gem", symbol: "💠", label: "NFT Gem", category: "premium", animation2D: "holographic-spin", animation3D: "gem-float-refract", hasPhysics: true, interactiveInVR: true, soundEffect: "crystal-ring", hapticPulse: true },
  { id: "supernova", symbol: "💥", label: "Supernova", category: "premium", animation2D: "mega-explosion", animation3D: "supernova-sphere", hasPhysics: true, interactiveInVR: true, soundEffect: "cosmic-boom", hapticPulse: true },

  // INTERACTIVE
  { id: "hug", symbol: "🫂", label: "Virtual Hug", category: "interactive", animation2D: "pulse-warm", animation3D: "arms-wrap-haptic", hasPhysics: true, interactiveInVR: true, soundEffect: "warm-glow", hapticPulse: true },
  { id: "hand-wave", symbol: "👋", label: "Hey There", category: "interactive", animation2D: "wave-motion", animation3D: "hand-wave-tracked", hasPhysics: false, interactiveInVR: true, soundEffect: null, hapticPulse: false }
];

export function getEmojiRenderConfig(mode: StreamMode) {
  return {
    use3DModels: mode !== "2D",
    enablePhysics: mode === "3D" || mode === "VR" || mode === "IMMERSIVE",
    enableHaptics: mode === "IMMERSIVE",
    enableVRInteraction: mode === "VR" || mode === "IMMERSIVE",
    enhanced2D: mode === "2D",
    particleCount: mode === "IMMERSIVE" ? 200 : mode === "VR" ? 150 : mode === "3D" ? 100 : 50,
    animationStyle: mode === "2D" ? "enhanced-2d-with-depth" : "full-3d"
  };
}

export function getEmojisForCategory(category: EmojiCategory): PlatformEmoji[] {
  return PLATFORM_EMOJIS.filter((e) => e.category === category);
}
