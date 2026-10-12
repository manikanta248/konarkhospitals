import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("healthPackages");
export const PUT = updateItemById("healthPackages");
export const DELETE = deleteItemById("healthPackages");
