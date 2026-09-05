import OpenAI from "openai";

export const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-5.6-luna";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set — the chat assistant will fail on every request.");
}

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
