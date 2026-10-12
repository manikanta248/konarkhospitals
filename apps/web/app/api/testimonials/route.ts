import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("testimonials");
export const POST = createItem("testimonials");
