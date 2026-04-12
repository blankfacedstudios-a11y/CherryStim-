"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { LiveCommentBox } from "@/components/dashboard/LiveCommentBox";
import { TaxCalculator } from "@/components/dashboard/TaxCalculator";
import { GlobalTaxModule } from "@/components/finance/GlobalTaxModule";
import { CreditAcademy } from "@/components/dashboard/CreditAcademy";
import { QuizModule } from "@/components/dashboard/QuizModule";
import { MiniChart } from "@/components/dashboard/MiniChart";
import {
  Trophy, DollarSign, Users, BookOpen, Zap, TrendingUp,
  Target, Flame, Star, Camera, Sparkles, Clock, PiggyBank
} from "lucide-react";

export default function DancerDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"hub" | "academy" | "finance">("hub");

  return (
    <div className="min-h-screen bg-[#050002] pb-20">
      <div className="border-b border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="cherry-text font-display text-4xl">Dancer Hub</h1>
            <p className="text-xs text-white/50">Supersonic 3rd Edition • Virtuoso Tier • This week: <span className="text-emerald-400">$4,872</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {(["hub", "academy", "finance"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tab === t ? "bg-cherry-500/20 text-cherry-500" : "text-white/50 hover:bg-white/5"}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <Button size="lg" className="px-8">
              <Zap className="mr-2" size={16} /> Go Live
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        {tab === "hub" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <HoloWidget title="Total Earned" value={38429} subtitle="All-time earnings" icon={<DollarSign size={20} />} color="emerald" trend={{ value: 18.3, label: "vs last month" }} />
              <HoloWidget title="Active Fans" value={1284} subtitle="Subscribed viewers" icon={<Users size={20} />} color="cherry" trend={{ value: 7.2, label: "growth" }} />
              <HoloWidget title="Leaderboard" value="#3" subtitle="Platform ranking" icon={<Trophy size={20} />} color="gold" />
              <HoloWidget title="Stream Hours" value={342} subtitle="This month" icon={<Clock size={20} />} color="sky" trend={{ value: 12, label: "vs last month" }} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniChart title="Daily Earnings" data={[420, 580, 390, 720, 650, 890, 1100, 780, 950, 1200, 880, 1400]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} color="#10b981" />
              <MiniChart title="Viewer Count" data={[180, 220, 195, 310, 280, 420, 380, 510, 450, 620, 580, 750]} labels={["6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]} color="#ff0033" />
              <MiniChart title="Fan Growth" data={[950, 980, 1010, 1045, 1080, 1110, 1145, 1180, 1210, 1240, 1260, 1284]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} color="#ffd700" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className="glass cursor-pointer p-6 transition hover:border-gold-500/30" onClick={() => router.push("/dancer/stream-setup")} role="button">
                    <Camera className="mb-3 text-gold-500" size={24} />
                    <h3 className="text-lg font-semibold">Start Streaming</h3>
                    <p className="text-xs text-white/50">Configure 2D, 3D, VR, or Immersive mode</p>
                  </Card>
                  <Card className="glass cursor-pointer p-6 transition hover:border-cherry-500/30" onClick={() => router.push("/dancer/dream-wish")} role="button">
                    <Target className="mb-3 text-cherry-500" size={24} />
                    <h3 className="text-lg font-semibold">Dream Wish</h3>
                    <p className="text-xs text-white/50">Launch goals & get advance funding</p>
                  </Card>
                  <Card className="glass p-6 transition hover:border-violet-500/30">
                    <BookOpen className="mb-3 text-violet-400" size={24} />
                    <h3 className="text-lg font-semibold">School of Economics</h3>
                    <p className="text-xs text-white/50">Financial literacy & business modules</p>
                  </Card>
                </div>

                <Leaderboard
                  title="Performer Leaderboard — Weekly"
                  entries={[
                    { rank: 1, name: "Luna Rose", score: 8420, badge: "Virtuoso" },
                    { rank: 2, name: "Velvet Siren", score: 7890, badge: "Virtuoso" },
                    { rank: 3, name: "You", score: 4872, badge: "Virtuoso" },
                    { rank: 4, name: "Scarlet Noir", score: 4210, badge: "Virtuoso" },
                    { rank: 5, name: "Diamond Jade", score: 3680, badge: "Pro" }
                  ]}
                  scoreLabel="Earned"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <HoloWidget title="Gift Revenue" value={12840} subtitle="From fan gifts this month" icon={<Sparkles size={20} />} color="violet" trend={{ value: 24, label: "vs last month" }} />
                  <HoloWidget title="Tip Average" value="$18.50" subtitle="Per tipping viewer" icon={<Flame size={20} />} color="cherry" trend={{ value: 8, label: "increase" }} />
                </div>
              </div>
              <LiveCommentBox className="h-[700px]" />
            </div>
          </div>
        )}

        {tab === "academy" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CreditAcademy />
            <div className="space-y-6">
              <QuizModule />
              <Leaderboard
                title="Dancer Academy Leaderboard"
                entries={[
                  { rank: 1, name: "Golden Child", score: 860, badge: "Expert" },
                  { rank: 2, name: "Luna Rose", score: 780, badge: "Expert" },
                  { rank: 3, name: "Velvet Siren", score: 720, badge: "Scholar" },
                  { rank: 4, name: "Diamond Jade", score: 540, badge: "Student" },
                  { rank: 5, name: "Scarlet Noir", score: 480, badge: "Student" }
                ]}
                scoreLabel="XP"
              />
            </div>
          </div>
        )}

        {tab === "finance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TaxCalculator />
              <div className="space-y-6">
                <HoloWidget title="Net Earnings (After Split)" value="$26,900" subtitle="70% performer share" icon={<PiggyBank size={20} />} color="emerald" />
                <HoloWidget title="Quarterly Tax Estimate" value="$8,240" subtitle="Due next quarter" icon={<DollarSign size={20} />} color="cherry" />
                <MiniChart title="Monthly Earnings" data={[2800, 3200, 3600, 4100, 3800, 4500, 5200, 4800, 5600, 6200, 5800, 6400]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#10b981" />
                <Card className="glass p-5">
                  <Star className="mb-2 text-gold-500" size={20} />
                  <h3 className="font-semibold">Revenue Split Breakdown</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/50">Your Share (70%)</span><span className="text-emerald-400">$26,900</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Platform Fee (30%)</span><span className="text-white/40">$11,529</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-2 font-semibold"><span>Gross Revenue</span><span>$38,429</span></div>
                  </div>
                </Card>
              </div>
            </div>
            <GlobalTaxModule />
          </div>
        )}
      </div>
    </div>
  );
}
