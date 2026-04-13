"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SAMPLE_TRACKS, JUKEBOX_CONFIG } from "@/lib/music";
import { toast } from "sonner";
import { Music, Play, Clock, Disc3, ShoppingCart, Star, Zap } from "lucide-react";

export default function JukeboxPage() {
  const [genre, setGenre] = useState("all");
  const [rented, setRented] = useState<string[]>([]);
  const genres = ["all", ...new Set(SAMPLE_TRACKS.map((t) => t.genre))];
  const filtered = genre === "all" ? SAMPLE_TRACKS : SAMPLE_TRACKS.filter((t) => t.genre === genre);

  function rentTrack(trackId: string) {
    const track = SAMPLE_TRACKS.find((t) => t.id === trackId);
    if (!track) return;
    setRented((prev) => [...prev, trackId]);
    toast.success(`🎵 "${track.title}" by ${track.artist} — 30-day lease activated! $${JUKEBOX_CONFIG.leasePrice}`);
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(255,0,51,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="mb-2 flex items-center gap-2">
            <Disc3 size={24} className="animate-spin text-violet-400" style={{ animationDuration: "3s" }} />
            <span className="rounded-lg bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">Premium Music</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-6xl">CherryStim Jukebox</h1>
          <p className="mt-2 max-w-2xl text-white/50">Spin any record for $10/month. 65% goes to the artist &amp; label, 35% to CherryStim. Premium licensed music for your streams.</p>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 text-sm">
            <Music size={16} className="text-gold-400" />
            <span className="text-white/70">$10 per track / 30-day lease</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-emerald-400">65% to artists &amp; labels</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-cherry-500">35% to CherryStim</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {genres.map((g) => (
            <button key={g} onClick={() => setGenre(g)} className={`rounded-xl px-4 py-2 text-xs font-medium capitalize transition ${genre === g ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>{g === "all" ? `All (${SAMPLE_TRACKS.length})` : g}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((track, idx) => {
            const isRented = rented.includes(track.id);
            return (
              <Card key={track.id} className="glass overflow-hidden transition hover:bg-white/[0.02]">
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-lg font-bold text-violet-400">{idx + 1}</div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cherry-500/20 to-violet-500/20">
                    <Disc3 size={28} className="text-white/50" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{track.title}</h3>
                      {track.nftMinted && <span className="rounded bg-gold-500/15 px-1.5 py-0.5 text-[8px] font-bold text-gold-400">NFT</span>}
                    </div>
                    <p className="text-xs text-white/40">{track.artist} • {track.genre} • {track.bpm} BPM • {track.duration}</p>
                  </div>
                  <div className="hidden gap-4 text-center md:flex">
                    <div><p className="text-sm font-bold">{track.activeLeases.toLocaleString()}</p><p className="text-[9px] text-white/30">Active</p></div>
                    <div><p className="text-sm font-bold">{track.totalLeases.toLocaleString()}</p><p className="text-[9px] text-white/30">All-time</p></div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${track.leasePrice}</p>
                    <p className="text-[9px] text-white/30">/ 30 days</p>
                  </div>
                  <Button size="sm" onClick={() => rentTrack(track.id)} disabled={isRented} className={isRented ? "bg-emerald-500/20 text-emerald-400" : ""}>
                    {isRented ? "✓ Leased" : <><Play size={12} className="mr-1" /> Rent</>}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
