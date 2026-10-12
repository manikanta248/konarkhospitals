import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("departments");
export const POST = createItem("departments");
