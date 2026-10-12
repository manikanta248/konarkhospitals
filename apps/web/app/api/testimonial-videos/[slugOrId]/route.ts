import { getItemBySlugOrId, updateItemById, deleteItemById } from "@/lib/collection-handlers";

export const GET = getItemBySlugOrId("testimonialVideos");
export const PUT = updateItemById("testimonialVideos");
export const DELETE = deleteItemById("testimonialVideos");
