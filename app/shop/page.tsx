"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, Star, Shield, Zap, Eye, Sparkles, Check, Truck, CreditCard } from "lucide-react";

type ProductCategory = "eyewear" | "vr" | "haptics" | "audio" | "bundles";

interface Product {
  id: string;
  name: string;
  emoji: string;
  category: ProductCategory;
  price: number;
  coinPrice: number;
  description: string;
  features: string[];
  colors: string[];
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
}

const PRODUCTS: Product[] = [
  // ── 2D Enhancer Eyewear ──
  { id: "2d-classic", name: "CherryStim 2D Classic Lenses", emoji: "🕶️", category: "eyewear", price: 89, coinPrice: 2200, description: "Premium blue-light filtering lenses with anti-glare coating. Optimized for 2D streaming on any screen. Ultra-lightweight titanium frames.", features: ["Blue-light filtering (99.8%)", "Anti-glare nano coating", "Titanium alloy frame (18g)", "Adjustable nose pads", "Cherry logo on temple", "Microfiber case included"], colors: ["Matte Black", "Rose Gold", "Cherry Red", "Pearl White"], rating: 4.8, reviews: 1247, badge: "BESTSELLER", image: "🕶️" },
  { id: "2d-pro", name: "CherryStim 2D Pro Enhancers", emoji: "👓", category: "eyewear", price: 149, coinPrice: 3800, description: "Advanced display-tuned lenses with dynamic contrast enhancement. See every detail, every expression, every moment in crystal clarity.", features: ["Dynamic contrast enhancement", "Color accuracy calibration", "Prescription-compatible inserts", "Memory flex frames", "UV400 protection", "Magnetic clip-on tint"], colors: ["Carbon Black", "Champagne Gold", "Cherry Gradient", "Ice Blue"], rating: 4.9, reviews: 843, badge: "TOP RATED", image: "👓" },

  // ── 3D Experience Glasses ──
  { id: "3d-spatial", name: "CherryStim 3D Spatial Glasses", emoji: "🥽", category: "eyewear", price: 249, coinPrice: 6400, description: "Passive 3D glasses with spatial audio integration. Experience Three.js rendered 3D stages with depth perception on compatible displays.", features: ["Passive 3D polarization", "Built-in spatial audio drivers", "Bluetooth 5.3 connectivity", "12-hour battery life", "Auto-dimming lenses", "Head tracking sensors"], colors: ["Obsidian", "Gold Edition", "Cherry Crimson"], rating: 4.7, reviews: 562, image: "🥽" },
  { id: "3d-holo", name: "CherryStim HoloView 3D", emoji: "✨", category: "eyewear", price: 399, coinPrice: 10200, description: "Next-gen holographic overlay glasses. AR-enhanced 3D viewing that projects performers into your space. The future of entertainment.", features: ["Holographic AR overlay", "Room-scale projection", "Gesture control support", "120Hz refresh rate", "6-hour battery", "USB-C fast charge", "CherryStim app integration"], colors: ["Midnight Chrome", "Rose Gold Limited"], rating: 4.9, reviews: 234, badge: "NEW", image: "✨" },

  // ── VR Headsets ──
  { id: "vr-cherry", name: "CherryStim VR One", emoji: "🎮", category: "vr", price: 499, coinPrice: 12800, description: "Custom CherryStim VR headset. Standalone, no PC required. Optimized for CherryStim VR streams with pre-loaded app and exclusive environments.", features: ["Standalone (no PC needed)", "4K per eye (dual 2160×2160)", "120Hz refresh rate", "Inside-out 6DoF tracking", "CherryStim app pre-loaded", "Exclusive VR environments", "3-hour battery life", "Adjustable IPD"], colors: ["Cherry Black", "Pearl Edition"], rating: 4.8, reviews: 1891, badge: "FLAGSHIP", image: "🎮" },
  { id: "vr-pro", name: "CherryStim VR Pro X", emoji: "🥽", category: "vr", price: 899, coinPrice: 23000, description: "The ultimate VR experience. Eye-tracking, face-tracking, and hand-tracking for full immersive interaction with performers in VR spaces.", features: ["Eye tracking (foveated rendering)", "Face tracking (expression capture)", "Hand tracking (no controllers needed)", "Pancake lens (ultra-thin)", "8K total resolution", "Wi-Fi 7 streaming", "5-hour battery", "Carbon fiber build"], colors: ["Carbon Black Pro"], rating: 5.0, reviews: 412, badge: "ULTIMATE", image: "🥽" },

  // ── Haptic Gear ──
  { id: "haptic-gloves", name: "CherryStim Touch Gloves", emoji: "🧤", category: "haptics", price: 299, coinPrice: 7600, description: "Haptic feedback gloves for immersive sessions. Feel textures, temperatures, and touch during immersive mode streams.", features: ["32 haptic actuators per glove", "Temperature simulation (warm/cool)", "Texture feedback engine", "Finger tracking (sub-mm precision)", "Bluetooth 5.3", "Washable fabric", "8-hour battery"], colors: ["Midnight", "Cherry Red"], rating: 4.7, reviews: 678, image: "🧤" },
  { id: "haptic-vest", name: "CherryStim Pulse Vest", emoji: "🦺", category: "haptics", price: 599, coinPrice: 15400, description: "Full-torso haptic vest with 40 vibrotactile zones. Feel the bass, feel the touch, feel the energy of live immersive performances.", features: ["40 vibrotactile zones", "Spatial haptic mapping", "Music-synced vibration", "Performer touch simulation", "Machine washable", "Adjustable fit (XS-3XL)", "10-hour battery", "CherryStim SDK integration"], colors: ["Stealth Black", "Cherry Pulse"], rating: 4.9, reviews: 345, badge: "FAN FAVORITE", image: "🦺" },
  { id: "haptic-suit", name: "CherryStim Immersive Full Suit", emoji: "🤖", category: "haptics", price: 1499, coinPrice: 38400, description: "The holy grail. Full-body haptic suit with 128 feedback zones, temperature control, and biometric sensors. Maximum immersion.", features: ["128 haptic feedback zones", "Full-body temperature control", "Biometric heart rate monitoring", "Motion capture capable", "Performer proximity simulation", "12-hour battery", "Custom fit tailoring", "Premium carry case"], colors: ["Carbon Pro"], rating: 5.0, reviews: 89, badge: "ELITE", image: "🤖" },

  // ── Audio ──
  { id: "audio-buds", name: "CherryStim Crystal Buds", emoji: "🎧", category: "audio", price: 179, coinPrice: 4600, description: "Spatial audio earbuds tuned for CherryStim streams. ANC, transparency mode, and 3D audio processing for immersive listening.", features: ["Spatial audio processing", "Active noise cancellation", "Transparency mode", "LDAC Hi-Res codec", "8-hour battery (32 with case)", "IPX5 water resistant", "Cherry edition charging case"], colors: ["Cherry White", "Midnight Black", "Rose Gold"], rating: 4.8, reviews: 2134, badge: "BESTSELLER", image: "🎧" },
  { id: "audio-over", name: "CherryStim Studio Headphones", emoji: "🎧", category: "audio", price: 349, coinPrice: 8900, description: "Over-ear headphones with head-tracking spatial audio. Hear performers move around you in 3D space. Studio-grade drivers.", features: ["50mm planar magnetic drivers", "Head-tracking spatial audio", "ANC (45dB reduction)", "Cherry-tuned EQ profile", "30-hour battery", "USB-C + 3.5mm", "Memory foam cushions", "Foldable design"], colors: ["Matte Black", "Cherry Edition"], rating: 4.9, reviews: 967, image: "🎧" },

  // ── Bundles ──
  { id: "bundle-starter", name: "Cherry Starter Bundle", emoji: "📦", category: "bundles", price: 199, coinPrice: 5100, description: "Everything you need to start. 2D enhancer glasses + Crystal Buds + 1,000 CherryCoins.", features: ["2D Classic Lenses", "Crystal Buds", "1,000 CherryCoins bonus", "CherryStim sticker pack", "Welcome guide"], colors: ["Standard"], rating: 4.8, reviews: 3421, badge: "BEST VALUE", image: "📦" },
  { id: "bundle-vr", name: "Cherry VR Bundle", emoji: "🎁", category: "bundles", price: 749, coinPrice: 19200, description: "VR ready out of the box. VR One headset + Touch Gloves + 5,000 CherryCoins + 1 month Virtuoso access.", features: ["VR One headset", "Touch Gloves", "5,000 CherryCoins bonus", "1 month Virtuoso membership", "Premium carry case"], colors: ["Standard"], rating: 4.9, reviews: 1567, badge: "POPULAR", image: "🎁" },
  { id: "bundle-immersive", name: "Cherry Immersive Ultimate Bundle", emoji: "👑", category: "bundles", price: 2499, coinPrice: 64000, description: "The complete immersive experience. VR Pro X + Full Suit + Studio Headphones + 25,000 CherryCoins + lifetime Virtuoso.", features: ["VR Pro X headset", "Immersive Full Suit", "Studio Headphones", "25,000 CherryCoins", "Lifetime Virtuoso membership", "Priority CherryStim support", "Exclusive avatar skin"], colors: ["Collector's Edition"], rating: 5.0, reviews: 234, badge: "ULTIMATE", image: "👑" },
];

const BADGE_COLORS: Record<string, string> = {
  "BESTSELLER": "bg-emerald-500/15 text-emerald-400",
  "TOP RATED": "bg-gold-500/15 text-gold-400",
  "NEW": "bg-sky-500/15 text-sky-400",
  "FLAGSHIP": "bg-cherry-500/15 text-cherry-500",
  "ULTIMATE": "bg-violet-500/15 text-violet-400",
  "FAN FAVORITE": "bg-cherry-500/15 text-cherry-500",
  "ELITE": "bg-gold-500/15 text-gold-400",
  "BEST VALUE": "bg-emerald-500/15 text-emerald-400",
  "POPULAR": "bg-sky-500/15 text-sky-400",
};

export default function ShopPage() {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  function addToCart(productId: string) {
    setCart((prev) => [...prev, productId]);
    const product = PRODUCTS.find((p) => p.id === productId);
    toast.success(`${product?.name} added to cart!`);
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_0%,rgba(255,0,51,0.12),transparent_50%),radial-gradient(circle_at_20%_100%,rgba(139,92,246,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Eye size={20} className="text-cherry-500" />
                <span className="rounded-lg bg-cherry-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cherry-500">Official Gear</span>
              </div>
              <h1 className="cherry-text font-display text-5xl md:text-6xl">CherryStim Shop</h1>
              <p className="mt-2 text-white/50">Custom eyewear, VR headsets, haptic gear, and audio — designed for the ultimate CherryStim experience.</p>
            </div>
            <Button variant="outline" className="relative" onClick={() => toast.info(`${cart.length} items in cart`)}>
              <ShoppingCart size={18} className="mr-2" /> Cart
              {cart.length > 0 && <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cherry-500 text-[10px] font-bold">{cart.length}</span>}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {([["all", "All Products"], ["eyewear", "👓 Eyewear"], ["vr", "🥽 VR Headsets"], ["haptics", "🧤 Haptic Gear"], ["audio", "🎧 Audio"], ["bundles", "📦 Bundles"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setCategory(key)} className={`rounded-xl px-4 py-2 text-xs font-medium transition ${category === key ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Card key={product.id} className="glass overflow-hidden transition hover:scale-[1.01]">
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                <span className="text-7xl">{product.image}</span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className="flex items-center gap-0.5 text-gold-400">
                        <Star size={10} className="fill-gold-400" /> {product.rating}
                      </span>
                      <span>({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  {product.badge && <span className={`rounded-lg px-2 py-0.5 text-[9px] font-bold ${BADGE_COLORS[product.badge] || "bg-white/10 text-white/50"}`}>{product.badge}</span>}
                </div>
                <p className="mb-3 text-xs text-white/50">{product.description}</p>

                <div className="mb-3 flex flex-wrap gap-1">
                  {product.colors.map((c) => <span key={c} className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">{c}</span>)}
                </div>

                <details className="mb-3">
                  <summary className="cursor-pointer text-[10px] font-medium text-white/40 hover:text-white/60">View features ({product.features.length})</summary>
                  <div className="mt-2 space-y-1">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-start gap-1.5 text-[10px] text-white/50">
                        <Check size={10} className="mt-0.5 flex-shrink-0 text-emerald-400" /> {f}
                      </div>
                    ))}
                  </div>
                </details>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">${product.price}</p>
                    <p className="text-[10px] text-gold-400">or {product.coinPrice.toLocaleString()} CherryCoins</p>
                  </div>
                  <Button size="sm" onClick={() => addToCart(product.id)}>
                    <ShoppingCart size={13} className="mr-1" /> Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="glass mt-12 p-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center text-xs text-white/40">
            <div className="flex items-center gap-2"><Truck size={16} /> Free worldwide shipping on orders over $199</div>
            <div className="flex items-center gap-2"><Shield size={16} /> 30-day money-back guarantee</div>
            <div className="flex items-center gap-2"><CreditCard size={16} /> Pay with card or CherryCoins</div>
            <div className="flex items-center gap-2"><Sparkles size={16} /> CherryCoin purchases earn 2x loyalty points</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
