"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/core/Logo";
import {
  Shield,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  Eye
} from "lucide-react";

interface Profile {
  id: string;
  display_name: string;
  role: string;
  tier: string;
  created_at: string;
}

interface Wallet {
  user_id: string;
  balance: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setAdminName(profile.display_name || user.email || "Admin");

      const { data: allProfiles } = await supabase.from("profiles").select("*").order("created_at");
      const { data: allWallets } = await supabase.from("coin_wallets").select("*");

      setProfiles(allProfiles || []);
      setWallets(allWallets || []);
      setLoading(false);
    }
    load();
  }, [router]);

  function getBalance(userId: string) {
    return wallets.find((w) => w.user_id === userId)?.balance || 0;
  }

  const totalCoins = wallets.reduce((sum, w) => sum + w.balance, 0);
  const dancerCount = profiles.filter((p) => p.role === "dancer").length;
  const clientCount = profiles.filter((p) => p.role === "client").length;
  const adminCount = profiles.filter((p) => p.role === "admin").length;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="text-lg text-white/50">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Shield className="text-gold-500" size={32} />
            <div>
              <h1 className="cherry-text font-display text-4xl">Admin Control Center</h1>
              <p className="text-white/70">Welcome, {adminName}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Eye className="mr-2" size={16} /> View Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2" size={16} /> Sign Out
            </Button>
          </div>
        </header>

        <section className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="glass p-6">
            <Users className="mb-2 text-cherry-500" />
            <p className="text-sm text-white/60">Total Users</p>
            <p className="text-3xl font-semibold">{profiles.length}</p>
          </Card>
          <Card className="glass p-6">
            <Activity className="mb-2 text-emerald-400" />
            <p className="text-sm text-white/60">Dancers</p>
            <p className="text-3xl font-semibold">{dancerCount}</p>
          </Card>
          <Card className="glass p-6">
            <BarChart3 className="mb-2 text-sky-400" />
            <p className="text-sm text-white/60">Clients</p>
            <p className="text-3xl font-semibold">{clientCount}</p>
          </Card>
          <Card className="glass p-6">
            <DollarSign className="mb-2 text-gold-500" />
            <p className="text-sm text-white/60">Total Coins in Circulation</p>
            <p className="text-3xl font-semibold">{totalCoins.toLocaleString()}</p>
          </Card>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">User Management</h2>
          <Card className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Coin Balance</th>
                    <th className="px-6 py-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4 font-medium">{profile.display_name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-lg px-2 py-1 text-xs font-medium ${
                            profile.role === "admin"
                              ? "bg-gold-500/20 text-gold-400"
                              : profile.role === "dancer"
                                ? "bg-cherry-500/20 text-cherry-500"
                                : "bg-sky-500/20 text-sky-400"
                          }`}
                        >
                          {profile.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{profile.tier}</td>
                      <td className="px-6 py-4">{getBalance(profile.id).toLocaleString()}</td>
                      <td className="px-6 py-4 text-white/50">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="glass p-6">
            <Settings className="mb-3 text-gold-500" size={28} />
            <h3 className="mb-2 text-xl font-semibold">Platform Settings</h3>
            <p className="text-sm text-white/60">Revenue splits, tier configs, coin rates</p>
          </Card>
          <Card className="glass p-6">
            <BarChart3 className="mb-3 text-cherry-500" size={28} />
            <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
            <p className="text-sm text-white/60">Stream metrics, earnings, engagement</p>
          </Card>
          <Card className="glass p-6">
            <Shield className="mb-3 text-emerald-400" size={28} />
            <h3 className="mb-2 text-xl font-semibold">Moderation</h3>
            <p className="text-sm text-white/60">Content review, reports, bans</p>
          </Card>
        </section>
      </div>
    </div>
  );
}
