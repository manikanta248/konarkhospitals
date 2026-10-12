import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("careers");
export const POST = createItem("careers");
