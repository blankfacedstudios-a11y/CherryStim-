"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/hooks/useOnboardingStore";
import { TRACKING_STATUS_LABELS, type OrderTrackingStatus } from "@/lib/onboarding";
import { Package, Truck, MapPin, Clock, CheckCircle, Circle, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_ORDER: OrderTrackingStatus[] = [
  "pending", "processing", "sourcing_from_suppliers", "supplier_shipped",
  "arrived_at_warehouse", "assembling_package", "quality_check",
  "shipped_to_dancer", "in_transit", "out_for_delivery", "delivered"
];

export default function OrderTrackingPage() {
  const router = useRouter();
  const { orderTracking } = useOnboardingStore();

  if (!orderTracking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050002] p-6">
        <Package className="mb-4 text-white/20" size={64} />
        <h1 className="mb-2 text-2xl font-semibold">No Active Orders</h1>
        <p className="mb-6 text-white/50">Complete your welcome setup to place an order.</p>
        <Button onClick={() => router.push("/dancer/onboarding")}>Start Welcome Setup</Button>
      </div>
    );
  }

  const overallInfo = TRACKING_STATUS_LABELS[orderTracking.overallStatus];
  const currentStatusIndex = STATUS_ORDER.indexOf(orderTracking.overallStatus);

  return (
    <div className="min-h-screen bg-[#050002] p-4 md:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <Truck className="text-gold-500" size={28} />
            <h1 className="cherry-text font-display text-4xl md:text-5xl">Order Tracking</h1>
          </div>
          <p className="text-white/50">Order <span className="font-mono text-white/70">{orderTracking.orderId}</span></p>
        </header>

        <Card className="glass mb-8 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-3xl">{overallInfo.emoji}</p>
              <h2 className="mt-2 text-2xl font-semibold">{overallInfo.label}</h2>
              <p className="text-sm text-white/50">Est. delivery: {orderTracking.estimatedDelivery}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-gold-400">{overallInfo.progress}%</p>
            </div>
          </div>

          <div className="h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500 transition-all duration-500"
              style={{ width: `${overallInfo.progress}%` }}
            />
          </div>

          {orderTracking.shippingAddress && (
            <div className="mt-4 flex items-center gap-2 text-sm text-white/40">
              <MapPin size={14} /> {orderTracking.shippingAddress}
            </div>
          )}
          {orderTracking.trackingNumber && (
            <div className="mt-2 flex items-center gap-2 text-sm text-white/40">
              <ExternalLink size={14} /> Tracking: {orderTracking.trackingNumber}
            </div>
          )}
        </Card>

        <Card className="glass mb-8 p-6">
          <h2 className="mb-4 text-xl font-semibold">Timeline</h2>
          <div className="space-y-3">
            {STATUS_ORDER.map((status, i) => {
              const info = TRACKING_STATUS_LABELS[status];
              const reached = i <= currentStatusIndex;
              const isCurrent = i === currentStatusIndex;
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${reached ? "bg-emerald-500/20" : "bg-white/5"}`}>
                    {reached ? <CheckCircle size={16} className="text-emerald-400" /> : <Circle size={16} className="text-white/20" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${isCurrent ? "font-semibold text-gold-400" : reached ? "text-white/70" : "text-white/30"}`}>
                      {info.emoji} {info.label}
                    </p>
                  </div>
                  <span className={`text-xs ${reached ? "text-emerald-400" : "text-white/20"}`}>{info.progress}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="glass p-6">
          <h2 className="mb-4 text-xl font-semibold">Supplier Status ({orderTracking.supplierStatuses.length} items)</h2>
          <div className="space-y-3">
            {orderTracking.supplierStatuses.map((s, i) => {
              const info = TRACKING_STATUS_LABELS[s.status];
              return (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                    {info.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.item}</p>
                    <p className="text-xs text-white/40">{s.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gold-400">{info.label}</p>
                    <p className="flex items-center gap-1 text-[10px] text-white/30">
                      <Clock size={10} /> {s.estimatedArrival}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
