import type { DancerTier } from "./tiers";

export type PackageItemCategory =
  | "equipment"
  | "apparel"
  | "beauty"
  | "branding"
  | "print"
  | "financial"
  | "tech"
  | "accessories";

export interface PackageItem {
  id: string;
  name: string;
  category: PackageItemCategory;
  description: string;
  supplier: string;
  estimatedCost: string;
  includedInTiers: DancerTier[];
  leaseUpgrade: boolean;
  ownUpgrade: boolean;
}

export const WELCOME_PACKAGE_ITEMS: PackageItem[] = [
  // EQUIPMENT
  {
    id: "dance-pole",
    name: "CherryStim x Lupit Pro Dance Pole",
    category: "equipment",
    description: "Premium Lupit Pole with static/spinning modes, stainless steel finish, LED lighting ring base, twist-assist mechanism, rust-resistant coating, and CherryStim cherry-gold accent ring. Installs in under 20 minutes. Includes cleaning kit.",
    supplier: "Lupit Pole (Slovenia) — custom co-branded",
    estimatedCost: "$450-$650",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: true,
    ownUpgrade: true
  },
  {
    id: "platform-heels",
    name: "CherryStim Signature Platform Heels",
    category: "apparel",
    description: "8-inch clear platform heels with cherry-red LED-lit sole, anti-slip grip, padded insole, and adjustable ankle strap. Custom CherryStim logo on inner sole. Available in sizes 5-12.",
    supplier: "Pleaser USA — custom colorway partnership",
    estimatedCost: "$89-$120",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // APPAREL
  {
    id: "lingerie-set",
    name: "CherryStim Luxury Lingerie Collection",
    category: "apparel",
    description: "3-piece set: black lace bodysuit with cherry-gold trim, sheer robe with CherryStim monogram, and matching garter set. French lace, hand-finished details.",
    supplier: "Custom manufacture — French lace supplier (Calais)",
    estimatedCost: "$180-$280",
    includedInTiers: ["elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "swimwear-set",
    name: "CherryStim Premium Swimwear",
    category: "apparel",
    description: "2-piece bikini set: Italian fabric, cherry-red and black with gold hardware. Reversible top, adjustable bottom. CherryStim tag and dust bag included.",
    supplier: "Custom manufacture — Italian textile (Prato)",
    estimatedCost: "$120-$180",
    includedInTiers: ["premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // BEAUTY & FRAGRANCE
  {
    id: "perfume",
    name: "CherryStim Eau de Parfum — 'Cherry Noir'",
    category: "beauty",
    description: "50ml luxury fragrance crafted in Grasse, France by master perfumers. Notes: Black cherry, Damascus rose, oud wood, vanilla bourbon, and warm amber. Heavy glass bottle with cherry-gold cap. Made by Galimard Perfumery.",
    supplier: "Galimard — Grasse, France (est. 1747)",
    estimatedCost: "$65-$95",
    includedInTiers: ["elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "cosmetics-kit",
    name: "CherryStim Glam Kit",
    category: "beauty",
    description: "Custom cosmetics collection: setting spray, highlighter palette (cherry gold, rose, champagne), lip gloss duo (cherry bomb red, nude), and false lash set. Camera-ready formulas.",
    supplier: "Private label cosmetics — custom formulation",
    estimatedCost: "$85-$130",
    includedInTiers: ["premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "tanning-lotion",
    name: "CherryStim Bronze Glow Tanning Collection",
    category: "beauty",
    description: "Gradual self-tanner (200ml), instant bronzing mist (150ml), and after-tan moisturizer (200ml). Cherry blossom and coconut scent. Streak-free, fast-drying. Camera-optimized shimmer.",
    supplier: "Private label — custom formulation",
    estimatedCost: "$55-$75",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "body-oils",
    name: "CherryStim Radiance Body Oil Set",
    category: "beauty",
    description: "3-oil collection: Cherry Shimmer (stage/stream use), Midnight Silk (moisturizing), and Golden Hour (warming). Natural ingredients, light-catching micro-shimmer particles.",
    supplier: "Private label — organic ingredients",
    estimatedCost: "$45-$65",
    includedInTiers: ["elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // BRANDING & SIGNAGE
  {
    id: "neon-sign",
    name: "CherryStim LED Neon Sign",
    category: "branding",
    description: "Custom 24-inch CherryStim neon sign in cherry-red and gold. LED technology (low heat, energy efficient), dimmable with remote control, wall-mountable with included hardware. On/off switch. Required background prop for live streams.",
    supplier: "Custom LED neon manufacturer",
    estimatedCost: "$120-$180",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: true,
    ownUpgrade: true
  },
  {
    id: "blacklight-sign",
    name: "CherryStim UV Blacklight Accent Sign",
    category: "branding",
    description: "18-inch UV-reactive blacklight CherryStim logo. Glows vivid under blacklight with UV LED strip included. Creates immersive atmosphere for streams. Remote controlled.",
    supplier: "Custom UV signage manufacturer",
    estimatedCost: "$75-$110",
    includedInTiers: ["elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // PRINT MATERIALS
  {
    id: "welcome-magazine",
    name: "CherryStim Welcome Aboard Magazine",
    category: "print",
    description: "48-page premium magazine: brand story, platform walkthrough, earnings guide, content tips, dress code guide, community guidelines, success stories from top dancers. Glossy 130gsm paper, perfect-bound.",
    supplier: "Premium print house — custom editorial",
    estimatedCost: "$12-$18",
    includedInTiers: ["rising", "pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "equipment-guide",
    name: "Equipment Setup & How-To Guide",
    category: "print",
    description: "32-page guide covering pole installation, camera setup (2D/3D/VR/Immersive), lighting tips, audio configuration, OBS/streaming software, and troubleshooting. Illustrated step-by-step.",
    supplier: "In-house editorial + design",
    estimatedCost: "$8-$12",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: true,
    ownUpgrade: true
  },
  {
    id: "star-bright-magazine",
    name: "Star Bright Lights Magazine",
    category: "print",
    description: "28-page magazine detailing CherryStim's casting vision: SAG pathway, modeling opportunities, acting pipeline, agency partnerships, success milestones, and real-deal transition roadmap.",
    supplier: "In-house editorial + design",
    estimatedCost: "$8-$12",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // FINANCIAL
  {
    id: "debit-card",
    name: "CherryStim Metal Debit Card",
    category: "financial",
    description: "Tier-appropriate metal debit card: Cherry Card (matte black stainless, 22g), Gold Card (brushed gold, 28g), or Black Card (titanium, 30g). Visa network, credit-building, direct deposit enabled.",
    supplier: "Marqeta (issuing) + CARDMAKER (manufacturing)",
    estimatedCost: "$35-$85 per card (manufacturing)",
    includedInTiers: ["rising", "pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },

  // ACCESSORIES
  {
    id: "fridge-magnets",
    name: "CherryStim Refrigerator Magnet Set",
    category: "accessories",
    description: "Set of 5 premium magnets: CherryStim logo, cherry icon, 'Stream Queen' text, gold crown, and custom QR code linking to your profile. Thick rubber backing, vivid print.",
    supplier: "Custom merch manufacturer",
    estimatedCost: "$8-$12",
    includedInTiers: ["rising", "pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "ring-light",
    name: "CherryStim Pro Ring Light",
    category: "tech",
    description: "18-inch bi-color LED ring light with adjustable color temperature (3200K-5600K), phone/camera mount, and sturdy tripod. CherryStim cherry-gold accent ring. Remote dimmer included.",
    supplier: "Neewer / Elgato partnership",
    estimatedCost: "$75-$120",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: true,
    ownUpgrade: true
  },
  {
    id: "phone-tripod",
    name: "CherryStim Mobile Streaming Tripod",
    category: "tech",
    description: "Adjustable height floor tripod (42-63 inches) with universal phone mount, Bluetooth remote shutter, and 360° ball head. Cherry-gold branded clamp. For mobile streaming on the go.",
    supplier: "Custom branded — OEM",
    estimatedCost: "$35-$55",
    includedInTiers: ["pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "silk-robe",
    name: "CherryStim Silk Lounge Robe",
    category: "apparel",
    description: "Luxury silk satin robe in black with cherry-gold CherryStim monogram on chest pocket. Knee-length, adjustable tie. Perfect for pre-stream prep and between-set comfort.",
    supplier: "Custom manufacture — silk satin",
    estimatedCost: "$65-$95",
    includedInTiers: ["premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  },
  {
    id: "welcome-box",
    name: "CherryStim Unboxing Experience",
    category: "accessories",
    description: "Premium matte black gift box with magnetic closure, cherry-red tissue paper, gold foil CherryStim seal, and personalized welcome letter from the CEO. Every item nestled in custom-cut foam.",
    supplier: "PackLuxe / custom packaging",
    estimatedCost: "$25-$40 per box",
    includedInTiers: ["rising", "pro", "elite", "premier", "virtuoso"],
    leaseUpgrade: false,
    ownUpgrade: false
  }
];

export function getPackageForTier(tier: DancerTier, gearType: "lease" | "own" | "none"): PackageItem[] {
  return WELCOME_PACKAGE_ITEMS.filter((item) => {
    if (!item.includedInTiers.includes(tier)) return false;
    if (gearType === "lease" && item.leaseUpgrade) return true;
    if (gearType === "own" && item.ownUpgrade) return true;
    if (!item.leaseUpgrade && !item.ownUpgrade) return true;
    if (gearType === "none") return !item.leaseUpgrade && !item.ownUpgrade;
    return true;
  });
}

export function estimatePackageCost(tier: DancerTier, gearType: "lease" | "own" | "none"): { min: number; max: number } {
  const items = getPackageForTier(tier, gearType);
  let min = 0;
  let max = 0;
  for (const item of items) {
    const match = item.estimatedCost.match(/\$(\d[\d,]*)/g);
    if (match) {
      const nums = match.map((m) => parseInt(m.replace(/[$,]/g, "")));
      min += Math.min(...nums);
      max += Math.max(...nums);
    }
  }
  return { min, max };
}

export interface LuxuryPartner {
  name: string;
  type: string;
  location: string;
  website: string;
  partnership: string;
}

export const LUXURY_PARTNERS: LuxuryPartner[] = [
  { name: "Galimard", type: "Perfume House", location: "Grasse, France (est. 1747)", website: "https://galimard.com", partnership: "Custom 'Cherry Noir' fragrance, private label" },
  { name: "MonLuxe Paris", type: "Luxury Fragrance", location: "Paris, France", website: "https://monluxe.paris", partnership: "Bespoke scent development, luxury packaging" },
  { name: "Ivaré Luxe Holdings", type: "Fragrance Manufacturing", location: "Grasse, France", website: "https://ivareluxe.com", partnership: "Volume production, EU compliance, exclusive raw materials" },
  { name: "Lupit Pole", type: "Dance Equipment", location: "Slovenia", website: "https://lupitpole.com", partnership: "Co-branded LED dance poles, volume pricing" },
  { name: "Pleaser USA", type: "Performance Footwear", location: "Los Angeles, CA", website: "https://pleaserusa.com", partnership: "Custom colorway platform heels, co-branded line" },
  { name: "Calais Lace (France)", type: "Textile / Lingerie", location: "Calais, France", website: "https://dentelledecalais.com", partnership: "French lace supply for custom lingerie collection" },
  { name: "CARDMAKER", type: "Metal Card Manufacturing", location: "Shenzhen, China", website: "https://card-maker.com", partnership: "Volume metal debit card production, custom finishes" },
  { name: "Marqeta", type: "Card Issuing Platform", location: "Oakland, CA", website: "https://marqeta.com", partnership: "BaaS card program, API integration, credit building" }
];
