import { NextFunction, Request, Response } from "express";
import { auth, db } from "../firebase";

export interface AuthedRequest extends Request {
  admin?: { uid: string; email: string; role: string };
}

export async function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing authorization token" });

    const decoded = await auth.verifyIdToken(token);
    const adminDoc = await db.collection("admins").doc(decoded.uid).get();
    if (!adminDoc.exists) return res.status(403).json({ error: "Not authorized as admin" });

    const data = adminDoc.data()!;
    req.admin = { uid: decoded.uid, email: decoded.email ?? "", role: data.role ?? "editor" };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
