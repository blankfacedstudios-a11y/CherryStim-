"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhotoUploader } from "@/components/profile/PhotoUploader";
import { TierBadge } from "@/components/profile/TierBadge";
import { RatingBadge } from "@/components/profile/RatingBadge";
import { useRatingStore } from "@/hooks/useRatingStore";
import { computeDancerTier, type UserMetrics } from "@/lib/tiers";
import { getTierSplit } from "@/lib/splits";
import { User } from "lucide-react";

const MOCK_METRICS: UserMetrics = {
  hoursOnApp: 350,
  earnings: 38429,
  giftsReceived: 420,
  campaignsCompleted: 4,
  modulesPassed: 7,
  rating: 92
};

export default function DancerProfilePage() {
  const [displayName, setDisplayName] = useState("Cherry Rose");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const { getRatingForUser } = useRatingStore();

  const rating = getRatingForUser("current-dancer", "dancer") || MOCK_METRICS.rating;
  const tier = computeDancerTier({ ...MOCK_METRICS, rating });
  const split = getTierSplit(tier);

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="cherry-text mb-2 font-display text-5xl">Dancer Profile</h1>
          <p className="text-white/70">Manage your public profile, photos, and view your tier status.</p>
        </div>

        <Card className="glass p-8">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <User className="text-gold-500" size={24} />
              <h2 className="text-2xl font-semibold">Profile Info</h2>
            </div>
            <TierBadge tier={tier} type="dancer" />
            <RatingBadge rating={rating} />
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/60">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full max-w-md rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm"
              />
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white/60">
                Current Tier: <span className="font-semibold text-gold-400">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
              </p>
              <p className="text-sm text-white/60">
                Revenue Split: <span className="font-semibold text-emerald-400">{split.label}</span> (Performer {split.performer}% / Platform {split.platform}%)
              </p>
              <p className="mt-2 text-xs text-white/40">
                Your tier is based on time on app, earnings, gifts received, campaigns completed, modules passed, and your rating.
              </p>
            </div>
          </div>

          <PhotoUploader
            photos={photos}
            iconUrl={iconUrl}
            onPhotosChange={setPhotos}
            onIconChange={setIconUrl}
            requireProfessional
          />

          <div className="mt-6">
            <Button size="lg" className="w-full md:w-auto">Save Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
