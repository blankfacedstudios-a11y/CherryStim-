import type { EliteStatus } from "./rankings";

export type RewardCategory = "certificate" | "nft" | "cherrycoin" | "gift" | "travel" | "housing" | "lifestyle" | "career";

export interface Reward {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: RewardCategory;
  value: string;
  minStatus: EliteStatus;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond" | "cherry";
  oneTime: boolean;
}

export const REWARDS: Reward[] = [
  // ═══════════════════════════════════════════════════
  //  CERTIFICATES (Digital + Physical, Blockchain-verified)
  // ═══════════════════════════════════════════════════
  { id: "cert-stream-100", name: "Century Streamer Certificate", emoji: "📜", description: "Certified completion of 100 streaming hours on CherryStim platform. Blockchain-verified, printable.", category: "certificate", value: "Digital + Physical", minStatus: "Cherry Blossom", tier: "bronze", oneTime: true },
  { id: "cert-academy-grad", name: "Financial Academy Graduate", emoji: "🎓", description: "Completed all 8 Financial Academy modules with 80%+ quiz scores. Framed certificate shipped.", category: "certificate", value: "Framed Certificate", minStatus: "Cherry Blossom", tier: "silver", oneTime: true },
  { id: "cert-gold", name: "Cherry Gold Certification", emoji: "🏅", description: "Official Cherry Gold status achievement. NFT certificate + physical plaque.", category: "certificate", value: "NFT + Plaque", minStatus: "Cherry Gold", tier: "gold", oneTime: true },
  { id: "cert-diamond", name: "Cherry Diamond Certification", emoji: "💠", description: "Elite Diamond status. Crystal trophy + blockchain-minted certificate.", category: "certificate", value: "Crystal Trophy + NFT", minStatus: "Cherry Diamond", tier: "diamond", oneTime: true },
  { id: "cert-crown", name: "Cherry Crown Certification", emoji: "👑", description: "Crown achievement. Custom engraved crown trophy + lifetime certificate.", category: "certificate", value: "Crown Trophy + Lifetime NFT", minStatus: "Cherry Crown", tier: "cherry", oneTime: true },
  { id: "cert-immortal", name: "Cherry Immortal Induction", emoji: "🏛️", description: "Inducted into the CherryStim Hall of Immortals. Permanent display at all CherryStim venues worldwide.", category: "certificate", value: "Hall of Fame + Legacy NFT", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },

  // ═══════════════════════════════════════════════════
  //  NFT REWARDS (Exclusive collectible assets)
  // ═══════════════════════════════════════════════════
  { id: "nft-first-stream", name: "Genesis Stream NFT", emoji: "🎬", description: "Commemorative NFT of your first CherryStim stream. One-of-one, forever on-chain.", category: "nft", value: "1/1 NFT", minStatus: "Cherry Blossom", tier: "bronze", oneTime: true },
  { id: "nft-top-city", name: "City Champion NFT", emoji: "🏙️", description: "Animated NFT for reaching #1 in your city. Changes design per city.", category: "nft", value: "Animated NFT", minStatus: "Cherry Gold", tier: "gold", oneTime: false },
  { id: "nft-top-country", name: "National Crown NFT", emoji: "🗺️", description: "Premium 3D NFT for reaching #1 in your country. Includes flag + custom animation.", category: "nft", value: "3D Animated NFT", minStatus: "Cherry Diamond", tier: "diamond", oneTime: false },
  { id: "nft-world-top10", name: "Global Elite NFT Collection", emoji: "🌍", description: "10-piece animated NFT collection for World Top 10. Each piece represents a different CherryStim era.", category: "nft", value: "10-Piece Collection", minStatus: "Cherry Crown", tier: "cherry", oneTime: true },
  { id: "nft-immortal-avatar", name: "Immortal Metaverse Avatar", emoji: "🧬", description: "Custom 3D avatar for the CherryStim metaverse. Full body scan, custom animations, exclusive skins.", category: "nft", value: "Custom 3D Avatar NFT", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },

  // ═══════════════════════════════════════════════════
  //  CHERRYCOIN REWARDS
  // ═══════════════════════════════════════════════════
  { id: "coin-weekly-bonus", name: "Weekly Top Cherry Bonus", emoji: "🪙", description: "Weekly CherryCoin bonus for top performers in each geographic tier.", category: "cherrycoin", value: "500–5,000 CherryCoins/week", minStatus: "Cherry Blossom", tier: "bronze", oneTime: false },
  { id: "coin-streak-30", name: "30-Day Streak Bonus", emoji: "🔥", description: "30 consecutive streaming days. Major CherryCoin drop.", category: "cherrycoin", value: "10,000 CherryCoins", minStatus: "Cherry Blossom", tier: "silver", oneTime: false },
  { id: "coin-gold-bonus", name: "Cherry Gold Welcome Package", emoji: "💰", description: "One-time CherryCoin bonus upon achieving Cherry Gold status.", category: "cherrycoin", value: "25,000 CherryCoins", minStatus: "Cherry Gold", tier: "gold", oneTime: true },
  { id: "coin-diamond-bonus", name: "Diamond Drop", emoji: "💎", description: "Massive CherryCoin airdrop upon Diamond status. Plus monthly Diamond stipend.", category: "cherrycoin", value: "100,000 Coins + 10K/month", minStatus: "Cherry Diamond", tier: "diamond", oneTime: true },
  { id: "coin-crown-treasury", name: "Crown Treasury Access", emoji: "🏦", description: "Direct access to CherryStim platform treasury for bonus draws. Monthly allocation.", category: "cherrycoin", value: "50,000 CherryCoins/month", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "coin-immortal-stake", name: "Immortal Staking Pool", emoji: "♾️", description: "Exclusive staking pool with 15% APY. Only Immortals can deposit. Compounding CherryCoin.", category: "cherrycoin", value: "15% APY Exclusive Pool", minStatus: "Cherry Immortal", tier: "cherry", oneTime: false },

  // ═══════════════════════════════════════════════════
  //  EXCLUSIVE GIFTS (Physical items shipped worldwide)
  // ═══════════════════════════════════════════════════
  { id: "gift-merch", name: "CherryStim Merch Box", emoji: "📦", description: "Exclusive merch: hoodie, hat, phone case, poster — all Cherry-branded with your name.", category: "gift", value: "$250 Merch Package", minStatus: "Cherry Gold", tier: "gold", oneTime: true },
  { id: "gift-jewelry", name: "Cherry Diamond Jewelry Set", emoji: "💍", description: "Custom CherryStim jewelry: pendant, bracelet, earrings. 14K gold with cherry motif.", category: "gift", value: "$2,500 Jewelry Set", minStatus: "Cherry Diamond", tier: "diamond", oneTime: true },
  { id: "gift-tech", name: "Creator Tech Suite", emoji: "🖥️", description: "Full streaming upgrade: 4K camera, ring light, mic, green screen, VR headset.", category: "gift", value: "$5,000 Tech Package", minStatus: "Cherry Diamond", tier: "diamond", oneTime: true },
  { id: "gift-wardrobe", name: "Designer Wardrobe Allowance", emoji: "👗", description: "Quarterly designer wardrobe budget for shoots, events, and content.", category: "gift", value: "$3,000/quarter", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "gift-car", name: "Cherry Crown Signature Vehicle", emoji: "🏎️", description: "Cherry-wrapped luxury vehicle lease. Mercedes, BMW, or Tesla — your choice.", category: "gift", value: "$60,000 Vehicle Lease", minStatus: "Cherry Crown", tier: "cherry", oneTime: true },
  { id: "gift-watch", name: "Immortal Timepiece", emoji: "⌚", description: "Custom CherryStim x luxury watch collab. One-of-one piece with your Cherry number engraved.", category: "gift", value: "$25,000 Custom Watch", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },

  // ═══════════════════════════════════════════════════
  //  TRAVEL & ACCOMMODATIONS
  // ═══════════════════════════════════════════════════
  { id: "travel-domestic", name: "Domestic Flight Credits", emoji: "🛫", description: "Round-trip domestic flights for CherryStim events, shoots, and appearances.", category: "travel", value: "4 flights/year", minStatus: "Cherry Gold", tier: "gold", oneTime: false },
  { id: "travel-hotel-gold", name: "Hotel Accommodation Package", emoji: "🏨", description: "Hotel stays for CherryStim events. 4-star accommodations, 2 nights per event.", category: "travel", value: "Up to 8 nights/year", minStatus: "Cherry Gold", tier: "gold", oneTime: false },
  { id: "travel-intl", name: "International Travel Package", emoji: "✈️", description: "International flights + 5-star hotels for global CherryStim events and venue appearances.", category: "travel", value: "Business class + 5-star hotel", minStatus: "Cherry Diamond", tier: "diamond", oneTime: false },
  { id: "travel-crown-unlimited", name: "Crown Global Travel Card", emoji: "🌍", description: "Unlimited business class flights worldwide + luxury hotel bookings for all CherryStim business.", category: "travel", value: "Unlimited travel + $500/day per diem", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "travel-immortal-first", name: "Immortal First Class Everything", emoji: "🥂", description: "First class flights, presidential suites, private car service. Anywhere, anytime, for any CherryStim purpose.", category: "travel", value: "First class + Suite + Car", minStatus: "Cherry Immortal", tier: "cherry", oneTime: false },

  // ═══════════════════════════════════════════════════
  //  HOUSING & BILLS (Life-changing financial support)
  // ═══════════════════════════════════════════════════
  { id: "house-rent-assist", name: "Rent Assistance Program", emoji: "🏠", description: "Monthly rent assistance for qualifying Cherry Diamond performers maintaining top rankings.", category: "housing", value: "Up to $1,500/month rent", minStatus: "Cherry Diamond", tier: "diamond", oneTime: false },
  { id: "house-bills", name: "Bills Paid Program", emoji: "💡", description: "Utilities, internet, phone bill covered for Cherry Crown members. Focus on your craft, not bills.", category: "housing", value: "Utilities + Internet + Phone", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "house-rent-full", name: "Full Rent Coverage", emoji: "🏡", description: "Full rent payment up to $3,500/month. Live where you want, stream how you want.", category: "housing", value: "Up to $3,500/month rent", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "house-mortgage", name: "Homeowner Assistance Fund", emoji: "🏘️", description: "Down payment assistance or mortgage contribution for Cherry Immortals building long-term wealth.", category: "housing", value: "Up to $50,000 toward home purchase", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },
  { id: "house-relocation", name: "Global Relocation Package", emoji: "🌎", description: "Full relocation package to any CherryStim hub city. Moving costs, first/last month, furniture allowance.", category: "housing", value: "$15,000 relocation + 3 months rent", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },

  // ═══════════════════════════════════════════════════
  //  LIFESTYLE & CAREER
  // ═══════════════════════════════════════════════════
  { id: "life-health", name: "Health & Wellness Stipend", emoji: "🧘", description: "Monthly wellness budget: gym, spa, therapy, nutrition coaching.", category: "lifestyle", value: "$500/month", minStatus: "Cherry Diamond", tier: "diamond", oneTime: false },
  { id: "life-education", name: "Education Fund", emoji: "📚", description: "Tuition assistance for college, certifications, or professional development courses.", category: "lifestyle", value: "Up to $10,000/year", minStatus: "Cherry Diamond", tier: "diamond", oneTime: false },
  { id: "life-legal", name: "Legal & Financial Advisory", emoji: "⚖️", description: "Access to CherryStim's legal and financial advisory team. Contract review, tax planning, business formation.", category: "lifestyle", value: "Unlimited consultations", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "career-agent", name: "Personal Talent Agent", emoji: "🤝", description: "Dedicated talent agent for booking acting, modeling, print gigs, and brand deals outside CherryStim.", category: "career", value: "Full talent representation", minStatus: "Cherry Crown", tier: "cherry", oneTime: false },
  { id: "career-brand", name: "Personal Brand Development", emoji: "🎨", description: "Full brand identity: logo, website, social media strategy, content team, PR representation.", category: "career", value: "$25,000 brand package", minStatus: "Cherry Crown", tier: "cherry", oneTime: true },
  { id: "career-equity", name: "CherryStim Equity Program", emoji: "📊", description: "Stock options / equity participation in CherryStim Inc. Build ownership in the platform you helped create.", category: "career", value: "Equity grant (vesting schedule)", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },
  { id: "career-foundation", name: "Cherry Foundation Grant", emoji: "🏛️", description: "Funding for your own charitable initiative or community project through the CherryStim Foundation.", category: "career", value: "Up to $50,000 grant", minStatus: "Cherry Immortal", tier: "cherry", oneTime: true },
];

export const REWARD_TIER_COLORS: Record<string, { color: string; label: string }> = {
  bronze: { color: "#cd7f32", label: "Bronze" },
  silver: { color: "#c0c0c0", label: "Silver" },
  gold: { color: "#ffd700", label: "Gold" },
  platinum: { color: "#e5e4e2", label: "Platinum" },
  diamond: { color: "#b9f2ff", label: "Diamond" },
  cherry: { color: "#ff0033", label: "Cherry" }
};

export function getRewardsByCategory(): Record<string, Reward[]> {
  const map: Record<string, Reward[]> = {};
  for (const r of REWARDS) {
    if (!map[r.category]) map[r.category] = [];
    map[r.category].push(r);
  }
  return map;
}

export function getRewardsForStatus(status: EliteStatus): Reward[] {
  const statusOrder: EliteStatus[] = ["Cherry Blossom", "Cherry Gold", "Cherry Diamond", "Cherry Crown", "Cherry Immortal"];
  const statusIdx = statusOrder.indexOf(status);
  return REWARDS.filter((r) => statusOrder.indexOf(r.minStatus) <= statusIdx);
}
