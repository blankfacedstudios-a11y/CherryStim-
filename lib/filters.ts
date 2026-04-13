import type { StreamMode } from "@/hooks/useStreamMode";
import type { ClientTier, DancerTier } from "./tiers";

export type FilterCategory =
  | "beauty"
  | "fantasy"
  | "animal"
  | "avatar"
  | "celestial"
  | "cyberpunk"
  | "glamour"
  | "artistic"
  | "seasonal"
  | "signature";

export type TrackingCapability =
  | "face_mesh_112"
  | "face_mesh_240"
  | "body_pose_33"
  | "hand_tracking_21"
  | "lip_sync"
  | "eye_gaze"
  | "facial_expression"
  | "hair_segmentation"
  | "skin_segmentation"
  | "full_body_segmentation";

export interface ARFilter {
  id: string;
  name: string;
  category: FilterCategory;
  description: string;
  previewEmoji: string;
  tracking: TrackingCapability[];
  supportedModes: StreamMode[];
  intensity: { min: number; max: number; default: number };
  minTier: ClientTier | null;
  dancerOnly: boolean;
  isSignature: boolean;
  sdkProvider: string;
  renderComplexity: "low" | "medium" | "high" | "ultra";
}

export const FILTER_CATEGORIES: Record<FilterCategory, { label: string; icon: string }> = {
  beauty: { label: "Beauty & Enhance", icon: "✨" },
  fantasy: { label: "Fantasy & Mythical", icon: "🦄" },
  animal: { label: "Animals", icon: "🐱" },
  avatar: { label: "Avatar & Sci-Fi", icon: "👽" },
  celestial: { label: "Angel & Devil", icon: "😇" },
  cyberpunk: { label: "Cyberpunk & Neon", icon: "🤖" },
  glamour: { label: "Glamour & Red Carpet", icon: "💎" },
  artistic: { label: "Artistic & Painterly", icon: "🎨" },
  seasonal: { label: "Seasonal & Events", icon: "🎃" },
  signature: { label: "Signature CherryStim", icon: "🍒" }
};

export const AR_FILTERS: ARFilter[] = [
  // BEAUTY & ENHANCE
  {
    id: "silk-skin",
    name: "Silk Skin HD",
    category: "beauty",
    description: "240-point face mesh with real-time skin texture smoothing. Preserves pores and fine detail while removing blemishes. China-grade beauty tech.",
    previewEmoji: "✨",
    tracking: ["face_mesh_240", "skin_segmentation", "lip_sync"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 60 },
    minTier: null,
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Banuba + Custom AI",
    renderComplexity: "medium"
  },
  {
    id: "face-sculpt",
    name: "AI Face Sculpt",
    category: "beauty",
    description: "28-dimension facial morphing: jawline, cheekbones, eye size, nose bridge, lip fullness. Real-time with zero latency. Follows every head turn and tilt.",
    previewEmoji: "💫",
    tracking: ["face_mesh_240", "facial_expression", "eye_gaze"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 40 },
    minTier: null,
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Banuba 28-dim Morphing",
    renderComplexity: "high"
  },
  {
    id: "holo-glam",
    name: "Holographic Glam",
    category: "beauty",
    description: "AI-generated virtual makeup: lipstick, contour, eyeshadow, lashes, and brow sculpt. Changes with lighting and angle. 16 cosmetic dimensions.",
    previewEmoji: "💄",
    tracking: ["face_mesh_240", "lip_sync", "eye_gaze", "skin_segmentation"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 70 },
    minTier: "crush",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "BytePlus Effects + Custom",
    renderComplexity: "high"
  },
  {
    id: "body-contour",
    name: "Body Contour Pro",
    category: "beauty",
    description: "Full-body segmentation with real-time shape enhancement. Waist, legs, arms adjustable. Background lock ensures zero distortion on surroundings.",
    previewEmoji: "🔥",
    tracking: ["full_body_segmentation", "body_pose_33"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 30 },
    minTier: null,
    dancerOnly: true,
    isSignature: false,
    sdkProvider: "SNOW Body Engine + Custom",
    renderComplexity: "ultra"
  },

  // FANTASY & MYTHICAL
  {
    id: "elven-queen",
    name: "Elven Queen",
    category: "fantasy",
    description: "Pointed ears morph onto real ear positions. Ethereal skin glow, shimmering iris overlay, and floating particle crown. Full lip-sync support.",
    previewEmoji: "🧝‍♀️",
    tracking: ["face_mesh_240", "lip_sync", "hair_segmentation", "facial_expression"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 80 },
    minTier: "sprung",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Banuba + Custom Shaders",
    renderComplexity: "ultra"
  },
  {
    id: "dragon-empress",
    name: "Dragon Empress",
    category: "fantasy",
    description: "Scaled skin texture overlay with iridescent dragon scales across shoulders and cheeks. Glowing slit-pupil eyes and fire-breath particle effects on mouth open.",
    previewEmoji: "🐉",
    tracking: ["face_mesh_240", "lip_sync", "body_pose_33", "facial_expression"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 85 },
    minTier: "vip",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom WebGL Pipeline",
    renderComplexity: "ultra"
  },
  {
    id: "mermaid-siren",
    name: "Mermaid Siren",
    category: "fantasy",
    description: "Oceanic skin shimmer with iridescent scales on neck and shoulders. Flowing underwater hair physics. Bubble particle effects and bioluminescent glow.",
    previewEmoji: "🧜‍♀️",
    tracking: ["face_mesh_240", "hair_segmentation", "body_pose_33", "lip_sync"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 75 },
    minTier: "sprung",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom WebGL + Particle System",
    renderComplexity: "ultra"
  },

  // ANIMALS
  {
    id: "golden-fox",
    name: "Golden Fox",
    category: "animal",
    description: "Ultra-realistic fox ears and nose tracked to head movement. Whisker overlay with physics simulation. Tail visible in 3D/VR modes.",
    previewEmoji: "🦊",
    tracking: ["face_mesh_112", "facial_expression", "lip_sync"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 90 },
    minTier: null,
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Banuba Asset Store",
    renderComplexity: "medium"
  },
  {
    id: "snow-leopard",
    name: "Snow Leopard",
    category: "animal",
    description: "Spotted fur texture across face and body. Cat eyes with real iris tracking. Purr vibration haptic trigger on wink. Ears flatten on surprise expression.",
    previewEmoji: "🐆",
    tracking: ["face_mesh_240", "eye_gaze", "facial_expression", "body_pose_33"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 85 },
    minTier: "crush",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Banuba + Custom Texture Pipeline",
    renderComplexity: "high"
  },
  {
    id: "mystic-butterfly",
    name: "Mystic Butterfly",
    category: "animal",
    description: "Luminous butterfly wings tracked to shoulder and arm movement. Wing patterns react to music beat. Antenna headpiece with glow.",
    previewEmoji: "🦋",
    tracking: ["body_pose_33", "hand_tracking_21", "face_mesh_112"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 80 },
    minTier: "sprung",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom Three.js + Banuba",
    renderComplexity: "high"
  },

  // AVATAR & SCI-FI
  {
    id: "navi-avatar",
    name: "Na'vi Spirit",
    category: "avatar",
    description: "Full Avatar-style transformation: blue skin, bioluminescent freckles, cat eyes, elongated ears. Neural queue braid with glow physics. Lip-syncs perfectly.",
    previewEmoji: "💙",
    tracking: ["face_mesh_240", "lip_sync", "eye_gaze", "body_pose_33", "hair_segmentation"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 95 },
    minTier: "vip",
    dancerOnly: false,
    isSignature: true,
    sdkProvider: "Custom Neural Style Transfer",
    renderComplexity: "ultra"
  },
  {
    id: "cyber-android",
    name: "Cyber Android",
    category: "avatar",
    description: "Metallic skin with circuit-board traces. One eye replaced with glowing red scanner. Mechanical jaw segments visible during speech.",
    previewEmoji: "🤖",
    tracking: ["face_mesh_240", "lip_sync", "eye_gaze", "facial_expression"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 80 },
    minTier: "sprung",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom WebGL Pipeline",
    renderComplexity: "high"
  },

  // CELESTIAL
  {
    id: "divine-angel",
    name: "Divine Angel",
    category: "celestial",
    description: "Volumetric feathered wings with real arm-tracking physics. Golden halo with light bloom. Skin radiates soft warm glow. Feather particles on movement.",
    previewEmoji: "😇",
    tracking: ["body_pose_33", "face_mesh_240", "hand_tracking_21", "lip_sync"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 90 },
    minTier: "vip",
    dancerOnly: false,
    isSignature: true,
    sdkProvider: "Custom Three.js + Particle System",
    renderComplexity: "ultra"
  },
  {
    id: "dark-seraph",
    name: "Dark Seraph",
    category: "celestial",
    description: "Dark feathered wings with ember glow edges. Horns morph from forehead with head tracking. Smoke particle trail and red iris overlay.",
    previewEmoji: "😈",
    tracking: ["body_pose_33", "face_mesh_240", "eye_gaze", "lip_sync"],
    supportedModes: ["3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 85 },
    minTier: "vip",
    dancerOnly: false,
    isSignature: true,
    sdkProvider: "Custom Three.js + Particle System",
    renderComplexity: "ultra"
  },

  // CYBERPUNK & NEON
  {
    id: "neon-circuit",
    name: "Neon Circuit",
    category: "cyberpunk",
    description: "Glowing neon circuit traces across face and body. Color shifts with music beat. Holographic data overlays near eyes. Cyberpunk city reflection in iris.",
    previewEmoji: "💜",
    tracking: ["face_mesh_240", "body_pose_33", "eye_gaze"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 75 },
    minTier: "crush",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom Shader Pipeline",
    renderComplexity: "high"
  },

  // GLAMOUR
  {
    id: "diamond-diva",
    name: "Diamond Diva",
    category: "glamour",
    description: "Crystalline diamond particles cascade from hair and shoulders. Light refracts through gems creating prismatic rainbows. Skin has subtle diamond-dust shimmer.",
    previewEmoji: "💎",
    tracking: ["face_mesh_240", "body_pose_33", "hair_segmentation"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 70 },
    minTier: "crush",
    dancerOnly: false,
    isSignature: false,
    sdkProvider: "Custom Particle + Refraction Shader",
    renderComplexity: "high"
  },

  // SIGNATURE CHERRYSTIM
  {
    id: "cherry-goddess",
    name: "Cherry Goddess",
    category: "signature",
    description: "CherryStim signature filter. Cherry blossom petal storm tracked to body movement. Gold and cherry gradient skin glow. Floating cherry crown. Platform exclusive.",
    previewEmoji: "🍒",
    tracking: ["face_mesh_240", "body_pose_33", "lip_sync", "hand_tracking_21", "hair_segmentation"],
    supportedModes: ["2D", "3D", "VR", "IMMERSIVE"],
    intensity: { min: 0, max: 100, default: 85 },
    minTier: "platinum",
    dancerOnly: false,
    isSignature: true,
    sdkProvider: "CherryStim Proprietary Engine",
    renderComplexity: "ultra"
  }
];

export const CLIENT_TIER_FILTER_ACCESS: Record<ClientTier, FilterCategory[]> = {
  basic: ["beauty", "animal"],
  crush: ["beauty", "animal", "cyberpunk", "glamour", "artistic"],
  sprung: ["beauty", "animal", "cyberpunk", "glamour", "artistic", "fantasy", "seasonal"],
  vip: ["beauty", "animal", "cyberpunk", "glamour", "artistic", "fantasy", "seasonal", "avatar", "celestial"],
  platinum: ["beauty", "animal", "cyberpunk", "glamour", "artistic", "fantasy", "seasonal", "avatar", "celestial", "signature"]
};

export function canClientAccessFilter(filter: ARFilter, clientTier: ClientTier): boolean {
  if (filter.dancerOnly) return false;
  const accessible = CLIENT_TIER_FILTER_ACCESS[clientTier];
  if (!accessible.includes(filter.category)) return false;
  if (filter.minTier) {
    const tierOrder: ClientTier[] = ["basic", "crush", "sprung", "vip", "platinum"];
    return tierOrder.indexOf(clientTier) >= tierOrder.indexOf(filter.minTier);
  }
  return true;
}

export function getFiltersForMode(mode: StreamMode): ARFilter[] {
  return AR_FILTERS.filter((f) => f.supportedModes.includes(mode));
}

export const TRACKING_LABELS: Record<TrackingCapability, string> = {
  face_mesh_112: "112-Point Face Mesh",
  face_mesh_240: "240-Point Face Mesh (China-grade)",
  body_pose_33: "33-Joint Body Pose",
  hand_tracking_21: "21-Point Hand Tracking",
  lip_sync: "Real-Time Lip Sync",
  eye_gaze: "Eye Gaze Tracking",
  facial_expression: "Facial Expression Detection",
  hair_segmentation: "AI Hair Segmentation",
  skin_segmentation: "Skin Tone Segmentation",
  full_body_segmentation: "Full Body Segmentation"
};
