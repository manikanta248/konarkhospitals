/**
 * One-off setup: lets the admin panel upload files straight to Firebase Storage from the
 * browser. Run once after the Storage bucket exists: `npx tsx src/scripts/setupBucketCors.ts`
 */
import { bucket } from "../firebase";

const ORIGINS = ["https://www.konarkhospitals.com", "https://konarkhospitals.com", "http://localhost:3000", "http://localhost:3001"];

async function main() {
  await bucket.setCorsConfiguration([
    {
      origin: ORIGINS,
      method: ["PUT", "GET", "HEAD"],
      responseHeader: ["Content-Type", "x-goog-resumable"],
      maxAgeSeconds: 3600,
    },
  ]);
  console.log("CORS configured for", bucket.name);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
