export interface CherryEmoji {
  code: string;
  emoji: string;
  name: string;
  category: string;
}

export const CHERRY_EMOJIS: CherryEmoji[] = [
  // ── Cherry Originals ──
  { code: ":cherry:", emoji: "🍒", name: "Cherry", category: "Cherry Originals" },
  { code: ":cherry-fire:", emoji: "🍒🔥", name: "Cherry Fire", category: "Cherry Originals" },
  { code: ":cherry-crown:", emoji: "🍒👑", name: "Cherry Crown", category: "Cherry Originals" },
  { code: ":cherry-diamond:", emoji: "🍒💎", name: "Cherry Diamond", category: "Cherry Originals" },
  { code: ":cherry-gold:", emoji: "🍒🏅", name: "Cherry Gold", category: "Cherry Originals" },
  { code: ":cherry-blossom:", emoji: "🌸", name: "Cherry Blossom", category: "Cherry Originals" },
  { code: ":cherry-bomb:", emoji: "🍒💣", name: "Cherry Bomb", category: "Cherry Originals" },
  { code: ":cherry-rain:", emoji: "🍒🌧️", name: "Cherry Rain (making it rain)", category: "Cherry Originals" },

  // ── Reactions & Vibes ──
  { code: ":fire:", emoji: "🔥", name: "Fire", category: "Reactions" },
  { code: ":100:", emoji: "💯", name: "One Hundred", category: "Reactions" },
  { code: ":eyes:", emoji: "👀", name: "Eyes (I see you)", category: "Reactions" },
  { code: ":heart-eyes:", emoji: "😍", name: "Heart Eyes", category: "Reactions" },
  { code: ":mind-blown:", emoji: "🤯", name: "Mind Blown", category: "Reactions" },
  { code: ":drool:", emoji: "🤤", name: "Drooling", category: "Reactions" },
  { code: ":hot:", emoji: "🥵", name: "Hot", category: "Reactions" },
  { code: ":clap:", emoji: "👏", name: "Clapping", category: "Reactions" },
  { code: ":raised:", emoji: "🙌", name: "Praise", category: "Reactions" },
  { code: ":flex:", emoji: "💪", name: "Flex", category: "Reactions" },
  { code: ":nail:", emoji: "💅", name: "Nail Polish (unbothered)", category: "Reactions" },
  { code: ":wink:", emoji: "😘", name: "Kiss Wink", category: "Reactions" },
  { code: ":peach:", emoji: "🍑", name: "Peach", category: "Reactions" },
  { code: ":spicy:", emoji: "🌶️", name: "Spicy", category: "Reactions" },

  // ── Money & Hustle ──
  { code: ":money-bag:", emoji: "💰", name: "Money Bag", category: "Money" },
  { code: ":money-fly:", emoji: "💸", name: "Money Wings", category: "Money" },
  { code: ":diamond:", emoji: "💎", name: "Diamond", category: "Money" },
  { code: ":coin:", emoji: "🪙", name: "CherryCoin", category: "Money" },
  { code: ":credit:", emoji: "💳", name: "Card", category: "Money" },
  { code: ":chart-up:", emoji: "📈", name: "Stonks", category: "Money" },
  { code: ":rocket:", emoji: "🚀", name: "To The Moon", category: "Money" },
  { code: ":bank:", emoji: "🏦", name: "Bank", category: "Money" },
  { code: ":crown:", emoji: "👑", name: "Crown", category: "Money" },

  // ── Gifts & Luxury ──
  { code: ":gift:", emoji: "🎁", name: "Gift", category: "Gifts" },
  { code: ":rose:", emoji: "🌹", name: "Rose", category: "Gifts" },
  { code: ":champagne:", emoji: "🍾", name: "Champagne", category: "Gifts" },
  { code: ":ring:", emoji: "💍", name: "Ring", category: "Gifts" },
  { code: ":teddy:", emoji: "🧸", name: "Teddy Bear", category: "Gifts" },
  { code: ":bouquet:", emoji: "💐", name: "Bouquet", category: "Gifts" },
  { code: ":chocolate:", emoji: "🍫", name: "Chocolate", category: "Gifts" },
  { code: ":balloon:", emoji: "🎈", name: "Balloon", category: "Gifts" },
  { code: ":trophy:", emoji: "🏆", name: "Trophy", category: "Gifts" },
  { code: ":medal:", emoji: "🥇", name: "Gold Medal", category: "Gifts" },
  { code: ":sparkle:", emoji: "✨", name: "Sparkles", category: "Gifts" },

  // ── Nightlife & Entertainment ──
  { code: ":disco:", emoji: "🪩", name: "Disco Ball", category: "Nightlife" },
  { code: ":cocktail:", emoji: "🍸", name: "Cocktail", category: "Nightlife" },
  { code: ":dancer:", emoji: "💃", name: "Dancer", category: "Nightlife" },
  { code: ":pole:", emoji: "🩰", name: "Pole (ballet)", category: "Nightlife" },
  { code: ":headphones:", emoji: "🎧", name: "DJ Headphones", category: "Nightlife" },
  { code: ":mic:", emoji: "🎤", name: "Microphone", category: "Nightlife" },
  { code: ":spotlight:", emoji: "🔦", name: "Spotlight", category: "Nightlife" },
  { code: ":party:", emoji: "🎉", name: "Party", category: "Nightlife" },
  { code: ":vip:", emoji: "🎟️", name: "VIP Pass", category: "Nightlife" },

  // ── Travel & Lifestyle ──
  { code: ":plane:", emoji: "✈️", name: "Jet Set", category: "Travel" },
  { code: ":palm:", emoji: "🌴", name: "Palm Tree", category: "Travel" },
  { code: ":island:", emoji: "🏝️", name: "Island Life", category: "Travel" },
  { code: ":sunset:", emoji: "🌅", name: "Sunset", category: "Travel" },
  { code: ":hotel:", emoji: "🏨", name: "Hotel", category: "Travel" },
  { code: ":beach:", emoji: "🏖️", name: "Beach", category: "Travel" },
  { code: ":globe:", emoji: "🌍", name: "World", category: "Travel" },

  // ── Competition & Gaming ──
  { code: ":dice:", emoji: "🎲", name: "Dice", category: "Gaming" },
  { code: ":chess:", emoji: "♟️", name: "Chess Piece", category: "Gaming" },
  { code: ":target:", emoji: "🎯", name: "Bullseye", category: "Gaming" },
  { code: ":boxing:", emoji: "🥊", name: "Boxing Glove", category: "Gaming" },
  { code: ":sword:", emoji: "⚔️", name: "Crossed Swords", category: "Gaming" },
  { code: ":shield:", emoji: "🛡️", name: "Shield", category: "Gaming" },
  { code: ":level-up:", emoji: "⬆️", name: "Level Up", category: "Gaming" },
  { code: ":joystick:", emoji: "🕹️", name: "Joystick", category: "Gaming" },
];

export function getEmojisByCategory(): Record<string, CherryEmoji[]> {
  const map: Record<string, CherryEmoji[]> = {};
  for (const e of CHERRY_EMOJIS) {
    if (!map[e.category]) map[e.category] = [];
    map[e.category].push(e);
  }
  return map;
}
