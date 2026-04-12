export type GeographicTier = "city" | "state" | "region" | "country" | "world";

export type EliteStatus =
  | "Cherry Blossom"
  | "Cherry Gold"
  | "Cherry Diamond"
  | "Cherry Crown"
  | "Cherry Immortal";

export interface CherryMetrics {
  appCash: number;
  nftRevenue: number;
  wishCampaigns: number;
  actingGigs: number;
  modelingGigs: number;
  printGigs: number;
  crushes: number;
  sprungs: number;
  streamHours: number;
  viewerPeak: number;
  giftsReceived: number;
  tipsTotal: number;
  immersiveSessions: number;
  vrSessions: number;
  privateSessions: number;
  repeatClients: number;
  academyXP: number;
  engagementScore: number;
}

export interface RankedCherry {
  id: string;
  name: string;
  avatar: string;
  city: string;
  state: string;
  region: string;
  country: string;
  tier: string;
  eliteStatus: EliteStatus;
  totalScore: number;
  metrics: CherryMetrics;
  rank: Record<GeographicTier, number>;
  badges: string[];
  streakDays: number;
  joinedDate: string;
  verified: boolean;
}

const METRIC_WEIGHTS: Record<keyof CherryMetrics, number> = {
  appCash: 1.0,
  nftRevenue: 1.5,
  wishCampaigns: 2.0,
  actingGigs: 3.0,
  modelingGigs: 2.5,
  printGigs: 2.0,
  crushes: 0.8,
  sprungs: 1.2,
  streamHours: 0.5,
  viewerPeak: 0.3,
  giftsReceived: 0.6,
  tipsTotal: 0.9,
  immersiveSessions: 1.8,
  vrSessions: 1.5,
  privateSessions: 2.2,
  repeatClients: 2.5,
  academyXP: 0.4,
  engagementScore: 1.0
};

export function calculateTotalScore(metrics: CherryMetrics): number {
  let score = 0;
  for (const [key, weight] of Object.entries(METRIC_WEIGHTS)) {
    score += (metrics[key as keyof CherryMetrics] || 0) * weight;
  }
  return Math.round(score);
}

export function determineEliteStatus(worldRank: number, totalCherries: number): EliteStatus {
  const percentile = (worldRank / totalCherries) * 100;
  if (percentile <= 1) return "Cherry Immortal";
  if (percentile <= 5) return "Cherry Crown";
  if (percentile <= 15) return "Cherry Diamond";
  if (percentile <= 35) return "Cherry Gold";
  return "Cherry Blossom";
}

export const ELITE_CONFIG: Record<EliteStatus, { color: string; perks: string[]; unlocks: string[] }> = {
  "Cherry Blossom": {
    color: "#ff9ec4",
    perks: ["Standard competition access", "City leaderboard visibility", "Basic analytics"],
    unlocks: []
  },
  "Cherry Gold": {
    color: "#ffd700",
    perks: ["Priority booking queue", "Gold badge on profile", "State leaderboard featured", "Enhanced analytics dashboard"],
    unlocks: ["CherryStim YouTube feature eligibility", "Rumble channel spotlight"]
  },
  "Cherry Diamond": {
    color: "#b9f2ff",
    perks: ["Diamond verified badge", "Region/Country leaderboard featured", "Priority support", "Revenue split bonus (+2%)", "Exclusive Virtuoso lounge access"],
    unlocks: ["CherryStim Magazine feature", "Television channel audition", "Exclusive VR Virtuoso Club access", "High-stakes virtual stripclub hosting"]
  },
  "Cherry Crown": {
    color: "#e2c0ff",
    perks: ["Crown badge (animated)", "Country-wide feature rotation", "Revenue split bonus (+5%)", "Personal brand manager", "Dedicated LiveKit stream priority"],
    unlocks: ["CherryStim TV series casting", "Magazine cover eligibility", "Real-life CherryStim Gentlemen's Club hosting", "Casino event headliner", "Exclusive immersive world avatar"]
  },
  "Cherry Immortal": {
    color: "#ff0033",
    perks: ["Immortal animated badge", "Global #1 feature", "Revenue split bonus (+8%)", "Equity participation program", "C-Suite advisory board seat", "Unlimited private session credits"],
    unlocks: ["CherryStim Magazine permanent column", "TV channel executive producer credit", "YouTube/Rumble co-ownership channel", "Real-life venue naming rights", "Casino residency", "Global brand ambassador", "Metaverse world architect access", "Fortune 500 networking events"]
  }
};

export const GEOGRAPHIC_REGIONS: Record<string, string[]> = {
  "West Coast": ["California", "Oregon", "Washington", "Nevada", "Arizona", "Hawaii"],
  "East Coast": ["New York", "New Jersey", "Connecticut", "Massachusetts", "Florida", "Georgia", "Pennsylvania", "Virginia", "Maryland"],
  "Midwest": ["Illinois", "Ohio", "Michigan", "Indiana", "Wisconsin", "Minnesota", "Missouri", "Iowa"],
  "South": ["Texas", "Tennessee", "Louisiana", "Alabama", "Mississippi", "Carolinas", "Kentucky", "Arkansas"],
  "Mountain": ["Colorado", "Utah", "Montana", "Wyoming", "Idaho", "New Mexico"],
  "Caribbean": ["Puerto Rico", "Dominican Republic", "Jamaica", "Bahamas", "Barbados", "Trinidad"],
  "Europe West": ["UK", "France", "Spain", "Portugal", "Netherlands", "Ireland"],
  "Europe Central": ["Germany", "Switzerland", "Austria", "Italy", "Belgium"],
  "Asia Pacific": ["Japan", "South Korea", "Australia", "New Zealand", "Singapore"],
  "Southeast Asia": ["Philippines", "Thailand", "Vietnam", "Indonesia", "Malaysia"],
  "Africa": ["South Africa", "Nigeria", "Kenya", "Ghana", "Egypt", "Morocco"],
  "Latin America": ["Mexico", "Brazil", "Colombia", "Argentina", "Chile"]
};

export const SAMPLE_CHERRIES: RankedCherry[] = [
  { id: "c1", name: "Luna Rose", avatar: "LR", city: "Miami", state: "Florida", region: "East Coast", country: "United States", tier: "Virtuoso", eliteStatus: "Cherry Crown", totalScore: 284920, metrics: { appCash: 48290, nftRevenue: 12400, wishCampaigns: 3, actingGigs: 2, modelingGigs: 5, printGigs: 3, crushes: 1243, sprungs: 892, streamHours: 342, viewerPeak: 4200, giftsReceived: 8420, tipsTotal: 14200, immersiveSessions: 86, vrSessions: 124, privateSessions: 45, repeatClients: 128, academyXP: 780, engagementScore: 94 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 1 }, badges: ["Top Earner", "Fan Favorite", "VR Pioneer", "Streak Queen"], streakDays: 142, joinedDate: "2024-03-15", verified: true },
  { id: "c2", name: "Velvet Siren", avatar: "VS", city: "Dubai", state: "Dubai", region: "Middle East", country: "UAE", tier: "Virtuoso", eliteStatus: "Cherry Crown", totalScore: 248150, metrics: { appCash: 42150, nftRevenue: 18200, wishCampaigns: 2, actingGigs: 1, modelingGigs: 8, printGigs: 6, crushes: 1456, sprungs: 1024, streamHours: 298, viewerPeak: 3800, giftsReceived: 7200, tipsTotal: 11800, immersiveSessions: 72, vrSessions: 98, privateSessions: 62, repeatClients: 156, academyXP: 640, engagementScore: 91 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 2 }, badges: ["International Star", "NFT Queen", "Luxury Brand"], streakDays: 118, joinedDate: "2024-04-02", verified: true },
  { id: "c3", name: "Scarlet Noir", avatar: "SN", city: "Paris", state: "Île-de-France", region: "Europe West", country: "France", tier: "Virtuoso", eliteStatus: "Cherry Diamond", totalScore: 198700, metrics: { appCash: 38700, nftRevenue: 8900, wishCampaigns: 4, actingGigs: 4, modelingGigs: 12, printGigs: 8, crushes: 892, sprungs: 645, streamHours: 256, viewerPeak: 2800, giftsReceived: 5400, tipsTotal: 9200, immersiveSessions: 54, vrSessions: 78, privateSessions: 38, repeatClients: 94, academyXP: 720, engagementScore: 88 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 3 }, badges: ["European Icon", "Acting Star", "Fashion Maven"], streakDays: 96, joinedDate: "2024-05-10", verified: true },
  { id: "c4", name: "Diamond Jade", avatar: "DJ", city: "Los Angeles", state: "California", region: "West Coast", country: "United States", tier: "Pro", eliteStatus: "Cherry Diamond", totalScore: 168420, metrics: { appCash: 31420, nftRevenue: 6200, wishCampaigns: 2, actingGigs: 6, modelingGigs: 4, printGigs: 2, crushes: 674, sprungs: 512, streamHours: 224, viewerPeak: 2400, giftsReceived: 4800, tipsTotal: 7600, immersiveSessions: 42, vrSessions: 62, privateSessions: 28, repeatClients: 72, academyXP: 540, engagementScore: 82 }, rank: { city: 1, state: 2, region: 2, country: 4, world: 4 }, badges: ["Hollywood Cherry", "3D Stage Master"], streakDays: 78, joinedDate: "2024-06-20", verified: true },
  { id: "c5", name: "Golden Child", avatar: "GC", city: "Atlanta", state: "Georgia", region: "East Coast", country: "United States", tier: "Virtuoso", eliteStatus: "Cherry Gold", totalScore: 142800, metrics: { appCash: 25000, nftRevenue: 4800, wishCampaigns: 1, actingGigs: 1, modelingGigs: 3, printGigs: 2, crushes: 580, sprungs: 420, streamHours: 198, viewerPeak: 1800, giftsReceived: 3600, tipsTotal: 6400, immersiveSessions: 36, vrSessions: 48, privateSessions: 22, repeatClients: 58, academyXP: 860, engagementScore: 78 }, rank: { city: 1, state: 1, region: 3, country: 5, world: 5 }, badges: ["Academy Scholar", "Southern Belle", "Rising Star"], streakDays: 64, joinedDate: "2024-07-01", verified: true },
  { id: "c6", name: "Cherry Blossom Tokyo", avatar: "CB", city: "Tokyo", state: "Tokyo", region: "Asia Pacific", country: "Japan", tier: "Pro", eliteStatus: "Cherry Gold", totalScore: 128400, metrics: { appCash: 22800, nftRevenue: 9600, wishCampaigns: 1, actingGigs: 0, modelingGigs: 6, printGigs: 4, crushes: 420, sprungs: 310, streamHours: 186, viewerPeak: 2200, giftsReceived: 5200, tipsTotal: 4800, immersiveSessions: 28, vrSessions: 86, privateSessions: 18, repeatClients: 42, academyXP: 480, engagementScore: 85 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 6 }, badges: ["Asia #1", "VR Virtuosa", "Tech Pioneer"], streakDays: 52, joinedDate: "2024-08-15", verified: true },
  { id: "c7", name: "Cinnamon Blaze", avatar: "CB", city: "Lagos", state: "Lagos", region: "Africa", country: "Nigeria", tier: "Pro", eliteStatus: "Cherry Gold", totalScore: 112600, metrics: { appCash: 18400, nftRevenue: 3200, wishCampaigns: 2, actingGigs: 3, modelingGigs: 2, printGigs: 1, crushes: 380, sprungs: 280, streamHours: 162, viewerPeak: 1400, giftsReceived: 2800, tipsTotal: 5200, immersiveSessions: 24, vrSessions: 34, privateSessions: 16, repeatClients: 36, academyXP: 620, engagementScore: 76 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 7 }, badges: ["Africa #1", "Nollywood Cherry", "Community Builder"], streakDays: 48, joinedDate: "2024-09-01", verified: true },
  { id: "c8", name: "Manila Dream", avatar: "MD", city: "Manila", state: "Metro Manila", region: "Southeast Asia", country: "Philippines", tier: "Pro", eliteStatus: "Cherry Blossom", totalScore: 94200, metrics: { appCash: 14200, nftRevenue: 2400, wishCampaigns: 1, actingGigs: 2, modelingGigs: 3, printGigs: 2, crushes: 320, sprungs: 240, streamHours: 142, viewerPeak: 1200, giftsReceived: 2200, tipsTotal: 4200, immersiveSessions: 18, vrSessions: 26, privateSessions: 12, repeatClients: 28, academyXP: 380, engagementScore: 72 }, rank: { city: 1, state: 1, region: 1, country: 1, world: 8 }, badges: ["Philippines #1", "Rising Star"], streakDays: 36, joinedDate: "2024-10-15", verified: true },
  { id: "c9", name: "Havana Flame", avatar: "HF", city: "Santo Domingo", state: "DN", region: "Caribbean", country: "Dominican Republic", tier: "Pro", eliteStatus: "Cherry Blossom", totalScore: 82400, metrics: { appCash: 12600, nftRevenue: 1800, wishCampaigns: 1, actingGigs: 1, modelingGigs: 2, printGigs: 1, crushes: 280, sprungs: 210, streamHours: 128, viewerPeak: 980, giftsReceived: 1800, tipsTotal: 3600, immersiveSessions: 14, vrSessions: 22, privateSessions: 10, repeatClients: 22, academyXP: 320, engagementScore: 68 }, rank: { city: 1, state: 1, region: 2, country: 1, world: 9 }, badges: ["Caribbean Queen", "Island Vibes"], streakDays: 28, joinedDate: "2024-11-01", verified: true },
  { id: "c10", name: "Sydney Spark", avatar: "SS", city: "Sydney", state: "NSW", region: "Asia Pacific", country: "Australia", tier: "Pro", eliteStatus: "Cherry Blossom", totalScore: 76800, metrics: { appCash: 11400, nftRevenue: 2200, wishCampaigns: 1, actingGigs: 0, modelingGigs: 4, printGigs: 3, crushes: 240, sprungs: 180, streamHours: 116, viewerPeak: 860, giftsReceived: 1600, tipsTotal: 3200, immersiveSessions: 12, vrSessions: 18, privateSessions: 8, repeatClients: 18, academyXP: 420, engagementScore: 65 }, rank: { city: 1, state: 1, region: 2, country: 1, world: 10 }, badges: ["Down Under Star", "Aussie Cherry"], streakDays: 22, joinedDate: "2024-11-20", verified: true },
];
