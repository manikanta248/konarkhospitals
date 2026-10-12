import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";
import { invalidateChatContextCache } from "@/lib/chat-context";

export const GET = getItemBySlugOrId("chatKnowledge");
export const PUT = updateItemById("chatKnowledge", invalidateChatContextCache);
export const DELETE = deleteItemById("chatKnowledge", invalidateChatContextCache);
