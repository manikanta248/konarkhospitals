/**
 * One-off, non-destructive patch: sets heroImage on the live department documents that don't
 * have one yet, without touching any other field or re-seeding the collection (seed.ts clears
 * and rewrites everything, which would wipe out any edits made since the last seed).
 */
import { db } from "../firebase";

const IMAGES: Record<string, string> = {
  pulmonology: "/images/departments/pulmonology.jpg",
  "general-medicine": "/images/departments/general-medicine.jpg",
  "plastic-surgery-cosmetology": "/images/departments/plastic-surgery-cosmetology.jpg",
  ent: "/images/departments/ent.jpg",
  physiotherapy: "/images/departments/physiotherapy.jpg",
  "vascular-surgery": "/images/departments/vascular-surgery.jpg",
};

async function main() {
  for (const [slug, heroImage] of Object.entries(IMAGES)) {
    const snap = await db.collection("departments").where("slug", "==", slug).limit(1).get();
    if (snap.empty) {
      console.log(`SKIP (no department found): ${slug}`);
      continue;
    }
    const doc = snap.docs[0];
    await doc.ref.set({ heroImage, updatedAt: new Date().toISOString() }, { merge: true });
    console.log(`Updated ${slug} (${doc.id}) -> ${heroImage}`);
  }
  console.log("Done.");
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
