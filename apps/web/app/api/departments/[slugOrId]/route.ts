import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("departments");
export const PUT = updateItemById("departments");
export const DELETE = deleteItemById("departments");
