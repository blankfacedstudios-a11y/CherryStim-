"use client";

import { useState, useCallback } from "react";
import { Send, AlertTriangle } from "lucide-react";
import { moderateText } from "@/lib/moderation";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function ChatInput({ onSend, placeholder = "Type a message...", className }: ChatInputProps) {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState<string | null>(null);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;

    const result = moderateText(text);
    if (!result.clean) {
      setWarning(
        result.severity === "ban"
          ? "This message contains solicitation language and cannot be sent. Repeated violations will result in a ban."
          : `Prohibited content detected: ${result.flaggedTerms.slice(0, 3).join(", ")}. Message blocked.`
      );
      setTimeout(() => setWarning(null), 5000);
      return;
    }

    onSend(text);
    setText("");
    setWarning(null);
  }, [text, onSend]);

  return (
    <div className={cn("space-y-2", className)}>
      {warning && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <AlertTriangle size={14} className="shrink-0" />
          <p>{warning}</p>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm backdrop-blur-sm placeholder:text-white/30 focus:border-cherry-500/50 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-cherry-500 transition hover:bg-cherry-600 disabled:opacity-30"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
