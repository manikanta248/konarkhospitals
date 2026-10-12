import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "./firebase-admin";

export interface AdminInfo {
  uid: string;
  email: string;
  role: string;
}

type AdminResult = { admin: AdminInfo } | { error: NextResponse };

export async function requireAdmin(req: NextRequest): Promise<AdminResult> {
  try {
    const header = req.headers.get("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return { error: NextResponse.json({ error: "Missing authorization token" }, { status: 401 }) };

    const decoded = await auth.verifyIdToken(token);
    const adminDoc = await db.collection("admins").doc(decoded.uid).get();
    if (!adminDoc.exists) return { error: NextResponse.json({ error: "Not authorized as admin" }, { status: 403 }) };

    const data = adminDoc.data()!;
    return { admin: { uid: decoded.uid, email: decoded.email ?? "", role: data.role ?? "editor" } };
  } catch {
    return { error: NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }) };
  }
}
