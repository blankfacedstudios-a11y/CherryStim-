"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { GlobalTaxModule } from "@/components/finance/GlobalTaxModule";
import { downloadCSV } from "@/lib/documents";
import { Crown, TrendingUp, DollarSign, Coins, Globe, Download, BarChart3, PieChart, Target, Zap } from "lucide-react";

export default function ExecutiveDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  function exportExecutiveSummary() {
    downloadCSV("cherrystim-executive-summary.csv",
      ["Metric", "Value", "Period", "Trend"],
      [
        ["Total Revenue", "$284,930", "Q1 2025", "+23.4%"],
        ["Net Profit", "$189,420", "Q1 2025", "+18.2%"],
        ["CherryCoin Revenue", "$42,680", "Q1 2025", "+34.1%"],
        ["Active Users", "847", "March 2025", "+12%"],
        ["Active Dancers", "86", "March 2025", "+8%"],
        ["Average Revenue Per User", "$847", "March 2025", "+5.3%"],
        ["Stream Hours (Total)", "12,847", "March 2025", "+31%"],
        ["Coin Transactions", "28,492", "March 2025", "+22%"],
        ["Platform Uptime", "99.97%", "Q1 2025", ""],
        ["Customer Satisfaction", "4.8/5", "Q1 2025", "+0.2"],
        ["", "", "", ""],
        ["CHERRYSTIM COIN METRICS", "", "", ""],
        ["Coins in Circulation", "485,000", "Current", "+8.2%"],
        ["Coin Purchase Revenue", "$28,400", "March 2025", ""],
        ["Exchange Fee Revenue", "$6,040", "March 2025", ""],
        ["Gift Transaction Volume", "$142,000", "March 2025", ""],
        ["Avg Coin Price", "$0.42", "Current", "+12%"],
        ["", "", "", ""],
        ["OPERATIONAL COSTS", "", "", ""],
        ["Dancer Payouts (70% split)", "$95,510", "Q1 2025", ""],
        ["Infrastructure (LiveKit/Hosting)", "$12,800", "Q1 2025", ""],
        ["Legal & Compliance", "$8,400", "Q1 2025", ""],
        ["Admin Salaries", "$42,000", "Q1 2025", ""],
      ]
    );
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-dark-950"><p className="text-white/50">Loading executive view...</p></div>;

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-gradient-to-r from-gold-500/5 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Crown size={24} className="text-gold-500" />
            <div>
              <h1 className="text-xl font-bold">Executive Dashboard</h1>
              <p className="text-xs text-white/50">CherryStim C-Suite • Supersonic 3rd Edition</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportExecutiveSummary}><Download size={13} className="mr-1" /> Export Summary</Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/payroll")}><DollarSign size={13} className="mr-1" /> Payroll</Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/compliance")}><Globe size={13} className="mr-1" /> Compliance</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HoloWidget title="Total Revenue" value={284930} subtitle="Q1 2025" icon={<TrendingUp size={20} />} color="emerald" trend={{ value: 23.4, label: "vs Q4" }} />
          <HoloWidget title="Net Profit" value={189420} subtitle="After all expenses" icon={<DollarSign size={20} />} color="gold" trend={{ value: 18.2, label: "margin" }} />
          <HoloWidget title="CherryCoin Revenue" value={42680} subtitle="Purchases + fees + exchange" icon={<Coins size={20} />} color="violet" trend={{ value: 34.1, label: "growth" }} />
          <HoloWidget title="ARPU" value="$847" subtitle="Avg Revenue Per User" icon={<Target size={20} />} color="sky" trend={{ value: 5.3, label: "vs last month" }} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MiniChart title="Quarterly Revenue" data={[82000, 94000, 108000, 128000, 142000, 158000, 172000, 189000, 210000, 235000, 260000, 285000]} labels={["Q1'24", "Q2'24", "Q3'24", "Q4'24", "Q1'25", ""]} color="#10b981" />
          <MiniChart title="CherryCoin Price" data={[0.18, 0.21, 0.24, 0.28, 0.31, 0.33, 0.35, 0.38, 0.39, 0.40, 0.41, 0.42]} labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]} color="#ffd700" />
          <MiniChart title="Monthly Active Users" data={[320, 380, 420, 480, 540, 590, 640, 700, 750, 790, 820, 847]} labels={["Apr", "Jun", "Aug", "Oct", "Dec", "Mar"]} color="#ff0033" />
          <MiniChart title="Stream Quality (Avg Bitrate Mbps)" data={[4.2, 4.5, 4.8, 5.1, 5.4, 5.6, 5.8, 6.0, 6.2, 6.4, 6.5, 6.8]} labels={["Q1", "Q2", "Q3", "Q4", "Q1'25", ""]} color="#8b5cf6" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="glass p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Coins size={18} className="text-gold-500" /> CherryCoin Economy</h2>
            <div className="space-y-3">
              <div className="flex justify-between rounded-xl bg-white/[0.03] p-3"><span className="text-sm text-white/50">Coins in Circulation</span><span className="font-semibold">485,000</span></div>
              <div className="flex justify-between rounded-xl bg-white/[0.03] p-3"><span className="text-sm text-white/50">Coin Purchase Revenue</span><span className="font-semibold text-emerald-400">$28,400</span></div>
              <div className="flex justify-between rounded-xl bg-white/[0.03] p-3"><span className="text-sm text-white/50">Exchange Fee Revenue</span><span className="font-semibold text-emerald-400">$6,040</span></div>
              <div className="flex justify-between rounded-xl bg-white/[0.03] p-3"><span className="text-sm text-white/50">Gift Transaction Volume</span><span className="font-semibold">$142,000</span></div>
              <div className="flex justify-between rounded-xl bg-white/[0.03] p-3"><span className="text-sm text-white/50">Platform Take (30% avg)</span><span className="font-semibold text-gold-400">$42,600</span></div>
              <div className="flex justify-between rounded-xl bg-emerald-500/5 p-3 font-semibold"><span>Avg Coin Price</span><span className="text-emerald-400">$0.42 (+12%)</span></div>
            </div>
          </Card>

          <Card className="glass p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><BarChart3 size={18} className="text-cherry-500" /> P&L Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="rounded-xl bg-emerald-500/5 p-3"><div className="mb-1 text-xs text-white/40">REVENUE</div>
                <div className="flex justify-between"><span>Coin Purchases</span><span className="text-emerald-400">$28,400</span></div>
                <div className="flex justify-between"><span>Subscriptions</span><span className="text-emerald-400">$12,800</span></div>
                <div className="flex justify-between"><span>Private Sessions</span><span className="text-emerald-400">$8,600</span></div>
                <div className="flex justify-between"><span>Gift Platform Fees</span><span className="text-emerald-400">$4,200</span></div>
                <div className="flex justify-between"><span>Exchange Fees</span><span className="text-emerald-400">$1,840</span></div>
                <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-semibold"><span>Total Revenue</span><span>$55,840</span></div>
              </div>
              <div className="rounded-xl bg-cherry-500/5 p-3"><div className="mb-1 text-xs text-white/40">EXPENSES</div>
                <div className="flex justify-between"><span>Dancer Payouts</span><span className="text-cherry-500">-$16,500</span></div>
                <div className="flex justify-between"><span>Admin Salaries</span><span className="text-cherry-500">-$14,000</span></div>
                <div className="flex justify-between"><span>Infrastructure</span><span className="text-cherry-500">-$3,290</span></div>
                <div className="flex justify-between"><span>Legal & Compliance</span><span className="text-cherry-500">-$3,200</span></div>
                <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-semibold"><span>Total Expenses</span><span>-$36,990</span></div>
              </div>
              <div className="flex justify-between rounded-xl bg-gold-500/10 p-3 text-base font-bold"><span>Net Profit</span><span className="text-gold-400">$18,850</span></div>
            </div>
          </Card>
        </div>

        <GlobalTaxModule />
      </div>
    </div>
  );
}
