/**
 * One-off, non-destructive patch: updates the `order` field on live department documents
 * to lead with the hospital's priority specialities, without touching any other field or
 * re-seeding the collection (seed.ts clears and rewrites everything).
 */
import { db } from "../firebase";

const NEW_ORDER: Record<string, number> = {
  "fertility-ivf": 1,
  gynecology: 2,
  paediatrics: 3,
  "general-medicine": 4,
  urology: 5,
  orthopaedics: 6,
  cardiology: 7,
  neurology: 8,
  pulmonology: 9,
};

async function main() {
  for (const [slug, order] of Object.entries(NEW_ORDER)) {
    const snap = await db.collection("departments").where("slug", "==", slug).limit(1).get();
    if (snap.empty) {
      console.log(`SKIP (no department found): ${slug}`);
      continue;
    }
    const doc = snap.docs[0];
    await doc.ref.set({ order, updatedAt: new Date().toISOString() }, { merge: true });
    console.log(`Updated ${slug} (${doc.id}) -> order ${order}`);
  }
  console.log("Done.");
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
