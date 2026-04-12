"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoinBalance } from "@/components/core/CoinBalance";
import { BadgeDollarSign, Gem, Heart, Timer } from "lucide-react";

export default function ClientDashboardPage() {
  return (
    <main className="min-h-screen bg-dark-950 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="cherry-text font-display text-5xl">Client Vault</h1>
            <p className="text-white/70">Manage private shows, memberships, and immersive wallet spend.</p>
          </div>
          <CoinBalance />
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="glass p-6">
            <Heart className="mb-2 text-cherry-500" />
            <p className="text-sm text-white/60">Active Crushes</p>
            <p className="text-3xl font-semibold">4</p>
          </Card>
          <Card className="glass p-6">
            <Timer className="mb-2 text-gold-500" />
            <p className="text-sm text-white/60">Minutes Remaining</p>
            <p className="text-3xl font-semibold">86</p>
          </Card>
          <Card className="glass p-6">
            <Gem className="mb-2 text-sky-400" />
            <p className="text-sm text-white/60">NFT Gifts Owned</p>
            <p className="text-3xl font-semibold">19</p>
          </Card>
          <Card className="glass p-6">
            <BadgeDollarSign className="mb-2 text-emerald-400" />
            <p className="text-sm text-white/60">This Month Spend</p>
            <p className="text-3xl font-semibold">$328</p>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="glass p-6">
            <h2 className="mb-2 text-2xl font-semibold">Private Session Queue</h2>
            <p className="mb-4 text-white/70">Book one-on-one immersive sessions from 10 min to 60 min blocks.</p>
            <Button className="w-full">Request a Private Room</Button>
          </Card>
          <Card className="glass p-6">
            <h2 className="mb-2 text-2xl font-semibold">Tier Membership</h2>
            <p className="mb-4 text-white/70">Upgrade to Sprung+ for reduced gift transfer fees and early room access.</p>
            <Button variant="outline" className="w-full">
              Upgrade Tier
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
