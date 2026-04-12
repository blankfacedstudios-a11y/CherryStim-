"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const campaigns = [
  { title: "Mocap Studio Upgrade", target: 12000, raised: 8600 },
  { title: "Dubai Flagship Residency", target: 25000, raised: 11950 }
];

export default function DreamWishPage() {
  return (
    <main className="min-h-screen bg-dark-950 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="cherry-text font-display text-5xl">Dream Wish Campaigns</h1>
          <p className="mt-2 text-white/70">Launch premium milestones and let fans co-fund your next chapter.</p>
        </div>

        <div className="grid gap-6">
          {campaigns.map((campaign) => {
            const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));
            return (
              <Card key={campaign.title} className="glass p-6">
                <h2 className="text-2xl font-semibold">{campaign.title}</h2>
                <p className="mb-3 text-white/70">
                  ${campaign.raised.toLocaleString()} raised of ${campaign.target.toLocaleString()}
                </p>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cherry-500 to-gold-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-sm text-gold-400">{progress}% funded</p>
              </Card>
            );
          })}
        </div>

        <Button size="lg">Start New Campaign</Button>
      </div>
    </main>
  );
}
