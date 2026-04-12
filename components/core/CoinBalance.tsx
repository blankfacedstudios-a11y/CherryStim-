"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CoinBalance() {
  const [balance, setBalance] = useState(2840);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((previous) => previous + Math.floor(Math.random() * 3));
    }, 45_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass flex items-center gap-4 rounded-2xl border border-gold-500/30 px-6 py-3">
      <Coins className="text-gold-500" size={28} />
      <span className="text-sm font-medium text-white/70">Cherrystim Coins</span>
      <div className="gold-glow rounded-lg px-2 py-1 text-2xl font-semibold">{balance.toLocaleString()}</div>
      <Button size="sm" className="ml-2 bg-gradient-to-r from-gold-500 to-amber-500 text-black">
        Buy
      </Button>
    </div>
  );
}
