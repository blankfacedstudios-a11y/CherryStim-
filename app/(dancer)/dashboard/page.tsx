"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, DollarSign, Users, BookOpen, Zap } from "lucide-react";

export default function DancerDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="cherry-text font-display text-5xl">Good Evening, Cherry</h1>
            <p className="mt-2 text-white/70">
              Virtuoso Tier • This week&apos;s earnings: <span className="text-emerald-400">$4,872</span>
            </p>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/stream-setup")}
            role="button"
          >
            <Zap className="mb-4 text-gold-500" size={32} />
            <h3 className="mb-2 text-2xl">Start Streaming</h3>
            <p className="text-white/70">Configure 2D, 3D, VR or immersive mode</p>
          </Card>

          <Card
            className="glass cursor-pointer p-8 transition hover:border-gold-500"
            onClick={() => router.push("/dream-wish")}
            role="button"
          >
            <h3 className="mb-2 text-2xl">Dream Wish Campaign</h3>
            <p className="text-white/70">Launch a new goal and get advance funding</p>
          </Card>

          <Card className="glass p-8 transition hover:border-gold-500">
            <h3 className="mb-2 text-2xl">School of Economics</h3>
            <p className="text-white/70">Financial literacy and business modules</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
