"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCastingStore } from "@/hooks/useCastingStore";
import { SAMPLE_OPPORTUNITIES, type CastingOpportunity, type OpportunityType } from "@/lib/casting";
import { CASTING_SPLIT } from "@/lib/splits";
import { Star, Sparkles, MapPin, Clock, DollarSign, Send, Bell, Filter } from "lucide-react";
import { toast } from "sonner";

const TYPE_LABELS: Record<OpportunityType, string> = {
  sag: "SAG",
  non_sag: "Non-SAG",
  print_model: "Print Model",
  runway_model: "Runway",
  background_actress: "Background",
  commercial: "Commercial",
  film: "Film",
  tv: "TV"
};

export default function StarBrightLightsPage() {
  const { submitApplication, notifications, getUnreadCount, markNotificationRead } = useCastingStore();
  const [selectedType, setSelectedType] = useState<OpportunityType | "all">("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const unreadCount = getUnreadCount();

  const filtered = selectedType === "all"
    ? SAMPLE_OPPORTUNITIES
    : SAMPLE_OPPORTUNITIES.filter((o) => o.type === selectedType);

  function handleApply(opp: CastingOpportunity) {
    submitApplication({
      opportunityId: opp.id,
      dancerId: "current-dancer",
      headshots: [],
      resume: "",
      coverLetter
    });
    toast.success(`Application submitted for "${opp.title}"`);
    setApplyingTo(null);
    setCoverLetter("");
  }

  return (
    <div className="min-h-screen bg-[#050002] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <Sparkles className="text-gold-500" size={32} />
              <h1 className="cherry-text font-display text-5xl">Star Bright Lights</h1>
            </div>
            <p className="max-w-2xl text-white/70">
              Your gateway from social media model to the real deal. Deep-researched casting opportunities from the top 40 talent and modeling agencies across LA, Atlanta, Miami, NYC, Paris and beyond. All gigs booked through this module are a {CASTING_SPLIT.label} performer/platform split.
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cherry-600 text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-black/95 p-4 shadow-xl">
                <h3 className="mb-3 text-sm font-semibold">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-xs text-white/50">No notifications yet.</p>
                ) : (
                  <div className="max-h-60 space-y-2 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`cursor-pointer rounded-xl p-3 text-xs transition ${n.read ? "bg-white/5" : "bg-cherry-500/10 border border-cherry-500/20"}`}
                      >
                        <p className="font-semibold">{n.title}</p>
                        <p className="text-white/60">{n.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
          >
            <Filter size={14} className="mr-1" /> All
          </Button>
          {(Object.keys(TYPE_LABELS) as OpportunityType[]).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={selectedType === t ? "default" : "outline"}
              onClick={() => setSelectedType(t)}
            >
              {TYPE_LABELS[t]}
            </Button>
          ))}
        </div>

        <div className="grid gap-6">
          {filtered.map((opp) => (
            <Card key={opp.id} className="glass p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold">{opp.title}</h2>
                    {opp.isSag && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                        SAG-AFTRA
                      </span>
                    )}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                      {TYPE_LABELS[opp.type]}
                    </span>
                  </div>
                  <p className="mb-3 text-white/70">{opp.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {opp.location}</span>
                    <span className="flex items-center gap-1"><Star size={14} /> {opp.agency}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> Deadline: {opp.deadline}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14} /> {opp.compensation}</span>
                  </div>
                  <div className="mt-3">
                    <p className="mb-1 text-xs font-semibold text-white/50">Requirements:</p>
                    <ul className="flex flex-wrap gap-2">
                      {opp.requirements.map((r, i) => (
                        <li key={i} className="rounded-lg bg-white/5 px-2 py-1 text-xs text-white/70">{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {applyingTo === opp.id ? (
                    <div className="w-72 space-y-3">
                      <textarea
                        placeholder="Cover letter (optional)..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-sm"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApply(opp)} className="flex-1">
                          <Send size={14} className="mr-1" /> Submit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setApplyingTo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setApplyingTo(opp.id)}>
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
