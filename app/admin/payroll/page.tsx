"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoloWidget } from "@/components/dashboard/HoloWidget";
import { downloadCSV, printPayStub, generatePayStub } from "@/lib/documents";
import { DollarSign, Download, Printer, ArrowUpRight, ArrowDownRight, FileSpreadsheet, Users, Receipt } from "lucide-react";

interface Profile { id: string; display_name: string; role: string; tier: string; }
interface Wallet { user_id: string; balance: number; }

const payrollHistory = [
  { id: "PAY-001", name: "Luna Rose", role: "dancer", period: "Mar 1–15", gross: 4200, net: 2940, status: "Paid" },
  { id: "PAY-002", name: "Velvet Siren", role: "dancer", period: "Mar 1–15", gross: 3800, net: 2660, status: "Paid" },
  { id: "PAY-003", name: "Scarlet Noir", role: "dancer", period: "Mar 1–15", gross: 3200, net: 2240, status: "Paid" },
  { id: "PAY-004", name: "Diamond Jade", role: "dancer", period: "Mar 1–15", gross: 2800, net: 1960, status: "Paid" },
  { id: "PAY-005", name: "Golden Child", role: "dancer", period: "Mar 1–15", gross: 2500, net: 1750, status: "Processing" },
  { id: "PAY-006", name: "Tim Jackson", role: "admin", period: "Mar 1–15", gross: 6000, net: 4200, status: "Paid" },
  { id: "PAY-007", name: "BlankFaced Studios", role: "admin", period: "Mar 1–15", gross: 8000, net: 5600, status: "Paid" },
];

const transactions = [
  { id: "TXN-001", date: "2025-03-15", type: "in", description: "Client coin purchases", amount: 28400, category: "Revenue" },
  { id: "TXN-002", date: "2025-03-15", type: "out", description: "Dancer payouts (batch)", amount: 16500, category: "Payroll" },
  { id: "TXN-003", date: "2025-03-14", type: "in", description: "Subscription renewals", amount: 12800, category: "Revenue" },
  { id: "TXN-004", date: "2025-03-14", type: "out", description: "LiveKit infrastructure", amount: 2400, category: "Operations" },
  { id: "TXN-005", date: "2025-03-13", type: "in", description: "Private session bookings", amount: 8600, category: "Revenue" },
  { id: "TXN-006", date: "2025-03-13", type: "out", description: "Cloud hosting (Vercel/Supabase)", amount: 890, category: "Operations" },
  { id: "TXN-007", date: "2025-03-12", type: "in", description: "NFT gift sales (30% platform)", amount: 4200, category: "Revenue" },
  { id: "TXN-008", date: "2025-03-12", type: "out", description: "Admin salaries", amount: 14000, category: "Payroll" },
  { id: "TXN-009", date: "2025-03-11", type: "in", description: "CherryCoin exchange fees", amount: 1840, category: "Revenue" },
  { id: "TXN-010", date: "2025-03-11", type: "out", description: "Legal & compliance", amount: 3200, category: "Operations" },
];

export default function PayrollPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (profile?.role !== "admin") { router.push("/dashboard"); return; }
      const { data: p } = await supabase.from("profiles").select("*");
      setProfiles(p || []);
      setLoading(false);
    }
    load();
  }, [router]);

  const totalIn = transactions.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);

  function exportPayroll() {
    downloadCSV("cherrystim-payroll-export.csv",
      ["ID", "Name", "Role", "Period", "Gross", "Net", "Status"],
      payrollHistory.map((p) => [p.id, p.name, p.role, p.period, p.gross.toString(), p.net.toString(), p.status])
    );
  }

  function exportTransactions() {
    downloadCSV("cherrystim-transactions-export.csv",
      ["ID", "Date", "Type", "Description", "Amount", "Category"],
      transactions.map((t) => [t.id, t.date, t.type === "in" ? "INCOME" : "EXPENSE", t.description, t.amount.toString(), t.category])
    );
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-dark-950"><p className="text-white/50">Loading payroll...</p></div>;

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-black/30 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Payroll & Financial Tracking</h1>
            <p className="text-xs text-white/50">CherryStim Executive Finance • Audit-Ready</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPayroll}><FileSpreadsheet size={13} className="mr-1" /> Export Payroll</Button>
            <Button variant="outline" size="sm" onClick={exportTransactions}><Download size={13} className="mr-1" /> Export Transactions</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HoloWidget title="Revenue (This Period)" value={totalIn} icon={<ArrowUpRight size={20} />} color="emerald" trend={{ value: 18, label: "vs last period" }} />
          <HoloWidget title="Expenses (This Period)" value={totalOut} icon={<ArrowDownRight size={20} />} color="cherry" />
          <HoloWidget title="Net Profit" value={totalIn - totalOut} icon={<DollarSign size={20} />} color="gold" trend={{ value: 23, label: "margin" }} />
          <HoloWidget title="Coin Revenue" value={6040} subtitle="Platform fees + exchange" icon={<Receipt size={20} />} color="violet" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="glass overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
              <h2 className="flex items-center gap-2 font-semibold"><Users size={16} /> Payroll Register</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead><tr className="border-b border-white/10 text-white/40"><th className="px-4 py-3">ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Gross</th><th className="px-4 py-3">Net</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
                <tbody>
                  {payrollHistory.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-2 text-white/40">{p.id}</td>
                      <td className="px-4 py-2 font-medium">{p.name}</td>
                      <td className="px-4 py-2"><span className={`rounded px-1.5 py-0.5 text-[10px] ${p.role === "admin" ? "bg-gold-500/20 text-gold-400" : "bg-cherry-500/20 text-cherry-500"}`}>{p.role}</span></td>
                      <td className="px-4 py-2">${p.gross.toLocaleString()}</td>
                      <td className="px-4 py-2 text-emerald-400">${p.net.toLocaleString()}</td>
                      <td className="px-4 py-2"><span className={`rounded px-1.5 py-0.5 text-[10px] ${p.status === "Paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-gold-500/20 text-gold-400"}`}>{p.status}</span></td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" onClick={() => printPayStub(generatePayStub(p.name, p.role, p.gross, "US-CA"))}>
                          <Printer size={12} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="glass overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
              <h2 className="flex items-center gap-2 font-semibold"><DollarSign size={16} /> Money In / Money Out</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead><tr className="border-b border-white/10 text-white/40"><th className="px-4 py-3">Date</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Amount</th></tr></thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-2 text-white/40">{t.date}</td>
                      <td className="px-4 py-2">{t.description}</td>
                      <td className="px-4 py-2"><span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]">{t.category}</span></td>
                      <td className={`px-4 py-2 font-medium ${t.type === "in" ? "text-emerald-400" : "text-cherry-500"}`}>
                        {t.type === "in" ? "+" : "-"}${t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
