"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  role?: string;
}

const sampleComments: Comment[] = [
  { id: "1", author: "Luna Rose", text: "Just hit 10K viewers tonight! Thank you all 🍒", timestamp: new Date(Date.now() - 120000), role: "dancer" },
  { id: "2", author: "Diamond Jade", text: "New 3D stage setup is incredible", timestamp: new Date(Date.now() - 90000), role: "dancer" },
  { id: "3", author: "Bruce Wayne Jr", text: "The VR experience keeps getting better", timestamp: new Date(Date.now() - 60000), role: "client" },
  { id: "4", author: "System", text: "Platform revenue milestone: $500K this quarter 🎉", timestamp: new Date(Date.now() - 30000), role: "system" }
];

export function LiveCommentBox({ className }: { className?: string }) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const autoComments = [
        "Loving the new haptic feedback update!",
        "Can we get more VR content? 🔥",
        "Revenue split looking good this month",
        "The immersive mode is next level",
        "Coin economy is thriving 💰"
      ];
      const names = ["Velvet Siren", "Scarlet Noir", "New Viewer", "Gold Member", "VIP Client"];
      const roles = ["dancer", "dancer", "client", "client", "client"];
      const idx = Math.floor(Math.random() * autoComments.length);
      setComments((prev) => [
        ...prev.slice(-19),
        {
          id: Date.now().toString(),
          author: names[idx],
          text: autoComments[idx],
          timestamp: new Date(),
          role: roles[idx]
        }
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [comments]);

  function handleSend() {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now().toString(), author: "You", text: newComment, timestamp: new Date(), role: "admin" }
    ]);
    setNewComment("");
  }

  const roleColors: Record<string, string> = {
    admin: "text-gold-400",
    dancer: "text-cherry-500",
    client: "text-sky-400",
    system: "text-emerald-400"
  };

  return (
    <Card className={`glass flex flex-col overflow-hidden ${className || ""}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <MessageCircle size={16} className="text-cherry-500" />
        <h3 className="text-sm font-semibold">Live Activity Feed</h3>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE
        </span>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4" style={{ maxHeight: 280 }}>
        {comments.map((c) => (
          <div key={c.id} className="rounded-xl bg-white/[0.03] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${roleColors[c.role || "client"]}`}>{c.author}</span>
              <span className="text-[10px] text-white/30">
                {c.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-sm text-white/70">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-cherry-500 focus:outline-none"
          />
          <Button type="submit" size="sm">
            <Send size={14} />
          </Button>
        </form>
      </div>
    </Card>
  );
}
