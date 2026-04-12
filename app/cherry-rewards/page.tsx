"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GAME_TOKENS, RARITY_CONFIG } from "@/lib/tokens";
import { CHERRY_EMOJIS, getEmojisByCategory } from "@/lib/emojis";
import { REWARDS, REWARD_TIER_COLORS, getRewardsByCategory } from "@/lib/rewards";
import { type EliteStatus, ELITE_CONFIG } from "@/lib/rankings";
import { Gift, Gem, Plane, Home, Heart, Briefcase, Award, Coins, ScrollText, Gamepad2, Smile, Trophy, Crown, Lock } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  certificate: <ScrollText size={16} />, nft: <Gem size={16} />, cherrycoin: <Coins size={16} />,
  gift: <Gift size={16} />, travel: <Plane size={16} />, housing: <Home size={16} />,
  lifestyle: <Heart size={16} />, career: <Briefcase size={16} />
};

const CATEGORY_LABELS: Record<string, string> = {
  certificate: "Certified Certificates", nft: "NFT Rewards", cherrycoin: "CherryCoin Drops",
  gift: "Exclusive Gifts", travel: "Air Travel & Hotels", housing: "Rent & Bills Paid",
  lifestyle: "Lifestyle & Wellness", career: "Career & Equity"
};

type Tab = "rewards" | "tokens" | "emojis";

export default function CherryRewardsPage() {
  const [tab, setTab] = useState<Tab>("rewards");
  const [rewardFilter, setRewardFilter] = useState<string>("all");
  const [tokenFilter, setTokenFilter] = useState<string>("all");
  const [emojiCategory, setEmojiCategory] = useState<string>("all");

  const rewardsByCategory = getRewardsByCategory();
  const emojisByCategory = getEmojisByCategory();
  const filteredRewards = rewardFilter === "all" ? REWARDS : REWARDS.filter((r) => r.category === rewardFilter);
  const filteredTokens = tokenFilter === "all" ? GAME_TOKENS : GAME_TOKENS.filter((t) => t.category === tokenFilter);
  const filteredEmojis = emojiCategory === "all" ? CHERRY_EMOJIS : CHERRY_EMOJIS.filter((e) => e.category === emojiCategory);

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(255,0,51,0.12),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(255,215,0,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="mb-4 flex items-center gap-2">
            <Trophy size={24} className="text-gold-500" />
            <span className="rounded-lg bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Rewards Vault</span>
          </div>
          <h1 className="cherry-text font-display text-5xl md:text-6xl">Rewards, Tokens & Emojis</h1>
          <p className="mt-2 max-w-2xl text-white/50">Every piece you earn. Every reward you unlock. From CherryCoins to paid rent — this is what competing gets you.</p>
          <div className="mt-6 flex gap-2">
            {(["rewards", "tokens", "emojis"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${tab === t ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                {t === "rewards" ? "🎁 Rewards" : t === "tokens" ? "🎲 Game Tokens" : "😍 Emojis"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6">
        {tab === "rewards" && (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <button onClick={() => setRewardFilter("all")} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${rewardFilter === "all" ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>All</button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button key={key} onClick={() => setRewardFilter(key)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${rewardFilter === key ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>
                  {CATEGORY_ICONS[key]} {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRewards.map((reward) => {
                const tierCfg = REWARD_TIER_COLORS[reward.tier];
                const eliteCfg = ELITE_CONFIG[reward.minStatus];
                return (
                  <Card key={reward.id} className="glass overflow-hidden transition hover:scale-[1.01]">
                    <div className="p-5">
                      <div className="mb-3 flex items-start justify-between">
                        <span className="text-3xl">{reward.emoji}</span>
                        <div className="flex gap-1.5">
                          <span className="rounded-lg px-2 py-0.5 text-[9px] font-bold" style={{ background: `${tierCfg.color}20`, color: tierCfg.color }}>{tierCfg.label}</span>
                          <span className="rounded-lg px-2 py-0.5 text-[9px] font-bold" style={{ background: `${eliteCfg.color}20`, color: eliteCfg.color }}>{reward.minStatus}</span>
                        </div>
                      </div>
                      <h3 className="mb-1 font-semibold">{reward.name}</h3>
                      <p className="mb-3 text-xs text-white/50">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">{reward.value}</span>
                        <span className="text-[9px] text-white/30">{reward.oneTime ? "One-time" : "Recurring"}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {tab === "tokens" && (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <button onClick={() => setTokenFilter("all")} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tokenFilter === "all" ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>All ({GAME_TOKENS.length})</button>
              {["classic", "luxury", "fantasy", "tech", "nature", "royal", "cosmic", "legendary"].map((cat) => (
                <button key={cat} onClick={() => setTokenFilter(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${tokenFilter === cat ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>{cat}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTokens.map((token) => {
                const rcfg = RARITY_CONFIG[token.rarity];
                return (
                  <Card key={token.id} className={`glass overflow-hidden transition hover:scale-[1.02] ${rcfg.glow}`}>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-4xl">{token.emoji}</span>
                        <span className="rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase" style={{ background: `${rcfg.color}20`, color: rcfg.color }}>{token.rarity}</span>
                      </div>
                      <h3 className="font-semibold">{token.name}</h3>
                      <p className="mb-2 text-xs text-white/50">{token.description}</p>
                      <div className="flex items-center gap-1 text-[10px] text-white/30">
                        <Lock size={10} /> {token.unlockRequirement}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {tab === "emojis" && (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <button onClick={() => setEmojiCategory("all")} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${emojiCategory === "all" ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>All ({CHERRY_EMOJIS.length})</button>
              {Object.keys(emojisByCategory).map((cat) => (
                <button key={cat} onClick={() => setEmojiCategory(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${emojiCategory === cat ? "bg-cherry-500/20 text-cherry-500" : "bg-white/5 text-white/40"}`}>{cat} ({emojisByCategory[cat].length})</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {filteredEmojis.map((emoji) => (
                <Card key={emoji.code} className="glass p-3 text-center transition hover:scale-105 hover:bg-white/5">
                  <span className="text-3xl">{emoji.emoji}</span>
                  <p className="mt-1 truncate text-[10px] font-medium">{emoji.name}</p>
                  <p className="truncate text-[9px] text-white/30">{emoji.code}</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
