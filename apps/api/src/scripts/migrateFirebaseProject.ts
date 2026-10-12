/**
 * One-time migration: copies all Firestore data and recreates admin accounts from the old
 * Firebase project (konark-hospitals) into the new one (konark-hospitals-98212).
 *
 * Firebase Auth passwords cannot be carried across projects (Firebase never exposes the raw
 * password hash config through the Admin SDK), so admin accounts are recreated with a fresh
 * generated password printed at the end — sign in with that and change it afterward.
 *
 * Run with: npx tsx src/scripts/migrateFirebaseProject.ts
 */
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const OLD_KEY_PATH = path.join(__dirname, "..", "..", "serviceAccountKey.json");
const NEW_KEY_PATH = path.join(__dirname, "..", "..", "serviceAccountKey-new.json");

const oldApp = admin.initializeApp({ credential: admin.credential.cert(JSON.parse(fs.readFileSync(OLD_KEY_PATH, "utf8"))) }, "old");
const newApp = admin.initializeApp({ credential: admin.credential.cert(JSON.parse(fs.readFileSync(NEW_KEY_PATH, "utf8"))) }, "new");

const oldDb = oldApp.firestore();
const newDb = newApp.firestore();
const oldAuth = oldApp.auth();
const newAuth = newApp.auth();

const COLLECTIONS = [
  "departments",
  "doctors",
  "articles",
  "testimonials",
  "events",
  "careers",
  "healthPackages",
  "appointments",
  "contactSubmissions",
  "chatLogs",
  "chatKnowledge",
  "config",
];

function generatePassword() {
  return crypto.randomBytes(9).toString("base64").replace(/[+/=]/g, "x") + "Aa1!";
}

async function migrateCollections() {
  for (const name of COLLECTIONS) {
    const snap = await oldDb.collection(name).get();
    if (snap.empty) {
      console.log(`  ${name}: 0 documents, skipping`);
      continue;
    }
    const batches: FirebaseFirestore.WriteBatch[] = [newDb.batch()];
    let opsInCurrentBatch = 0;
    for (const doc of snap.docs) {
      let batch = batches[batches.length - 1];
      if (opsInCurrentBatch >= 450) {
        batch = newDb.batch();
        batches.push(batch);
        opsInCurrentBatch = 0;
      }
      batch.set(newDb.collection(name).doc(doc.id), doc.data());
      opsInCurrentBatch++;
    }
    for (const batch of batches) await batch.commit();
    console.log(`  ${name}: migrated ${snap.size} documents`);
  }
}

async function migrateAdmins() {
  const snap = await oldDb.collection("admins").get();
  if (snap.empty) {
    console.log("  No admin accounts found to migrate.");
    return;
  }

  const credentials: { email: string; password: string }[] = [];

  for (const doc of snap.docs) {
    const data = doc.data() as { email: string; name?: string; role?: string };
    const password = generatePassword();

    let newUser;
    try {
      newUser = await newAuth.getUserByEmail(data.email);
      console.log(`  ${data.email}: auth user already exists in new project (uid ${newUser.uid}), leaving password as-is`);
    } catch {
      newUser = await newAuth.createUser({ email: data.email, password, displayName: data.name ?? data.email });
      credentials.push({ email: data.email, password });
      console.log(`  ${data.email}: created new auth user (uid ${newUser.uid})`);
    }

    await newDb.collection("admins").doc(newUser.uid).set({
      email: data.email,
      name: data.name ?? data.email,
      role: data.role ?? "superadmin",
      createdAt: new Date().toISOString(),
    });
  }

  if (credentials.length > 0) {
    console.log("\n  NEW ADMIN LOGIN CREDENTIALS (save these now, shown only once):");
    for (const c of credentials) console.log(`    ${c.email}  ->  ${c.password}`);
  }
}

async function main() {
  console.log("Migrating Firestore collections (konark-hospitals -> konark-hospitals-98212)...");
  await migrateCollections();

  console.log("\nMigrating admin accounts...");
  await migrateAdmins();

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
