import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("events");
export const PUT = updateItemById("events");
export const DELETE = deleteItemById("events");
