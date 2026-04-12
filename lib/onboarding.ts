import type { DancerTier } from "./tiers";
import type { CardTier } from "./fincard";
import type { GearOwner } from "./splits";

export type OnboardingStepId =
  | "select_tier"
  | "select_gear_plan"
  | "select_card"
  | "enter_shipping"
  | "select_shoe_size"
  | "select_fragrance"
  | "select_lingerie_size"
  | "select_swimwear_size"
  | "select_robe_size"
  | "confirm_pole_install"
  | "review_package"
  | "confirm_order";

export interface OnboardingStep {
  id: OnboardingStepId;
  label: string;
  description: string;
  required: boolean;
  appliesTo: DancerTier[];
  category: "tier" | "card" | "apparel" | "beauty" | "equipment" | "shipping" | "review";
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "select_tier",
    label: "Select Your Tier",
    description: "Choose your starting dancer tier. This determines your welcome package contents, revenue split, and platform features.",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "tier"
  },
  {
    id: "select_gear_plan",
    label: "Equipment Plan",
    description: "Choose whether CherryStim provides your gear (64/36 split), you lease it (64/36), or you own your own (55/45).",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "equipment"
  },
  {
    id: "select_card",
    label: "CherryStim Card",
    description: "Select your metal debit card tier. All cards build credit via Equifax, Experian, and TransUnion. Direct deposit from earnings.",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "card"
  },
  {
    id: "enter_shipping",
    label: "Shipping Address",
    description: "Enter your shipping address for welcome package delivery. We ship worldwide via tracked premium courier.",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "shipping"
  },
  {
    id: "select_shoe_size",
    label: "Platform Heel Size",
    description: "Select your shoe size for CherryStim x Pleaser platform heels. Sizes 5-12 available.",
    required: true,
    appliesTo: ["pro", "elite", "premier", "virtuoso"],
    category: "apparel"
  },
  {
    id: "select_fragrance",
    label: "Fragrance Preference",
    description: "Choose your CherryStim fragrance. 'Cherry Noir' by Galimard (Grasse, France) is the signature scent. Additional options from MonLuxe Paris.",
    required: true,
    appliesTo: ["elite", "premier", "virtuoso"],
    category: "beauty"
  },
  {
    id: "select_lingerie_size",
    label: "Lingerie Size",
    description: "Select your size for the French lace lingerie collection (Calais Lace, France). 3-piece set: bodysuit, robe, garter.",
    required: true,
    appliesTo: ["elite", "premier", "virtuoso"],
    category: "apparel"
  },
  {
    id: "select_swimwear_size",
    label: "Swimwear Size",
    description: "Select your size for CherryStim premium Italian swimwear (Prato, Italy). 2-piece reversible bikini set.",
    required: true,
    appliesTo: ["premier", "virtuoso"],
    category: "apparel"
  },
  {
    id: "select_robe_size",
    label: "Silk Robe Size",
    description: "Select your size for the CherryStim silk satin lounge robe with monogram.",
    required: true,
    appliesTo: ["premier", "virtuoso"],
    category: "apparel"
  },
  {
    id: "confirm_pole_install",
    label: "Dance Pole Setup",
    description: "Confirm your ceiling height for the Lupit LED dance pole. Fits 7'6\" to 9'1\". Includes installation guide and cleaning kit.",
    required: true,
    appliesTo: ["pro", "elite", "premier", "virtuoso"],
    category: "equipment"
  },
  {
    id: "review_package",
    label: "Review Package",
    description: "Review all items in your welcome package before confirming. Estimated value and supplier details shown.",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "review"
  },
  {
    id: "confirm_order",
    label: "Confirm & Place Order",
    description: "Finalize your selections. Your welcome package will begin assembly and ship within 5-10 business days.",
    required: true,
    appliesTo: ["rising", "pro", "elite", "premier", "virtuoso"],
    category: "review"
  }
];

export function getStepsForTier(tier: DancerTier): OnboardingStep[] {
  return ONBOARDING_STEPS.filter((step) => step.appliesTo.includes(tier));
}

export type ShoeSize = "5" | "5.5" | "6" | "6.5" | "7" | "7.5" | "8" | "8.5" | "9" | "9.5" | "10" | "10.5" | "11" | "11.5" | "12";
export type ApparelSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface FragranceOption {
  id: string;
  name: string;
  house: string;
  notes: string;
}

export const FRAGRANCE_OPTIONS: FragranceOption[] = [
  { id: "cherry-noir", name: "Cherry Noir", house: "Galimard (Grasse, est. 1747)", notes: "Black cherry, Damascus rose, oud wood, vanilla bourbon, warm amber" },
  { id: "golden-hour", name: "Golden Hour", house: "MonLuxe Paris", notes: "Bergamot, jasmine absolute, sandalwood, golden musk, tonka bean" },
  { id: "midnight-luxe", name: "Midnight Luxe", house: "Ivaré Luxe (Grasse)", notes: "Black orchid, plum, patchouli, dark chocolate, smoky vetiver" }
];

export const SHOE_SIZES: ShoeSize[] = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];
export const APPAREL_SIZES: ApparelSize[] = ["XS", "S", "M", "L", "XL", "XXL"];
export const CEILING_HEIGHTS = ["7'6\"", "7'9\"", "8'0\"", "8'3\"", "8'6\"", "8'9\"", "9'0\"", "9'1\""];

export type OrderTrackingStatus =
  | "pending"
  | "processing"
  | "sourcing_from_suppliers"
  | "supplier_shipped"
  | "arrived_at_warehouse"
  | "assembling_package"
  | "quality_check"
  | "shipped_to_dancer"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";

export interface SupplierOrderStatus {
  supplier: string;
  item: string;
  status: OrderTrackingStatus;
  trackingNumber: string | null;
  estimatedArrival: string;
  lastUpdated: number;
}

export interface WelcomeOrderTracking {
  orderId: string;
  dancerId: string;
  overallStatus: OrderTrackingStatus;
  supplierStatuses: SupplierOrderStatus[];
  shippingAddress: string;
  trackingNumber: string | null;
  estimatedDelivery: string;
  createdAt: number;
  updatedAt: number;
}

export const TRACKING_STATUS_LABELS: Record<OrderTrackingStatus, { label: string; emoji: string; progress: number }> = {
  pending: { label: "Order Placed", emoji: "📋", progress: 0 },
  processing: { label: "Processing", emoji: "⚙️", progress: 10 },
  sourcing_from_suppliers: { label: "Sourcing from Partners", emoji: "🌍", progress: 20 },
  supplier_shipped: { label: "Suppliers Shipping", emoji: "📦", progress: 35 },
  arrived_at_warehouse: { label: "Arrived at Warehouse", emoji: "🏭", progress: 50 },
  assembling_package: { label: "Assembling Your Package", emoji: "🎁", progress: 65 },
  quality_check: { label: "Quality Check", emoji: "✅", progress: 75 },
  shipped_to_dancer: { label: "Shipped to You", emoji: "🚀", progress: 85 },
  in_transit: { label: "In Transit", emoji: "🛫", progress: 90 },
  out_for_delivery: { label: "Out for Delivery", emoji: "🚚", progress: 95 },
  delivered: { label: "Delivered!", emoji: "🎉", progress: 100 }
};

export function createMockTracking(dancerId: string, tier: DancerTier, gearType: GearOwner): WelcomeOrderTracking {
  const suppliers: SupplierOrderStatus[] = [
    { supplier: "Marqeta + CARDMAKER", item: "CherryStim Metal Debit Card", status: "processing", trackingNumber: null, estimatedArrival: "7-10 days", lastUpdated: Date.now() },
    { supplier: "In-House Print", item: "Welcome Magazine + Equipment Guide + Star Bright Lights Mag", status: "processing", trackingNumber: null, estimatedArrival: "2-3 days", lastUpdated: Date.now() },
    { supplier: "Custom Merch", item: "Fridge Magnets + Welcome Box", status: "processing", trackingNumber: null, estimatedArrival: "3-5 days", lastUpdated: Date.now() }
  ];

  if (["pro", "elite", "premier", "virtuoso"].includes(tier)) {
    suppliers.push(
      { supplier: "Lupit Pole (Slovenia)", item: "CherryStim x Lupit Pro Dance Pole", status: "sourcing_from_suppliers", trackingNumber: null, estimatedArrival: "10-14 days", lastUpdated: Date.now() },
      { supplier: "Pleaser USA (Los Angeles)", item: "CherryStim Platform Heels", status: "processing", trackingNumber: null, estimatedArrival: "5-7 days", lastUpdated: Date.now() },
      { supplier: "Custom LED Manufacturer", item: "CherryStim Neon Sign", status: "processing", trackingNumber: null, estimatedArrival: "7-10 days", lastUpdated: Date.now() },
      { supplier: "Neewer / Elgato", item: "Pro Ring Light + Tripod", status: "processing", trackingNumber: null, estimatedArrival: "3-5 days", lastUpdated: Date.now() },
      { supplier: "Private Label", item: "Tanning Collection", status: "processing", trackingNumber: null, estimatedArrival: "5-7 days", lastUpdated: Date.now() }
    );
  }

  if (["elite", "premier", "virtuoso"].includes(tier)) {
    suppliers.push(
      { supplier: "Galimard (Grasse, France)", item: "Cherry Noir Eau de Parfum", status: "sourcing_from_suppliers", trackingNumber: null, estimatedArrival: "12-16 days", lastUpdated: Date.now() },
      { supplier: "Calais Lace (France)", item: "French Lace Lingerie Set", status: "sourcing_from_suppliers", trackingNumber: null, estimatedArrival: "14-18 days", lastUpdated: Date.now() },
      { supplier: "Private Label", item: "Radiance Body Oil Set", status: "processing", trackingNumber: null, estimatedArrival: "5-7 days", lastUpdated: Date.now() }
    );
  }

  if (["premier", "virtuoso"].includes(tier)) {
    suppliers.push(
      { supplier: "Italian Textile (Prato)", item: "Premium Swimwear Set", status: "sourcing_from_suppliers", trackingNumber: null, estimatedArrival: "14-18 days", lastUpdated: Date.now() },
      { supplier: "Custom Silk Manufacture", item: "Silk Lounge Robe", status: "sourcing_from_suppliers", trackingNumber: null, estimatedArrival: "10-14 days", lastUpdated: Date.now() },
      { supplier: "Private Label Cosmetics", item: "Glam Kit", status: "processing", trackingNumber: null, estimatedArrival: "5-7 days", lastUpdated: Date.now() },
      { supplier: "Custom UV Signage", item: "UV Blacklight Sign", status: "processing", trackingNumber: null, estimatedArrival: "7-10 days", lastUpdated: Date.now() }
    );
  }

  return {
    orderId: `WP-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    dancerId,
    overallStatus: "processing",
    supplierStatuses: suppliers,
    shippingAddress: "",
    trackingNumber: null,
    estimatedDelivery: "14-21 business days",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}
