"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  badge?: string;
}

interface LeaderboardProps {
  title: string;
  entries: LeaderboardEntry[];
  scoreLabel?: string;
  className?: string;
}

const rankIcons = [
  <Trophy key="1" size={18} className="text-gold-500" />,
  <Medal key="2" size={18} className="text-gray-300" />,
  <Award key="3" size={18} className="text-amber-700" />
];

export function Leaderboard({ title, entries, scoreLabel = "Score", className }: LeaderboardProps) {
  return (
    <Card className={`glass overflow-hidden ${className || ""}`}>
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Trophy size={20} className="text-gold-500" /> {title}
        </h3>
      </div>
      <div className="divide-y divide-white/5">
        {entries.map((entry) => (
          <div key={entry.rank} className={`flex items-center gap-4 px-6 py-3 transition hover:bg-white/5 ${entry.rank <= 3 ? "bg-gold-500/[0.03]" : ""}`}>
            <div className="flex w-8 items-center justify-center">
              {entry.rank <= 3 ? rankIcons[entry.rank - 1] : <span className="text-sm text-white/40">#{entry.rank}</span>}
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cherry-500/30 to-gold-500/30 text-sm font-bold">
              {entry.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{entry.name}</p>
              {entry.badge && <span className="text-[10px] uppercase tracking-wider text-gold-400">{entry.badge}</span>}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{entry.score.toLocaleString()}</p>
              <p className="text-[10px] text-white/40">{scoreLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
