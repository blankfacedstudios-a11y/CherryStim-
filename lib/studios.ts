export interface StudioLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  status: "open" | "coming-2026" | "coming-2027" | "coming-2028";
  cubicles: number;
  sqft: number;
  features: string[];
  flagEmoji: string;
}

export const STUDIO_LOCATIONS: StudioLocation[] = [
  { id: "la", name: "CherryStim Studios LA", city: "Los Angeles", country: "United States", region: "West Coast", status: "open", cubicles: 350, sqft: 85000, features: ["Flagship location", "Full VR/3D/Immersive suites", "Rooftop broadcast deck", "In-house wardrobe & makeup", "Physical therapy & wellness center"], flagEmoji: "🇺🇸" },
  { id: "mia", name: "CherryStim Studios Miami", city: "Miami", country: "United States", region: "East Coast", status: "open", cubicles: 300, sqft: 72000, features: ["Ocean-view broadcast wings", "Tropical set designs", "Latin music production studio", "Pool deck for outdoor streams"], flagEmoji: "🇺🇸" },
  { id: "atl", name: "CherryStim Studios Atlanta", city: "Atlanta", country: "United States", region: "South", status: "coming-2026", cubicles: 300, sqft: 68000, features: ["Hip-hop culture integration", "Film studio partnership", "Live music stage", "Content creator co-working"], flagEmoji: "🇺🇸" },
  { id: "nyc", name: "CherryStim Studios NYC", city: "New York", country: "United States", region: "East Coast", status: "coming-2026", cubicles: 250, sqft: 55000, features: ["Manhattan penthouse aesthetic", "Fashion district proximity", "Broadway talent pipeline", "Rooftop skyline studio"], flagEmoji: "🇺🇸" },
  { id: "lv", name: "CherryStim Studios Vegas", city: "Las Vegas", country: "United States", region: "West Coast", status: "coming-2026", cubicles: 400, sqft: 95000, features: ["Casino floor integration", "24/7 live broadcast center", "Convention hosting", "VIP ultra-lounge sets"], flagEmoji: "🇺🇸" },
  { id: "pr", name: "CherryStim Studios San Juan", city: "San Juan", country: "Puerto Rico", region: "Caribbean", status: "coming-2026", cubicles: 200, sqft: 45000, features: ["Tax-advantaged (Act 60)", "Beachfront studio wings", "Bilingual production", "Caribbean artist residencies"], flagEmoji: "🇵🇷" },
  { id: "dr", name: "CherryStim Studios Santo Domingo", city: "Santo Domingo", country: "Dominican Republic", region: "Caribbean", status: "coming-2027", cubicles: 200, sqft: 42000, features: ["Caribbean flagship", "Tropical immersive sets", "Bachata/Dembow music studio", "Resort-style amenities"], flagEmoji: "🇩🇴" },
  { id: "lon", name: "CherryStim Studios London", city: "London", country: "United Kingdom", region: "Europe", status: "coming-2027", cubicles: 250, sqft: 58000, features: ["Soho entertainment district", "BBC production standards", "European talent hub", "Multicultural content"], flagEmoji: "🇬🇧" },
  { id: "dub", name: "CherryStim Studios Dubai", city: "Dubai", country: "UAE", region: "Middle East", status: "coming-2027", cubicles: 300, sqft: 75000, features: ["Gold-class facilities", "Desert/luxury set designs", "Tax-free operations", "Middle East talent gateway"], flagEmoji: "🇦🇪" },
  { id: "tok", name: "CherryStim Studios Tokyo", city: "Tokyo", country: "Japan", region: "Asia-Pacific", status: "coming-2027", cubicles: 250, sqft: 52000, features: ["Anime/cosplay integration", "Akihabara tech district", "J-pop production", "VR technology showcase"], flagEmoji: "🇯🇵" },
  { id: "man", name: "CherryStim Studios Manila", city: "Manila", country: "Philippines", region: "Southeast Asia", status: "coming-2027", cubicles: 300, sqft: 62000, features: ["Southeast Asia hub", "K-pop/P-pop talent pipeline", "Affordable excellence", "Island content expeditions"], flagEmoji: "🇵🇭" },
  { id: "lag", name: "CherryStim Studios Lagos", city: "Lagos", country: "Nigeria", region: "Africa", status: "coming-2028", cubicles: 200, sqft: 48000, features: ["Nollywood integration", "Afrobeats production", "Pan-African talent pipeline", "Cultural content focus"], flagEmoji: "🇳🇬" },
  { id: "syd", name: "CherryStim Studios Sydney", city: "Sydney", country: "Australia", region: "Oceania", status: "coming-2028", cubicles: 200, sqft: 45000, features: ["Harbour-view broadcast", "Oceania talent hub", "Aboriginal art integration", "Outdoor studio terraces"], flagEmoji: "🇦🇺" },
  { id: "sao", name: "CherryStim Studios São Paulo", city: "São Paulo", country: "Brazil", region: "South America", status: "coming-2028", cubicles: 300, sqft: 65000, features: ["Carnival content sets", "Samba/funk production", "Latin America flagship", "Portuguese-language hub"], flagEmoji: "🇧🇷" },
];

export const CUBICLE_SPECS = {
  dimensions: "12ft × 10ft × 12ft (height for pole)",
  pole: "Professional chrome stripper pole, floor-to-ceiling mount, rated for 6'4\" fully extended body + swing radius",
  screens: "Chroma-key blue/green screen on 3 walls (retractable), 4K LED panel option",
  cameras: "4× PTZ 4K cameras (auto-tracking), 1× overhead cinematic cam, 1× close-up cam",
  vr: "Full-body motion capture suit, 6× Lighthouse base stations, VR headset (Meta Quest Pro / Apple Vision Pro)",
  immersive: "Haptic feedback floor panels, 12-zone haptic bodysuit integration, temperature control (warm/cool airflow)",
  audio: "Soundproof walls (STC 60+ rating), studio monitors, wireless IEM, noise-canceling mic array, spatial audio capture",
  lighting: "DMX-controlled RGB LED ring, 2× key lights, hair light, 4× accent LED strips (sync with music)",
  bed: "California King bed (removable) for slumber party streams, premium linens, adjustable pillows/throws",
  streaming: "Dedicated 10Gbps fiber uplink, LiveKit edge node, <50ms latency worldwide",
  extras: "Personal vanity mirror, mini-fridge, garment rack, private bathroom access, climate control"
};

export const COMPETITION_FUNDING = {
  coinPurchases: { rate: 0.10, label: "10% of all CherryCoin purchases", description: "Every coin bought on the platform contributes to the ecosystem" },
  appSplits: { rate: 0.05, label: "5% of platform app splits", description: "A portion of the platform's revenue share goes to competition prizes" },
  giftPurchases: { rate: 0.155, label: "15.5% of all gifts purchased", description: "Gift economy directly fuels performer competition rewards" },
  dancerIncome: { rate: 0.02, label: "2% of dancer income", description: "A small contribution from performers that fuels the ecosystem elevating their careers" },
  sponsorships: { rate: null, label: "Client & brand sponsorships", description: "VIP clients and brands can sponsor tiers, events, and prizes" }
};
