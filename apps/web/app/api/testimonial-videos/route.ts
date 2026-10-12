import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("testimonialVideos");
export const POST = createItem("testimonialVideos");
