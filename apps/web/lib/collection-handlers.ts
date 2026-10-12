import { NextRequest, NextResponse } from "next/server";
import { db } from "./firebase-admin";
import { requireAdmin } from "./require-admin";

// Mirrors apps/api/src/routes/collectionRoutes.ts's createCollectionRouter, split into
// per-HTTP-method handlers so each can be wired into a Next.js route.ts file.

export function listItems(collectionName: string) {
  return async function GET(req: NextRequest) {
    try {
      const ref = db.collection(collectionName);
      const limitParam = req.nextUrl.searchParams.get("limit");
      const limit = limitParam ? parseInt(limitParam, 10) : undefined;

      if (limit && Number.isFinite(limit) && limit > 0) {
        let pageRef = ref.orderBy("createdAt", "desc").limit(limit);
        const cursor = req.nextUrl.searchParams.get("cursor");
        if (cursor) pageRef = pageRef.startAfter(cursor);
        const snap = await pageRef.get();
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const last = snap.docs[snap.docs.length - 1];
        const nextCursor = snap.docs.length === limit && last ? last.get("createdAt") ?? null : null;
        return NextResponse.json({ items, nextCursor });
      }

      const snap = await ref.get();
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return NextResponse.json({ items });
    } catch {
      return NextResponse.json({ error: `Failed to fetch ${collectionName}` }, { status: 500 });
    }
  };
}

export function createItem(collectionName: string, onWritten?: () => void) {
  return async function POST(req: NextRequest) {
    const result = await requireAdmin(req);
    if ("error" in result) return result.error;

    try {
      const body = await req.json();
      const now = new Date().toISOString();
      const payload = { ...body, createdAt: now, updatedAt: now };
      const docRef = await db.collection(collectionName).add(payload);
      onWritten?.();
      return NextResponse.json({ item: { id: docRef.id, ...payload } }, { status: 201 });
    } catch {
      return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
    }
  };
}

export function getItemBySlugOrId(collectionName: string) {
  return async function GET(_req: NextRequest, { params }: { params: { slugOrId: string } }) {
    try {
      const { slugOrId } = params;
      const bySlug = await db.collection(collectionName).where("slug", "==", slugOrId).limit(1).get();
      if (!bySlug.empty) {
        const doc = bySlug.docs[0];
        return NextResponse.json({ item: { id: doc.id, ...doc.data() } });
      }
      const byId = await db.collection(collectionName).doc(slugOrId).get();
      if (!byId.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ item: { id: byId.id, ...byId.data() } });
    } catch {
      return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
    }
  };
}

export function updateItemById(collectionName: string, onWritten?: () => void) {
  return async function PUT(req: NextRequest, { params }: { params: { slugOrId: string } }) {
    const result = await requireAdmin(req);
    if ("error" in result) return result.error;

    try {
      const body = await req.json();
      const payload = { ...body, updatedAt: new Date().toISOString() };
      await db.collection(collectionName).doc(params.slugOrId).set(payload, { merge: true });
      const updated = await db.collection(collectionName).doc(params.slugOrId).get();
      onWritten?.();
      return NextResponse.json({ item: { id: updated.id, ...updated.data() } });
    } catch {
      return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
  };
}

export function deleteItemById(collectionName: string, onWritten?: () => void) {
  return async function DELETE(req: NextRequest, { params }: { params: { slugOrId: string } }) {
    const result = await requireAdmin(req);
    if ("error" in result) return result.error;

    try {
      await db.collection(collectionName).doc(params.slugOrId).delete();
      onWritten?.();
      return new NextResponse(null, { status: 204 });
    } catch {
      return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
  };
}
