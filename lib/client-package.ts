import type { ClientTier } from "./tiers";
import type { CardTier } from "./fincard";

export type ClientGender = "male" | "female" | "non_binary";

export interface ClientPackageItem {
  id: string;
  name: string;
  description: string;
  supplier: string;
  estimatedCost: string;
  includedInTiers: ClientTier[];
  genderSpecific: ClientGender[] | "all";
}

export const CLIENT_PACKAGE_ITEMS: ClientPackageItem[] = [
  // ALL GENDERS — ALL TIERS
  {
    id: "client-welcome-box",
    name: "CherryStim Premium Welcome Box",
    description: "Matte black gift box with magnetic closure, cherry-red tissue paper, gold foil CherryStim seal, and personalized welcome letter.",
    supplier: "PackLuxe / custom packaging",
    estimatedCost: "$25-$40",
    includedInTiers: ["basic", "crush", "sprung", "vip", "platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-debit-card",
    name: "CherryStim Metal Debit Card",
    description: "Tier-appropriate metal debit card. Visa network, Apple/Google Pay, cashback on in-app purchases, credit-building.",
    supplier: "Marqeta (issuing) + CARDMAKER (manufacturing)",
    estimatedCost: "$35-$85",
    includedInTiers: ["basic", "crush", "sprung", "vip", "platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-welcome-magazine",
    name: "CherryStim Client Welcome Magazine",
    description: "32-page premium magazine: platform guide, mode selection walkthrough, tipping etiquette, community guidelines, dancer discovery tips, and VIP benefits overview.",
    supplier: "In-house editorial + design",
    estimatedCost: "$10-$15",
    includedInTiers: ["basic", "crush", "sprung", "vip", "platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-fridge-magnets",
    name: "CherryStim Magnet Set",
    description: "Set of 5 premium magnets: CherryStim logo, cherry icon, 'VIP Viewer' text, gold crown, and custom QR code linking to your profile.",
    supplier: "Custom merch manufacturer",
    estimatedCost: "$8-$12",
    includedInTiers: ["basic", "crush", "sprung", "vip", "platinum"],
    genderSpecific: "all"
  },

  // CRUSH+
  {
    id: "client-phone-ring",
    name: "CherryStim Gold Phone Ring Stand",
    description: "Premium metal phone ring holder with CherryStim cherry logo. Magnetic car mount compatible. Cherry-gold finish.",
    supplier: "Custom accessories manufacturer",
    estimatedCost: "$15-$25",
    includedInTiers: ["crush", "sprung", "vip", "platinum"],
    genderSpecific: "all"
  },

  // SPRUNG+ — FEMALE
  {
    id: "client-f-perfume",
    name: "CherryStim Eau de Parfum — 'Cherry Noir'",
    description: "30ml luxury fragrance from Grasse, France. Notes: Black cherry, Damascus rose, oud wood, vanilla bourbon, warm amber.",
    supplier: "Galimard — Grasse, France (est. 1747)",
    estimatedCost: "$45-$65",
    includedInTiers: ["sprung", "vip", "platinum"],
    genderSpecific: ["female", "non_binary"]
  },
  {
    id: "client-f-lipgloss",
    name: "CherryStim Lip Gloss Duo",
    description: "Cherry bomb red and nude shades. Long-wear, camera-ready formula. CherryStim-branded packaging.",
    supplier: "Private label cosmetics",
    estimatedCost: "$22-$35",
    includedInTiers: ["sprung", "vip", "platinum"],
    genderSpecific: ["female", "non_binary"]
  },
  {
    id: "client-f-silk-scarf",
    name: "CherryStim Silk Scarf",
    description: "Limited edition silk scarf with CherryStim cherry-blossom pattern. 100% mulberry silk, hand-rolled edges. 35x35 inches.",
    supplier: "Custom silk manufacture (Como, Italy)",
    estimatedCost: "$55-$85",
    includedInTiers: ["vip", "platinum"],
    genderSpecific: ["female", "non_binary"]
  },

  // SPRUNG+ — MALE
  {
    id: "client-m-cologne",
    name: "CherryStim Cologne — 'Black Cherry Reserve'",
    description: "30ml luxury cologne from Grasse. Notes: Black cherry, leather, cedarwood, tonka bean, smoky vetiver.",
    supplier: "Galimard — Grasse, France (est. 1747)",
    estimatedCost: "$45-$65",
    includedInTiers: ["sprung", "vip", "platinum"],
    genderSpecific: ["male"]
  },
  {
    id: "client-m-pocket-square",
    name: "CherryStim Silk Pocket Square",
    description: "Premium silk pocket square with CherryStim monogram. Cherry-red on black. Hand-rolled edges.",
    supplier: "Custom silk manufacture",
    estimatedCost: "$35-$50",
    includedInTiers: ["sprung", "vip", "platinum"],
    genderSpecific: ["male"]
  },
  {
    id: "client-m-cufflinks",
    name: "CherryStim Gold Cufflinks",
    description: "18K gold-plated cufflinks with cherry logo engraving. Comes in velvet presentation box.",
    supplier: "Custom jewelry manufacturer",
    estimatedCost: "$45-$70",
    includedInTiers: ["vip", "platinum"],
    genderSpecific: ["male"]
  },

  // VIP+
  {
    id: "client-neon-mini",
    name: "CherryStim Mini Neon Sign",
    description: "12-inch mini CherryStim neon desk sign. LED, USB-powered, dimmable. Cherry-red glow. Perfect for viewing setup.",
    supplier: "Custom LED neon manufacturer",
    estimatedCost: "$55-$80",
    includedInTiers: ["vip", "platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-tanning-lotion",
    name: "CherryStim Bronze Glow Self-Tanner",
    description: "200ml gradual self-tanner with cherry blossom scent. Streak-free, fast-drying.",
    supplier: "Private label",
    estimatedCost: "$25-$40",
    includedInTiers: ["vip", "platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-body-oil",
    name: "CherryStim Radiance Body Oil",
    description: "100ml body oil with light-catching micro-shimmer. Natural ingredients, cherry blossom and coconut scent.",
    supplier: "Private label — organic ingredients",
    estimatedCost: "$25-$40",
    includedInTiers: ["vip", "platinum"],
    genderSpecific: "all"
  },

  // PLATINUM
  {
    id: "client-silk-robe",
    name: "CherryStim Unisex Silk Robe",
    description: "Luxury silk satin robe in black with cherry-gold CherryStim monogram. Unisex cut, adjustable tie.",
    supplier: "Custom manufacture — silk satin",
    estimatedCost: "$65-$95",
    includedInTiers: ["platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-vr-carry-case",
    name: "CherryStim VR Headset Case",
    description: "Custom hardshell carry case for VR headsets with CherryStim logo. Foam-lined, fits Meta Quest, Apple Vision Pro, and most major headsets.",
    supplier: "Custom case manufacturer",
    estimatedCost: "$45-$70",
    includedInTiers: ["platinum"],
    genderSpecific: "all"
  },
  {
    id: "client-cosmetics-kit",
    name: "CherryStim Glam Kit",
    description: "Setting spray, highlighter palette (cherry gold, rose, champagne), and false lash set. Camera-ready formulas.",
    supplier: "Private label cosmetics",
    estimatedCost: "$55-$85",
    includedInTiers: ["platinum"],
    genderSpecific: ["female", "non_binary"]
  },
  {
    id: "client-grooming-kit",
    name: "CherryStim Grooming Kit",
    description: "Beard oil, face moisturizer, and lip balm. Premium ingredients, CherryStim-branded packaging. Sandalwood and cedar scent.",
    supplier: "Private label grooming",
    estimatedCost: "$45-$65",
    includedInTiers: ["platinum"],
    genderSpecific: ["male"]
  }
];

export function getClientPackageItems(tier: ClientTier, gender: ClientGender): ClientPackageItem[] {
  return CLIENT_PACKAGE_ITEMS.filter((item) => {
    if (!item.includedInTiers.includes(tier)) return false;
    if (item.genderSpecific === "all") return true;
    return item.genderSpecific.includes(gender);
  });
}

export function estimateClientPackageCost(tier: ClientTier, gender: ClientGender): { min: number; max: number } {
  const items = getClientPackageItems(tier, gender);
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
