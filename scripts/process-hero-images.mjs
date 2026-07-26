// Resizes/compresses the user-supplied hero + about images (assets/hero-src/)
// down to web-friendly sizes. Source files are 2+ MB each; output targets a
// max width of 1600px at JPEG quality 82, which is plenty for a full-bleed
// hero banner while cutting file size drastically.
import sharp from "sharp";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets/hero-src");

const JOBS = [
  { in: "custom-mental.jpg", out: "public/hero/mental.jpg", width: 1600 },
  { in: "custom-outdoors.jpg", out: "public/hero/outdoors.jpg", width: 1600 },
  { in: "custom-financial.jpg", out: "public/hero/financial.jpg", width: 1600 },
  { in: "custom-professional.jpg", out: "public/hero/professional.jpg", width: 1600 },
  { in: "custom-relationships.jpg", out: "public/hero/relationships.jpg", width: 1600 },
  { in: "custom-social.jpg", out: "public/hero/social.jpg", width: 1600 },
  { in: "custom-habits.jpg", out: "public/hero/habits.jpg", width: 1600 },
  { in: "custom-learning.jpg", out: "public/hero/learning.jpg", width: 1600 },
  { in: "custom-purpose.jpg", out: "public/hero/purpose.jpg", width: 1600 },
  { in: "interconnected-apps.jpg", out: "public/about/interconnected-apps.jpg", width: 1400 },
];

for (const job of JOBS) {
  const outPath = path.join(process.cwd(), job.out);
  await sharp(path.join(SRC, job.in))
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log(`Built ${job.out}`);
}
