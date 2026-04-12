"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { LiveCommentBox } from "@/components/dashboard/LiveCommentBox";
import { TaxCalculator } from "@/components/dashboard/TaxCalculator";
import { CreditAcademy } from "@/components/dashboard/CreditAcademy";
import { QuizModule } from "@/components/dashboard/QuizModule";
import { MiniChart } from "@/components/dashboard/MiniChart";
import {
  Shield, Users, DollarSign, Activity, BarChart3, Settings,
  LogOut, Eye, TrendingUp, Zap, Globe, Cpu, Crown, Gem
} from "lucide-react";

interface Profile { id: string; display_name: string; role: string; tier: string; created_at: string; }
interface Wallet { user_id: string; balance: number; }

export default function AdminDashboard() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [tab, setTab] = useState<"overview" | "users" | "finance" | "academy">("overview");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profile?.role !== "admin") { router.push("/dashboard"); return; }
      setAdminName(profile.display_name || user.email || "Admin");
      const { data: allProfiles } = await supabase.from("profiles").select("*").order("created_at");
      const { data: allWallets } = await supabase.from("coin_wallets").select("*");
      setProfiles(allProfiles || []);
      setWallets(allWallets || []);
      setLoading(false);
    }
    load();
  }, [router]);

  function getBalance(userId: string) { return wallets.find((w) => w.user_id === userId)?.balance || 0; }

  const totalCoins = wallets.reduce((s, w) => s + w.balance, 0);
  const dancerCount = profiles.filter((p) => p.role === "dancer").length;
  const clientCount = profiles.filter((p) => p.role === "client").length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="animate-pulse text-lg text-white/50">Loading Supersonic Admin...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-amber-600">
              <Shield size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Admin Control Center</h1>
              <p className="text-xs text-white/50">Supersonic 3rd Edition • {adminName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(["overview", "users", "finance", "academy"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tab === t ? "bg-gold-500/20 text-gold-400" : "text-white/50 hover:bg-white/5"}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <HoloWidget title="Total Revenue" value={284930} subtitle="This quarter" icon={<DollarSign size={20} />} color="emerald" trend={{ value: 23.4, label: "vs last quarter" }} />
              <HoloWidget title="Active Users" value={profiles.length} subtitle={`${dancerCount} dancers • ${clientCount} clients`} icon={<Users size={20} />} color="sky" trend={{ value: 12, label: "this month" }} />
              <HoloWidget title="Coins in Circulation" value={totalCoins} subtitle="Platform-wide" icon={<Gem size={20} />} color="gold" trend={{ value: 8.2, label: "growth" }} />
              <HoloWidget title="Stream Hours" value={12847} subtitle="This month" icon={<Activity size={20} />} color="cherry" trend={{ value: 31, label: "vs last month" }} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniChart title="Daily Revenue" data={[4200, 5100, 4800, 6200, 5900, 7100, 8400, 7800, 9200, 8600, 10100, 9800]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} color="#10b981" />
              <MiniChart title="Active Streams" data={[12, 18, 14, 22, 19, 28, 32, 25, 35, 29, 38, 42]} labels={["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"]} color="#ff0033" />
              <MiniChart title="New Users" data={[45, 62, 58, 71, 84, 92, 78, 105, 118, 95, 132, 145]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} color="#ffd700" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Leaderboard
                  title="Top Performers — Revenue"
                  entries={[
                    { rank: 1, name: "Luna Rose", score: 48290, badge: "Virtuoso" },
                    { rank: 2, name: "Velvet Siren", score: 42150, badge: "Virtuoso" },
                    { rank: 3, name: "Scarlet Noir", score: 38700, badge: "Virtuoso" },
                    { rank: 4, name: "Diamond Jade", score: 31420, badge: "Pro" },
                    { rank: 5, name: "Golden Child", score: 25000, badge: "Supersonic" }
                  ]}
                  scoreLabel="Coins"
                />
              </div>
              <LiveCommentBox className="h-[400px]" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card className="glass p-5 transition hover:border-gold-500/30">
                <Cpu className="mb-3 text-violet-400" size={24} />
                <h3 className="font-semibold">AI Analytics Engine</h3>
                <p className="mt-1 text-xs text-white/50">Predictive revenue modeling & user behavior analysis</p>
              </Card>
              <Card className="glass p-5 transition hover:border-gold-500/30">
                <Globe className="mb-3 text-sky-400" size={24} />
                <h3 className="font-semibold">Global CDN Monitor</h3>
                <p className="mt-1 text-xs text-white/50">Stream latency, edge nodes, bandwidth utilization</p>
              </Card>
              <Card className="glass p-5 transition hover:border-gold-500/30">
                <Settings className="mb-3 text-gold-500" size={24} />
                <h3 className="font-semibold">Revenue Split Config</h3>
                <p className="mt-1 text-xs text-white/50">70/30, 64/36, 55/45 tiers & custom overrides</p>
              </Card>
              <Card className="glass p-5 transition hover:border-gold-500/30">
                <Crown className="mb-3 text-cherry-500" size={24} />
                <h3 className="font-semibold">Compliance & Moderation</h3>
                <p className="mt-1 text-xs text-white/50">Content review queue, reports, KYC verification</p>
              </Card>
            </div>
          </div>
        )}

        {tab === "users" && (
          <Card className="glass overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-semibold">User Management</h2>
              <p className="text-xs text-white/50">{profiles.length} registered users</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Coin Balance</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-6 py-3 font-medium">{p.display_name}</td>
                      <td className="px-6 py-3">
                        <span className={`rounded-lg px-2 py-1 text-xs font-medium ${p.role === "admin" ? "bg-gold-500/20 text-gold-400" : p.role === "dancer" ? "bg-cherry-500/20 text-cherry-500" : "bg-sky-500/20 text-sky-400"}`}>
                          {p.role}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={p.tier === "Supersonic 3rd Edition" ? "text-violet-400" : ""}>{p.tier}</span>
                      </td>
                      <td className="px-6 py-3">{getBalance(p.id).toLocaleString()}</td>
                      <td className="px-6 py-3 text-white/40">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-3">
                        <Button variant="ghost" size="sm"><Eye size={14} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "finance" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TaxCalculator />
            <div className="space-y-6">
              <HoloWidget title="Platform Net Revenue" value="$189,420" subtitle="After splits & fees" icon={<TrendingUp size={20} />} color="emerald" />
              <HoloWidget title="Average Revenue Per User" value="$847" subtitle="Monthly ARPU" icon={<Zap size={20} />} color="gold" />
              <MiniChart title="Monthly Revenue Trend" data={[42000, 48000, 52000, 58000, 63000, 71000, 78000, 84000, 91000, 98000, 105000, 118000]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#10b981" />
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
                  { rank: 1, name: "BlankFaced Studios", score: 980, badge: "Supersonic" },
                  { rank: 2, name: "Tim Jackson", score: 920, badge: "Virtuoso" },
                  { rank: 3, name: "Floyd Beararms", score: 875, badge: "Supersonic" },
                  { rank: 4, name: "PrettyBoi Floyd", score: 840, badge: "Supersonic" },
                  { rank: 5, name: "Santi ABC", score: 810, badge: "Supersonic" }
                ]}
                scoreLabel="XP"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
