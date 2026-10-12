import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("testimonials");
export const PUT = updateItemById("testimonials");
export const DELETE = deleteItemById("testimonials");
