import { listItems, createItem } from "@/lib/collection-handlers";

export const GET = listItems("healthPackages");
export const POST = createItem("healthPackages");
