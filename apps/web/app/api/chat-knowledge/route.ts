import { listItems, createItem } from "@/lib/collection-handlers";
import { invalidateChatContextCache } from "@/lib/chat-context";

export const GET = listItems("chatKnowledge");
export const POST = createItem("chatKnowledge", invalidateChatContextCache);
