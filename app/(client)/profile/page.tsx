"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhotoUploader } from "@/components/profile/PhotoUploader";
import { RatingBadge } from "@/components/profile/RatingBadge";
import { useRatingStore } from "@/hooks/useRatingStore";
import { User, AlertTriangle, CreditCard } from "lucide-react";
import { RATING_CONFIG } from "@/lib/ratings";

export default function ClientProfilePage() {
  const [displayName, setDisplayName] = useState("VIP Client");
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const { getRatingForUser, getClientAccess } = useRatingStore();

  const rating = getRatingForUser("current-client", "client") || 88;
  const access = getClientAccess("current-client", false);
  const isLow = rating < RATING_CONFIG.lowRatingThreshold;

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="cherry-text mb-2 font-display text-5xl">Client Profile</h1>
          <p className="text-white/70">Manage your profile, photos, and view your account standing.</p>
        </div>

        <Card className="glass p-8">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <User className="text-cherry-500" size={24} />
              <h2 className="text-2xl font-semibold">Profile Info</h2>
            </div>
            <RatingBadge rating={rating} />
          </div>

          {isLow && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={18} />
                <p className="font-semibold">Low Rating Warning</p>
              </div>
              <p className="mt-1 text-sm text-white/70">
                Your rating is below {RATING_CONFIG.lowRatingThreshold}%. You have limited access to the platform.
                {access === "limited" && " Pay premium to restore full access temporarily, or improve your rating by tipping dancers and having positive interactions."}
              </p>
              {access === "limited" && (
                <Button size="sm" className="mt-3 bg-gold-500 text-black">
                  <CreditCard size={14} className="mr-2" /> Pay for Premium Access
                </Button>
              )}
            </div>
          )}

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
                Account Standing: <span className={`font-semibold ${isLow ? "text-red-400" : "text-emerald-400"}`}>{isLow ? "Restricted" : "Good Standing"}</span>
              </p>
              <p className="mt-2 text-xs text-white/40">
                Ratings are based on time spent, money spent, interactions with dancers, and how dancers rate you. Always tip to maintain good standing.
              </p>
            </div>
          </div>

          <PhotoUploader
            photos={photos}
            iconUrl={iconUrl}
            onPhotosChange={setPhotos}
            onIconChange={setIconUrl}
            requireProfessional={false}
          />

          <div className="mt-6">
            <Button size="lg" className="w-full md:w-auto">Save Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
