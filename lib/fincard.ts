import type { DancerTier } from "./tiers";

export type CardTier = "cherry" | "cherry_gold" | "cherry_black";

export interface CardProgram {
  tier: CardTier;
  name: string;
  material: string;
  weight: string;
  features: string[];
  creditBuilding: boolean;
  monthlyFee: number;
  atmFeeWaived: boolean;
  directDepositEnabled: boolean;
  internationalEnabled: boolean;
  cashbackPercent: number;
  minDancerTier: DancerTier;
}

export const CARD_PROGRAMS: Record<CardTier, CardProgram> = {
  cherry: {
    tier: "cherry",
    name: "CherryStim Card",
    material: "Stainless Steel, Matte Black, 0.8mm, 22g",
    weight: "22 grams",
    features: [
      "Direct deposit from CherryStim earnings",
      "Visa/Mastercard network acceptance worldwide",
      "Mobile wallet (Apple Pay, Google Pay, Samsung Pay)",
      "Real-time push notifications on every transaction",
      "In-app spending analytics and budgeting tools",
      "ATM access at 55,000+ fee-free ATMs (Allpoint network)",
      "Credit-building: on-time payments reported to Equifax, Experian, TransUnion"
    ],
    creditBuilding: true,
    monthlyFee: 0,
    atmFeeWaived: true,
    directDepositEnabled: true,
    internationalEnabled: true,
    cashbackPercent: 1,
    minDancerTier: "rising"
  },
  cherry_gold: {
    tier: "cherry_gold",
    name: "CherryStim Gold",
    material: "Stainless Steel, Brushed Gold + Black, 0.8mm, 28g",
    weight: "28 grams",
    features: [
      "Everything in CherryStim Card",
      "2% cashback on all purchases",
      "Priority direct deposit (same-day ACH)",
      "No foreign transaction fees",
      "Purchase protection and extended warranty",
      "Exclusive Gold cardholder events and networking",
      "Emergency card replacement worldwide",
      "Dedicated financial advisor access"
    ],
    creditBuilding: true,
    monthlyFee: 9.99,
    atmFeeWaived: true,
    directDepositEnabled: true,
    internationalEnabled: true,
    cashbackPercent: 2,
    minDancerTier: "elite"
  },
  cherry_black: {
    tier: "cherry_black",
    name: "CherryStim Black",
    material: "Titanium + Stainless Steel, Mirror Black, 0.8mm, 30g, Laser-Engraved",
    weight: "30 grams (titanium blend)",
    features: [
      "Everything in CherryStim Gold",
      "3% cashback on all purchases",
      "Instant earnings transfer (no waiting period)",
      "Private banking concierge 24/7",
      "Airport lounge access (Priority Pass)",
      "Luxury travel perks and hotel upgrades",
      "Zero liability fraud protection",
      "Annual credit score boost consultation",
      "Invitation to CherryStim Annual Gala",
      "Titanium + stainless steel construction, laser-engraved"
    ],
    creditBuilding: true,
    monthlyFee: 24.99,
    atmFeeWaived: true,
    directDepositEnabled: true,
    internationalEnabled: true,
    cashbackPercent: 3,
    minDancerTier: "virtuoso"
  }
};

export interface CardIssuingPartner {
  name: string;
  region: string;
  type: string;
  website: string;
  capabilities: string[];
  recommended: boolean;
}

export const CARD_ISSUING_PARTNERS: CardIssuingPartner[] = [
  {
    name: "Marqeta",
    region: "United States",
    type: "Card Issuing Platform (BaaS)",
    website: "https://marqeta.com",
    capabilities: [
      "Custom branded physical + virtual cards",
      "$383B+ transaction volume, 99.99% uptime",
      "Dynamic spend controls and tokenization",
      "Apple Pay / Google Pay digital wallet integration",
      "Sandbox API for testing, production in weeks",
      "Used by DoorDash, Square, Affirm, Instacart"
    ],
    recommended: true
  },
  {
    name: "Galileo Financial Technologies",
    region: "United States",
    type: "Digital Banking Platform",
    website: "https://galileo-ft.com",
    capabilities: [
      "Best-in-Class digital issuance (Javelin 2025)",
      "Card issuing, deposits, lending, payments, risk",
      "Launch financial products in as little as 3 months",
      "20+ years fintech infrastructure experience",
      "Cyberbank Core platform for full banking stack"
    ],
    recommended: true
  },
  {
    name: "Stripe Issuing",
    region: "United States / Global",
    type: "Card Issuing API",
    website: "https://stripe.com/issuing",
    capabilities: [
      "Create cards in seconds via API",
      "Virtual and physical cards with custom branding",
      "Real-time authorization webhooks",
      "Integrated with Stripe's full payment ecosystem",
      "Global expansion support"
    ],
    recommended: false
  },
  {
    name: "NymCard",
    region: "UAE / MENA",
    type: "Card Issuing (Dubai-based BaaS)",
    website: "https://nymcard.com",
    capabilities: [
      "Virtual, physical, and tokenized card issuance",
      "BIN sponsorship (no issuing license needed)",
      "Multi-currency support for UAE/MENA market",
      "Custom branding and loyalty programs",
      "PCI-DSS certified infrastructure"
    ],
    recommended: true
  },
  {
    name: "SimpliFi",
    region: "UAE / GCC",
    type: "Cards as a Service",
    website: "https://simplifipay.com",
    capabilities: [
      "White-label card infrastructure for GCC",
      "Modular: pick issuing, processing, or both",
      "Compliance handling built in",
      "Full brand customization"
    ],
    recommended: false
  },
  {
    name: "LivUp — The Dubai Dream",
    region: "UAE / Dubai",
    type: "Business Formation & Banking Setup (Prerequisite)",
    website: "https://wa.link/0wi9de",
    capabilities: [
      "Remote Dubai business entity formation (DMCC, DIFC, mainland LLC)",
      "UAE corporate bank account setup",
      "Trade license and visa processing",
      "WhatsApp concierge: +971 54 505 9320",
      "Required BEFORE engaging NymCard/SimpliFi for card issuing",
      "Step 0 for Dubai card program expansion"
    ],
    recommended: true
  }
];

export interface MetalCardManufacturer {
  name: string;
  website: string;
  material: string;
  weight: string;
  priceRange: string;
  features: string[];
}

export const METAL_CARD_MANUFACTURERS: MetalCardManufacturer[] = [
  {
    name: "CARDMAKER",
    website: "https://card-maker.com",
    material: "Stainless steel, brass, aluminum, titanium",
    weight: "~30 grams, 0.8mm thickness",
    priceRange: "$15-50/card at volume (300K+ delivered globally)",
    features: ["Matte/mirror/brushed/frosted finishes", "EMV chip compatible", "Laser engraving", "Custom die-cut shapes"]
  },
  {
    name: "Custom Card (customcreditcard.com)",
    website: "https://custom.creditcard",
    material: "24K Gold, Matte Black, Brushed Black stainless steel",
    weight: "25-30 grams premium weight",
    priceRange: "$219-$249/card (individual); volume discounts available",
    features: ["Gold/silver/copper etching", "Polished edges", "Luxury unboxing experience"]
  },
  {
    name: "Metal Credit Card (MCC)",
    website: "https://metal-creditcard.com",
    material: "304-grade stainless steel",
    weight: "25.5 grams, 0.8mm",
    priceRange: "$169.99/card + extended warranty options",
    features: ["Custom matte-black engraving", "Chip transfer technology", "Premium packaging"]
  }
];

export const LAUNCH_ROADMAP: { step: number; title: string; description: string; timeline: string; dependencies: string[] }[] = [
  {
    step: 1,
    title: "Select Card Issuing Partner",
    description: "Sign partnership agreement with Marqeta (recommended) or Galileo. Negotiate volume pricing, BIN sponsorship, and custom card program terms. For Dubai market expansion, engage NymCard simultaneously.",
    timeline: "2-4 weeks",
    dependencies: ["Legal team review", "Business bank account"]
  },
  {
    step: 2,
    title: "Obtain Program Manager License",
    description: "Register as a Program Manager with Visa/Mastercard through your BaaS partner. Marqeta/Galileo handle most compliance — you provide KYC/AML policies and business documentation.",
    timeline: "4-8 weeks",
    dependencies: ["Step 1 complete", "Compliance officer hired"]
  },
  {
    step: 3,
    title: "Design Card Artwork & Materials",
    description: "Work with metal card manufacturer (CARDMAKER recommended for volume) on CherryStim branded designs: Cherry Card (matte black stainless), Gold Card (brushed gold + black), Black Card (titanium blend, laser-engraved). Approve proofs and order test samples.",
    timeline: "3-5 weeks",
    dependencies: ["Brand guidelines finalized", "Step 1 in progress"]
  },
  {
    step: 4,
    title: "Integrate Card Issuing API",
    description: "Implement Marqeta/Galileo APIs into CherryStim platform: card creation, balance management, transaction webhooks, spending controls, direct deposit enrollment. Build in-app card management UI.",
    timeline: "6-10 weeks",
    dependencies: ["Step 1 complete", "API access provisioned"]
  },
  {
    step: 5,
    title: "Credit Bureau Reporting Setup",
    description: "Establish data furnisher agreements with Equifax, Experian, and TransUnion. Implement monthly reporting of on-time payments to build dancer credit scores. Requires Metro 2 format compliance.",
    timeline: "8-12 weeks",
    dependencies: ["Step 2 complete", "Data furnisher application approved"]
  },
  {
    step: 6,
    title: "KYC/AML Compliance Pipeline",
    description: "Implement identity verification for card applicants using partner like Plaid, Socure, or Jumio. Build automated KYC flow within dancer onboarding. Set up transaction monitoring and suspicious activity reporting.",
    timeline: "4-6 weeks",
    dependencies: ["Step 2 complete"]
  },
  {
    step: 7,
    title: "Manufacturing & Fulfillment",
    description: "Order initial metal card inventory from manufacturer. Set up fulfillment partnership (Ship.com, ShipBob, or in-house) for premium unboxing experience with welcome letter and card activation instructions.",
    timeline: "4-6 weeks",
    dependencies: ["Step 3 complete", "Card artwork approved"]
  },
  {
    step: 8,
    title: "Beta Launch with Virtuoso Dancers",
    description: "Invite top-tier Virtuoso dancers to beta test the CherryStim Black Card. Gather feedback on card activation, direct deposit flow, in-app experience, and physical card quality.",
    timeline: "4 weeks",
    dependencies: ["Steps 4-7 complete"]
  },
  {
    step: 9,
    title: "Full Platform Launch",
    description: "Roll out card program to all dancer tiers. Cherry Card for Rising+, Gold for Elite+, Black for Virtuoso. Enable self-service card application in dancer dashboard. Begin credit bureau reporting.",
    timeline: "2 weeks after beta",
    dependencies: ["Step 8 feedback incorporated"]
  },
  {
    step: 10,
    title: "Dubai Business Formation via LivUp",
    description: "Contact LivUp — The Dubai Dream (WhatsApp +971 54 505 9320) to establish a Dubai business entity (DMCC free zone or DIFC recommended for fintech). Obtain trade license, open UAE corporate bank account, and complete visa processing. This is the legal prerequisite before engaging NymCard/SimpliFi for card issuing in the UAE/GCC market.",
    timeline: "4-8 weeks",
    dependencies: ["US program stable", "Decision on Dubai free zone type"]
  },
  {
    step: 11,
    title: "Dubai Card Program Launch",
    description: "With Dubai entity established via LivUp, engage NymCard for BIN sponsorship and card issuing. Launch multi-currency CherryStim cards for UAE/GCC/international dancers. Arabic + English in-app experience. SimpliFi as backup provider.",
    timeline: "8-12 weeks after Step 10",
    dependencies: ["Step 10 complete (Dubai entity active)", "NymCard integration complete"]
  }
];
