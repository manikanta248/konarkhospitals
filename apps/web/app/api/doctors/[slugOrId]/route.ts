import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("doctors");
export const PUT = updateItemById("doctors");
export const DELETE = deleteItemById("doctors");
