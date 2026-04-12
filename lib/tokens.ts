export interface GameToken {
  id: string;
  name: string;
  emoji: string;
  category: "classic" | "luxury" | "fantasy" | "tech" | "nature" | "royal" | "cosmic" | "legendary";
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";
  description: string;
  unlockRequirement: string;
}

export const GAME_TOKENS: GameToken[] = [
  // ── Classic (Monopoly-inspired) ──
  { id: "top-hat", name: "The Top Hat", emoji: "🎩", category: "classic", rarity: "common", description: "Old money elegance. The OG hustler piece.", unlockRequirement: "Join CherryStim" },
  { id: "stiletto", name: "The Stiletto", emoji: "👠", category: "classic", rarity: "common", description: "Every step is a statement. Walk it like you own it.", unlockRequirement: "Complete your profile" },
  { id: "cherry", name: "The Cherry", emoji: "🍒", category: "classic", rarity: "common", description: "The signature. You ARE a Cherry.", unlockRequirement: "First stream" },
  { id: "lipstick", name: "The Lipstick", emoji: "💄", category: "classic", rarity: "common", description: "Leave your mark everywhere you go.", unlockRequirement: "10 hours streamed" },
  { id: "dice", name: "The Lucky Dice", emoji: "🎲", category: "classic", rarity: "uncommon", description: "Fortune favors the bold. Roll the dice.", unlockRequirement: "First 100 Crushes" },
  { id: "money-bag", name: "The Money Bag", emoji: "💰", category: "classic", rarity: "uncommon", description: "Getting to the bag is non-negotiable.", unlockRequirement: "$1,000 earned" },
  { id: "microphone", name: "The Mic Drop", emoji: "🎤", category: "classic", rarity: "uncommon", description: "When you speak, the world listens.", unlockRequirement: "50 Sprungs" },
  { id: "camera", name: "The Flash", emoji: "📸", category: "classic", rarity: "uncommon", description: "Camera ready, always. No bad angles.", unlockRequirement: "First modeling gig" },

  // ── Luxury ──
  { id: "diamond-ring", name: "The Rock", emoji: "💍", category: "luxury", rarity: "rare", description: "Flawless clarity. Flawless Cherry.", unlockRequirement: "Cherry Gold status" },
  { id: "crown", name: "The Crown", emoji: "👑", category: "luxury", rarity: "rare", description: "Heavy is the head. But you carry it with grace.", unlockRequirement: "$10,000 earned" },
  { id: "sports-car", name: "The Whip", emoji: "🏎️", category: "luxury", rarity: "rare", description: "Fast life, fast money. Zero to 100.", unlockRequirement: "500 Crushes" },
  { id: "yacht", name: "The Yacht", emoji: "🛥️", category: "luxury", rarity: "epic", description: "International waters. International Cherry.", unlockRequirement: "Top 10 in Country" },
  { id: "jet", name: "The Private Jet", emoji: "✈️", category: "luxury", rarity: "epic", description: "No layovers when you're at the top.", unlockRequirement: "Cherry Diamond status" },
  { id: "mansion", name: "The Mansion", emoji: "🏰", category: "luxury", rarity: "epic", description: "Your empire has an address.", unlockRequirement: "$50,000 earned" },
  { id: "black-card", name: "The Black Card", emoji: "💳", category: "luxury", rarity: "legendary", description: "No limits. Literally.", unlockRequirement: "Cherry Crown status" },

  // ── Fantasy ──
  { id: "unicorn", name: "The Unicorn", emoji: "🦄", category: "fantasy", rarity: "rare", description: "One of a kind. They said you didn't exist.", unlockRequirement: "10 NFTs sold" },
  { id: "phoenix", name: "The Phoenix", emoji: "🔥", category: "fantasy", rarity: "epic", description: "From the ashes. Every time.", unlockRequirement: "30-day streak" },
  { id: "dragon", name: "The Dragon", emoji: "🐉", category: "fantasy", rarity: "legendary", description: "Breathe fire on the competition.", unlockRequirement: "Top 5 in Region" },
  { id: "mermaid", name: "The Siren", emoji: "🧜‍♀️", category: "fantasy", rarity: "epic", description: "Your voice pulls them in from across the ocean.", unlockRequirement: "1,000 Sprungs" },

  // ── Tech ──
  { id: "robot", name: "The AI", emoji: "🤖", category: "tech", rarity: "uncommon", description: "Optimized. Automated. Unstoppable.", unlockRequirement: "Use Immersive mode 50 times" },
  { id: "satellite", name: "The Satellite", emoji: "🛰️", category: "tech", rarity: "rare", description: "Broadcasting worldwide. No dead zones.", unlockRequirement: "Viewers from 10+ countries" },
  { id: "vr-headset", name: "The Metaverse", emoji: "🥽", category: "tech", rarity: "epic", description: "Reality is what you make it.", unlockRequirement: "100 VR sessions" },
  { id: "crystal-ball", name: "The Oracle", emoji: "🔮", category: "tech", rarity: "legendary", description: "You saw the future before it happened.", unlockRequirement: "Cherry Immortal status" },

  // ── Nature ──
  { id: "butterfly", name: "The Metamorphosis", emoji: "🦋", category: "nature", rarity: "uncommon", description: "Beautiful transformation. The glow-up is real.", unlockRequirement: "Complete 3 Academy modules" },
  { id: "rose", name: "The Rose", emoji: "🌹", category: "nature", rarity: "rare", description: "Beauty with thorns. Handle with respect.", unlockRequirement: "200 Crushes" },
  { id: "cherry-blossom", name: "The Sakura", emoji: "🌸", category: "nature", rarity: "rare", description: "Fleeting beauty that stops the world.", unlockRequirement: "Top Cherry in any Asian city" },
  { id: "moon", name: "The Moon", emoji: "🌙", category: "nature", rarity: "epic", description: "You light up the darkness.", unlockRequirement: "Peak 5,000+ viewers" },

  // ── Royal ──
  { id: "queen-chess", name: "The Queen", emoji: "♛", category: "royal", rarity: "legendary", description: "The most powerful piece on the board.", unlockRequirement: "Top 3 in Country" },
  { id: "throne", name: "The Throne", emoji: "🪑", category: "royal", rarity: "mythic", description: "They built it for you. Now sit.", unlockRequirement: "#1 in any Country" },
  { id: "scepter", name: "The Scepter", emoji: "🏆", category: "royal", rarity: "mythic", description: "Royal authority. Global reign.", unlockRequirement: "World Top 3" },

  // ── Cosmic ──
  { id: "star", name: "The Star", emoji: "⭐", category: "cosmic", rarity: "rare", description: "You don't just shine — you supernova.", unlockRequirement: "$25,000 earned" },
  { id: "comet", name: "The Comet", emoji: "☄️", category: "cosmic", rarity: "epic", description: "Once in a generation. That's you.", unlockRequirement: "90-day streak" },
  { id: "galaxy", name: "The Galaxy", emoji: "🌌", category: "cosmic", rarity: "legendary", description: "Entire worlds orbit around you.", unlockRequirement: "World Top 10" },
  { id: "infinity", name: "The Infinite", emoji: "♾️", category: "cosmic", rarity: "mythic", description: "Limitless. Boundless. Eternal Cherry.", unlockRequirement: "Cherry Immortal + $100K earned" },

  // ── Legendary (One-of-a-kind) ──
  { id: "midas", name: "The Midas Touch", emoji: "🫱🏽", category: "legendary", rarity: "mythic", description: "Everything you touch turns to gold. Literally.", unlockRequirement: "World #1 overall" },
  { id: "diamond-cherry", name: "The Diamond Cherry", emoji: "💎", category: "legendary", rarity: "mythic", description: "The rarest piece in the game. A cherry cut from a diamond.", unlockRequirement: "All 6 Empire pillars unlocked" },
];

export const RARITY_CONFIG: Record<string, { color: string; bg: string; glow: string }> = {
  common: { color: "#9ca3af", bg: "bg-gray-500/10", glow: "" },
  uncommon: { color: "#22c55e", bg: "bg-emerald-500/10", glow: "" },
  rare: { color: "#3b82f6", bg: "bg-blue-500/10", glow: "shadow-[0_0_12px_rgba(59,130,246,0.15)]" },
  epic: { color: "#a855f7", bg: "bg-purple-500/10", glow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]" },
  legendary: { color: "#f59e0b", bg: "bg-amber-500/10", glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]" },
  mythic: { color: "#ff0033", bg: "bg-cherry-500/10", glow: "shadow-[0_0_25px_rgba(255,0,51,0.3)]" }
};
