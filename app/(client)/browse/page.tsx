"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinBalance } from "@/components/core/CoinBalance";
import { TierBadge } from "@/components/profile/TierBadge";
import { RatingBadge } from "@/components/profile/RatingBadge";
import { useStreamMode } from "@/hooks/useStreamMode";
import type { DancerTier } from "@/lib/tiers";

const sampleDancers = [
  {
    id: "1",
    name: "Luna Rose",
    tier: "virtuoso" as DancerTier,
    location: "Miami",
    viewers: 1243,
    rating: 96,
    image:
      "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?auto=format&fit=crop&w=900&q=80",
    specialty: "Pole & Immersive"
  },
  {
    id: "2",
    name: "Scarlet Noir",
    tier: "virtuoso" as DancerTier,
    location: "Paris",
    viewers: 892,
    rating: 94,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    specialty: "Sensual VR"
  },
  {
    id: "3",
    name: "Diamond Jade",
    tier: "pro" as DancerTier,
    location: "Los Angeles",
    viewers: 674,
    rating: 88,
    image:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=900&q=80",
    specialty: "3D Stage Experience"
  },
  {
    id: "4",
    name: "Velvet Siren",
    tier: "premier" as DancerTier,
    location: "Dubai",
    viewers: 1456,
    rating: 91,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    specialty: "Haptic Signature Shows"
  }
];

export default function BrowsePage() {
  const { mode } = useStreamMode();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");

  const filtered = useMemo(
    () =>
      sampleDancers.filter(
        (dancer) =>
          dancer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedTier === "All" || dancer.tier === selectedTier.toLowerCase())
      ),
    [searchTerm, selectedTier]
  );

  return (
    <div className="min-h-screen bg-[#050002] pb-20">
      <header className="glass sticky top-0 z-50 border-b border-white/10 p-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-3.5 text-white/50" />
            <input
              type="text"
              placeholder="Search dancers..."
              className="w-full rounded-2xl border border-white/20 bg-black/60 py-3 pl-12 text-sm"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <CoinBalance />
          <div className="flex gap-3">
            {["All", "Virtuoso", "Premier", "Elite", "Pro", "Rising"].map((tier) => (
              <Button key={tier} onClick={() => setSelectedTier(tier)} variant={selectedTier === tier ? "default" : "outline"} size="sm">
                {tier}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-10">
        <h1 className="cherry-text font-display text-5xl">Discover Cherries</h1>
        <p className="mb-10 text-white/70">Selected Mode: {mode}</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dancer) => (
            <article
              key={dancer.id}
              className="glass cursor-pointer overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-1 hover:shadow-glow"
              onClick={() => router.push(`/stream/${dancer.id}`)}
            >
              <div className="relative h-80">
                <Image src={dancer.image} alt={dancer.name} fill className="object-cover" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-3xl font-semibold">{dancer.name}</h3>
                  <p className="text-white/70">
                    {dancer.location} • {dancer.specialty}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <TierBadge tier={dancer.tier} type="dancer" size="sm" />
                  <RatingBadge rating={dancer.rating} size="sm" />
                </div>
                <span className="flex items-center gap-1">
                  <Eye size={14} /> {dancer.viewers.toLocaleString()} live
                </span>
              </div>
              <div className="flex gap-3 p-6">
                <Button className="flex-1 bg-cherry-600">Crush ($4)</Button>
                <Button variant="outline" className="flex-1">
                  Sprung ($10/mo)
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
