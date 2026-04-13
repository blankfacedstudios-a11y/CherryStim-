export type EquipmentCategory = "volumetric_capture" | "vr_camera" | "haptic_device" | "depth_sensor" | "streaming_hardware" | "spatial_audio" | "motion_capture";

export interface EquipmentProvider {
  id: string;
  name: string;
  category: EquipmentCategory;
  website: string;
  contactEmail: string;
  description: string;
  flagshipProducts: ProductListing[];
  partnershipTier: "prospect" | "ambassador" | "strategic";
  bulkOrderAvailable: boolean;
  sdkAvailable: boolean;
  priceRange: string;
  headquarters: string;
}

export interface ProductListing {
  name: string;
  price: string;
  specs: string;
  bestFor: string;
}

export const EQUIPMENT_PROVIDERS: EquipmentProvider[] = [
  {
    id: "4dviews",
    name: "4Dviews",
    category: "volumetric_capture",
    website: "https://www.4dviews.com",
    contactEmail: "contact@4dviews.com",
    description: "Professional volumetric video capture with HOLOSYS+ system. Up to 48 cameras at 6K resolution, 30 FPS capture supporting up to 3 performers simultaneously. Unity/Unreal plugins and WebXR output.",
    flagshipProducts: [
      { name: "HOLOSYS+", price: "Enterprise pricing", specs: "48 cameras, 6K resolution, 30 FPS, 6m x 3m capture zone", bestFor: "Studio-grade volumetric performances" },
      { name: "HOLOSYS Lite", price: "From $50,000", specs: "24 cameras, 4K, compact setup", bestFor: "Emerging studios and dancer home setups" }
    ],
    partnershipTier: "strategic",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$50,000 - $500,000+",
    headquarters: "Grenoble, France"
  },
  {
    id: "volucap",
    name: "Volucap",
    category: "volumetric_capture",
    website: "https://volucap.com",
    contactEmail: "info@volucap.com",
    description: "World-leading volumetric resolution at Studio Babelsberg. 65+ megapixels per camera with patented ARRI lighting for natural skin tones. AI-powered mesh processing and temporal stabilization.",
    flagshipProducts: [
      { name: "Volucap Max Studio", price: "Studio rental per session", specs: "3000+ megapixels total, ARRI lighting, 132.48 GB/min", bestFor: "Premium content creation and signature shows" }
    ],
    partnershipTier: "strategic",
    bulkOrderAvailable: false,
    sdkAvailable: true,
    priceRange: "Per-session rental",
    headquarters: "Potsdam, Germany"
  },
  {
    id: "evercoast",
    name: "Evercoast",
    category: "volumetric_capture",
    website: "https://evercoast.org",
    contactEmail: "partnerships@evercoast.org",
    description: "Flexible 4D spatial video platform. Mavericks 4 for multi-camera sync and Cloudbreak for generating 4D spatial video from raw motion data. NYC studio available for remote production.",
    flagshipProducts: [
      { name: "Mavericks 4", price: "Software license", specs: "Multi-camera synchronization and calibration", bestFor: "Custom studio builds" },
      { name: "NYC Remote Studio", price: "Per-session booking", specs: "Full production crew + volumetric capture", bestFor: "On-demand premium content" }
    ],
    partnershipTier: "ambassador",
    bulkOrderAvailable: false,
    sdkAvailable: true,
    priceRange: "Per-session + software license",
    headquarters: "New York, NY"
  },
  {
    id: "splatlabs",
    name: "Splat Labs",
    category: "volumetric_capture",
    website: "https://www.splatlabs.ai",
    contactEmail: "hello@splatlabs.ai",
    description: "Portable spatial camera using 3D Gaussian Splatting. Dual fisheye lenses with onboard LiDAR for complete 360° capture. Real-time onboard processing with cloud options.",
    flagshipProducts: [
      { name: "PortalCam", price: "$4,999 - $6,499", specs: "Dual fisheye + LiDAR, Gaussian splatting, portable", bestFor: "Mobile dancer capture on the go" }
    ],
    partnershipTier: "ambassador",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$4,999 - $6,499",
    headquarters: "San Francisco, CA"
  },
  {
    id: "liveplanet",
    name: "Live Planet",
    category: "vr_camera",
    website: "https://liveplanet.net",
    contactEmail: "info@liveplanet.net",
    description: "Complete live VR streaming solution. Camera, cloud services, mobile and headset apps in one package. The only end-to-end live VR streaming system on the market.",
    flagshipProducts: [
      { name: "Live Planet VR System", price: "$7,995", specs: "VR camera + cloud + apps + accessories", bestFor: "Live VR streaming for dancers" }
    ],
    partnershipTier: "strategic",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$7,995",
    headquarters: "Los Angeles, CA"
  },
  {
    id: "kandao",
    name: "Kandao",
    category: "vr_camera",
    website: "https://kandaovr.com",
    contactEmail: "support@kandao.tech",
    description: "Professional 8K 3D VR180 cameras with Live Companion software for real-time stitching. Industry-standard image quality for VR content creation.",
    flagshipProducts: [
      { name: "Kandao VR Cam", price: "$3,500", specs: "8K 3D VR180, real-time stitching, Live Companion", bestFor: "High-quality VR180 live streams" },
      { name: "Kandao Obsidian Pro", price: "$4,999", specs: "12K 360°, professional-grade", bestFor: "Full 360 immersive capture" }
    ],
    partnershipTier: "ambassador",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$3,500 - $4,999",
    headquarters: "Shenzhen, China"
  },
  {
    id: "bhaptics",
    name: "bHaptics",
    category: "haptic_device",
    website: "https://www.bhaptics.com",
    contactEmail: "business@bhaptics.com",
    description: "Next-gen full body haptic suits with 39,000+ dynamic patterns. Audio-to-Haptic technology and Python/Unity/Unreal SDKs for custom integration.",
    flagshipProducts: [
      { name: "TactSuit Pro", price: "$529", specs: "32 feedback points, wireless Bluetooth", bestFor: "Full torso haptic feedback for viewers" },
      { name: "TactSuit Air", price: "$269", specs: "16 feedback points, ultra-lightweight", bestFor: "Casual haptic-enhanced viewing" },
      { name: "TactSleeve", price: "$199/pair", specs: "3 ERM motors per arm", bestFor: "Arm-based haptic for mobile users" },
      { name: "TactGlove", price: "$299/pair", specs: "6 LRA motors per hand", bestFor: "Hand interaction in VR" }
    ],
    partnershipTier: "strategic",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$199 - $529",
    headquarters: "Seoul, South Korea"
  },
  {
    id: "manus",
    name: "MANUS",
    category: "haptic_device",
    website: "https://www.manus-meta.com",
    contactEmail: "info@manus-meta.com",
    description: "Professional haptic gloves for VR/XR applications. Prime 3 Haptic XR with full finger tracking and vibrotactile feedback for immersive interaction.",
    flagshipProducts: [
      { name: "Prime 3 Haptic XR", price: "$4,999/pair", specs: "Full finger tracking + haptic feedback", bestFor: "Premium interactive VR experiences" },
      { name: "Quantum Metagloves", price: "$2,499/pair", specs: "High-fidelity finger tracking", bestFor: "Motion capture + VR hybrid shows" }
    ],
    partnershipTier: "ambassador",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$2,499 - $4,999",
    headquarters: "Eindhoven, Netherlands"
  },
  {
    id: "intel-realsense",
    name: "Intel RealSense",
    category: "depth_sensor",
    website: "https://www.intelrealsense.com",
    contactEmail: "realsense@intel.com",
    description: "Stereoscopic depth cameras with HDR imaging. SDK 2.0 supports C++, Python, Unity, Unreal. Ideal for body tracking and spatial mapping in dance performances.",
    flagshipProducts: [
      { name: "RealSense D455", price: "$349", specs: "Stereo depth + RGB, 90 FPS, USB-C", bestFor: "Body tracking for 3D avatar mapping" },
      { name: "RealSense L515", price: "$499", specs: "LiDAR depth, 9m range, compact", bestFor: "Room-scale spatial mapping" }
    ],
    partnershipTier: "ambassador",
    bulkOrderAvailable: true,
    sdkAvailable: true,
    priceRange: "$349 - $499",
    headquarters: "Santa Clara, CA"
  },
  {
    id: "cerevo",
    name: "Cerevo",
    category: "streaming_hardware",
    website: "https://cerevo.com",
    contactEmail: "info@cerevo.com",
    description: "Premium Full HD live streaming devices. LiveShell X supports H.265 encoding at 1080/60p with simultaneous multi-streaming and microSD recording.",
    flagshipProducts: [
      { name: "LiveShell X", price: "$799", specs: "H.265 1080/60p, multi-stream, microSD", bestFor: "Professional mobile streaming encoder" }
    ],
    partnershipTier: "prospect",
    bulkOrderAvailable: true,
    sdkAvailable: false,
    priceRange: "$799",
    headquarters: "Tokyo, Japan"
  }
];

export const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  volumetric_capture: "Volumetric Capture",
  vr_camera: "VR Camera",
  haptic_device: "Haptic Device",
  depth_sensor: "Depth Sensor",
  streaming_hardware: "Streaming Hardware",
  spatial_audio: "Spatial Audio",
  motion_capture: "Motion Capture"
};
