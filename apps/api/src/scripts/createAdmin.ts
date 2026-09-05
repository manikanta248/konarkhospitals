/**
 * Creates (or promotes) an admin user: `tsx src/scripts/createAdmin.ts <email> <password> <name>`
 * Creates the Firebase Auth user if needed, then adds an entry to the `admins` Firestore
 * collection keyed by uid so the API's requireAdmin middleware grants access.
 */
import { auth, db } from "../firebase";

async function main() {
  const [, , email, password, name] = process.argv;
  if (!email || !password) {
    console.error("Usage: tsx src/scripts/createAdmin.ts <email> <password> <name>");
    process.exit(1);
  }

  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`User already exists: ${user.uid}`);
  } catch {
    user = await auth.createUser({ email, password, displayName: name ?? email });
    console.log(`Created auth user: ${user.uid}`);
  }

  await db.collection("admins").doc(user.uid).set({
    email,
    name: name ?? email,
    role: "superadmin",
    createdAt: new Date().toISOString(),
  });

  console.log(`Admin access granted to ${email} (uid: ${user.uid})`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
