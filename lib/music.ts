export interface RecordLabel {
  id: string;
  name: string;
  parent?: string;
  ceo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  founded: number;
  roster: string[];
  totalAllocated: number;
  totalTracks: number;
  activeLeases: number;
  monthlyRevenue: number;
  predictedAnnual: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  labelId: string;
  genre: string;
  bpm: number;
  duration: string;
  leasePrice: number;
  leaseDays: 30;
  cherrystimSplit: number;
  labelSplit: number;
  totalLeases: number;
  activeLeases: number;
  nftMinted: boolean;
  cardRarity: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";
  releaseYear: number;
}

export interface MusicNFTCard {
  id: string;
  trackId: string;
  artist: string;
  title: string;
  edition: string;
  rarity: "common" | "uncommon" | "rare" | "holographic" | "gold" | "cherry-mythic";
  serialNumber: number;
  totalMinted: number;
  price: number;
  coinPrice: number;
  features: string[];
}

export interface Festival {
  id: string;
  name: string;
  season: "spring-break" | "summer" | "winter-break" | "nye";
  city: string;
  country: string;
  date: string;
  capacity: number;
  headliners: string[];
  sponsors: string[];
  status: "announced" | "on-sale" | "sold-out" | "coming-soon";
  ticketPrice: number;
  vipPrice: number;
}

export const JUKEBOX_CONFIG = {
  leasePrice: 10,
  leaseDays: 30,
  cherrystimSplit: 0.35,
  labelSplit: 0.65,
  description: "Spin any record on the CherryStim Jukebox. $10 per track for a 30-day lease. 65% goes to the label/artist, 35% to CherryStim."
};

export const RECORD_LABELS: RecordLabel[] = [
  { id: "umg", name: "Universal Music Group", ceo: "Lucian Grainge (Chairman & CEO)", address: "2220 Colorado Ave, Santa Monica, CA 90404", phone: "(310) 865-5000", email: "licensing@umusic.com", website: "universalmusic.com", founded: 1934, roster: ["Drake", "Taylor Swift", "Bad Bunny", "The Weeknd", "Billie Eilish", "Post Malone", "Ariana Grande"], totalAllocated: 842000, totalTracks: 186, activeLeases: 2840, monthlyRevenue: 28400, predictedAnnual: 340800 },
  { id: "sony", name: "Sony Music Entertainment", ceo: "Rob Stringer (Chairman)", address: "25 Madison Ave, New York, NY 10010", phone: "(212) 833-8000", email: "licensing@sonymusic.com", website: "sonymusic.com", founded: 1929, roster: ["Beyoncé", "Adele", "Travis Scott", "Harry Styles", "Doja Cat", "Lil Nas X", "Rosalía"], totalAllocated: 768000, totalTracks: 164, activeLeases: 2560, monthlyRevenue: 25600, predictedAnnual: 307200 },
  { id: "wmg", name: "Warner Music Group", ceo: "Robert Kyncl (CEO)", address: "1633 Broadway, New York, NY 10019", phone: "(212) 275-2000", email: "licensing@wmg.com", website: "wmg.com", founded: 1958, roster: ["Ed Sheeran", "Cardi B", "Dua Lipa", "Bruno Mars", "Lizzo", "Jack Harlow", "Burna Boy"], totalAllocated: 624000, totalTracks: 142, activeLeases: 2080, monthlyRevenue: 20800, predictedAnnual: 249600 },
  { id: "atlantic", name: "Atlantic Records", parent: "Warner Music Group", ceo: "Julie Greenwald (Chairman & COO)", address: "1633 Broadway, New York, NY 10019", phone: "(212) 707-2000", email: "licensing@atlanticrecords.com", website: "atlanticrecords.com", founded: 1947, roster: ["Lil Uzi Vert", "Roddy Ricch", "Gunna", "Charli XCX", "Ava Max"], totalAllocated: 312000, totalTracks: 78, activeLeases: 1040, monthlyRevenue: 10400, predictedAnnual: 124800 },
  { id: "interscope", name: "Interscope Records", parent: "Universal Music Group", ceo: "John Janick (Chairman & CEO)", address: "2220 Colorado Ave, Santa Monica, CA 90404", phone: "(310) 865-1000", email: "licensing@interscope.com", website: "interscope.com", founded: 1990, roster: ["Kendrick Lamar", "Eminem", "Imagine Dragons", "Olivia Rodrigo", "Lady Gaga"], totalAllocated: 486000, totalTracks: 112, activeLeases: 1620, monthlyRevenue: 16200, predictedAnnual: 194400 },
  { id: "republic", name: "Republic Records", parent: "Universal Music Group", ceo: "Monte Lipman (Founder & CEO)", address: "1755 Broadway, New York, NY 10019", phone: "(212) 373-0750", email: "licensing@republicrecords.com", website: "republicrecords.com", founded: 1995, roster: ["Taylor Swift (re-recordings)", "The Weeknd", "Post Malone", "Ariana Grande", "Metro Boomin"], totalAllocated: 528000, totalTracks: 124, activeLeases: 1760, monthlyRevenue: 17600, predictedAnnual: 211200 },
  { id: "rca", name: "RCA Records", parent: "Sony Music Entertainment", ceo: "Peter Edge (Chairman & CEO)", address: "25 Madison Ave, New York, NY 10010", phone: "(212) 833-8100", email: "licensing@rcarecords.com", website: "rcarecords.com", founded: 1901, roster: ["SZA", "Doja Cat", "Khalid", "Normani", "Chris Brown"], totalAllocated: 396000, totalTracks: 96, activeLeases: 1320, monthlyRevenue: 13200, predictedAnnual: 158400 },
  { id: "columbia", name: "Columbia Records", parent: "Sony Music Entertainment", ceo: "Ron Perry (Chairman & CEO)", address: "25 Madison Ave, New York, NY 10010", phone: "(212) 833-8200", email: "licensing@columbiarecords.com", website: "columbiarecords.com", founded: 1887, roster: ["Beyoncé", "Adele", "Harry Styles", "Lil Nas X", "Tyler the Creator"], totalAllocated: 456000, totalTracks: 108, activeLeases: 1520, monthlyRevenue: 15200, predictedAnnual: 182400 },
  { id: "def-jam", name: "Def Jam Recordings", parent: "Universal Music Group", ceo: "Tunji Balogun (CEO)", address: "825 8th Ave, New York, NY 10019", phone: "(212) 333-8000", email: "licensing@defjam.com", website: "defjam.com", founded: 1984, roster: ["Kanye West (catalog)", "2 Chainz", "Logic", "Big Sean", "YG"], totalAllocated: 264000, totalTracks: 68, activeLeases: 880, monthlyRevenue: 8800, predictedAnnual: 105600 },
  { id: "empire", name: "EMPIRE Distribution", ceo: "Ghazi Shami (Founder & CEO)", address: "425 Broadway, San Francisco, CA 94133", phone: "(415) 625-0300", email: "licensing@empi.re", website: "empi.re", founded: 2010, roster: ["Snoop Dogg", "Tyga", "Anderson .Paak", "DRAM", "Benny the Butcher"], totalAllocated: 186000, totalTracks: 52, activeLeases: 620, monthlyRevenue: 6200, predictedAnnual: 74400 },
  { id: "quality-control", name: "Quality Control Music", ceo: "Pierre 'Pee' Thomas & Kevin 'Coach K' Lee", address: "1572 Peachtree St NW, Atlanta, GA 30309", phone: "(404) 815-4200", email: "info@qualitycontrolmusic.com", website: "qualitycontrolmusic.com", founded: 2013, roster: ["Migos (catalog)", "Lil Baby", "Lil Yachty", "City Girls", "JT"], totalAllocated: 198000, totalTracks: 56, activeLeases: 660, monthlyRevenue: 6600, predictedAnnual: 79200 },
  { id: "top-dawg", name: "Top Dawg Entertainment", ceo: "Anthony \"Top Dawg\" Tiffith (CEO)", address: "Carson, CA 90746", phone: "(310) 626-8900", email: "info@topdawgent.com", website: "topdawgent.com", founded: 2004, roster: ["Kendrick Lamar (catalog)", "SZA (early)", "ScHoolboy Q", "Ab-Soul", "Jay Rock"], totalAllocated: 144000, totalTracks: 42, activeLeases: 480, monthlyRevenue: 4800, predictedAnnual: 57600 },
];

export const SAMPLE_TRACKS: MusicTrack[] = [
  { id: "t1", title: "Midnight Cherry", artist: "The Weeknd", labelId: "republic", genre: "R&B", bpm: 118, duration: "3:42", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 4820, activeLeases: 1240, nftMinted: true, cardRarity: "legendary", releaseYear: 2024 },
  { id: "t2", title: "Stage Lights", artist: "Beyoncé", labelId: "columbia", genre: "Pop/R&B", bpm: 124, duration: "4:01", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 5200, activeLeases: 1480, nftMinted: true, cardRarity: "mythic", releaseYear: 2024 },
  { id: "t3", title: "Drip Season", artist: "Drake", labelId: "umg", genre: "Hip-Hop", bpm: 132, duration: "3:28", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 6100, activeLeases: 1680, nftMinted: true, cardRarity: "legendary", releaseYear: 2024 },
  { id: "t4", title: "Velvet Nights", artist: "SZA", labelId: "rca", genre: "R&B", bpm: 95, duration: "3:55", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 3900, activeLeases: 1020, nftMinted: true, cardRarity: "epic", releaseYear: 2024 },
  { id: "t5", title: "Money Moves", artist: "Cardi B", labelId: "atlantic", genre: "Hip-Hop", bpm: 140, duration: "3:15", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 4100, activeLeases: 1100, nftMinted: true, cardRarity: "epic", releaseYear: 2024 },
  { id: "t6", title: "Immersive Love", artist: "Dua Lipa", labelId: "wmg", genre: "Dance/Pop", bpm: 128, duration: "3:38", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 3600, activeLeases: 980, nftMinted: true, cardRarity: "rare", releaseYear: 2024 },
  { id: "t7", title: "Cherry Bomb", artist: "Travis Scott", labelId: "sony", genre: "Hip-Hop/Trap", bpm: 145, duration: "3:22", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 4800, activeLeases: 1340, nftMinted: true, cardRarity: "legendary", releaseYear: 2024 },
  { id: "t8", title: "Glow Up", artist: "Doja Cat", labelId: "rca", genre: "Pop/Rap", bpm: 110, duration: "3:48", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 3200, activeLeases: 860, nftMinted: true, cardRarity: "rare", releaseYear: 2025 },
  { id: "t9", title: "Lagos to LA", artist: "Burna Boy", labelId: "wmg", genre: "Afrobeats", bpm: 108, duration: "4:12", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 2800, activeLeases: 720, nftMinted: true, cardRarity: "rare", releaseYear: 2025 },
  { id: "t10", title: "Fantasy", artist: "Bad Bunny", labelId: "umg", genre: "Reggaeton", bpm: 96, duration: "3:35", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 5800, activeLeases: 1560, nftMinted: true, cardRarity: "legendary", releaseYear: 2024 },
  { id: "t11", title: "Pole Position", artist: "Megan Thee Stallion", labelId: "umg", genre: "Hip-Hop", bpm: 135, duration: "3:18", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 4200, activeLeases: 1140, nftMinted: true, cardRarity: "epic", releaseYear: 2025 },
  { id: "t12", title: "Neon Dreams", artist: "Rosalía", labelId: "sony", genre: "Latin/Electronic", bpm: 122, duration: "3:52", leasePrice: 10, leaseDays: 30, cherrystimSplit: 0.35, labelSplit: 0.65, totalLeases: 2400, activeLeases: 640, nftMinted: true, cardRarity: "rare", releaseYear: 2025 },
];

export const FESTIVALS: Festival[] = [
  { id: "f1", name: "CherryStim Spring Break Fest", season: "spring-break", city: "Miami Beach", country: "USA", date: "March 15-22, 2026", capacity: 25000, headliners: ["Drake", "Megan Thee Stallion", "Bad Bunny"], sponsors: ["CherryCoin", "Fashion Nova", "Hennessy"], status: "on-sale", ticketPrice: 299, vipPrice: 899 },
  { id: "f2", name: "CherryStim Summer Paradise", season: "summer", city: "Ibiza", country: "Spain", date: "July 4-11, 2026", capacity: 30000, headliners: ["The Weeknd", "Dua Lipa", "Burna Boy"], sponsors: ["CherryCoin", "Ciroc", "Gucci"], status: "announced", ticketPrice: 399, vipPrice: 1299 },
  { id: "f3", name: "CherryStim Winter Wonderland", season: "winter-break", city: "Aspen", country: "USA", date: "December 20-27, 2026", capacity: 15000, headliners: ["SZA", "Travis Scott", "Rosalía"], sponsors: ["CherryCoin", "Canada Goose", "Moët"], status: "coming-soon", ticketPrice: 499, vipPrice: 1999 },
  { id: "f4", name: "CherryStim NYE Countdown", season: "nye", city: "Las Vegas", country: "USA", date: "December 30, 2026 - January 2, 2027", capacity: 50000, headliners: ["Beyoncé", "Drake", "The Weeknd", "Bad Bunny"], sponsors: ["CherryCoin", "Dom Pérignon", "Versace", "Rolls-Royce"], status: "coming-soon", ticketPrice: 599, vipPrice: 2999 },
  { id: "f5", name: "CherryStim Carnival", season: "spring-break", city: "Rio de Janeiro", country: "Brazil", date: "February 28 - March 5, 2027", capacity: 40000, headliners: ["Bad Bunny", "Rosalía", "Anitta", "Burna Boy"], sponsors: ["CherryCoin", "Havaianas", "Bacardi"], status: "coming-soon", ticketPrice: 249, vipPrice: 799 },
  { id: "f6", name: "CherryStim Afrobeats Fest", season: "summer", city: "Lagos", country: "Nigeria", date: "August 15-20, 2027", capacity: 35000, headliners: ["Burna Boy", "Wizkid", "Tems", "Rema"], sponsors: ["CherryCoin", "Star Lager", "GTBank"], status: "coming-soon", ticketPrice: 149, vipPrice: 599 },
];

export const NFT_CARDS: MusicNFTCard[] = [
  { id: "nft1", trackId: "t1", artist: "The Weeknd", title: "Midnight Cherry", edition: "1st Edition Holographic", rarity: "holographic", serialNumber: 1, totalMinted: 500, price: 49.99, coinPrice: 1280, features: ["Holographic foil finish", "Animated album art", "30-second audio clip", "Artist signature stamp", "CherryStim authenticity seal"] },
  { id: "nft2", trackId: "t2", artist: "Beyoncé", title: "Stage Lights", edition: "Cherry Mythic", rarity: "cherry-mythic", serialNumber: 1, totalMinted: 100, price: 199.99, coinPrice: 5120, features: ["Cherry-red chrome finish", "Full 3D animated art", "Full track audio", "Artist + CherryStim dual signature", "Physical card ships worldwide", "Lifetime jukebox access for this track"] },
  { id: "nft3", trackId: "t3", artist: "Drake", title: "Drip Season", edition: "Gold Edition", rarity: "gold", serialNumber: 1, totalMinted: 250, price: 89.99, coinPrice: 2300, features: ["Gold foil border", "Animated rain effect", "30-second audio clip", "CherryStim stamp", "Festival priority access"] },
  { id: "nft4", trackId: "t7", artist: "Travis Scott", title: "Cherry Bomb", edition: "1st Edition Holographic", rarity: "holographic", serialNumber: 1, totalMinted: 500, price: 49.99, coinPrice: 1280, features: ["Holographic explosion effect", "Animated art", "Audio preview", "Artist signature", "CherryStim seal"] },
  { id: "nft5", trackId: "t10", artist: "Bad Bunny", title: "Fantasy", edition: "Gold Edition", rarity: "gold", serialNumber: 1, totalMinted: 250, price: 89.99, coinPrice: 2300, features: ["Gold + cherry accent border", "Reggaeton beat animation", "Audio clip", "Bilingual signature", "Festival VIP upgrade voucher"] },
  { id: "nft6", trackId: "t5", artist: "Cardi B", title: "Money Moves", edition: "Cherry Mythic", rarity: "cherry-mythic", serialNumber: 1, totalMinted: 100, price: 149.99, coinPrice: 3840, features: ["Animated money rain", "Cherry-red holographic", "Full track", "Physical card + display case", "CherryStim VIP event invite"] },
];

export const CARD_RARITY_CONFIG: Record<string, { color: string; bg: string; glow: string; label: string }> = {
  common: { color: "#9ca3af", bg: "bg-gray-500/10", glow: "", label: "Common" },
  uncommon: { color: "#22c55e", bg: "bg-emerald-500/10", glow: "", label: "Uncommon" },
  rare: { color: "#3b82f6", bg: "bg-blue-500/10", glow: "shadow-[0_0_12px_rgba(59,130,246,0.15)]", label: "Rare" },
  holographic: { color: "#e879f9", bg: "bg-fuchsia-500/10", glow: "shadow-[0_0_20px_rgba(232,121,249,0.25)]", label: "Holographic" },
  gold: { color: "#ffd700", bg: "bg-amber-500/10", glow: "shadow-[0_0_20px_rgba(255,215,0,0.3)]", label: "Gold Edition" },
  "cherry-mythic": { color: "#ff0033", bg: "bg-cherry-500/10", glow: "shadow-[0_0_25px_rgba(255,0,51,0.35)]", label: "Cherry Mythic" }
};
