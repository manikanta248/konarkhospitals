import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("articles");
export const POST = createItem("articles");
