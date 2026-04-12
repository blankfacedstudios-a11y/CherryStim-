"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoinBalance } from "@/components/core/CoinBalance";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { LiveCommentBox } from "@/components/dashboard/LiveCommentBox";
import { TaxCalculator } from "@/components/dashboard/TaxCalculator";
import { GlobalTaxModule } from "@/components/finance/GlobalTaxModule";
import { CreditAcademy } from "@/components/dashboard/CreditAcademy";
import { QuizModule } from "@/components/dashboard/QuizModule";
import { MiniChart } from "@/components/dashboard/MiniChart";
import {
  Heart, Timer, Gem, BadgeDollarSign, Crown, Star,
  Wallet, TrendingUp, Zap, Gift, ShoppingBag, Sparkles
} from "lucide-react";

export default function ClientDashboardPage() {
  const [tab, setTab] = useState<"vault" | "academy" | "finance">("vault");

  return (
    <main className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="cherry-text font-display text-4xl">Client Vault</h1>
            <p className="text-xs text-white/50">Supersonic 3rd Edition • Premium Viewer Experience</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {(["vault", "academy", "finance"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tab === t ? "bg-cherry-500/20 text-cherry-500" : "text-white/50 hover:bg-white/5"}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <CoinBalance />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        {tab === "vault" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <HoloWidget title="Active Crushes" value={4} subtitle="Performers you follow" icon={<Heart size={20} />} color="cherry" />
              <HoloWidget title="Minutes Remaining" value={86} subtitle="Private session credits" icon={<Timer size={20} />} color="gold" />
              <HoloWidget title="NFT Gifts Owned" value={19} subtitle="Collectible digital assets" icon={<Gem size={20} />} color="violet" />
              <HoloWidget title="Monthly Spend" value={328} subtitle="Subscription + gifts" icon={<BadgeDollarSign size={20} />} color="emerald" trend={{ value: -5.2, label: "vs last month" }} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniChart title="Viewing Hours" data={[2.4, 3.1, 1.8, 4.2, 3.6, 5.1, 4.8, 6.2, 5.5, 7.1, 6.8, 8.4]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} color="#ff0033" />
              <MiniChart title="Coins Spent" data={[120, 85, 200, 150, 310, 180, 250, 420, 190, 380, 290, 450]} labels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]} color="#ffd700" />
              <MiniChart title="NFT Value" data={[500, 520, 480, 550, 610, 580, 640, 720, 690, 780, 850, 920]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} color="#8b5cf6" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className="glass p-6 transition hover:border-cherry-500/30">
                    <Crown className="mb-3 text-gold-500" size={24} />
                    <h3 className="text-lg font-semibold">Private Session Queue</h3>
                    <p className="mb-4 text-sm text-white/50">Book 1-on-1 immersive sessions from 10–60 min blocks</p>
                    <Button className="w-full">Request a Private Room</Button>
                  </Card>
                  <Card className="glass p-6 transition hover:border-gold-500/30">
                    <Star className="mb-3 text-gold-500" size={24} />
                    <h3 className="text-lg font-semibold">Tier Membership</h3>
                    <p className="mb-4 text-sm text-white/50">Upgrade to Sprung+ for reduced fees & early access</p>
                    <Button variant="outline" className="w-full">Upgrade Tier</Button>
                  </Card>
                  <Card className="glass p-6 transition hover:border-violet-500/30">
                    <Gift className="mb-3 text-violet-400" size={24} />
                    <h3 className="text-lg font-semibold">Gift Marketplace</h3>
                    <p className="mb-4 text-sm text-white/50">Browse NFT gifts: diamonds, luxury bags, supercars</p>
                    <Button variant="outline" className="w-full">Browse Gifts</Button>
                  </Card>
                  <Card className="glass p-6 transition hover:border-emerald-500/30">
                    <Wallet className="mb-3 text-emerald-400" size={24} />
                    <h3 className="text-lg font-semibold">Coin Staking</h3>
                    <p className="mb-4 text-sm text-white/50">Stake CherryCoins for 8% APY + exclusive rewards</p>
                    <Button variant="outline" className="w-full">Stake Coins</Button>
                  </Card>
                </div>

                <Leaderboard
                  title="Top Supporters — This Month"
                  entries={[
                    { rank: 1, name: "Bruce Wayne Jr", score: 14200, badge: "Whale" },
                    { rank: 2, name: "VIP Client #42", score: 11800, badge: "Gold" },
                    { rank: 3, name: "Platinum Patron", score: 9400, badge: "Gold" },
                    { rank: 4, name: "Diamond Hands", score: 7600, badge: "Silver" },
                    { rank: 5, name: "Cherry Lover", score: 5200, badge: "Silver" }
                  ]}
                  scoreLabel="Coins Given"
                />
              </div>
              <LiveCommentBox className="h-[600px]" />
            </div>
          </div>
        )}

        {tab === "academy" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CreditAcademy />
            <div className="space-y-6">
              <QuizModule />
              <Leaderboard
                title="Academy Leaderboard"
                entries={[
                  { rank: 1, name: "Bruce Wayne Jr", score: 720, badge: "Scholar" },
                  { rank: 2, name: "VIP Client", score: 680, badge: "Scholar" },
                  { rank: 3, name: "Cherry Investor", score: 540, badge: "Student" },
                  { rank: 4, name: "Platinum Patron", score: 420, badge: "Student" },
                  { rank: 5, name: "New Learner", score: 180, badge: "Beginner" }
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
                <HoloWidget title="Total Invested" value="$4,280" subtitle="CherryCoins + NFTs" icon={<TrendingUp size={20} />} color="emerald" />
                <HoloWidget title="Portfolio Value" value="$6,120" subtitle="+43% all-time" icon={<Sparkles size={20} />} color="gold" trend={{ value: 43, label: "all-time" }} />
                <MiniChart title="Spending Trend" data={[280, 320, 290, 410, 380, 520, 450, 610, 480, 580, 520, 640]} labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} color="#ff0033" />
              </div>
            </div>
            <GlobalTaxModule />
          </div>
        )}
      </div>
    </main>
  );
}
