"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadCSV } from "@/lib/documents";
import { Shield, FileCheck, Download, AlertTriangle, CheckCircle2, Globe, Scale, Lock, Eye } from "lucide-react";

const complianceFrameworks = [
  {
    id: "ca-ab5", name: "California AB5 — 3-Factor Classification Test", region: "California, USA", status: "active",
    description: "The ABC Test requires that a worker is an independent contractor only if ALL three conditions are met:",
    factors: [
      { label: "A — Free from Control", description: "The worker is free from the control and direction of the hiring entity in performing the work, both under the contract and in fact.", status: "compliant", evidence: "CherryStim performers set their own schedules, choose streaming modes, and control their content. Platform provides tools but does not direct performance." },
      { label: "B — Outside Usual Course", description: "The worker performs work that is outside the usual course of the hiring entity's business.", status: "review", evidence: "Performers create entertainment content. CherryStim operates as a technology platform. Documentation maintained showing platform vs. content creation separation." },
      { label: "C — Independent Trade", description: "The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.", status: "compliant", evidence: "Dancers maintain independent profiles, may perform on multiple platforms, and operate their own business entities." }
    ],
    actions: ["Maintain worker classification documentation", "Annual AB5 compliance audit", "Provide 1099-NEC forms for contractors earning >$600", "Ensure no exclusivity clauses in performer agreements"]
  },
  {
    id: "gdpr", name: "GDPR — General Data Protection Regulation", region: "European Union", status: "active",
    description: "EU data protection regulation requiring lawful processing, data minimization, and user rights.",
    factors: [
      { label: "Lawful Basis for Processing", description: "Personal data must be processed under a valid legal basis.", status: "compliant", evidence: "Consent-based processing for user accounts. Legitimate interest for platform operations. Contractual necessity for payments." },
      { label: "Data Subject Rights", description: "Right to access, rectification, erasure, portability, and objection.", status: "compliant", evidence: "Account settings allow data export and deletion. Privacy dashboard available to all users." },
      { label: "Data Protection Officer", description: "Organizations processing personal data at scale must designate a DPO.", status: "review", evidence: "DPO appointment pending. Interim compliance managed by legal team." }
    ],
    actions: ["Appoint Data Protection Officer", "Conduct Data Protection Impact Assessment (DPIA)", "Maintain Records of Processing Activities (ROPA)", "Implement 72-hour breach notification protocol"]
  },
  {
    id: "cpra", name: "CPRA — California Privacy Rights Act", region: "California, USA", status: "active",
    description: "Enhanced California privacy law with stricter data handling requirements for businesses.",
    factors: [
      { label: "Consumer Rights", description: "Right to know, delete, correct, and opt-out of data sale/sharing.", status: "compliant", evidence: "Privacy settings page implemented. Do Not Sell link in footer. Data deletion workflow active." },
      { label: "Sensitive Personal Information", description: "Special category data requires explicit consent.", status: "compliant", evidence: "Biometric data (if any) processed with explicit consent. Financial data encrypted at rest." },
      { label: "Data Minimization", description: "Collect only data necessary for stated purposes.", status: "compliant", evidence: "Data collection audit completed. Unnecessary fields removed from registration." }
    ],
    actions: ["Annual privacy audit", "Update privacy policy for CPRA compliance", "Train staff on data handling", "Maintain opt-out mechanisms"]
  },
  {
    id: "popia", name: "POPIA — Protection of Personal Information Act", region: "South Africa", status: "active",
    description: "South African data protection law governing processing of personal information.",
    factors: [
      { label: "Accountability", description: "Responsible party must ensure compliance.", status: "compliant", evidence: "Information Officer designated. Compliance framework established." },
      { label: "Processing Limitation", description: "Data processed lawfully and minimally.", status: "compliant", evidence: "Consent mechanisms in place. Data retention policies defined." }
    ],
    actions: ["Register with Information Regulator", "Conduct PAIA manual", "Implement data subject access request workflow"]
  }
];

const dataFolders = [
  { name: "Worker Classification Records", files: 24, lastUpdated: "2025-03-10", category: "AB5 Compliance" },
  { name: "1099-NEC Forms (2024 Tax Year)", files: 18, lastUpdated: "2025-01-31", category: "Tax Compliance" },
  { name: "Performer Agreements", files: 32, lastUpdated: "2025-03-01", category: "Contracts" },
  { name: "Privacy Impact Assessments", files: 6, lastUpdated: "2025-02-15", category: "GDPR/CPRA" },
  { name: "Data Processing Records (ROPA)", files: 12, lastUpdated: "2025-03-05", category: "GDPR" },
  { name: "Financial Audit Trail", files: 156, lastUpdated: "2025-03-15", category: "Finance" },
  { name: "Pay Stub Archives", files: 89, lastUpdated: "2025-03-15", category: "Payroll" },
  { name: "Tax Filing Records", files: 44, lastUpdated: "2025-02-28", category: "Tax Compliance" },
  { name: "International Compliance Docs", files: 28, lastUpdated: "2025-03-08", category: "Global" },
  { name: "Insurance & Liability", files: 8, lastUpdated: "2025-01-15", category: "Legal" },
];

export default function CompliancePage() {
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

  function exportComplianceReport() {
    const rows: string[][] = [];
    complianceFrameworks.forEach((fw) => {
      rows.push([fw.name, fw.region, fw.status, fw.description]);
      fw.factors.forEach((f) => rows.push(["  " + f.label, f.status, f.evidence, ""]));
      fw.actions.forEach((a) => rows.push(["  ACTION REQUIRED", a, "", ""]));
      rows.push(["", "", "", ""]);
    });
    downloadCSV("cherrystim-compliance-report.csv", ["Framework/Item", "Status/Region", "Evidence/Action", "Notes"], rows);
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-dark-950"><p className="text-white/50">Loading compliance...</p></div>;

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="border-b border-white/5 bg-black/30 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Compliance & Data Governance</h1>
            <p className="text-xs text-white/50">California AB5 • GDPR • CPRA • POPIA • Global Data Compliance</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportComplianceReport}><Download size={13} className="mr-1" /> Export Report</Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 pt-6">
        {complianceFrameworks.map((fw) => (
          <Card key={fw.id} className="glass overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gold-500" />
                <div>
                  <h2 className="font-semibold">{fw.name}</h2>
                  <p className="text-xs text-white/40">{fw.region}</p>
                </div>
              </div>
              <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 uppercase">{fw.status}</span>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-white/60">{fw.description}</p>
              <div className="space-y-3">
                {fw.factors.map((f) => (
                  <div key={f.label} className="rounded-xl bg-white/[0.02] p-4">
                    <div className="mb-1 flex items-center gap-2">
                      {f.status === "compliant" ? <CheckCircle2 size={14} className="text-emerald-400" /> : <AlertTriangle size={14} className="text-gold-400" />}
                      <span className="text-sm font-medium">{f.label}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${f.status === "compliant" ? "bg-emerald-500/15 text-emerald-400" : "bg-gold-500/15 text-gold-400"}`}>{f.status}</span>
                    </div>
                    <p className="mb-1 text-xs text-white/40">{f.description}</p>
                    <p className="text-xs text-white/60"><strong>Evidence:</strong> {f.evidence}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-semibold text-white/50">Required Actions</h4>
                <div className="space-y-1">
                  {fw.actions.map((a) => <p key={a} className="text-xs text-white/50">→ {a}</p>)}
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className="glass overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <Lock size={18} className="text-sky-400" />
            <h2 className="font-semibold">Compliance Data Folders</h2>
            <span className="ml-auto text-xs text-white/40">{dataFolders.reduce((s, d) => s + d.files, 0)} total documents</span>
          </div>
          <div className="divide-y divide-white/5">
            {dataFolders.map((folder) => (
              <div key={folder.name} className="flex items-center gap-4 px-6 py-3 hover:bg-white/[0.02]">
                <FileCheck size={16} className="text-white/30" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{folder.name}</p>
                  <p className="text-[10px] text-white/40">{folder.files} files • Updated {folder.lastUpdated}</p>
                </div>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{folder.category}</span>
                <Button variant="ghost" size="sm"><Eye size={12} /></Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
