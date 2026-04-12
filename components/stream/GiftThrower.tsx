"use client";

import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { createHapticPulse } from "@/lib/webxr";
import { cn } from "@/lib/utils";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

type GiftType = "diamond" | "bag" | "car";

interface GiftProjectile {
  id: string;
  type: GiftType;
  createdAt: number;
  lane: number;
}

interface GiftStore {
  gifts: GiftProjectile[];
  throwGift: (type: GiftType) => GiftProjectile;
  removeGift: (id: string) => void;
}

const giftStyles: Record<GiftType, { label: string; price: number; color: string }> = {
  diamond: { label: "Diamond NFT", price: 120, color: "#9be7ff" },
  bag: { label: "Luxury Bag NFT", price: 180, color: "#ff5d8f" },
  car: { label: "Supercar NFT", price: 400, color: "#ffd700" }
};

export const useGiftStore = create<GiftStore>((set) => ({
  gifts: [],
  throwGift: (type) => {
    const gift: GiftProjectile = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      createdAt: performance.now(),
      lane: Math.random() * 2 - 1
    };
    set((state) => ({ gifts: [...state.gifts, gift] }));
    return gift;
  },
  removeGift: (id) =>
    set((state) => ({
      gifts: state.gifts.filter((gift) => gift.id !== id)
    }))
}));

interface GiftThrowerProps {
  dancerId: string;
  onGiftThrown?: (giftType: GiftType) => void;
  renderMode?: "panel" | "scene";
}

export default function GiftThrower({ dancerId, onGiftThrown, renderMode = "panel" }: GiftThrowerProps) {
  const { gifts, removeGift, throwGift } = useGiftStore();

  if (renderMode === "scene") {
    return (
      <group>
        {gifts.map((gift) => (
          <GiftMesh key={gift.id} gift={gift} onComplete={() => removeGift(gift.id)} />
        ))}
      </group>
    );
  }

  return (
    <div className="glass rounded-3xl border border-gold-500/25 p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gold-400/90">Throw NFT Gifts • Dancer #{dancerId}</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(giftStyles) as GiftType[]).map((giftType) => (
          <Button
            key={giftType}
            className={cn("bg-black/70", giftType === "car" && "border border-gold-500/50")}
            onClick={() => {
              throwGift(giftType);
              createHapticPulse(giftType === "car" ? 1 : 0.65, giftType === "car" ? 70 : 35);
              onGiftThrown?.(giftType);
            }}
            variant="outline"
            size="sm"
          >
            {giftStyles[giftType].label} ({giftStyles[giftType].price} C)
          </Button>
        ))}
      </div>
    </div>
  );
}

function GiftMesh({ gift, onComplete }: { gift: GiftProjectile; onComplete: () => void }) {
  const materialColor = useMemo(() => giftStyles[gift.type].color, [gift.type]);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime() * 1000 - gift.createdAt;
    if (elapsed > 2200) {
      onComplete();
      return;
    }
  });

  const baseScale = gift.type === "car" ? 0.2 : 0.14;
  return (
    <mesh position={[gift.lane * 1.5, 0.9, 2]} rotation={[0.4, 0, 0]}>
      <icosahedronGeometry args={[baseScale, 0]} />
      <meshStandardMaterial color={materialColor} emissive={materialColor} emissiveIntensity={0.5} />
    </mesh>
  );
}
