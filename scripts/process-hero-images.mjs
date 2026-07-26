// Resizes/compresses the user-supplied hero + about images (assets/hero-src/)
// down to web-friendly sizes. Source files are 2+ MB each; output targets a
// max width of 1600px at JPEG quality 82, which is plenty for a full-bleed
// hero banner while cutting file size drastically.
//
// The hero source photos each have a solid/gradient fade baked into their
// left edge (left over from an earlier boxed-carousel design that overlaid
// text on that side). Now that the images render full-bleed, that fade shows
// as a dead panel, so each job crops it off (cropLeftPct, picked per image
// by sampling where the fade ends) before resizing.
import sharp from "sharp";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets/hero-src");

const JOBS = [
  { in: "custom-mental.jpg", out: "public/hero/mental.jpg", width: 1600, cropLeftPct: 52 },
  { in: "custom-outdoors.jpg", out: "public/hero/outdoors.jpg", width: 1600, cropLeftPct: 32 },
  { in: "custom-financial.jpg", out: "public/hero/financial.jpg", width: 1600, cropLeftPct: 46 },
  { in: "custom-professional.jpg", out: "public/hero/professional.jpg", width: 1600, cropLeftPct: 42 },
  { in: "custom-relationships.jpg", out: "public/hero/relationships.jpg", width: 1600, cropLeftPct: 37 },
  { in: "custom-social.jpg", out: "public/hero/social.jpg", width: 1600, cropLeftPct: 41 },
  { in: "custom-habits.jpg", out: "public/hero/habits.jpg", width: 1600, cropLeftPct: 38 },
  { in: "custom-learning.jpg", out: "public/hero/learning.jpg", width: 1600, cropLeftPct: 42 },
  { in: "custom-purpose.jpg", out: "public/hero/purpose.jpg", width: 1600, cropLeftPct: 42 },
  { in: "interconnected-apps.jpg", out: "public/about/interconnected-apps.jpg", width: 1400 },
];

for (const job of JOBS) {
  const outPath = path.join(process.cwd(), job.out);
  const inPath = path.join(SRC, job.in);
  let pipeline = sharp(inPath);

  if (job.cropLeftPct) {
    const meta = await sharp(inPath).metadata();
    const left = Math.round((meta.width * job.cropLeftPct) / 100);
    pipeline = pipeline.extract({ left, top: 0, width: meta.width - left, height: meta.height });
  }

  await pipeline
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log(`Built ${job.out}`);
}
