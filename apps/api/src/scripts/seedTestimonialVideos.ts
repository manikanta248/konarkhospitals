/**
 * One-off, non-destructive seed: adds the 3 existing testimonial videos to the live
 * `testimonialVideos` collection if it's empty, without touching any other collection
 * (seed.ts clears and rewrites everything, so it's not safe to run against prod here).
 */
import { db } from "../firebase";

const VIDEOS = [
  { posterUrl: "/images/testimonials/testimonial-1-poster.jpg", videoUrl: "/videos/testimonials/testimonial-1.mp4", order: 1 },
  { posterUrl: "/images/testimonials/testimonial-2-poster.jpg", videoUrl: "/videos/testimonials/testimonial-2.mp4", order: 2 },
  { posterUrl: "/images/testimonials/testimonial-3-poster.jpg", videoUrl: "/videos/testimonials/testimonial-3.mp4", order: 3 },
];

async function main() {
  const existing = await db.collection("testimonialVideos").get();
  if (!existing.empty) {
    console.log(`SKIP: testimonialVideos already has ${existing.size} document(s).`);
    return;
  }

  const batch = db.batch();
  VIDEOS.forEach((v) => {
    const ref = db.collection("testimonialVideos").doc();
    const now = new Date().toISOString();
    batch.set(ref, { ...v, createdAt: now, updatedAt: now });
  });
  await batch.commit();
  console.log(`Seeded ${VIDEOS.length} testimonial videos.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
