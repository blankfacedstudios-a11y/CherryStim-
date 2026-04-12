"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TRACKING_STATUS_LABELS, type OrderTrackingStatus } from "@/lib/onboarding";
import { Package, Truck, Clock, CheckCircle, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_ORDER: OrderTrackingStatus[] = [
  "pending", "processing", "sourcing_from_suppliers", "supplier_shipped",
  "arrived_at_warehouse", "assembling_package", "quality_check",
  "shipped_to_dancer", "in_transit", "out_for_delivery", "delivered"
];

export default function ClientOrderTrackingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050002] p-6">
      <Package className="mb-4 text-white/20" size={64} />
      <h1 className="mb-2 text-2xl font-semibold">Client Order Tracking</h1>
      <p className="mb-4 max-w-md text-center text-white/50">
        Your welcome package order will appear here after completing the onboarding setup. Track every item from supplier to your door.
      </p>
      <div className="mb-8 w-full max-w-md space-y-2">
        {STATUS_ORDER.map((status, i) => {
          const info = TRACKING_STATUS_LABELS[status];
          const reached = i === 0;
          return (
            <div key={status} className="flex items-center gap-3 text-sm">
              {reached ? <CheckCircle size={14} className="text-emerald-400" /> : <Circle size={14} className="text-white/15" />}
              <span className={reached ? "text-white/70" : "text-white/25"}>{info.emoji} {info.label}</span>
            </div>
          );
        })}
      </div>
      <Button onClick={() => router.push("/onboarding")}>Start Welcome Setup</Button>
    </div>
  );
}
