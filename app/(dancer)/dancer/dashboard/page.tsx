"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/profile/TierBadge";
import { RatingBadge } from "@/components/profile/RatingBadge";
import { Trophy, DollarSign, Users, BookOpen, Zap, Sparkles, Star, User, ClipboardList, Package, Wand2, CreditCard, Gift } from "lucide-react";
import { computeDancerTier } from "@/lib/tiers";
import { getTierSplit } from "@/lib/splits";

const MOCK_METRICS = {
  hoursOnApp: 350,
  earnings: 38429,
  giftsReceived: 420,
  campaignsCompleted: 4,
  modulesPassed: 7,
  rating: 92
};

export default function DancerDashboard() {
  const router = useRouter();
  const tier = computeDancerTier(MOCK_METRICS);
  const split = getTierSplit(tier);

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="cherry-text font-display text-5xl">Good Evening, Cherry</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <TierBadge tier={tier} type="dancer" />
              <RatingBadge rating={MOCK_METRICS.rating} size="sm" />
              <span className="text-sm text-white/70">
                Split: <span className="text-emerald-400">{split.label}</span>
              </span>
              <span className="text-white/70">•</span>
              <span className="text-white/70">
                This week&apos;s earnings: <span className="text-emerald-400">$4,872</span>
              </span>
            </div>
          </div>
          <Button size="lg" className="px-10 text-lg">
            Go Live Now
          </Button>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Earned</p>
                <p className="mt-2 text-4xl font-semibold">$38,429</p>
              </div>
              <DollarSign size={42} className="text-emerald-400" />
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Active Fans</p>
                <p className="mt-2 text-4xl font-semibold">1,284</p>
              </div>
              <Users size={42} className="text-rose-400" />
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Leaderboard</p>
                <p className="mt-2 text-4xl font-semibold">#3</p>
              </div>
              <Trophy size={42} className="text-gold-500" />
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">School Progress</p>
                <p className="mt-2 text-4xl font-semibold">87%</p>
              </div>
              <BookOpen size={42} className="text-sky-400" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/stream-setup")}
            role="button"
          >
            <Zap className="mb-4 text-gold-500" size={32} />
            <h3 className="mb-2 text-2xl">Start Streaming</h3>
            <p className="text-white/70">Configure 2D, 3D, VR or immersive mode</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/star-bright-lights")}
            role="button"
          >
            <Sparkles className="mb-4 text-gold-500" size={32} />
            <h3 className="mb-2 text-2xl">Star Bright Lights</h3>
            <p className="text-white/70">SAG casting, modeling, and acting opportunities</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/sag-pipeline")}
            role="button"
          >
            <ClipboardList className="mb-4 text-gold-500" size={32} />
            <h3 className="mb-2 text-2xl">SAG Pipeline</h3>
            <p className="text-white/70">Your step-by-step path to SAG-AFTRA membership</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/dream-wish")}
            role="button"
          >
            <Star className="mb-4 text-cherry-500" size={32} />
            <h3 className="mb-2 text-2xl">Dream Wish Campaign</h3>
            <p className="text-white/70">Launch a new goal and get advance funding</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/profile")}
            role="button"
          >
            <User className="mb-4 text-cherry-500" size={32} />
            <h3 className="mb-2 text-2xl">My Profile</h3>
            <p className="text-white/70">Upload photos, manage tier, and view ratings</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/filters")}
            role="button"
          >
            <Wand2 className="mb-4 text-purple-400" size={32} />
            <h3 className="mb-2 text-2xl">AR Filters</h3>
            <p className="text-white/70">Face tracking, body filters, lip sync FX</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/equipment")}
            role="button"
          >
            <Package className="mb-4 text-emerald-400" size={32} />
            <h3 className="mb-2 text-2xl">Equipment Partners</h3>
            <p className="text-white/70">VR/3D cameras, haptics, bulk orders</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/card-program")}
            role="button"
          >
            <CreditCard className="mb-4 text-gold-500" size={32} />
            <h3 className="mb-2 text-2xl">CherryStim Card</h3>
            <p className="text-white/70">Metal debit card, credit building, cashback</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dancer/welcome-package")}
            role="button"
          >
            <Gift className="mb-4 text-cherry-500" size={32} />
            <h3 className="mb-2 text-2xl">Welcome Package</h3>
            <p className="text-white/70">Pole, heels, perfume, signage, and more</p>
          </Card>

          <Card className="glass p-8 transition hover:border-gold-500">
            <BookOpen className="mb-4 text-sky-400" size={32} />
            <h3 className="mb-2 text-2xl">School of Economics</h3>
            <p className="text-white/70">Financial literacy and business modules</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
