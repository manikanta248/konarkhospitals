import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("careers");
export const PUT = updateItemById("careers");
export const DELETE = deleteItemById("careers");
