"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { RECORD_LABELS, SAMPLE_TRACKS, JUKEBOX_CONFIG } from "@/lib/music";
import { downloadCSV } from "@/lib/documents";
import { Music, DollarSign, Disc3, Building2, Download, TrendingUp, Users, BarChart3, Eye, Globe } from "lucide-react";

export default function MusicAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "labels" | "tracks">("overview");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (profile?.role !== "admin") { router.push("/dashboard"); return; }
      setLoading(false);
    }
    load();
  }, [router]);

  const totalAllocated = RECORD_LABELS.reduce((s, l) => s + l.totalAllocated, 0);
  const totalMonthly = RECORD_LABELS.reduce((s, l) => s + l.monthlyRevenue, 0);
  const totalActiveLeases = SAMPLE_TRACKS.reduce((s, t) => s + t.activeLeases, 0);
  const cherrystimRevenue = Math.round(totalMonthly * JUKEBOX_CONFIG.cherrystimSplit);
  const labelRevenue = Math.round(totalMonthly * JUKEBOX_CONFIG.labelSplit);

  function exportLabels() {
    downloadCSV("cherrystim-record-labels-report.csv",
      ["Label", "Parent", "CEO", "Address", "Phone", "Email", "Website", "Total Allocated", "Monthly Revenue", "Predicted Annual", "Active Leases", "Total Tracks"],
      RECORD_LABELS.map((l) => [l.name, l.parent || "Independent", l.ceo, l.address, l.phone, l.email, l.website, l.totalAllocated.toString(), l.monthlyRevenue.toString(), l.predictedAnnual.toString(), l.activeLeases.toString(), l.totalTracks.toString()])
    );
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-dark-950"><p className="text-white/50">Loading music dashboard...</p></div>;

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-black/30 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600"><Music size={20} className="text-white" /></div>
            <div>
              <h1 className="text-lg font-bold">Music Executive Dashboard</h1>
              <p className="text-xs text-white/50">Jukebox • Labels • Licensing • NFT Cards • Festivals</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(["overview", "labels", "tracks"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tab === t ? "bg-violet-500/20 text-violet-400" : "text-white/50 hover:bg-white/5"}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
            <Button variant="outline" size="sm" onClick={exportLabels}><Download size={13} className="mr-1" /> Export Labels</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <HoloWidget title="Total Label Payouts" value={totalAllocated} subtitle="Since inception" icon={<DollarSign size={20} />} color="emerald" trend={{ value: 18, label: "growth" }} />
              <HoloWidget title="Monthly Music Revenue" value={totalMonthly} subtitle={`CS: $${cherrystimRevenue.toLocaleString()} / Labels: $${labelRevenue.toLocaleString()}`} icon={<TrendingUp size={20} />} color="violet" />
              <HoloWidget title="Active Track Leases" value={totalActiveLeases} subtitle={`${SAMPLE_TRACKS.length} tracks in catalog`} icon={<Disc3 size={20} />} color="cherry" trend={{ value: 12, label: "vs last month" }} />
              <HoloWidget title="Partner Labels" value={RECORD_LABELS.length} subtitle="Major + independent" icon={<Building2 size={20} />} color="gold" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniChart title="Monthly Jukebox Revenue" data={[42000, 48000, 55000, 62000, 71000, 78000, 86000, 94000, 102000, 112000, 124000, 138000]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#8b5cf6" />
              <MiniChart title="Active Leases Trend" data={[4200, 5100, 6200, 7400, 8600, 9800, 10400, 11200, 12000, 12800, 13600, 14200]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#ff0033" />
              <MiniChart title="NFT Card Sales" data={[1200, 1800, 2400, 3200, 4100, 4800, 5600, 6200, 7100, 8400, 9200, 10800]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#ffd700" />
            </div>

            <Card className="glass p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><BarChart3 size={18} className="text-violet-400" /> Revenue Split Analysis</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-violet-500/5 p-4 text-center">
                  <p className="text-3xl font-bold text-violet-400">65%</p>
                  <p className="text-sm text-white/50">To Labels &amp; Artists</p>
                  <p className="mt-1 text-xs text-white/30">${labelRevenue.toLocaleString()}/month</p>
                </div>
                <div className="rounded-2xl bg-cherry-500/5 p-4 text-center">
                  <p className="text-3xl font-bold text-cherry-500">35%</p>
                  <p className="text-sm text-white/50">To CherryStim</p>
                  <p className="mt-1 text-xs text-white/30">${cherrystimRevenue.toLocaleString()}/month</p>
                </div>
                <div className="rounded-2xl bg-gold-500/5 p-4 text-center">
                  <p className="text-3xl font-bold text-gold-400">$10</p>
                  <p className="text-sm text-white/50">Per Track / 30 Days</p>
                  <p className="mt-1 text-xs text-white/30">{totalActiveLeases.toLocaleString()} active leases</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {tab === "labels" && (
          <Card className="glass overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="font-semibold">Record Label Directory — {RECORD_LABELS.length} Partners</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead><tr className="border-b border-white/10 text-white/40">
                  <th className="px-4 py-3">Label</th><th className="px-4 py-3">CEO</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Total Allocated</th><th className="px-4 py-3">Monthly</th><th className="px-4 py-3">Predicted Annual</th><th className="px-4 py-3">Leases</th>
                </tr></thead>
                <tbody>
                  {RECORD_LABELS.map((label) => (
                    <tr key={label.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3"><p className="font-medium">{label.name}</p>{label.parent && <p className="text-[9px] text-white/30">({label.parent})</p>}</td>
                      <td className="px-4 py-3 text-white/60">{label.ceo}</td>
                      <td className="px-4 py-3"><p className="text-white/60">{label.phone}</p><p className="text-[9px] text-white/30">{label.email}</p><p className="text-[9px] text-white/30">{label.address}</p></td>
                      <td className="px-4 py-3 font-medium text-emerald-400">${label.totalAllocated.toLocaleString()}</td>
                      <td className="px-4 py-3 text-violet-400">${label.monthlyRevenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gold-400">${label.predictedAnnual.toLocaleString()}</td>
                      <td className="px-4 py-3">{label.activeLeases.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "tracks" && (
          <Card className="glass overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="font-semibold">Track Catalog — {SAMPLE_TRACKS.length} Licensed Tracks</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead><tr className="border-b border-white/10 text-white/40">
                  <th className="px-4 py-3">Track</th><th className="px-4 py-3">Artist</th><th className="px-4 py-3">Genre</th><th className="px-4 py-3">Active Leases</th><th className="px-4 py-3">All-time</th><th className="px-4 py-3">Revenue (Label 65%)</th><th className="px-4 py-3">Revenue (CS 35%)</th><th className="px-4 py-3">NFT</th>
                </tr></thead>
                <tbody>
                  {SAMPLE_TRACKS.map((track) => {
                    const totalRev = track.totalLeases * track.leasePrice;
                    return (
                      <tr key={track.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-medium">{track.title}</td>
                        <td className="px-4 py-3 text-white/60">{track.artist}</td>
                        <td className="px-4 py-3"><span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px]">{track.genre}</span></td>
                        <td className="px-4 py-3 text-cherry-500">{track.activeLeases.toLocaleString()}</td>
                        <td className="px-4 py-3">{track.totalLeases.toLocaleString()}</td>
                        <td className="px-4 py-3 text-emerald-400">${Math.round(totalRev * 0.65).toLocaleString()}</td>
                        <td className="px-4 py-3 text-violet-400">${Math.round(totalRev * 0.35).toLocaleString()}</td>
                        <td className="px-4 py-3">{track.nftMinted ? "✅" : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
