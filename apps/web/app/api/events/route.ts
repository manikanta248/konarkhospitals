import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("events");
export const POST = createItem("events");
