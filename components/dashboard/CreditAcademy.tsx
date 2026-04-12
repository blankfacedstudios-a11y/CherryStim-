"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, CheckCircle2, Lock, Star, ChevronRight } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: number;
  completed: number;
  category: "credit" | "finance" | "investing" | "tax" | "business";
  locked?: boolean;
}

const modules: Module[] = [
  { id: "1", title: "Credit Score Mastery", description: "Understanding FICO, building credit from 0 to 800+", lessons: 8, completed: 8, category: "credit" },
  { id: "2", title: "Debt Elimination Blueprint", description: "Avalanche vs snowball, negotiation tactics, consolidation", lessons: 6, completed: 4, category: "credit" },
  { id: "3", title: "Business Entity Formation", description: "LLC, S-Corp, C-Corp — choosing the right structure", lessons: 10, completed: 7, category: "business" },
  { id: "4", title: "Tax Strategy for Performers", description: "Write-offs, quarterly estimates, 1099 optimization", lessons: 12, completed: 3, category: "tax" },
  { id: "5", title: "Investment Fundamentals", description: "Index funds, real estate, crypto basics, portfolio allocation", lessons: 9, completed: 0, category: "investing" },
  { id: "6", title: "Revenue Stream Diversification", description: "Passive income, merchandise, digital products, licensing", lessons: 7, completed: 0, category: "business" },
  { id: "7", title: "Wealth Protection", description: "Insurance, trusts, asset protection, estate planning", lessons: 8, completed: 0, category: "finance", locked: true },
  { id: "8", title: "Venture Capital & Fundraising", description: "Pitch decks, term sheets, cap tables, angel investing", lessons: 11, completed: 0, category: "business", locked: true }
];

const categoryColors: Record<string, string> = {
  credit: "bg-sky-500/15 text-sky-400",
  finance: "bg-emerald-500/15 text-emerald-400",
  investing: "bg-violet-500/15 text-violet-400",
  tax: "bg-gold-500/15 text-gold-400",
  business: "bg-cherry-500/15 text-cherry-500"
};

export function CreditAcademy({ className }: { className?: string }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? modules : modules.filter((m) => m.category === filter);
  const totalLessons = modules.reduce((s, m) => s + m.lessons, 0);
  const completedLessons = modules.reduce((s, m) => s + m.completed, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <Card className={`glass overflow-hidden ${className || ""}`}>
      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap size={20} className="text-gold-500" /> Financial Academy
          </h3>
          <span className="rounded-lg bg-gold-500/10 px-2 py-0.5 text-xs font-medium text-gold-400">
            {overallProgress}% Complete
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-cherry-500 to-gold-500 transition-all" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-6 py-3">
        {["all", "credit", "finance", "business", "tax", "investing"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition ${filter === cat ? "bg-cherry-500/20 text-cherry-500" : "text-white/50 hover:bg-white/5"}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="divide-y divide-white/5">
        {filtered.map((mod) => {
          const progress = mod.lessons > 0 ? Math.round((mod.completed / mod.lessons) * 100) : 0;
          return (
            <div key={mod.id} className={`flex items-center gap-4 px-6 py-4 transition hover:bg-white/[0.03] ${mod.locked ? "opacity-50" : ""}`}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                {mod.locked ? <Lock size={16} className="text-white/30" /> : progress === 100 ? <CheckCircle2 size={16} className="text-emerald-400" /> : <BookOpen size={16} className="text-white/50" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{mod.title}</p>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${categoryColors[mod.category]}`}>
                    {mod.category}
                  </span>
                </div>
                <p className="truncate text-xs text-white/40">{mod.description}</p>
                {!mod.locked && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-cherry-500 to-gold-500" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[10px] text-white/40">{mod.completed}/{mod.lessons}</span>
                  </div>
                )}
              </div>
              {!mod.locked && (
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <ChevronRight size={14} />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
