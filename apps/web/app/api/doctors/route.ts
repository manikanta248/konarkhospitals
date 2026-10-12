import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("doctors");
export const POST = createItem("doctors");
