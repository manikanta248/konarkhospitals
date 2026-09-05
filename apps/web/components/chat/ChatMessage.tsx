"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { sendChatFeedback } from "@/lib/chat-api";

export interface ChatMessageData {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ChatMessage({ message, sessionId }: { message: ChatMessageData; sessionId: string }) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const isUser = message.role === "user";

  async function giveFeedback(value: "up" | "down") {
    setFeedback(value);
    await sendChatFeedback(sessionId, message.timestamp, value);
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isUser ? "bg-brand-600 text-white" : "bg-ink-50 text-ink-800"
        }`}
      >
        {message.content}
        {!isUser && message.content && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Mark this reply as helpful"
              onClick={() => giveFeedback("up")}
              className={`rounded p-0.5 transition-colors ${feedback === "up" ? "text-emerald-600" : "text-ink-300 hover:text-ink-500"}`}
            >
              <ThumbsUp size={12} />
            </button>
            <button
              type="button"
              aria-label="Mark this reply as not helpful"
              onClick={() => giveFeedback("down")}
              className={`rounded p-0.5 transition-colors ${feedback === "down" ? "text-red-600" : "text-ink-300 hover:text-ink-500"}`}
            >
              <ThumbsDown size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
