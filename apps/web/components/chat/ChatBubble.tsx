"use client";

import { MessageCircle, X } from "lucide-react";

export function ChatBubble({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close chat" : "Chat with Konark Hospitals"}
      className={`fixed bottom-20 right-4 z-50 items-center justify-center rounded-full bg-brand-600 text-white shadow-floating transition-transform hover:scale-105 active:scale-95 lg:bottom-6 lg:right-6 h-14 w-14 ${
        open ? "hidden sm:flex" : "flex"
      }`}
    >
      {open ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  );
}
