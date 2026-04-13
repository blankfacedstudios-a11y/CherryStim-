"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CARD_PROGRAMS, CARD_ISSUING_PARTNERS, METAL_CARD_MANUFACTURERS, LAUNCH_ROADMAP, type CardTier } from "@/lib/fincard";
import { WELCOME_PACKAGE_ITEMS } from "@/lib/welcome-package";
import { CLIENT_PACKAGE_ITEMS, type ClientGender } from "@/lib/client-package";
import { LUXURY_PARTNERS } from "@/lib/welcome-package";
import { DANCER_TIERS, CLIENT_TIERS, type DancerTier, type ClientTier } from "@/lib/tiers";
import { TRACKING_STATUS_LABELS, type OrderTrackingStatus } from "@/lib/onboarding";
import { Shield, CreditCard, Package, Users, Truck, Settings, BarChart3, ChevronDown, ChevronUp, Bell } from "lucide-react";

type AdminTab = "overview" | "cards" | "dancer_packages" | "client_packages" | "orders" | "roadmap";

const MOCK_ORDERS = [
  { id: "WP-001", dancer: "Luna Rose", tier: "virtuoso", type: "dancer" as const, status: "assembling_package" as OrderTrackingStatus, items: 16 },
  { id: "WP-002", dancer: "Scarlet Noir", tier: "premier", type: "dancer" as const, status: "sourcing_from_suppliers" as OrderTrackingStatus, items: 14 },
  { id: "WP-003", dancer: "Diamond Jade", tier: "pro", type: "dancer" as const, status: "shipped_to_dancer" as OrderTrackingStatus, items: 10 },
  { id: "CL-001", dancer: "VIP Mike", tier: "vip", type: "client" as const, status: "processing" as OrderTrackingStatus, items: 8 },
  { id: "CL-002", dancer: "Platinum Sarah", tier: "platinum", type: "client" as const, status: "quality_check" as OrderTrackingStatus, items: 12 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [expandedRoadmap, setExpandedRoadmap] = useState(false);

  const tabs: { id: AdminTab; label: string; icon: typeof Shield }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "cards", label: "Card Program", icon: CreditCard },
    { id: "dancer_packages", label: "Dancer Packages", icon: Package },
    { id: "client_packages", label: "Client Packages", icon: Users },
    { id: "orders", label: "Order Management", icon: Truck },
    { id: "roadmap", label: "Launch Roadmap", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Shield className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Admin Dashboard</h1>
          </div>
          <p className="text-white/60">Manage card programs, welcome packages, orders, and fulfillment.</p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button key={tab.id} size="sm" variant={activeTab === tab.id ? "default" : "outline"} onClick={() => setActiveTab(tab.id)}>
                <Icon size={14} className="mr-1" /> {tab.label}
              </Button>
            );
          })}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass p-6">
                <p className="text-sm text-white/60">Active Card Programs</p>
                <p className="mt-2 text-4xl font-semibold">3</p>
                <p className="text-xs text-emerald-400">Cherry • Gold • Black</p>
              </Card>
              <Card className="glass p-6">
                <p className="text-sm text-white/60">Dancer Package Items</p>
                <p className="mt-2 text-4xl font-semibold">{WELCOME_PACKAGE_ITEMS.length}</p>
                <p className="text-xs text-gold-400">Across all tiers</p>
              </Card>
              <Card className="glass p-6">
                <p className="text-sm text-white/60">Client Package Items</p>
                <p className="mt-2 text-4xl font-semibold">{CLIENT_PACKAGE_ITEMS.length}</p>
                <p className="text-xs text-cherry-400">Male + Female + Non-Binary</p>
              </Card>
              <Card className="glass p-6">
                <p className="text-sm text-white/60">Luxury Partners</p>
                <p className="mt-2 text-4xl font-semibold">{LUXURY_PARTNERS.length}</p>
                <p className="text-xs text-sky-400">Global suppliers</p>
              </Card>
            </div>

            <Card className="glass p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Bell size={18} className="text-gold-500" /> Recent Orders</h2>
              <div className="space-y-2">
                {MOCK_ORDERS.map((order) => {
                  const info = TRACKING_STATUS_LABELS[order.status];
                  return (
                    <div key={order.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{info.emoji}</span>
                        <div>
                          <p className="text-sm font-medium">{order.id} — {order.dancer}</p>
                          <p className="text-xs text-white/40">{order.type === "dancer" ? "Dancer" : "Client"} • {order.tier} • {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gold-400">{info.label}</p>
                        <p className="text-[10px] text-white/30">{info.progress}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {(Object.keys(CARD_PROGRAMS) as CardTier[]).map((ct) => {
                const card = CARD_PROGRAMS[ct];
                return (
                  <Card key={ct} className="glass p-6">
                    <h3 className="mb-2 text-xl font-semibold">{card.name}</h3>
                    <p className="text-xs text-white/40">{card.material}</p>
                    <p className="text-xs text-white/40">{card.weight}</p>
                    <div className="mt-3 flex gap-3 text-sm">
                      <span className="text-emerald-400">{card.cashbackPercent}% cashback</span>
                      <span className="text-gold-400">{card.monthlyFee === 0 ? "Free" : `$${card.monthlyFee}/mo`}</span>
                    </div>
                    <p className="mt-2 text-xs text-white/40">Min tier: {card.minDancerTier}</p>
                    <Button size="sm" variant="outline" className="mt-3 w-full">Manage</Button>
                  </Card>
                );
              })}
            </div>
            <Card className="glass p-6">
              <h3 className="mb-3 text-lg font-semibold">Issuing Partners</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {CARD_ISSUING_PARTNERS.map((p) => (
                  <div key={p.name} className={`rounded-xl border p-3 ${p.recommended ? "border-gold-500/30 bg-gold-500/5" : "border-white/10 bg-black/30"}`}>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-[10px] text-white/40">{p.region}</p>
                    {p.recommended && <span className="text-[10px] text-gold-400">Recommended</span>}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="glass p-6">
              <h3 className="mb-3 text-lg font-semibold">Metal Card Manufacturers</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {METAL_CARD_MANUFACTURERS.map((m) => (
                  <div key={m.name} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="text-[10px] text-white/40">{m.material}</p>
                    <p className="text-[10px] text-emerald-400">{m.priceRange}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "dancer_packages" && (
          <div className="space-y-4">
            <p className="text-sm text-white/50">{WELCOME_PACKAGE_ITEMS.length} items across all dancer tiers</p>
            {WELCOME_PACKAGE_ITEMS.map((item) => (
              <Card key={item.id} className="glass flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/40">{item.supplier}</p>
                  <div className="mt-1 flex gap-1">
                    {item.includedInTiers.map((t) => (
                      <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-emerald-400">{item.estimatedCost}</p>
                  <Button size="sm" variant="outline" className="mt-1">Edit</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "client_packages" && (
          <div className="space-y-4">
            <p className="text-sm text-white/50">{CLIENT_PACKAGE_ITEMS.length} items (male, female, non-binary variants)</p>
            {CLIENT_PACKAGE_ITEMS.map((item) => (
              <Card key={item.id} className="glass flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/40">{item.supplier}</p>
                  <div className="mt-1 flex gap-1">
                    {item.includedInTiers.map((t) => (
                      <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">{t}</span>
                    ))}
                    <span className="rounded bg-cherry-500/10 px-1.5 py-0.5 text-[9px] text-cherry-400">
                      {item.genderSpecific === "all" ? "All" : (item.genderSpecific as string[]).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-emerald-400">{item.estimatedCost}</p>
                  <Button size="sm" variant="outline" className="mt-1">Edit</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50">{MOCK_ORDERS.length} active orders</p>
              <Button size="sm">Export CSV</Button>
            </div>
            {MOCK_ORDERS.map((order) => {
              const info = TRACKING_STATUS_LABELS[order.status];
              return (
                <Card key={order.id} className="glass p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{info.emoji}</span>
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-white/60">{order.dancer} • {order.type === "dancer" ? "Dancer" : "Client"}</p>
                        <p className="text-xs text-white/40">Tier: {order.tier} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gold-400">{info.label}</p>
                      <div className="mt-2 h-2 w-32 rounded-full bg-white/10">
                        <div className="h-2 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500" style={{ width: `${info.progress}%` }} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">Update Status</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-4">
            {LAUNCH_ROADMAP.map((step) => (
              <Card key={step.step} className="glass p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry-500/20 text-sm font-bold text-cherry-400">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mb-2 text-xs text-white/60">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-400">{step.timeline}</span>
                      {step.dependencies.map((d, i) => (
                        <span key={i} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
