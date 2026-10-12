import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("articles");
export const PUT = updateItemById("articles");
export const DELETE = deleteItemById("articles");
